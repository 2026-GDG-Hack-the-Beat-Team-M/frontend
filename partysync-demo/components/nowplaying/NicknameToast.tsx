import React from 'react';

interface NicknameToastProps {
  toast: { nickname: string; emoji: string } | null;
}

export function NicknameToast({ toast }: NicknameToastProps) {
  if (!toast) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="px-3.5 py-1.5 rounded-full bg-surface-2/90 border border-white/10 text-xs font-semibold text-ink shadow-lg backdrop-blur-md flex items-center gap-1.5 font-kr">
        <span className="text-accent">{toast.nickname}</span>
        <span className="text-ink-dim">님이</span>
        <span>{toast.emoji}</span>
        <span className="text-ink-dim">남겼어요</span>
      </div>
    </div>
  );
}
