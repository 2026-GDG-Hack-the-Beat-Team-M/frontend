import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Screen } from '@/components/ui/Screen';
import { ALL_TRACKS } from '@/data/tracks';
import { BATTLE_CONFIG } from '@/lib/battle/battleConfig';

/**
 * QR 스캔으로 도착하는 첫 화면.
 * 실제 데모에서는 이 화면의 QR을 찍어 /play 로 진입한다.
 */
export function LandingScreen() {
  return (
    <Screen>
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

        <div className="mt-6 w-full max-w-[300px] rounded-2xl bg-surface-1 border border-white/10 p-4 text-left space-y-1.5">
          <p className="text-[10px] font-bold font-en tracking-widest text-ink-dim uppercase">
            TONIGHT&apos;S SETLIST
          </p>
          <p className="text-xs text-ink font-kr leading-relaxed">
            후보곡 <span className="text-accent font-bold">{ALL_TRACKS.length}곡</span> 중
            {' '}
            <span className="text-accent font-bold">{BATTLE_CONFIG.ROUND_TOTAL}번의 배틀</span>로
            {' '}당신의 곡 {BATTLE_CONFIG.ROUND_TOTAL}개를 고르고,
            그 선택만으로 취향 카드를 받습니다.
          </p>
        </div>
      </div>

      <div className="w-full pb-4">
        <Link
          href="/play"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-black text-base shadow-glow-accent active:scale-[0.98] transition-transform font-kr"
        >
          파티 즉시 합류하기 🔥
        </Link>
        <p className="text-center text-[10px] text-ink-muted mt-2 font-kr">
          앱 설치 · 회원가입 없이 바로 참여합니다
        </p>
      </div>
    </Screen>
  );
}
