import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BattleSide, BattlePreset, RoundResult } from '@/types';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { BattleTimer } from '@/lib/battle/battleTimer';
import { VoteSimulator } from '@/lib/battle/voteSimulator';
import { resolveWinner } from '@/lib/battle/resolveWinner';
import { randomInt, randomFloat } from '@/lib/shared/random';
import { Screen } from '@/components/ui/Screen';
import { RoundIndicator } from '@/components/shell/RoundIndicator';
import { Countdown } from './Countdown';
import { TugGauge } from './TugGauge';
import { SplitCard } from './SplitCard';
import { TapArea } from './TapArea';
import { CriticalTimeOverlay } from './CriticalTimeOverlay';
import { PrerollIntro } from './PrerollIntro';
import { WinnerReveal } from './WinnerReveal';

interface BattleScreenProps {
  preset: BattlePreset;
  currentRound: number;
  onBattleEnd: (result: RoundResult) => void;
}

export function BattleScreen({
  preset,
  currentRound,
  onBattleEnd,
}: BattleScreenProps) {
  // Preroll for rounds > 1
  const [isPrerolling, setIsPrerolling] = useState(currentRound > 1);

  // Scores with initial seed
  const [scoreA, setScoreA] = useState(() => {
    const totalSeed = randomInt(
      BATTLE_CONFIG.SEED_TOTAL_MIN,
      BATTLE_CONFIG.SEED_TOTAL_MAX
    );
    const ratio = randomFloat(
      BATTLE_CONFIG.SEED_RATIO_MIN,
      BATTLE_CONFIG.SEED_RATIO_MAX
    );
    return Math.round(totalSeed * ratio);
  });

  const [scoreB, setScoreB] = useState(() => {
    const totalSeed = randomInt(
      BATTLE_CONFIG.SEED_TOTAL_MIN,
      BATTLE_CONFIG.SEED_TOTAL_MAX
    );
    const ratio = randomFloat(
      BATTLE_CONFIG.SEED_RATIO_MIN,
      BATTLE_CONFIG.SEED_RATIO_MAX
    );
    return Math.round(totalSeed * (1 - ratio));
  });

  const [remainingSeconds, setRemainingSeconds] = useState(
    BATTLE_CONFIG.BATTLE_DURATION
  );
  const [myTeam, setMyTeam] = useState<BattleSide | null>(null);
  const [myTapCount, setMyTapCount] = useState(0);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const battleTimerRef = useRef<BattleTimer | null>(null);
  const voteSimulatorRef = useRef<VoteSimulator | null>(null);

  const isCritical = remainingSeconds <= BATTLE_CONFIG.CRITICAL_TIME_THRESHOLD;

  // Handle battle completion
  const handleTimeout = useCallback(() => {
    voteSimulatorRef.current?.stop();
    const result = resolveWinner(
      preset,
      scoreA,
      scoreB,
      myTeam,
      myTapCount
    );
    setRoundResult(result);
  }, [preset, scoreA, scoreB, myTeam, myTapCount]);

  // Start battle timers after preroll
  useEffect(() => {
    if (isPrerolling) return;

    // Start Vote Simulator
    voteSimulatorRef.current = new VoteSimulator({
      onVoteDelta: (side, delta) => {
        if (side === 'A') {
          setScoreA((prev) => prev + delta);
        } else {
          setScoreB((prev) => prev + delta);
        }
      },
    });
    voteSimulatorRef.current.start();

    // Start 20s Battle Timer
    battleTimerRef.current = new BattleTimer({
      durationSeconds: BATTLE_CONFIG.BATTLE_DURATION,
      onTick: (remaining) => {
        setRemainingSeconds(remaining);
      },
      onComplete: () => {
        handleTimeout();
      },
    });
    battleTimerRef.current.start();

    return () => {
      voteSimulatorRef.current?.stop();
      battleTimerRef.current?.stop();
    };
  }, [isPrerolling, handleTimeout]);

  // User Tap Boost
  const handleUserTap = (side: BattleSide) => {
    if (myTeam === null) {
      setMyTeam(side);
    }

    if (myTapCount < BATTLE_CONFIG.TAP_LIMIT) {
      const weight = randomInt(
        BATTLE_CONFIG.TAP_WEIGHT_MIN,
        BATTLE_CONFIG.TAP_WEIGHT_MAX
      );
      if (side === 'A') {
        setScoreA((prev) => prev + weight);
      } else {
        setScoreB((prev) => prev + weight);
      }
      setMyTapCount((prev) => prev + 1);
    }
  };

  return (
    <Screen isCritical={isCritical}>
      <CriticalTimeOverlay isVisible={isCritical} />

      {/* Preroll Modal */}
      {isPrerolling && (
        <PrerollIntro
          preset={preset}
          onComplete={() => setIsPrerolling(false)}
        />
      )}

      {/* Winner Reveal Modal */}
      {roundResult && (
        <WinnerReveal
          result={roundResult}
          onProceed={() => onBattleEnd(roundResult)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <RoundIndicator currentRound={currentRound} />
        <span className="text-xs font-semibold text-ink-dim font-kr">
          {preset.theme_tag}
        </span>
      </div>

      {/* Countdown Timer */}
      <Countdown remainingSeconds={remainingSeconds} />

      {/* Tug of War Gauge */}
      <div className="my-2">
        <TugGauge scoreA={scoreA} scoreB={scoreB} />
      </div>

      {/* Versus Cards */}
      <div className="space-y-3 my-2">
        <SplitCard
          track={preset.trackA}
          side="A"
          isSelected={myTeam === 'A'}
          isOpponentSelected={myTeam === 'B'}
          onSelect={() => handleUserTap('A')}
          disabled={myTapCount >= BATTLE_CONFIG.TAP_LIMIT}
        />

        <SplitCard
          track={preset.trackB}
          side="B"
          isSelected={myTeam === 'B'}
          isOpponentSelected={myTeam === 'A'}
          onSelect={() => handleUserTap('B')}
          disabled={myTapCount >= BATTLE_CONFIG.TAP_LIMIT}
        />
      </div>

      {/* Tap Boost Action Area */}
      <div className="mt-auto pt-2">
        <TapArea
          myTeam={myTeam}
          myTapCount={myTapCount}
          onTap={(side) => handleUserTap(side)}
        />
      </div>
    </Screen>
  );
}
