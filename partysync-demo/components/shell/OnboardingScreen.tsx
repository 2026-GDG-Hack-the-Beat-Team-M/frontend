import React from 'react';
import { TrackArtwork } from '@/components/ui/TrackArtwork';
import { Screen } from '@/components/ui/Screen';
import { ALL_TRACKS } from '@/data/tracks';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';
import { NicknameForm } from './NicknameForm';

interface OnboardingScreenProps {
  onJoin: (nickname: string) => void;
}

export function OnboardingScreen({ onJoin }: OnboardingScreenProps) {
  // 오늘의 후보곡 미리보기 (아트워크 스택)
  const preview = ALL_TRACKS.slice(0, 6);

  return (
    <Screen>
      <div className="flex flex-col items-center text-center pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-en font-bold text-xs tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          ROUND 1 IN PROGRESS
        </div>

        <h1 className="text-2xl font-black tracking-tight text-ink font-kr">
          닉네임만 정하면 <span className="text-accent">바로 합류</span>
        </h1>
        <p className="text-xs text-ink-dim mt-1.5 font-kr max-w-[300px] leading-relaxed">
          후보곡 {ALL_TRACKS.length}곡 중 {BATTLE_CONFIG.ROUND_TOTAL}번의 배틀에서
          고른 {BATTLE_CONFIG.ROUND_TOTAL}곡이 당신의 취향 카드가 됩니다
        </p>
      </div>

      {/* 후보곡 아트워크 프리뷰 */}
      <div className="my-auto py-6 w-full">
        <p className="text-[10px] font-bold font-en tracking-widest text-ink-dim uppercase text-center mb-3">
          TONIGHT&apos;S CANDIDATES · {ALL_TRACKS.length} TRACKS
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {preview.map((track) => (
            <div
              key={track.id}
              className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-surface-1"
            >
              <TrackArtwork track={track} className="opacity-80" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-1.5">
                <p className="text-[9px] font-bold text-ink truncate font-kr">
                  {track.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-4">
        <NicknameForm onSubmit={onJoin} />
      </div>
    </Screen>
  );
}
