import React from 'react';
import { UserTasteSummary } from '@/types';

interface StatsListProps {
  summary: UserTasteSummary;
}

export function StatsList({ summary }: StatsListProps) {
  return (
    <div className="w-full space-y-2">
      {/* 2-Column Stats Box */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 text-center">
          <span className="text-[10px] font-semibold text-ink-dim font-en uppercase">
            TOTAL TAPS
          </span>
          <p className="text-xl font-black text-accent font-en mt-0.5">
            {summary.totalTaps}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 text-center">
          <span className="text-[10px] font-semibold text-ink-dim font-en uppercase">
            REACTIONS
          </span>
          <p className="text-xl font-black text-neon-cyan font-en mt-0.5">
            {summary.totalReactions} / {summary.roundHistory.length}
          </p>
        </div>
      </div>

      {/* Favorite Drop */}
      {summary.favoriteDrop && (
        <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-ink-dim font-kr">
              🎧 나의 최애 드랍곡
            </span>
            <h4 className="text-xs font-bold text-ink truncate font-kr mt-0.5">
              {summary.favoriteDrop.title}
            </h4>
            <p className="text-[10px] text-ink-dim truncate">
              {summary.favoriteDrop.artist}
            </p>
          </div>
          <span className="text-2xl">🔥</span>
        </div>
      )}
    </div>
  );
}
