import React from 'react';
import { clsx } from 'clsx';
import { ReactionType } from '@/types';
import { triggerHaptic } from '@/lib/shared/haptics';

interface ReactionButtonsProps {
  selectedReaction: ReactionType | null;
  onSelectReaction: (reaction: ReactionType) => void;
}

export function ReactionButtons({
  selectedReaction,
  onSelectReaction,
}: ReactionButtonsProps) {
  const options: { type: ReactionType; emoji: string; label: string }[] = [
    { type: 'good', emoji: '🔥', label: '미쳤다' },
    { type: 'soso', emoji: '😐', label: '쏘쏘' },
    { type: 'bad', emoji: '🥱', label: '루즈해요' },
  ];

  const handleClick = (type: ReactionType) => {
    triggerHaptic(20);
    onSelectReaction(type);
  };

  return (
    <div className="w-full space-y-2">
      <div className="text-xs font-semibold text-center text-ink-dim">
        지금 이 노래 어때요?
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = selectedReaction === opt.type;
          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => handleClick(opt.type)}
              className={clsx(
                'flex flex-col items-center justify-center p-3 rounded-2xl border font-bold transition-all duration-200 active:scale-95 select-none min-h-[56px]',
                isSelected
                  ? 'bg-accent/20 border-accent text-white shadow-glow-accent scale-105'
                  : 'bg-surface-2 hover:bg-surface-3 border-white/10 text-ink-dim hover:text-ink'
              )}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-[11px] mt-1 font-kr">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
