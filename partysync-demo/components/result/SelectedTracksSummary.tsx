import React from 'react';
import { TrackArtwork } from '@/components/ui/TrackArtwork';
import { clsx } from 'clsx';
import { SelectedTrackItem } from '@/types';

interface SelectedTracksSummaryProps {
  selectedTracks: SelectedTrackItem[];
}

const REACTION_EMOJI: Record<string, string> = {
  good: '🔥',
  soso: '😐',
  bad: '🥱',
};

export function SelectedTracksSummary({
  selectedTracks,
}: SelectedTracksSummaryProps) {
  if (selectedTracks.length === 0) return null;

  const pickedCount = selectedTracks.filter((item) => item.track).length;

  return (
    <div className="w-full space-y-2.5 py-1">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-ink-dim tracking-wider uppercase font-en">
          MY {pickedCount} PICKS // 분석 기준
        </h3>
        <span className="text-[10px] text-accent font-semibold font-kr">
          이 곡들로만 판정했어요
        </span>
      </div>

      <div className="space-y-2">
        {selectedTracks.map((item) => {
          if (!item.track) {
            return (
              <div
                key={item.round}
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-white/10 bg-surface-1/40"
              >
                <div className="w-14 h-14 rounded-xl flex-shrink-0 bg-surface-1 border border-white/10 flex items-center justify-center text-lg text-ink-muted">
                  ?
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-ink-dim font-kr">
                    ROUND {item.round} · 선택 없음
                  </h4>
                  <p className="text-[11px] text-ink-muted font-kr mt-0.5">
                    이 라운드는 곡을 고르지 않아 취향 분석에서 제외됐어요
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.round}
              className={clsx(
                'w-full flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 select-none shadow-lift-1',
                item.didIWin
                  ? 'bg-surface-2 border-neon-green/30'
                  : 'bg-surface-1/80 border-white/5'
              )}
            >
              {/* Round Badge & Artwork */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-1 border border-white/10">
                <TrackArtwork track={item.track} />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-black font-en text-accent">
                  R{item.round}
                </div>
              </div>

              {/* Track Metadata */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.track.genre_tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 rounded bg-white/5 text-[9px] font-medium text-ink-dim"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xs font-bold text-ink truncate mt-0.5 font-kr">
                  {item.track.title}
                </h4>
                <p className="text-[11px] text-ink-dim truncate font-kr">
                  {item.track.artist}
                </p>
              </div>

              {/* Win/Loss Status & Reaction Emoji */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span
                  className={clsx(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold font-kr',
                    item.didIWin
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/40'
                      : 'bg-white/5 text-ink-dim border border-white/10'
                  )}
                >
                  {item.didIWin ? '승리 ✅' : '패배 ❌'}
                </span>
                {/* 반응은 그 라운드 승리곡 대상이므로, 내 픽에 남긴 것만 표시한다 */}
                {item.reactionIsOnMyPick && item.reaction && (
                  <span className="text-xs">{REACTION_EMOJI[item.reaction]}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
