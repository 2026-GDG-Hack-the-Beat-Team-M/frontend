import React, { useRef, useState } from 'react';
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
  size: number;
}

export function TapArea({ myTeam, myTapCount, onTap, disabled }: TapAreaProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [streak, setStreak] = useState(0);
  // 진영을 고르기 전에는 연타할 수 없다. 임의로 A팀에 표가 들어가면
  // 사용자가 고르지 않은 곡이 '내 선택'으로 기록된다.
  const isLocked = myTeam === null;
  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTapLimited = myTapCount >= BATTLE_CONFIG.TAP_LIMIT;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || isTapLimited || !myTeam) return;

    // Trigger haptic feedback
    triggerHaptic(15);

    // Ripple position calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 52 + Math.round(Math.random() * 36),
    };

    setRipples((prev) => [...prev.slice(-7), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);

    setStreak((prev) => prev + 1);
    if (streakTimerRef.current) clearTimeout(streakTimerRef.current);
    streakTimerRef.current = setTimeout(() => setStreak(0), 700);

    onTap(myTeam);
  };

  const isSideA = myTeam === 'A';

  return (
    <div className="relative w-full flex flex-col items-center gap-2">
      {streak >= 3 && (
        <div className="pointer-events-none absolute -top-8 right-2 z-30 flex items-baseline gap-1 font-en font-black text-accent-light drop-shadow-[0_0_12px_rgba(255,45,149,0.9)]">
          <span className="text-2xl italic tabular-nums">{streak}</span>
          <span className="text-[10px] tracking-widest">COMBO!</span>
        </div>
      )}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        disabled={disabled || isTapLimited || isLocked}
        className={clsx(
          'relative w-full h-[76px] rounded-2xl overflow-hidden font-en font-black select-none transition-all duration-75 active:scale-[0.96] flex flex-col items-center justify-center p-3 border shadow-2xl',
          isLocked
            ? 'bg-surface-2 text-ink-dim border-white/10'
            : isSideA
            ? 'bg-gradient-to-br from-accent-dark/80 via-accent/90 to-accent-light text-white border-accent-light/40 shadow-glow-accent'
            : 'bg-gradient-to-br from-blue-700 via-neon-cyan/90 to-cyan-300 text-black border-cyan-200/50 shadow-glow-cyan',
          ripples.length > 0 && 'scale-[1.015] brightness-125',
          disabled && 'opacity-60 pointer-events-none'
        )}
      >
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <span
            className="block h-full bg-white/80 transition-all duration-150"
            style={{ width: `${(myTapCount / BATTLE_CONFIG.TAP_LIMIT) * 100}%` }}
          />
        </span>

        {/* Animated Ripples */}
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            <span
              className="pointer-events-none absolute rounded-full border-2 border-white/80 bg-white/25 animate-ping -translate-x-1/2 -translate-y-1/2"
              style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
            />
            <span
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full animate-bounce text-lg font-black text-white drop-shadow-lg"
              style={{ left: ripple.x, top: Math.max(28, ripple.y) }}
            >
              +1
            </span>
          </React.Fragment>
        ))}

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <span className={clsx('text-xl tracking-wider transition-transform', ripples.length > 0 && 'scale-110')}>
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
