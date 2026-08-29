'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlbumArt } from './AlbumArt';
import { BubbleLayer, type BubbleItem } from './BubbleLayer';
import { FakeProgressBar } from './FakeProgressBar';
import { NextRoundCta } from './NextRoundCta';
import { NicknameToast, type ReactionToast } from './NicknameToast';
import { ReactionButtons } from './ReactionButtons';
import { ReactionRateBar } from './ReactionRateBar';
import { TagPicker } from './TagPicker';
import { TagTicker } from './TagTicker';
import { Visualizer } from './Visualizer';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { VoteResultSummary } from './VoteResultSummary';

export type Sentiment = 'good' | 'so_so' | 'bad';

export interface NowPlayingTrack {
  id: string;
  title: string;
  artist: string;
  artworkUrl?: string;
  genreTags: string[];
  durationSec?: number;
}

export interface ReactionCounts {
  good: number;
  soSo: number;
  bad: number;
}

export interface NowPlayingScreenProps {
  round: number;
  totalRounds: number;
  winnerTrack: NowPlayingTrack;
  scoreA: number;
  scoreB: number;
  winnerScore?: number;
  userPickedWinner: boolean;
  /** 사용자가 이 라운드에서 고른 곡 제목 (기권 시 null) */
  myPickTitle?: string | null;
  initialReactionCounts?: ReactionCounts;
  myReaction?: Sentiment | null;
  myTags?: string[];
  onReactionChange?: (reaction: Sentiment) => void;
  onTagsChange?: (tags: string[]) => void;
  onNext?: () => void | Promise<void>;
}

type LegacyReaction = 'good' | 'soso' | 'bad';
interface LegacyTrack {
  id: string; title: string; artist: string; artwork_url: string;
  genre_tags: string[]; basePositivity?: number;
}
interface LegacyResult {
  winner: LegacyTrack; winnerSide: 'A' | 'B'; didIWin: boolean;
  scoreA: number; scoreB: number;
  /** 사용자가 이 라운드에서 실제로 고른 곡 (기권 시 null) */
  myTrack?: LegacyTrack | null;
}
interface LegacyNowPlayingScreenProps {
  currentRound: number;
  lastRoundResult: LegacyResult;
  onSaveReaction: (reaction: LegacyReaction, tags: string[], isLiked: boolean) => void;
  onNextRound: () => void;
}

type CompatibleNowPlayingProps = NowPlayingScreenProps | LegacyNowPlayingScreenProps;

interface NormalizedProps {
  round: number;
  totalRounds: number;
  track: NowPlayingTrack;
  scoreA: number;
  scoreB: number;
  winnerScore?: number;
  userPickedWinner: boolean;
  myPickTitle: string | null;
  initialCounts?: ReactionCounts;
  initialReaction: Sentiment | null;
  initialTags: string[];
  onReaction?: (reaction: Sentiment) => void;
  onTags?: (tags: string[]) => void;
  onNext?: () => void | Promise<void>;
  legacySave?: (reaction: LegacyReaction, tags: string[], isLiked: boolean) => void;
}

const DEFAULT_TAGS = ['#드랍이미쳤다', '#떼창각', '#베이스터짐', '#비트가좋아요', '#감성미쳤다', '#조금루즈함'];
const EMPTY_TAGS: string[] = [];
const NICKNAMES = [
  'Yuna_92', 'minji.zip', 'clubkid17', 'noah.wav', 'seoulafterdark', 'NeonFox',
  'BassHunter_KR', 'Sora_Vibe', 'MidnightGroove', 'TechnoCat', 'HypeBoy_01', 'Rave_Princess',
  'DropMaster', 'VinylJunkie', 'SynthWave_99', 'PartyGoer_Kai', 'Flora_Beats', 'VibeCheck_Jin',
  'BPM_Chaser', 'Echo_Seeker', 'Luna_House', 'RetroKing', 'Floor_Ripper', 'Dopamine_Addict',
  'Subwoofer_Love', 'Singalong_Dan', 'ClubKID', 'SoundWave_Leo', 'PartyMonster', 'GrooveLover_Min',
  'DropSurvivor', 'Cyber_Dancer',
];
const EMOJI: Record<Sentiment, string> = { good: '🔥', so_so: '😐', bad: '🥱' };

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const toLegacyReaction = (reaction: Sentiment): LegacyReaction => reaction === 'so_so' ? 'soso' : reaction;

function normalizeProps(props: CompatibleNowPlayingProps): NormalizedProps {
  if ('winnerTrack' in props) {
    return {
      round: props.round,
      totalRounds: props.totalRounds,
      track: props.winnerTrack,
      scoreA: props.scoreA,
      scoreB: props.scoreB,
      winnerScore: props.winnerScore,
      userPickedWinner: props.userPickedWinner,
      myPickTitle: props.myPickTitle ?? null,
      initialCounts: props.initialReactionCounts,
      initialReaction: props.myReaction ?? null,
      initialTags: props.myTags ?? EMPTY_TAGS,
      onReaction: props.onReactionChange,
      onTags: props.onTagsChange,
      onNext: props.onNext,
      legacySave: undefined,
    };
  }

  const { lastRoundResult: result } = props;
  return {
    round: props.currentRound,
    totalRounds: BATTLE_CONFIG.ROUND_TOTAL,
    track: {
      id: result.winner.id,
      title: result.winner.title,
      artist: result.winner.artist,
      artworkUrl: result.winner.artwork_url,
      genreTags: result.winner.genre_tags,
    } satisfies NowPlayingTrack,
    scoreA: result.scoreA,
    scoreB: result.scoreB,
    winnerScore: result.winnerSide === 'A' ? result.scoreA : result.scoreB,
    userPickedWinner: result.didIWin,
    myPickTitle: result.myTrack?.title ?? null,
    initialCounts: undefined,
    initialReaction: null,
    initialTags: EMPTY_TAGS,
    onReaction: undefined,
    onTags: undefined,
    onNext: props.onNextRound,
    legacySave: props.onSaveReaction,
  };
}

export function NowPlayingScreen(props: CompatibleNowPlayingProps) {
  const model = normalizeProps(props);
  return <NowPlayingContent key={model.track.id} model={model} />;
}

function NowPlayingContent({ model }: { model: NormalizedProps }) {
  const {
    round, totalRounds, track, scoreA, scoreB, winnerScore, userPickedWinner, myPickTitle,
    initialCounts, initialReaction, initialTags, onReaction, onTags, onNext, legacySave,
  } = model;
  const tags = track.genreTags.length > 0 ? track.genreTags : DEFAULT_TAGS;

  const [counts, setCounts] = useState<ReactionCounts>(initialCounts ?? { good: 88, soSo: 20, bad: 7 });
  const [selectedReaction, setSelectedReaction] = useState<Sentiment | null>(initialReaction);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags.slice(0, 3));
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [toast, setToast] = useState<ReactionToast | null>(null);

  const nextBubbleId = useRef(0);
  const bubbleTimers = useRef(new Set<number>());

  const spawnBubble = useCallback((reaction: Sentiment, isUser = false) => {
    const durationMs = isUser ? 2200 : randomInt(2400, 3400);
    const id = ++nextBubbleId.current;
    const bubble: BubbleItem = {
      id,
      emoji: EMOJI[reaction],
      leftPercent: isUser ? randomInt(42, 58) : randomInt(8, 88),
      sizePx: isUser ? randomInt(42, 52) : randomInt(24, 40),
      durationMs,
      driftPx: randomInt(-52, 52),
      isUser,
    };
    setBubbles((current) => [...current.slice(-19), bubble]);
    const timer = window.setTimeout(() => {
      setBubbles((current) => current.filter((item) => item.id !== id));
      bubbleTimers.current.delete(timer);
    }, durationMs + 100);
    bubbleTimers.current.add(timer);
  }, []);

  useEffect(() => {
    if (initialCounts) return;
    const timer = window.setTimeout(() => {
      setCounts({ good: randomInt(60, 120), soSo: randomInt(10, 30), bad: randomInt(2, 12) });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialCounts]);

  useEffect(() => {
    let active = true;
    let reactionTimer: number | null = null;
    let toastTimer: number | null = null;
    let toastHideTimer: number | null = null;
    const startedAt = Date.now();
    const activeBubbleTimers = bubbleTimers.current;

    const scheduleReaction = () => {
      const elapsed = Date.now() - startedAt;
      if (!active || elapsed >= 60000) return;
      const slowdown = elapsed <= 15000 ? 1 : Math.min(4, 1 + (elapsed - 15000) / 15000);
      reactionTimer = window.setTimeout(() => {
        if (!active) return;
        const roll = Math.random();
        const reaction: Sentiment = roll < .7 ? 'good' : roll < .92 ? 'so_so' : 'bad';
        setCounts((current) => ({
          ...current,
          good: current.good + (reaction === 'good' ? 1 : 0),
          soSo: current.soSo + (reaction === 'so_so' ? 1 : 0),
          bad: current.bad + (reaction === 'bad' ? 1 : 0),
        }));
        spawnBubble(reaction);
        scheduleReaction();
      }, randomInt(Math.round(300 * slowdown), Math.round(900 * slowdown)));
    };

    const scheduleToast = () => {
      if (!active || Date.now() - startedAt >= 60000) return;
      toastTimer = window.setTimeout(() => {
        if (!active) return;
        const roll = Math.random();
        const reaction: Sentiment = roll < .7 ? 'good' : roll < .92 ? 'so_so' : 'bad';
        setToast({ id: Date.now(), nickname: NICKNAMES[randomInt(0, NICKNAMES.length - 1)], emoji: EMOJI[reaction] });
        if (toastHideTimer !== null) window.clearTimeout(toastHideTimer);
        toastHideTimer = window.setTimeout(() => { if (active) setToast(null); }, 2200);
        scheduleToast();
      }, randomInt(2000, 4000));
    };

    scheduleReaction();
    scheduleToast();
    return () => {
      active = false;
      if (reactionTimer !== null) window.clearTimeout(reactionTimer);
      if (toastTimer !== null) window.clearTimeout(toastTimer);
      if (toastHideTimer !== null) window.clearTimeout(toastHideTimer);
      activeBubbleTimers.forEach((timer) => window.clearTimeout(timer));
      activeBubbleTimers.clear();
    };
  }, [spawnBubble]);

  const handleReaction = (reaction: Sentiment) => {
    if (reaction === selectedReaction) return;
    setCounts((current) => {
      const next = { ...current };
      if (selectedReaction === 'good') next.good = Math.max(0, next.good - 1);
      if (selectedReaction === 'so_so') next.soSo = Math.max(0, next.soSo - 1);
      if (selectedReaction === 'bad') next.bad = Math.max(0, next.bad - 1);
      if (reaction === 'good') next.good += 1;
      if (reaction === 'so_so') next.soSo += 1;
      if (reaction === 'bad') next.bad += 1;
      return next;
    });
    setSelectedReaction(reaction);
    spawnBubble(reaction, true);
    onReaction?.(reaction);
    legacySave?.(toLegacyReaction(reaction), selectedTags, false);
  };

  const handleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((selected) => selected !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updated);
    onTags?.(updated);
    if (selectedReaction) legacySave?.(toLegacyReaction(selectedReaction), updated, false);
  };

  return (
    <main className="relative mx-auto min-h-svh w-full max-w-md overflow-x-hidden bg-bg px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))] font-kr text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-[340px] w-[420px] -translate-x-1/2 rounded-full bg-accent/30 opacity-40 blur-[90px]" />
      <BubbleLayer bubbles={bubbles} />
      <NicknameToast toast={toast} />

      <div className="relative z-10">
        <header className="flex items-center justify-between gap-3">
          <p className="font-en text-xs font-black tracking-[.18em] text-ink-dim">ROUND {round} / {totalRounds}</p>
          <p className="flex items-center gap-1.5 text-xs font-black tracking-wider text-accent-light"><span aria-hidden="true">●</span> NOW PLAYING</p>
        </header>

        <div className="mt-3 text-center">
          <p className="text-sm font-black tracking-[.16em] text-neon-yellow">🏆 WINNER</p>
        </div>

        <AlbumArt title={track.title} artist={track.artist} artworkUrl={track.artworkUrl} />

        <section className="mb-3 text-center">
          <h1 className="truncate text-xl font-black tracking-tight text-ink">{track.title}</h1>
          <p className="mt-0.5 truncate text-sm text-ink-dim">{track.artist}</p>
        </section>

        <div className="space-y-2 px-1"><Visualizer /><FakeProgressBar key={`${track.id}-${track.durationSec ?? 228}`} durationSec={track.durationSec} /></div>
        <VoteResultSummary scoreA={scoreA} scoreB={scoreB} winnerScore={winnerScore} userPickedWinner={userPickedWinner} myPickTitle={myPickTitle} />

        <section className="space-y-4 rounded-3xl border border-white/10 bg-surface-2/55 p-3 backdrop-blur-sm">
          <ReactionButtons selectedReaction={selectedReaction} onSelectReaction={handleReaction} />
          <TagPicker tags={tags} selectedTags={selectedTags} onToggleTag={handleTag} />
          <ReactionRateBar goodCount={counts.good} soSoCount={counts.soSo} badCount={counts.bad} />
        </section>

        <div className="mt-4"><TagTicker tags={tags} /></div>
        <NextRoundCta isLastRound={round >= totalRounds} onNext={onNext} />
      </div>
    </main>
  );
}
