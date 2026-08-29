import React from 'react';
import { RoundResult } from '@/types';

interface VoteResultSummaryProps {
  result: RoundResult;
}

export function VoteResultSummary({ result }: VoteResultSummaryProps) {
  const winPercent = Math.round(
    (result.winnerSide === 'A' ? result.ratioA : result.ratioB) * 100
  );

  return (
    <div className="w-full rounded-2xl bg-surface-1 border border-white/10 p-3 text-center space-y-1 my-2">
      <div className="text-xs font-en font-bold text-ink-dim">
        📊 {result.scoreA.toLocaleString()} vs {result.scoreB.toLocaleString()} ·{' '}
        <span className="text-accent">{winPercent}% 로 승리</span>
      </div>

      <div className="text-xs font-bold font-kr">
        {result.didIWin ? (
          <span className="text-neon-green">🙌 내가 고른 곡이 이겼어요!</span>
        ) : result.myTrack ? (
          <span className="text-ink-dim">😢 아쉽게 패배했어요</span>
        ) : (
          <span className="text-ink-dim">이번 라운드는 곡을 고르지 않았어요</span>
        )}
      </div>

      {/* 내 선택은 승패와 무관하게 끝까지 유지되고, 취향 분석의 기준이 된다 */}
      {result.myTrack && !result.didIWin && (
        <div className="text-[10px] text-ink-muted font-kr pt-0.5">
          내 선택 「{result.myTrack.title}」은 취향 결과에 그대로 반영됩니다
        </div>
      )}
    </div>
  );
}
