'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TasteResultScreen } from '@/components/result/TasteResultScreen';
import { MOCK_ROUND_RESULTS, MOCK_ROUND_REACTIONS } from '@/data/fixtures';

function DevResultContent() {
  const searchParams = useSearchParams();
  const caseParam = searchParams.get('case') || '2win';

  let battleLogs = MOCK_ROUND_RESULTS;
  if (caseParam === '3win') {
    battleLogs = MOCK_ROUND_RESULTS.map((b) => ({ ...b, didIWin: true }));
  } else if (caseParam === '0win') {
    battleLogs = MOCK_ROUND_RESULTS.map((b) => ({ ...b, didIWin: false }));
  }

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center">
      <TasteResultScreen
        nickname="DevTester_77"
        battleLogs={battleLogs}
        reactionLogs={MOCK_ROUND_REACTIONS}
        onSubmitFeedback={(rating, comment) => {
          alert(`[Dev Feedback Submitted] Rating: ${rating}, Comment: "${comment}"`);
        }}
      />
    </div>
  );
}

export default function DevResultPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading dev result...</div>}>
      <DevResultContent />
    </Suspense>
  );
}
