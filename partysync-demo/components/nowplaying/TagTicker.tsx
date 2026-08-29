import React from 'react';
import { REACTION_TAGS } from '@/data/tags';

export function TagTicker() {
  const repeatedTags = [...REACTION_TAGS, ...REACTION_TAGS];

  return (
    <div className="w-full overflow-hidden py-1 opacity-70">
      <div className="flex gap-3 whitespace-nowrap animate-marquee">
        {repeatedTags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[11px] font-semibold text-ink-dim/80 font-kr"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
