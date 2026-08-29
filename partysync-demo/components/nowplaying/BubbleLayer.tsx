import React from 'react';
import { BubbleItem } from '@/lib/nowplaying/bubbleEngine';

interface BubbleLayerProps {
  bubbles: BubbleItem[];
}

export function BubbleLayer({ bubbles }: BubbleLayerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute bottom-20 select-none animate-float-up"
          style={{
            left: `${bubble.leftPercent}%`,
            fontSize: `${bubble.sizePx}px`,
            animationDuration: `${bubble.durationSec}s`,
            filter: bubble.isUser
              ? 'drop-shadow(0 0 12px rgba(255,45,149,0.9))'
              : 'drop-shadow(0 0 6px rgba(0,0,0,0.5))',
          }}
        >
          {bubble.emoji}
        </span>
      ))}
    </div>
  );
}
