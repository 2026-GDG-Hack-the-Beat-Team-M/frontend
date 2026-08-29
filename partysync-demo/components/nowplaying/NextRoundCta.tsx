import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { REACTION_CONFIG } from '@/lib/nowplaying/reactionConfig';

interface NextRoundCtaProps {
  isLastRound: boolean;
  onNext: () => void;
}

export function NextRoundCta({ isLastRound, onNext }: NextRoundCtaProps) {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPulse(true);
    }, REACTION_CONFIG.CTA_PULSE_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const label = isLastRound
    ? '내 취향 결과 보기 ✨'
    : '다음 배틀 하기 ▶';

  return (
    <div className="w-full pt-3">
      <Button
        variant="primary"
        size="lg"
        isFullWidth
        onClick={onNext}
        className={clsx(
          shouldPulse && 'animate-cta-pulse ring-2 ring-accent/50'
        )}
      >
        {label}
      </Button>
    </div>
  );
}
