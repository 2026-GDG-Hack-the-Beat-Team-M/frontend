import React from 'react';
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
  const initials = track.title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={clsx(
        'group w-full flex items-center gap-4 p-3.5 rounded-[22px] border text-left transition-all duration-200 select-none relative overflow-hidden active:scale-[0.98]',
        isSelected
          ? isSideA
            ? 'bg-gradient-to-r from-accent/25 to-surface-2 border-accent shadow-glow-accent'
            : 'bg-gradient-to-r from-neon-cyan/25 to-surface-2 border-neon-cyan shadow-glow-cyan'
          : isOpponentSelected
          ? 'bg-surface-1/40 border-white/5 opacity-40'
          : 'bg-gradient-to-br from-surface-2 to-[#0d0b12] hover:bg-surface-3 border-white/10 shadow-lift-1'
      )}
    >
      {/* Artwork */}
      <div
        className={clsx(
          'relative flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10',
          isSideA
            ? 'bg-gradient-to-br from-[#ff66b3] via-[#8e2de2] to-[#24103b]'
            : 'bg-gradient-to-br from-[#59f1ff] via-[#2575fc] to-[#111c52]'
        )}
      >
        <div className="absolute h-12 w-12 rounded-full border-[10px] border-black/25 bg-black/10 shadow-inner" />
        <span className="relative z-10 font-en text-[11px] font-black tracking-widest text-white/90">{initials}</span>
        <img
          src={track.artwork_url}
          alt={`${track.artist} - ${track.title} 앨범 커버`}
          className="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
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
      <div className="flex-1 min-w-0">
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
        <h4 className="mt-1 truncate text-base font-extrabold text-ink">{track.title}</h4>
        <p className="mt-0.5 truncate text-xs text-ink-dim">{track.artist}</p>
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div
          className={clsx(
            'absolute right-3 top-3 flex-shrink-0 rounded-full px-2 py-1 font-en text-[9px] font-black tracking-wider',
            isSideA ? 'bg-accent text-white' : 'bg-neon-cyan text-black'
          )}
        >
          MY PICK
        </div>
      )}
    </button>
  );
}
