import React from 'react';
import { GenreBreakdown } from '@/types';

interface GenreDonutProps {
  distribution: GenreBreakdown[];
}

const GENRE_COLORS = ['#FF2D95', '#00F0FF', '#9D4EDD', '#FFD600', '#38EF7D'];

export function GenreDonut({ distribution }: GenreDonutProps) {
  // Compute SVG arc stroke dasharrays
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div className="w-full p-4 rounded-3xl bg-surface-1 border border-white/10 space-y-3">
      <h3 className="text-xs font-bold text-ink-dim tracking-wider uppercase font-en">
        GENRE PREFERENCE
      </h3>

      <div className="flex items-center gap-6">
        {/* SVG Donut Chart */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {distribution.map((item, index) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;
              const color = GENRE_COLORS[index % GENRE_COLORS.length];

              return (
                <circle
                  key={item.genre}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth="14"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-ink font-kr">
              {distribution[0]?.genre || '음악'}
            </span>
            <span className="text-[10px] font-bold text-accent font-en">
              {distribution[0]?.percentage || 0}%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {distribution.slice(0, 4).map((item, idx) => (
            <div key={item.genre} className="flex items-center justify-between text-xs font-kr">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: GENRE_COLORS[idx % GENRE_COLORS.length] }}
                />
                <span className="text-ink truncate font-medium">{item.genre}</span>
              </div>
              <span className="text-ink-dim font-bold font-en">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
