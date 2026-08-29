'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NowPlayingScreen, type NowPlayingTrack } from '@/components/nowplaying/NowPlayingScreen';

const baseTrack: NowPlayingTrack = {
  id: 'preview-winner',
  title: 'Midnight Signal',
  artist: 'PartySync Crew',
  artworkUrl: '/artwork/r1a.svg',
  genreTags: ['#드랍이미쳤다', '#떼창각', '#베이스터짐', '#오늘선곡미침', '#비트가좋아요', '#감성미쳤다'],
  durationSec: 228,
};

function Preview() {
  const params = useSearchParams();
  const scenario = params.get('case') ?? 'win';
  const isLoss = scenario === 'loss';
  const isFinal = scenario === 'final';
  const isMissingArtwork = scenario === 'missing-artwork';
  const isZeroScore = scenario === 'zero-score';

  return (
    <NowPlayingScreen
      round={isFinal ? 3 : isLoss ? 2 : 1}
      totalRounds={3}
      winnerTrack={{ ...baseTrack, id: `preview-${scenario}`, artworkUrl: isMissingArtwork ? undefined : baseTrack.artworkUrl }}
      scoreA={isZeroScore ? 0 : 1247}
      scoreB={isZeroScore ? 0 : 1102}
      userPickedWinner={!isLoss}
      onReactionChange={(reaction) => console.info('[nowplaying preview] reaction', reaction)}
      onTagsChange={(tags) => console.info('[nowplaying preview] tags', tags)}
      onNext={() => console.info('[nowplaying preview] next')}
    />
  );
}

export default function NowPlayingPreviewPage() {
  return <Suspense fallback={null}><Preview /></Suspense>;
}
