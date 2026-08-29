import React, { useState } from 'react';
import { clsx } from 'clsx';
import { BattleSide } from '@/types';
import { triggerHaptic } from '@/lib/shared/haptics';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

interface TapAreaProps {
  myTeam: BattleSide | null;
  myTapCount: number;
  onTap: (side: BattleSide) => void;
  disabled?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function TapArea({ myTeam, myTapCount, onTap, disabled }: TapAreaProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const isTapLimited = myTapCount >= BATTLE_CONFIG.TAP_LIMIT;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || isTapLimited) return;

    // Trigger haptic feedback
    triggerHaptic(15);

    // Ripple position calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now() + Math.random(), x, y };

    setRipples((prev) => [...prev.slice(-10), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // If no team is selected yet, default to A or require selection
    const targetSide = myTeam || 'A';
    onTap(targetSide);
  };

  const isSideA = myTeam === 'A' || myTeam === null;

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <button
        type="button"
        onPointerDown={handlePointerDown}
        disabled={disabled || isTapLimited}
        className={clsx(
          'relative w-full h-[76px] rounded-2xl overflow-hidden font-en font-black select-none transition-transform duration-75 active:scale-[0.98] flex flex-col items-center justify-center p-3 border shadow-2xl',
          isSideA
            ? 'bg-gradient-to-br from-accent-dark/80 via-accent/90 to-accent-light text-white border-accent-light/40 shadow-glow-accent'
            : 'bg-gradient-to-br from-blue-700 via-neon-cyan/90 to-cyan-300 text-black border-cyan-200/50 shadow-glow-cyan',
          disabled && 'opacity-60 pointer-events-none'
        )}
      >
        {/* Animated Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute w-16 h-16 rounded-full bg-white/40 animate-ping -translate-x-1/2 -translate-y-1/2"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <span className="text-xl tracking-wider">
            {myTeam ? 'TAP BOOST! 🔥' : '먼저 곡을 선택하세요'}
          </span>
          <span className="text-xs font-semibold tracking-widest mt-1 opacity-90 font-kr">
            {myTeam
              ? `TRACK ${myTeam} 팀을 위해 연타하세요!`
              : '원하는 곡을 누르고 연타하세요!'}
          </span>
        </div>
      </button>

      {/* Tap Counter */}
      <div className="flex items-center justify-between w-full px-2 text-xs font-en text-ink-dim">
        <span>MY TAPS</span>
        <span className="font-bold text-ink tabular-nums">
          {myTapCount} / {BATTLE_CONFIG.TAP_LIMIT}
        </span>
      </div>
    </div>
  );
}
