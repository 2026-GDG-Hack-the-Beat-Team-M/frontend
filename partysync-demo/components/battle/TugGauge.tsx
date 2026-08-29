import React from 'react';
import { clamp } from '@/lib/shared/clamp';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

interface TugGaugeProps {
  scoreA: number;
  scoreB: number;
}

export function TugGauge({ scoreA, scoreB }: TugGaugeProps) {
  const total = scoreA + scoreB;
  const rawRatioA = total > 0 ? scoreA / total : 0.5;
  const clampedRatioA = clamp(
    rawRatioA,
    BATTLE_CONFIG.GAUGE_CLAMP_MIN,
    BATTLE_CONFIG.GAUGE_CLAMP_MAX
  );
  const percentageA = Math.round(clampedRatioA * 100);
  const percentageB = 100 - percentageA;

  return (
    <div className="w-full space-y-1.5 py-2">
      {/* Tally Numbers */}
      <div className="flex justify-between items-center text-xs font-en font-bold px-1">
        <div className="flex items-center gap-1.5 text-accent">
          <span>TRACK A</span>
          <span className="text-sm font-black tabular-nums">{scoreA.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-neon-cyan">
          <span className="text-sm font-black tabular-nums">{scoreB.toLocaleString()}</span>
          <span>TRACK B</span>
        </div>
      </div>

      {/* Tug Gauge Bar */}
      <div className="relative w-full h-4 rounded-full bg-surface-1 overflow-hidden p-0.5 border border-white/10 flex">
        {/* Track A Side */}
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-l-full transition-all duration-300 relative shadow-glow-accent"
          style={{ width: `${percentageA}%` }}
        />

        {/* Center Tension Marker */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/40 z-10" />

        {/* Track B Side */}
        <div
          className="h-full bg-gradient-to-l from-neon-cyan to-blue-500 rounded-r-full transition-all duration-300 shadow-glow-cyan"
          style={{ width: `${percentageB}%` }}
        />
      </div>

      {/* Percent Labels */}
      <div className="flex justify-between items-center text-[10px] font-en font-bold text-ink-dim px-1">
        <span>{percentageA}%</span>
        <span>{percentageB}%</span>
      </div>
    </div>
  );
}
