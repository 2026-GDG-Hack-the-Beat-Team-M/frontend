import React from 'react';

interface CriticalTimeOverlayProps {
  isVisible: boolean;
}

export function CriticalTimeOverlay({ isVisible }: CriticalTimeOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-1 left-1/2 z-30 w-[calc(100%-8px)] max-w-md -translate-x-1/2 overflow-hidden rounded-[28px] border-2 border-critical/70 shadow-[inset_0_0_28px_rgba(255,69,69,0.18),0_0_22px_rgba(255,69,69,0.28)] animate-pulse"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-critical/10 via-transparent to-critical/10 mix-blend-screen" />
    </div>
  );
}
