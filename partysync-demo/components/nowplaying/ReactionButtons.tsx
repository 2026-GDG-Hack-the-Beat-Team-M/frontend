'use client';

import { clsx } from 'clsx';
import type { Sentiment } from './NowPlayingScreen';

interface ReactionButtonsProps {
  selectedReaction: Sentiment | null;
  onSelectReaction: (reaction: Sentiment) => void;
}

const OPTIONS: { type: Sentiment; emoji: string; label: string }[] = [
  { type: 'good', emoji: '🔥', label: '미쳤다' },
  { type: 'so_so', emoji: '😐', label: '쏘쏘' },
  { type: 'bad', emoji: '🥱', label: '루즈해요' },
];

export function ReactionButtons({ selectedReaction, onSelectReaction }: ReactionButtonsProps) {
  const handleClick = (type: Sentiment) => {
    try { navigator.vibrate?.(15); } catch { /* Haptics are optional. */ }
    onSelectReaction(type);
  };

  return (
    <fieldset className="w-full space-y-2">
      <legend className="w-full text-center text-sm font-bold text-ink">지금 이 노래 어때요?</legend>
      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => {
          const isSelected = selectedReaction === option.type;
          return (
            <button
              key={option.type}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${option.emoji} ${option.label}`}
              onClick={() => handleClick(option.type)}
              className={clsx(
                'relative flex min-h-[64px] min-w-0 flex-col items-center justify-center rounded-2xl border px-1.5 py-2 font-bold transition duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none',
                isSelected
                  ? 'border-accent bg-accent/20 text-white shadow-glow-accent'
                  : 'border-white/10 bg-surface-2 text-ink-dim hover:border-white/25 hover:text-ink'
              )}
            >
              <span className="text-2xl leading-none" aria-hidden="true">{option.emoji}</span>
              <span className="mt-1 whitespace-nowrap text-[11px] sm:text-xs">{option.label}</span>
              {isSelected && <span className="absolute right-1.5 top-1 text-[10px] text-accent-light" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
