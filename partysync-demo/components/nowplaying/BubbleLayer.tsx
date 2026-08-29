import React from 'react';

export interface BubbleItem {
  id: number;
  emoji: string;
  leftPercent: number;
  sizePx: number;
  durationMs: number;
  driftPx: number;
  isUser: boolean;
}

interface BubbleLayerProps {
  bubbles: BubbleItem[];
}

export function BubbleLayer({ bubbles }: BubbleLayerProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className={bubble.isUser ? 'nowplaying-user-bubble' : 'nowplaying-bubble'}
          style={{
            left: `${bubble.leftPercent}%`,
            fontSize: `${bubble.sizePx}px`,
            animationDuration: `${bubble.durationMs}ms`,
            '--bubble-drift': `${bubble.driftPx}px`,
          } as React.CSSProperties}
        >
          {bubble.emoji}
        </span>
      ))}
      <style>{`
        .nowplaying-bubble, .nowplaying-user-bubble {
          position: absolute; bottom: 5.5rem; line-height: 1; user-select: none;
          will-change: transform, opacity; animation-name: nowplaying-float;
          animation-timing-function: cubic-bezier(.2,.72,.25,1); animation-fill-mode: forwards;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.5));
        }
        .nowplaying-user-bubble { animation-name: nowplaying-user-float; filter: drop-shadow(0 0 12px rgba(255,45,149,.85)); }
        @keyframes nowplaying-float {
          0% { transform: translate3d(0, 20px, 0) scale(.8); opacity: 0; }
          14% { opacity: 1; }
          100% { transform: translate3d(var(--bubble-drift), -310px, 0) scale(1.1); opacity: 0; }
        }
        @keyframes nowplaying-user-float {
          0% { transform: translate3d(0, 10px, 0) scale(.55); opacity: 0; }
          16% { transform: translate3d(0, 0, 0) scale(1.18); opacity: 1; }
          100% { transform: translate3d(var(--bubble-drift), -260px, 0) scale(.95); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nowplaying-bubble, .nowplaying-user-bubble { animation-name: nowplaying-fade; animation-duration: 900ms !important; }
          @keyframes nowplaying-fade { 0%, 100% { opacity: 0; } 25%, 70% { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}
