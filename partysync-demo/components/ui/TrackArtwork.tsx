'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Track } from '@/types';

interface TrackArtworkProps {
  track: Track;
  className?: string;
  alt?: string;
}

/**
 * 앨범 커버. 실제 커버(외부 URL)를 우선 쓰고, 로드에 실패하면
 * 저장소에 포함된 로컬 SVG로 대체한다. 외부 이미지가 막혀도 화면이 비지 않는다.
 */
export function TrackArtwork({ track, className, alt }: TrackArtworkProps) {
  const [src, setSrc] = useState(track.artwork_url);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? `${track.artist} - ${track.title} 앨범 커버`}
      loading="lazy"
      onError={() => {
        if (track.artwork_fallback && src !== track.artwork_fallback) {
          setSrc(track.artwork_fallback);
        }
      }}
      className={clsx('h-full w-full object-cover', className)}
    />
  );
}
