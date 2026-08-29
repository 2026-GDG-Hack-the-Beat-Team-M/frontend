'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface NextRoundCtaProps { isLastRound: boolean; onNext?: () => void | Promise<void>; }

export function NextRoundCta({ isLastRound, onNext }: NextRoundCtaProps) {
  const [shouldPulse, setShouldPulse] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldPulse(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  const label = isLastRound ? '내 취향 결과 보기 ✨' : '다음 배틀 하기 ▶';
  const handleNext = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitting(true);
    setShouldPulse(false);
    void onNext?.();
  };

  return (
    <div className="sticky bottom-0 z-20 -mx-1 mt-4 bg-gradient-to-t from-bg via-bg/95 to-transparent px-1 pb-[max(.25rem,env(safe-area-inset-bottom))] pt-5">
      <button
        type="button" onClick={handleNext} disabled={isSubmitting} aria-label={label}
        className={clsx('min-h-[56px] w-full rounded-2xl bg-gradient-to-r from-accent to-accent-light px-6 py-4 text-base font-black tracking-wide text-white shadow-glow-accent transition duration-200 hover:brightness-110 active:scale-[.98] disabled:cursor-wait disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg', shouldPulse && 'motion-safe:animate-cta-pulse')}
      >
        {isSubmitting ? '이동 중…' : label}
      </button>
    </div>
  );
}
