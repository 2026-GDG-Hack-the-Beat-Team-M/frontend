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

/** 진입 시 이미 쌓여 있는 시드 득표 (PRD §0.6) */
function createSeedScores(): { seedA: number; seedB: number } {
  const totalSeed = randomInt(
    BATTLE_CONFIG.SEED_TOTAL_MIN,
    BATTLE_CONFIG.SEED_TOTAL_MAX
  );
  const ratio = randomFloat(
    BATTLE_CONFIG.SEED_RATIO_MIN,
    BATTLE_CONFIG.SEED_RATIO_MAX
  );
  const seedA = Math.round(totalSeed * ratio);
  return { seedA, seedB: totalSeed - seedA };
}

export function BattleScreen({
  preset,
  currentRound,
  onBattleEnd,
}: BattleScreenProps) {
  // Preroll for rounds > 1
  const [isPrerolling, setIsPrerolling] = useState(currentRound > 1);

  const [seed] = useState(createSeedScores);
  // 배틀마다 군중이 미는 곡이 랜덤으로 정해진다. 사용자가 진영을 고르기 전에 결정되므로
  // 내 선택과 무관하며, 이 쏠림을 뒤집는 것이 연타의 목적이 된다.
  const [crowdFavorsA] = useState(() => Math.random() < 0.5);
  const [scoreA, setScoreA] = useState(seed.seedA);
  const [scoreB, setScoreB] = useState(seed.seedB);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    BATTLE_CONFIG.BATTLE_DURATION
  );
  const [myTeam, setMyTeam] = useState<BattleSide | null>(null);
  const [myTapCount, setMyTapCount] = useState(0);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const battleTimerRef = useRef<BattleTimer | null>(null);
  const voteSimulatorRef = useRef<VoteSimulator | null>(null);

  // 타이머 콜백이 매 렌더마다 새 값을 읽되, 타이머 자체는 재시작되지 않도록 ref에 보관한다.
  const liveStateRef = useRef({ scoreA, scoreB, myTeam, myTapCount, preset });
  liveStateRef.current = { scoreA, scoreB, myTeam, myTapCount, preset };

  const isCritical = remainingSeconds <= BATTLE_CONFIG.CRITICAL_TIME_THRESHOLD;

  const handleTimeout = useCallback(() => {
    voteSimulatorRef.current?.stop();
    const live = liveStateRef.current;
    setRoundResult(
      resolveWinner(
        live.preset,
        live.scoreA,
        live.scoreB,
        live.myTeam,
        live.myTapCount
      )
    );
  }, []);

  // 프리롤이 끝나면 20초 배틀 1회만 구동한다. (점수 변화로 재시작되면 안 된다)
  useEffect(() => {
    if (isPrerolling) return;

    voteSimulatorRef.current = new VoteSimulator({
      sideAProbability: crowdFavorsA
        ? 0.5 + BATTLE_CONFIG.CROWD_BIAS
        : 0.5 - BATTLE_CONFIG.CROWD_BIAS,
      onVoteDelta: (side, delta) => {
        if (side === 'A') {
          setScoreA((prev) => prev + delta);
        } else {
          setScoreB((prev) => prev + delta);
        }
      },
    });
    voteSimulatorRef.current.start();

    battleTimerRef.current = new BattleTimer({
      durationSeconds: BATTLE_CONFIG.BATTLE_DURATION,
      onTick: setRemainingSeconds,
      onComplete: handleTimeout,
    });
    battleTimerRef.current.start();

    return () => {
      voteSimulatorRef.current?.stop();
      battleTimerRef.current?.stop();
    };
  }, [isPrerolling, handleTimeout, crowdFavorsA]);

  // User Tap Boost
  const handleUserTap = (side: BattleSide) => {
    if (roundResult) return;

    // 첫 탭으로 진영이 확정되며, 이후 변경할 수 없다 (PRD §0.6)
    const targetSide = myTeam ?? side;
    if (myTeam === null) {
      setMyTeam(side);
    } else if (side !== myTeam) {
      return;
    }

    if (myTapCount >= BATTLE_CONFIG.TAP_LIMIT) return;

    const weight = randomInt(
      BATTLE_CONFIG.TAP_WEIGHT_MIN,
      BATTLE_CONFIG.TAP_WEIGHT_MAX
    );
    if (targetSide === 'A') {
      setScoreA((prev) => prev + weight);
    } else {
      setScoreB((prev) => prev + weight);
    }
    setMyTapCount((prev) => prev + 1);
  };

  return (
    <Screen isCritical={isCritical}>
      <CriticalTimeOverlay isVisible={isCritical} />

      {isPrerolling && (
        <PrerollIntro preset={preset} onComplete={() => setIsPrerolling(false)} />
      )}

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

      <Countdown remainingSeconds={remainingSeconds} />

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
          disabled={myTeam === 'B'}
        />

        <SplitCard
          track={preset.trackB}
          side="B"
          isSelected={myTeam === 'B'}
          isOpponentSelected={myTeam === 'A'}
          onSelect={() => handleUserTap('B')}
          disabled={myTeam === 'A'}
        />
      </div>

      {/* Tap Boost Action Area */}
      <div className="mt-auto pt-2">
        <TapArea
          myTeam={myTeam}
          myTapCount={myTapCount}
          onTap={handleUserTap}
        />
      </div>
    </Screen>
  );
}
