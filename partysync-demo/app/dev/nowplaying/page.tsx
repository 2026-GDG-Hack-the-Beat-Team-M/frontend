'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NowPlayingScreen } from '@/components/nowplaying/NowPlayingScreen';
import { MOCK_ROUND_RESULTS } from '@/data/fixtures';

function DevNowPlayingContent() {
  const searchParams = useSearchParams();
  const caseParam = searchParams.get('case');
  const isLast = searchParams.get('last') === 'true';

  const mockResult =
    caseParam === 'loss'
      ? { ...MOCK_ROUND_RESULTS[1], didIWin: false }
      : { ...MOCK_ROUND_RESULTS[0], didIWin: true };

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center">
      <NowPlayingScreen
        currentRound={isLast ? 3 : 1}
        lastRoundResult={mockResult}
        onSaveReaction={(rx, tags, isLiked) => {
          console.log('[Dev Reaction Saved]:', { rx, tags, isLiked });
        }}
        onNextRound={() => {
          alert('[Dev NowPlaying Next Round Triggered]');
        }}
      />
    </div>
  );
}

export default function DevNowPlayingPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading dev nowplaying...</div>}>
      <DevNowPlayingContent />
    </Suspense>
  );
}
