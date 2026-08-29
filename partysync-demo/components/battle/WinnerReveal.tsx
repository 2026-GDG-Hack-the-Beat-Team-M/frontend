import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RoundResult } from '@/types';

interface WinnerRevealProps {
  result: RoundResult;
  onProceed: () => void;
}

export function WinnerReveal({ result, onProceed }: WinnerRevealProps) {
  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2D95', '#00F0FF', '#FFD600', '#FFFFFF'],
      });
    } catch {
      // Ignore if canvas-confetti fails
    }

    const timer = setTimeout(() => {
      onProceed();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onProceed]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-4xl mb-4 shadow-glow-accent animate-bounce">
        🏆
      </div>

      <div className="text-xs font-bold font-en tracking-widest text-accent mb-1">
        WINNER REVEAL
      </div>

      <h2 className="text-3xl font-black text-white font-kr mb-2">
        {result.winner.title}
      </h2>
      <p className="text-sm font-semibold text-ink-dim mb-6">
        {result.winner.artist}
      </p>

      <div className="px-4 py-2 rounded-2xl bg-surface-2 border border-white/10 text-xs font-bold font-kr">
        {result.didIWin ? (
          <span className="text-neon-green">🙌 내가 선택한 곡이 승리했습니다!</span>
        ) : (
          <span className="text-ink-dim">아쉽게 패배했습니다! 다음 라운드에서 만회하세요.</span>
        )}
      </div>
    </div>
  );
}
