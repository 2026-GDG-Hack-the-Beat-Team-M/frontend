'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import presets from '@/data/presets.json';
import { BattleScreen } from '@/components/battle/BattleScreen';

function DevBattleContent() {
  const searchParams = useSearchParams();
  const roundParam = Number(searchParams.get('round')) || 1;
  const targetPreset =
    presets.find((p) => p.round === roundParam) || presets[0];

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center">
      <BattleScreen
        preset={targetPreset}
        currentRound={roundParam}
        onBattleEnd={(res) => {
          alert(`[Dev Battle Finished] Winner: ${res.winner.title} (Side ${res.winnerSide})`);
        }}
      />
    </div>
  );
}

export default function DevBattlePage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading dev battle...</div>}>
      <DevBattleContent />
    </Suspense>
  );
}
