import React, { useEffect, useState } from 'react';
import { BattlePreset } from '@/types';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

interface PrerollIntroProps {
  preset: BattlePreset;
  onComplete: () => void;
}

export function PrerollIntro({ preset, onComplete }: PrerollIntroProps) {
  const [countdown, setCountdown] = useState(BATTLE_CONFIG.PREROLL_DURATION);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="px-3.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold font-en tracking-widest mb-4">
        ROUND {preset.round} / {BATTLE_CONFIG.ROUND_TOTAL}
      </div>

      <h2 className="text-2xl font-black text-ink mb-1 font-kr">
        {preset.theme_title}
      </h2>
      <p className="text-xs text-ink-dim font-kr mb-8">{preset.theme_tag}</p>

      {/* Versus Cards Preview */}
      <div className="w-full max-w-xs grid grid-cols-2 gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-surface-2 border border-accent/30 text-center">
          <span className="text-xs font-bold text-accent font-en">TRACK A</span>
          <p className="text-xs font-bold text-ink truncate mt-1">{preset.trackA.title}</p>
        </div>
        <div className="p-3 rounded-2xl bg-surface-2 border border-neon-cyan/30 text-center">
          <span className="text-xs font-bold text-neon-cyan font-en">TRACK B</span>
          <p className="text-xs font-bold text-ink truncate mt-1">{preset.trackB.title}</p>
        </div>
      </div>

      {/* Countdown Number */}
      <div className="text-6xl font-black font-en text-accent animate-ping">
        {countdown}
      </div>
      <p className="text-xs text-ink-dim mt-4">곧 배틀이 시작됩니다!</p>
    </div>
  );
}
