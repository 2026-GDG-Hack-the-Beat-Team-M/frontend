import React from 'react';
import { RoundResult } from '@/types';

interface RoundStripProps {
  roundHistory: RoundResult[];
}

export function RoundStrip({ roundHistory }: RoundStripProps) {
  return (
    <div className="w-full p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between">
      <span className="text-xs font-bold font-kr text-ink-dim">
        배틀 승패 기록
      </span>
      <div className="flex items-center gap-2">
        {roundHistory.map((item) => (
          <div
            key={item.round}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-2 border border-white/10 text-xs font-en font-bold"
          >
            <span>R{item.round}</span>
            <span>{item.myTrack === null ? '➖' : item.didIWin ? '✅' : '❌'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
