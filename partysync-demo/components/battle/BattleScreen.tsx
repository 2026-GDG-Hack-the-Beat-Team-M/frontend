import React, { useCallback, useEffect, useRef, useState } from 'react';
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

export function BattleScreen({ preset, currentRound, onBattleEnd }: BattleScreenProps) {
  const [isPrerolling, setIsPrerolling] = useState(currentRound > 1);
  const [seed] = useState(createSeedScores);
  const [scoreA, setScoreA] = useState(seed.seedA);
  const [scoreB, setScoreB] = useState(seed.seedB);
  // 배틀마다 군중이 미는 곡이 랜덤으로 정해진다. 사용자가 진영을 고르기 전에
  // 결정되므로 내 선택과 무관하며, 이 쏠림을 뒤집는 것이 연타의 목적이 된다.
  const [crowdFavorsA] = useState(() => Math.random() < 0.5);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(BATTLE_CONFIG.BATTLE_DURATION);
  const [myTeam, setMyTeam] = useState<BattleSide | null>(null);
  const [myTapCount, setMyTapCount] = useState(0);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const stateRef = useRef({ scoreA, scoreB, myTeam, myTapCount });
  const battleTimerRef = useRef<BattleTimer | null>(null);
  const voteSimulatorRef = useRef<VoteSimulator | null>(null);
  const isCritical = remainingSeconds <= BATTLE_CONFIG.CRITICAL_TIME_THRESHOLD;

  useEffect(() => {
    stateRef.current = { scoreA, scoreB, myTeam, myTapCount };
  }, [scoreA, scoreB, myTeam, myTapCount]);

  const handleTimeout = useCallback(() => {
    voteSimulatorRef.current?.stop();
    const state = stateRef.current;
    setRoundResult(resolveWinner(preset, state.scoreA, state.scoreB, state.myTeam, state.myTapCount));
  }, [preset]);

  useEffect(() => {
    if (isPrerolling) return;
    voteSimulatorRef.current = new VoteSimulator({
      sideAProbability: crowdFavorsA
        ? 0.5 + BATTLE_CONFIG.CROWD_BIAS
        : 0.5 - BATTLE_CONFIG.CROWD_BIAS,
      onVoteDelta: (side, delta) => side === 'A' ? setScoreA((value) => value + delta) : setScoreB((value) => value + delta),
    });
    voteSimulatorRef.current.start();
    battleTimerRef.current = new BattleTimer({ durationSeconds: BATTLE_CONFIG.BATTLE_DURATION, onTick: setRemainingSeconds, onComplete: handleTimeout });
    battleTimerRef.current.start();
    return () => {
      voteSimulatorRef.current?.stop();
      battleTimerRef.current?.stop();
    };
  }, [isPrerolling, handleTimeout, crowdFavorsA]);

  const handleUserTap = (side: BattleSide) => {
    if (roundResult) return;
    if (myTeam !== null && myTeam !== side) return;
    if (myTeam === null) setMyTeam(side);
    if (myTapCount >= BATTLE_CONFIG.TAP_LIMIT) return;
    const weight = randomInt(BATTLE_CONFIG.TAP_WEIGHT_MIN, BATTLE_CONFIG.TAP_WEIGHT_MAX);
    if (side === 'A') setScoreA((value) => value + weight);
    else setScoreB((value) => value + weight);
    setMyTapCount((value) => value + 1);
  };

  return (
    <Screen isCritical={isCritical} className="px-5 pb-5 pt-5">
      <CriticalTimeOverlay isVisible={isCritical} />
      {isPrerolling && <PrerollIntro preset={preset} onComplete={() => setIsPrerolling(false)} />}
      {roundResult && <WinnerReveal result={roundResult} onProceed={() => onBattleEnd(roundResult)} />}

      <header className="flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-glow-accent" />
            <span className="font-en text-[10px] font-black tracking-[0.22em] text-accent">LIVE MUSIC BATTLE</span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">다음 곡을 선택하세요</h1>
        </div>
        <RoundIndicator currentRound={currentRound} />
      </header>

      <div className="mt-4"><Countdown remainingSeconds={remainingSeconds} /></div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-1 shadow-lift-1 backdrop-blur-sm"><TugGauge scoreA={scoreA} scoreB={scoreB} /></div>

      <div className="relative my-4 flex flex-1 flex-col justify-center gap-3">
        <SplitCard track={preset.trackA} side="A" isSelected={myTeam === 'A'} isOpponentSelected={myTeam === 'B'} onSelect={() => handleUserTap('A')} disabled={myTeam === 'B' || myTapCount >= BATTLE_CONFIG.TAP_LIMIT} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#100d16] font-en text-xs font-black italic text-white shadow-xl">VS</div>
        <SplitCard track={preset.trackB} side="B" isSelected={myTeam === 'B'} isOpponentSelected={myTeam === 'A'} onSelect={() => handleUserTap('B')} disabled={myTeam === 'A' || myTapCount >= BATTLE_CONFIG.TAP_LIMIT} />
      </div>

      <TapArea myTeam={myTeam} myTapCount={myTapCount} onTap={handleUserTap} />
    </Screen>
  );
}
