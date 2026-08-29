import React, { useMemo } from 'react';
import { RoundResult, RoundReaction } from '@/types';
import { evaluateTasteBadges } from '@/lib/result/badgeEngine';
import { Screen } from '@/components/ui/Screen';
import { BadgeStack } from './BadgeStack';
import { GenreDonut } from './GenreDonut';
import { RoundStrip } from './RoundStrip';
import { StatsList } from './StatsList';
import { ShareCard } from './ShareCard';
import { FeedbackForm } from './FeedbackForm';

interface TasteResultScreenProps {
  nickname: string;
  battleLogs: RoundResult[];
  reactionLogs: RoundReaction[];
  onSubmitFeedback: (rating: number, comment: string) => void;
}

export function TasteResultScreen({
  nickname,
  battleLogs,
  reactionLogs,
  onSubmitFeedback,
}: TasteResultScreenProps) {
  const summary = useMemo(() => {
    return evaluateTasteBadges(nickname, battleLogs, reactionLogs);
  }, [nickname, battleLogs, reactionLogs]);

  return (
    <Screen className="gap-4 pb-12 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-bold font-en tracking-widest text-accent uppercase">
          PARTY RECAP // RESULT
        </span>
        <h1 className="text-2xl font-black text-ink font-kr mt-1">
          {summary.nickname} 님의 취향 카드
        </h1>
      </div>

      {/* Main Badges */}
      <BadgeStack
        primaryBadge={summary.primaryBadge}
        secondaryBadges={summary.secondaryBadges}
      />

      {/* 3-Round Battle Strip */}
      <RoundStrip roundHistory={summary.roundHistory} />

      {/* Genre Donut Chart */}
      <GenreDonut distribution={summary.genreDistribution} />

      {/* Stats Summary */}
      <StatsList summary={summary} />

      {/* 9:16 Share / Save Card */}
      <ShareCard summary={summary} />

      {/* Feedback Form */}
      <FeedbackForm onSubmit={onSubmitFeedback} />
    </Screen>
  );
}
