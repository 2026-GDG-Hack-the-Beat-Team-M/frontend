import React, { useEffect, useState } from 'react';

export function FakeProgressBar() {
  const [seconds, setSeconds] = useState(72); // Starts at 1:12
  const totalSeconds = 228; // 3:48

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev >= totalSeconds ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (seconds / totalSeconds) * 100;

  return (
    <div className="w-full space-y-1.5 py-1">
      {/* Progress Track */}
      <div className="relative w-full h-1.5 rounded-full bg-surface-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Timestamps */}
      <div className="flex justify-between items-center text-[10px] font-en font-semibold text-ink-dim px-0.5">
        <span>{formatTime(seconds)}</span>
        <span>3:48</span>
      </div>
    </div>
  );
}
