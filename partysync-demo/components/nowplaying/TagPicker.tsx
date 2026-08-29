'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface TagPickerProps { tags: string[]; selectedTags: string[]; onToggleTag: (tag: string) => void; }

export function TagPicker({ tags, selectedTags, onToggleTag }: TagPickerProps) {
  const [showLimit, setShowLimit] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current !== null) window.clearTimeout(timerRef.current); }, []);

  const handleToggle = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length >= 3) {
      setShowLimit(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setShowLimit(false), 1800);
      return;
    }
    setShowLimit(false);
    onToggleTag(tag);
  };

  return (
    <section className="space-y-2" aria-labelledby="tag-picker-label">
      <div className="flex items-center justify-between text-xs">
        <span id="tag-picker-label" className="font-bold text-ink">느낌을 더 알려주세요 <span className="font-normal text-ink-dim">(선택)</span></span>
        <span id="tag-limit-help" className={clsx('tabular-nums', showLimit ? 'font-bold text-accent-light' : 'text-ink-dim')}>{showLimit ? '최대 3개까지 선택해요' : `${selectedTags.length}/3`}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag} type="button" aria-pressed={isSelected} aria-describedby="tag-limit-help" onClick={() => handleToggle(tag)}
              className={clsx('min-h-[48px] rounded-full border px-3 py-2 text-xs font-semibold transition duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none', isSelected ? 'border-accent bg-accent/20 text-accent-light' : 'border-white/10 bg-surface-1 text-ink-dim hover:border-white/25 hover:text-ink')}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </section>
  );
}
