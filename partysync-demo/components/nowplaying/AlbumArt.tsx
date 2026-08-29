'use client';

import { useState } from 'react';

interface AlbumArtProps {
  title: string;
  artist: string;
  artworkUrl?: string;
}

export function AlbumArt({ title, artist, artworkUrl }: AlbumArtProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showImage = Boolean(artworkUrl) && artworkUrl !== failedUrl;

  return (
    <div className="relative mx-auto my-4 aspect-square w-[min(72vw,19rem)] max-w-full">
      <div aria-hidden="true" className="absolute inset-3 rounded-[2rem] bg-accent/35 blur-3xl motion-safe:animate-pulse-glow" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-surface-1 shadow-2xl">
        {showImage ? (
          // A plain img safely supports arbitrary demo URLs without changing next.config.
          <img
            src={artworkUrl}
            alt={`${title} — ${artist} 앨범 아트`}
            className="h-full w-full object-cover"
            onError={() => setFailedUrl(artworkUrl ?? null)}
          />
        ) : (
          <div
            role="img"
            aria-label={`${title} — ${artist} 앨범 아트 없음`}
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgba(255,116,184,0.5),transparent_32%),linear-gradient(145deg,#2a1430,#0d0b13_70%)]"
          >
            <div className="relative flex h-2/3 w-2/3 items-center justify-center rounded-full border border-white/15 bg-black/35 shadow-2xl">
              <div className="h-1/3 w-1/3 rounded-full border border-white/15 bg-accent/70 shadow-glow-accent" />
              <span className="absolute bottom-5 text-3xl" aria-hidden="true">♫</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
