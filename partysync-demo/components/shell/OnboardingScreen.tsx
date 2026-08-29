import React from 'react';
import Image from 'next/image';
import { Screen } from '@/components/ui/Screen';
import { NicknameForm } from './NicknameForm';

interface OnboardingScreenProps {
  onJoin: (nickname: string) => void;
}

export function OnboardingScreen({ onJoin }: OnboardingScreenProps) {
  return (
    <Screen>
      {/* Header Badge */}
      <div className="flex flex-col items-center text-center pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-en font-bold text-xs tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          LIVE PARTY INTERACTION
        </div>

        <h1 className="text-3xl font-black tracking-tight text-ink font-en">
          PARTY<span className="text-accent">SYNC</span>
        </h1>
        <p className="text-xs text-ink-dim mt-1 font-kr max-w-[280px]">
          당신의 실시간 탭으로 플로어의 다음 드랍을 결정하세요
        </p>
      </div>

      {/* QR Visual */}
      <div className="my-auto py-6 flex flex-col items-center">
        <div className="relative w-44 h-44 rounded-3xl p-3 bg-surface-2 border border-white/15 shadow-glow-accent">
          <div className="w-full h-full relative rounded-2xl overflow-hidden">
            <Image
              src="/qr.svg"
              alt="PartySync Demo QR"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-ink-dim font-kr">
          <span className="w-2 h-2 rounded-full bg-neon-green" />
          <span>라운드 1 배틀 실시간 진행 중</span>
        </div>
      </div>

      {/* Nickname Form */}
      <div className="w-full pb-4">
        <NicknameForm onSubmit={onJoin} />
      </div>
    </Screen>
  );
}
