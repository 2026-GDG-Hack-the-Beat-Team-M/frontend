import React from 'react';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

interface RoundIndicatorProps {
  currentRound: number;
  totalRounds?: number;
}

export function RoundIndicator({
  currentRound,
  totalRounds = BATTLE_CONFIG.ROUND_TOTAL,
}: RoundIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2/90 border border-white/10 shadow-lift-1 backdrop-blur-md">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      <span className="text-xs font-bold tracking-widest text-ink uppercase font-en">
        ROUND {currentRound}/{totalRounds}
      </span>
    </div>
  );
}
