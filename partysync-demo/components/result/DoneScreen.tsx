import React from 'react';
import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';

interface DoneScreenProps {
  onRestart: () => void;
}

export function DoneScreen({ onRestart }: DoneScreenProps) {
  return (
    <Screen>
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-4xl shadow-glow-accent animate-bounce">
          🎉
        </div>

        <h2 className="text-2xl font-black text-ink font-kr">
          파티 참여가 완료되었습니다!
        </h2>
        <p className="text-xs text-ink-dim font-kr max-w-[260px] leading-relaxed">
          오늘 남겨주신 실시간 탭과 반응은 플로어의 소중한 비트가 되었습니다.
        </p>

        <div className="w-full pt-8">
          <Button variant="primary" size="lg" isFullWidth onClick={onRestart}>
            새로운 세션 시작하기 🔄
          </Button>
        </div>
      </div>
    </Screen>
  );
}
