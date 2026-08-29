import React from 'react';

interface CriticalTimeOverlayProps {
  isVisible: boolean;
}

export function CriticalTimeOverlay({ isVisible }: CriticalTimeOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 border-4 border-critical/60 rounded-3xl animate-pulse"
    >
      <div className="absolute inset-0 bg-critical/5 mix-blend-screen" />
    </div>
  );
}
