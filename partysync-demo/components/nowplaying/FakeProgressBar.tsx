'use client';

import { useEffect, useState } from 'react';

interface FakeProgressBarProps { durationSec?: number; startAtSec?: number; }

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
};

export function FakeProgressBar({ durationSec = 228, startAtSec = 72 }: FakeProgressBarProps) {
  const duration = Math.max(1, durationSec);
  const initialPosition = Math.min(Math.max(0, startAtSec), duration);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const startedAt = Date.now();
    const update = () => setPosition(Math.min(duration, initialPosition + (Date.now() - startedAt) / 1000));
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [duration, initialPosition]);

  const progressPercent = Math.min(100, (position / duration) * 100);

  return (
    <div className="w-full space-y-2" aria-label={`재생 위치 ${formatTime(position)}, 전체 ${formatTime(duration)}`}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-[width] duration-300 ease-linear motion-reduce:transition-none" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="flex items-center justify-between px-0.5 font-en text-[11px] font-semibold tabular-nums text-ink-dim">
        <span>{formatTime(position)}</span><span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
