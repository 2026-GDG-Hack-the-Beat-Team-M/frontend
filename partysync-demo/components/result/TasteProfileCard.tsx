import React from 'react';
import { TasteProfile } from '@/types';

interface TasteProfileCardProps {
  profile: TasteProfile;
}

/**
 * 선택한 3곡의 장르·분위기·음악적 특성을 조합한 취향 프로필.
 * 후보곡 전체가 아니라 profile.analyzedTracks 만을 근거로 한다.
 */
export function TasteProfileCard({ profile }: TasteProfileCardProps) {
  return (
    <div className="w-full p-4 rounded-3xl bg-gradient-to-br from-surface-2 to-surface-1 border border-neon-cyan/25 space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-neon-cyan tracking-wider uppercase font-en">
          TASTE PROFILE
        </h3>
        <span className="text-[10px] text-ink-muted font-kr">
          선택곡 {profile.analyzedTracks.length}곡 기준
        </span>
      </div>

      <div>
        <p className="text-lg font-black text-ink font-kr leading-snug">
          {profile.headline}
        </p>
        <p className="text-[11px] text-ink-dim font-kr leading-relaxed mt-1.5">
          {profile.summary}
        </p>
      </div>

      {/* 음악적 특성 4축 */}
      <div className="space-y-2 pt-0.5">
        {profile.axes.map((axis) => (
          <div key={axis.key} className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold text-ink font-kr">
                {axis.label}
                <span className="text-ink-muted font-normal ml-1.5">
                  {axis.caption}
                </span>
              </span>
              <span className="text-[11px] font-black text-accent font-en tabular-nums">
                {axis.value}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-neon-cyan transition-all duration-700"
                style={{ width: `${axis.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 분위기 분포 */}
      {profile.moodDistribution.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.moodDistribution.map((mood) => (
            <span
              key={mood.genre}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-ink font-kr"
            >
              {mood.genre} {mood.percentage}%
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
