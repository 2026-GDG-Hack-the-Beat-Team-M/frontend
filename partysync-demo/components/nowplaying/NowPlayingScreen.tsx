import React, { useEffect, useState, useRef } from 'react';
import { RoundResult, ReactionType } from '@/types';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { BubbleEngine, BubbleItem } from '@/lib/nowplaying/bubbleEngine';
import { ReactionSimulator } from '@/lib/nowplaying/reactionSimulator';
import { Screen } from '@/components/ui/Screen';
import { RoundIndicator } from '@/components/shell/RoundIndicator';
import { AlbumArt } from './AlbumArt';
import { FakeProgressBar } from './FakeProgressBar';
import { Visualizer } from './Visualizer';
import { VoteResultSummary } from './VoteResultSummary';
import { ReactionButtons } from './ReactionButtons';
import { TagPicker } from './TagPicker';
import { ReactionRateBar } from './ReactionRateBar';
import { BubbleLayer } from './BubbleLayer';
import { NicknameToast } from './NicknameToast';
import { TagTicker } from './TagTicker';
import { NextRoundCta } from './NextRoundCta';

interface NowPlayingScreenProps {
  currentRound: number;
  lastRoundResult: RoundResult;
  onSaveReaction: (reaction: ReactionType, tags: string[], isLiked: boolean) => void;
  onNextRound: () => void;
}

export function NowPlayingScreen({
  currentRound,
  lastRoundResult,
  onSaveReaction,
  onNextRound,
}: NowPlayingScreenProps) {
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [toast, setToast] = useState<{ nickname: string; emoji: string } | null>(null);
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  // Reaction tallies starting with seed
  const [goodCount, setGoodCount] = useState(72);
  const [sosoCount, setSosoCount] = useState(18);
  const [badCount, setBadCount] = useState(6);

  const bubbleEngineRef = useRef<BubbleEngine | null>(null);
  const reactionSimulatorRef = useRef<ReactionSimulator | null>(null);

  useEffect(() => {
    // 1. Initialize Bubble Engine
    bubbleEngineRef.current = new BubbleEngine((updatedBubbles) => {
      setBubbles(updatedBubbles);
    });

    // 2. Initialize and start Reaction Simulator
    reactionSimulatorRef.current = new ReactionSimulator(
      {
        onReaction: (rx, emoji) => {
          if (rx === 'good') setGoodCount((c) => c + 1);
          if (rx === 'soso') setSosoCount((c) => c + 1);
          if (rx === 'bad') setBadCount((c) => c + 1);

          bubbleEngineRef.current?.spawn(emoji, false);
        },
        onToast: (nickname, emoji) => {
          setToast({ nickname, emoji });
          setTimeout(() => setToast(null), 2500);
        },
      },
      lastRoundResult.winner.basePositivity || 0.70
    );
    reactionSimulatorRef.current.start();

    return () => {
      reactionSimulatorRef.current?.stop();
    };
  }, [lastRoundResult]);

  // Handle User Reaction Click
  const handleSelectReaction = (rx: ReactionType) => {
    setSelectedReaction(rx);
    if (rx === 'good') setGoodCount((c) => c + 1);
    if (rx === 'soso') setSosoCount((c) => c + 1);
    if (rx === 'bad') setBadCount((c) => c + 1);

    const emoji = rx === 'good' ? '🔥' : rx === 'soso' ? '😐' : '🥱';
    bubbleEngineRef.current?.spawn(emoji, true);
    onSaveReaction(rx, selectedTags, isLiked);
  };

  // Handle Tag Toggle (max 3 tags)
  const handleToggleTag = (tag: string) => {
    let updated: string[];
    if (selectedTags.includes(tag)) {
      updated = selectedTags.filter((t) => t !== tag);
    } else {
      if (selectedTags.length >= 3) {
        updated = [...selectedTags.slice(1), tag];
      } else {
        updated = [...selectedTags, tag];
      }
    }
    setSelectedTags(updated);
    if (selectedReaction) {
      onSaveReaction(selectedReaction, updated, isLiked);
    }
  };

  // Handle Like Toggle
  const handleToggleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    if (selectedReaction) {
      onSaveReaction(selectedReaction, selectedTags, nextLiked);
    }
  };

  const isLastRound = currentRound >= BATTLE_CONFIG.ROUND_TOTAL;

  return (
    <Screen>
      {/* Floating Bubbles Layer */}
      <BubbleLayer bubbles={bubbles} />

      {/* Nickname Toast Notification */}
      <NicknameToast toast={toast} />

      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <RoundIndicator currentRound={currentRound} />
        <div className="flex items-center gap-1.5 text-xs text-accent font-bold font-en">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          NOW PLAYING
        </div>
      </div>

      {/* Main Artwork */}
      <AlbumArt track={lastRoundResult.winner} />

      {/* Track Title & Artist & Like Button */}
      <div className="flex items-center justify-between px-1 py-1">
        <div className="min-w-0 flex-1 pr-2">
          <h2 className="text-lg font-black text-ink truncate font-kr">
            {lastRoundResult.winner.title}
          </h2>
          <p className="text-xs text-ink-dim truncate font-kr">
            {lastRoundResult.winner.artist}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleLike}
          className="p-2.5 rounded-full bg-surface-1 border border-white/10 text-lg hover:scale-110 active:scale-95 transition-all text-accent"
          title="곡 좋아요"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Fake Progress Bar & Visualizer */}
      <FakeProgressBar />
      <Visualizer />

      {/* Battle Victory Stat */}
      <VoteResultSummary result={lastRoundResult} />

      {/* Live Reactions Section */}
      <div className="space-y-2 py-1">
        <ReactionButtons
          selectedReaction={selectedReaction}
          onSelectReaction={handleSelectReaction}
        />
        <TagPicker
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
        <ReactionRateBar
          goodCount={goodCount}
          sosoCount={sosoCount}
          badCount={badCount}
        />
      </div>

      {/* Flowing Tag Ticker */}
      <TagTicker />

      {/* Sticky Bottom CTA */}
      <NextRoundCta isLastRound={isLastRound} onNext={onNextRound} />
    </Screen>
  );
}
