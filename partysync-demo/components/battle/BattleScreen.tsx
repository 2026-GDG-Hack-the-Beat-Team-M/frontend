import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BattleSide, BattlePreset, RoundResult, Track } from '@/types';
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

const TRACK_POOL: Track[] = [
  { id: 'olivia-dean-man-i-need', title: 'Man I Need', artist: 'Olivia Dean', artwork_url: '/artwork/r1a.svg', genre_tags: ['POP', 'SOUL'], basePositivity: 0.82 },
  { id: 'ed-sheeran-photograph', title: 'Photograph', artist: 'Ed Sheeran', artwork_url: '/artwork/r1b.svg', genre_tags: ['POP', 'BALLAD'], basePositivity: 0.79 },
  { id: 'rescene-love-attack', title: 'Love Attack', artist: '리센느', artwork_url: '/artwork/r2a.svg', genre_tags: ['K-POP', 'DANCE'], basePositivity: 0.78 },
  { id: 'young-k-shut-the-door', title: 'Shut The Door', artist: 'YOUNG K', artwork_url: '/artwork/r2b.svg', genre_tags: ['K-ROCK', 'POP'], basePositivity: 0.76 },
  { id: 'dj-khaled-all-i-do-is-win', title: 'All I Do Is Win', artist: 'DJ Khaled', artwork_url: '/artwork/r3a.svg', genre_tags: ['HIP-HOP', 'PARTY'], basePositivity: 0.86 },
  { id: 'ariana-grande-break-free', title: 'Break Free', artist: 'Ariana Grande', artwork_url: '/artwork/r3b.svg', genre_tags: ['POP', 'EDM'], basePositivity: 0.84 },
  { id: 'newjeans-how-sweet', title: 'How Sweet', artist: 'NewJeans', artwork_url: '/artwork/r1a.svg', genre_tags: ['K-POP', 'DANCE'], basePositivity: 0.83 },
  { id: 'urban-zakapa-thursday-night', title: '목요일 밤', artist: '어반자카파, 빈지노', artwork_url: '/artwork/r1b.svg', genre_tags: ['R&B', 'HIP-HOP'], basePositivity: 0.8 },
  { id: 'jazzyfact-waste-of-time', title: '아까워', artist: '재지팩트', artwork_url: '/artwork/r2a.svg', genre_tags: ['HIP-HOP', 'R&B'], basePositivity: 0.77 },
  { id: 'epik-high-umbrella', title: '우산', artist: '에픽하이', artwork_url: '/artwork/r2b.svg', genre_tags: ['HIP-HOP', 'BALLAD'], basePositivity: 0.81 },
];

function createRandomPreset(round: number): BattlePreset {
  const firstIndex = randomInt(0, TRACK_POOL.length - 1);
  let secondIndex = randomInt(0, TRACK_POOL.length - 1);
  while (secondIndex === firstIndex) secondIndex = randomInt(0, TRACK_POOL.length - 1);
  return { round, theme_tag: 'RANDOM MATCH', theme_title: '오늘의 랜덤 매치', trackA: TRACK_POOL[firstIndex], trackB: TRACK_POOL[secondIndex] };
}

export function BattleScreen(props: BattleScreenProps) {
  const [randomPreset, setRandomPreset] = useState<BattlePreset | null>(null);

  useEffect(() => {
    setRandomPreset(createRandomPreset(props.currentRound));
  }, [props.currentRound]);

  if (!randomPreset) {
    return (
      <Screen className="items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
          <p className="text-sm font-bold text-ink">상대 곡을 찾고 있어요</p>
          <p className="text-xs text-ink-dim">10개의 플레이리스트를 섞는 중...</p>
        </div>
      </Screen>
    );
  }
  return <BattleRound {...props} preset={randomPreset} />;
}

function BattleRound({ preset, currentRound, onBattleEnd }: BattleScreenProps) {
  const [isPrerolling, setIsPrerolling] = useState(currentRound > 1);
  const [scoreA, setScoreA] = useState(() => {
    const total = randomInt(BATTLE_CONFIG.SEED_TOTAL_MIN, BATTLE_CONFIG.SEED_TOTAL_MAX);
    return Math.round(total * randomFloat(BATTLE_CONFIG.SEED_RATIO_MIN, BATTLE_CONFIG.SEED_RATIO_MAX));
  });
  const [scoreB, setScoreB] = useState(() => {
    const total = randomInt(BATTLE_CONFIG.SEED_TOTAL_MIN, BATTLE_CONFIG.SEED_TOTAL_MAX);
    return Math.round(total * (1 - randomFloat(BATTLE_CONFIG.SEED_RATIO_MIN, BATTLE_CONFIG.SEED_RATIO_MAX)));
  });
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
      onVoteDelta: (side, delta) => side === 'A' ? setScoreA((value) => value + delta) : setScoreB((value) => value + delta),
    });
    voteSimulatorRef.current.start();
    battleTimerRef.current = new BattleTimer({ durationSeconds: BATTLE_CONFIG.BATTLE_DURATION, onTick: setRemainingSeconds, onComplete: handleTimeout });
    battleTimerRef.current.start();
    return () => {
      voteSimulatorRef.current?.stop();
      battleTimerRef.current?.stop();
    };
  }, [isPrerolling, handleTimeout]);

  const handleUserTap = (side: BattleSide) => {
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
        <SplitCard track={preset.trackA} side="A" isSelected={myTeam === 'A'} isOpponentSelected={myTeam === 'B'} onSelect={() => handleUserTap('A')} disabled={myTapCount >= BATTLE_CONFIG.TAP_LIMIT} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#100d16] font-en text-xs font-black italic text-white shadow-xl">VS</div>
        <SplitCard track={preset.trackB} side="B" isSelected={myTeam === 'B'} isOpponentSelected={myTeam === 'A'} onSelect={() => handleUserTap('B')} disabled={myTapCount >= BATTLE_CONFIG.TAP_LIMIT} />
      </div>

      <TapArea myTeam={myTeam} myTapCount={myTapCount} onTap={handleUserTap} />
    </Screen>
  );
}
