import React from 'react';
import { Badge } from '@/types';

interface BadgeStackProps {
  primaryBadge: Badge;
  secondaryBadges: Badge[];
}

export function BadgeStack({ primaryBadge, secondaryBadges }: BadgeStackProps) {
  return (
    <div className="w-full space-y-3">
      {/* Primary Badge Card */}
      <div className="w-full p-5 rounded-3xl bg-gradient-to-br from-surface-2 to-surface-1 border-2 border-accent/40 shadow-glow-accent text-center space-y-2 relative overflow-hidden">
        <div className="text-5xl animate-bounce">{primaryBadge.emoji}</div>
        <div>
          <span className="text-[10px] font-bold font-en tracking-widest text-accent uppercase">
            MY MAIN VIBE
          </span>
          <h2 className="text-xl font-black text-ink font-kr mt-0.5">
            {primaryBadge.label}
          </h2>
          <p className="text-xs font-semibold text-accent-light font-kr">
            {primaryBadge.caption}
          </p>
        </div>
        <p className="text-xs text-ink-dim font-kr leading-relaxed px-2">
          {primaryBadge.description}
        </p>
      </div>

      {/* Secondary Badges */}
      {secondaryBadges.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5">
          {secondaryBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 rounded-2xl bg-surface-2 border border-white/10 flex items-center gap-3 shadow-lift-1"
            >
              <span className="text-2xl flex-shrink-0">{badge.emoji}</span>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-ink truncate font-kr">
                  {badge.label}
                </h4>
                <p className="text-[10px] text-ink-dim truncate font-kr">
                  {badge.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
