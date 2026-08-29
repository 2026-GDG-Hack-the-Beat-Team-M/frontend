import React from 'react';

export interface ReactionToast { id: number; nickname: string; emoji: string; }
interface NicknameToastProps { toast: ReactionToast | null; }

export function NicknameToast({ toast }: NicknameToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-30 flex h-10 justify-center px-3" aria-hidden="true">
      {toast && (
        <div key={toast.id} className="nowplaying-toast flex h-fit max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-surface-2/95 px-3.5 py-2 text-xs font-semibold text-ink shadow-xl backdrop-blur-md">
          <span className="truncate text-accent">{toast.nickname}</span>
          <span className="shrink-0 text-ink-dim">님이 {toast.emoji} 남겼어요</span>
        </div>
      )}
      <style>{`
        .nowplaying-toast { animation: toast-in-out 2.2s ease both; }
        @keyframes toast-in-out { 0% { opacity: 0; transform: translateY(8px); } 12%, 82% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }
        @media (prefers-reduced-motion: reduce) { .nowplaying-toast { animation-name: toast-fade; } @keyframes toast-fade { 0%, 100% { opacity: 0; } 12%, 82% { opacity: 1; } } }
      `}</style>
    </div>
  );
}
