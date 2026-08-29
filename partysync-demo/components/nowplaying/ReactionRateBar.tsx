import React from 'react';

interface ReactionRateBarProps {
  goodCount: number;
  sosoCount: number;
  badCount: number;
}

export function ReactionRateBar({
  goodCount,
  sosoCount,
  badCount,
}: ReactionRateBarProps) {
  const total = goodCount + sosoCount + badCount;
  const goodPct = total > 0 ? Math.round((goodCount / total) * 100) : 70;
  const sosoPct = total > 0 ? Math.round((sosoCount / total) * 100) : 22;
  const badPct = total > 0 ? 100 - goodPct - sosoPct : 8;

  return (
    <div className="w-full space-y-1.5 py-1">
      {/* Ratio Bar */}
      <div className="w-full h-2 rounded-full bg-surface-1 overflow-hidden flex">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${goodPct}%` }}
        />
        <div
          className="h-full bg-yellow-500 transition-all duration-500"
          style={{ width: `${sosoPct}%` }}
        />
        <div
          className="h-full bg-slate-600 transition-all duration-500"
          style={{ width: `${badPct}%` }}
        />
      </div>

      {/* Summary Counts */}
      <div className="flex justify-between items-center text-[10px] font-en font-bold text-ink-dim px-0.5">
        <div className="flex gap-2">
          <span className="text-accent">🔥 {goodPct}%</span>
          <span className="text-yellow-400">😐 {sosoPct}%</span>
          <span className="text-ink-dim">🥱 {badPct}%</span>
        </div>
        <span className="font-kr">방금 {total}명 반응</span>
      </div>
    </div>
  );
}
