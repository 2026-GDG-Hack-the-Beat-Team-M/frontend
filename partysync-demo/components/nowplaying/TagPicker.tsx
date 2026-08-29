import React from 'react';
import { clsx } from 'clsx';
import { REACTION_TAGS } from '@/data/tags';

interface TagPickerProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function TagPicker({ selectedTags, onToggleTag }: TagPickerProps) {
  return (
    <div className="w-full py-1">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
        {REACTION_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={clsx(
                'px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 border active:scale-95',
                isSelected
                  ? 'bg-accent/20 border-accent text-accent font-bold'
                  : 'bg-surface-1 border-white/10 text-ink-dim hover:text-ink'
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
