import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Track, BattleSide } from '@/types';

interface SplitCardProps {
  track: Track;
  side: BattleSide;
  isSelected: boolean;
  isOpponentSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function SplitCard({
  track,
  side,
  isSelected,
  isOpponentSelected,
  onSelect,
  disabled,
}: SplitCardProps) {
  const isSideA = side === 'A';

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={clsx(
        'w-full flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all duration-200 select-none relative overflow-hidden active:scale-[0.98]',
        isSelected
          ? isSideA
            ? 'bg-gradient-to-r from-accent/25 to-surface-2 border-accent shadow-glow-accent'
            : 'bg-gradient-to-r from-neon-cyan/25 to-surface-2 border-neon-cyan shadow-glow-cyan'
          : isOpponentSelected
          ? 'bg-surface-1/40 border-white/5 opacity-40'
          : 'bg-surface-2 hover:bg-surface-3 border-white/10 shadow-lift-1'
      )}
    >
      {/* Artwork */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-1 border border-white/10">
        <Image
          src={track.artwork_url}
          alt={track.title}
          fill
          className="object-cover"
        />
        <div
          className={clsx(
            'absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-black font-en',
            isSideA ? 'bg-accent text-white' : 'bg-neon-cyan text-black'
          )}
        >
          {side}
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {track.genre_tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-medium text-ink-dim"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h4 className="text-sm font-bold text-ink truncate mt-0.5">{track.title}</h4>
        <p className="text-xs text-ink-dim truncate">{track.artist}</p>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div
          className={clsx(
            'px-2.5 py-1 rounded-full text-xs font-bold font-en flex-shrink-0 tracking-wider',
            isSideA ? 'bg-accent text-white' : 'bg-neon-cyan text-black'
          )}
        >
          MY PICK
        </div>
      )}
    </button>
  );
}
