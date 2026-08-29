import React from 'react';
import { clsx } from 'clsx';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

interface CountdownProps {
  remainingSeconds: number;
}

export function Countdown({ remainingSeconds }: CountdownProps) {
  const isCritical = remainingSeconds <= BATTLE_CONFIG.CRITICAL_TIME_THRESHOLD;
  const progressPercent = (remainingSeconds / BATTLE_CONFIG.BATTLE_DURATION) * 100;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-baseline mb-1 px-1">
        <span
          className={clsx(
            'text-[10px] tracking-widest uppercase font-en font-semibold transition-colors',
            isCritical ? 'text-critical-light animate-pulse' : 'text-ink-dim'
          )}
        >
          {isCritical ? '🔥 CRITICAL TIME (2X VOTE)' : 'BATTLE TIME'}
        </span>
        <span
          className={clsx(
            'text-2xl font-black font-en tabular-nums tracking-tight',
            isCritical ? 'text-critical animate-blink' : 'text-ink'
          )}
        >
          00:{remainingSeconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-surface-1 overflow-hidden p-0.5 border border-white/5">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            isCritical
              ? 'bg-gradient-to-r from-critical-dark to-critical-light shadow-glow-critical'
              : 'bg-gradient-to-r from-accent-dark to-accent-light shadow-glow-accent'
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
