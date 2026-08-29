import React, { useMemo } from 'react';
import { RoundResult, RoundReaction } from '@/types';
import { evaluateTasteBadges } from '@/lib/result/badgeEngine';
import { Screen } from '@/components/ui/Screen';
import { BadgeStack } from './BadgeStack';
import { SelectedTracksSummary } from './SelectedTracksSummary';
import { TasteProfileCard } from './TasteProfileCard';
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
  const summary = useMemo(
    () => evaluateTasteBadges(nickname, battleLogs, reactionLogs),
    [nickname, battleLogs, reactionLogs]
  );

  const pickedCount = summary.profile.analyzedTracks.length;

  return (
    <Screen className="gap-4 pb-12 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-en font-bold text-[10px] tracking-widest uppercase mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          YOUR MUSIC TASTE RESULT
        </div>
        <h1 className="text-2xl font-black text-ink font-kr mt-1">
          {summary.nickname} 님의 취향 카드
        </h1>
        <p className="text-xs text-ink-dim font-kr mt-0.5">
          {pickedCount > 0
            ? `배틀에서 직접 고른 ${pickedCount}곡만으로 분석했어요`
            : '이번 세션에서는 고른 곡이 없어요'}
        </p>
      </div>

      {/* 분석의 근거가 되는 내 선택 3곡 — 가장 먼저 보여준다 */}
      <SelectedTracksSummary selectedTracks={summary.selectedTracks} />

      {/* 3곡을 조합한 취향 프로필 */}
      <TasteProfileCard profile={summary.profile} />

      {/* 페르소나 뱃지 (대표 1 + 보조 최대 2) */}
      <BadgeStack
        primaryBadge={summary.primaryBadge}
        secondaryBadges={summary.secondaryBadges}
      />

      {/* 장르 분포 도넛 */}
      <GenreDonut distribution={summary.genreDistribution} />

      {/* 라운드별 승패 스트립 */}
      <RoundStrip roundHistory={summary.roundHistory} />

      {/* 총 탭 수 / 반응 수 / 최애 드랍 */}
      <StatsList summary={summary} />

      {/* 9:16 공유 카드 */}
      <ShareCard summary={summary} />

      <FeedbackForm onSubmit={onSubmitFeedback} />
    </Screen>
  );
}
