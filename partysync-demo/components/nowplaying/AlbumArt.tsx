import React from 'react';
import Image from 'next/image';
import { Track } from '@/types';

interface AlbumArtProps {
  track: Track;
}

export function AlbumArt({ track }: AlbumArtProps) {
  return (
    <div className="relative w-56 h-56 mx-auto my-3 flex items-center justify-center">
      {/* Ambient Pulsing Glow Behind Art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-accent/40 blur-2xl animate-pulse-glow"
      />

      {/* Album Artwork Frame */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-surface-1">
        <Image
          src={track.artwork_url}
          alt={track.title}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
