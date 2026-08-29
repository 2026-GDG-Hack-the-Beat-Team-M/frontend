'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RoundResult } from '@/types';
import { TasteResultScreen } from '@/components/result/TasteResultScreen';
import { MOCK_ROUND_RESULTS, MOCK_ROUND_REACTIONS } from '@/data/fixtures';
import { TRACK_LIST } from '@/data/tracks';

/**
 * 취향 결과 화면 케이스 검증용.
 * ?case=3win | 2win | 0win | kpop | omnivore | abstain | newbie
 */
function buildCase(caseParam: string): {
  battleLogs: RoundResult[];
  reactionLogs: typeof MOCK_ROUND_REACTIONS;
} {
  const base = MOCK_ROUND_RESULTS;

  switch (caseParam) {
    case '3win':
      return {
        battleLogs: base.map((b) => ({
          ...b,
          didIWin: true,
          winner: b.myTrack ?? b.winner,
          winnerSide: b.myTeam ?? b.winnerSide,
        })),
        reactionLogs: MOCK_ROUND_REACTIONS.map((r, i) => ({
          ...r,
          trackId: base[i].myTrack?.id ?? r.trackId,
        })),
      };

    case '0win':
      return {
        battleLogs: base.map((b) => ({ ...b, didIWin: false })),
        reactionLogs: MOCK_ROUND_REACTIONS,
      };

    // 선택 3곡이 모두 K-POP → 장르 뱃지 100%
    case 'kpop':
      return {
        battleLogs: [
          { ...base[0], myTrack: TRACK_LIST.rescene },
          { ...base[1], myTrack: TRACK_LIST.newjeans },
          { ...base[2], myTrack: TRACK_LIST.young_k },
        ],
        reactionLogs: MOCK_ROUND_REACTIONS,
      };

    // 3곡 장르가 모두 달라 최빈 33% → 옴니보어
    case 'omnivore':
      return {
        battleLogs: [
          { ...base[0], myTrack: TRACK_LIST.rescene },
          { ...base[1], myTrack: TRACK_LIST.dj_khaled },
          { ...base[2], myTrack: TRACK_LIST.epik_high },
        ],
        reactionLogs: MOCK_ROUND_REACTIONS,
      };

    // R2에서 아무 곡도 고르지 않음 → 2곡만 분석
    case 'abstain':
      return {
        battleLogs: [
          base[0],
          { ...base[1], myTeam: null, myTrack: null, myTapCount: 0, didIWin: false },
          base[2],
        ],
        reactionLogs: MOCK_ROUND_REACTIONS,
      };

    // 탭 0 · 반응 0 → 폴백 뱃지
    case 'newbie':
      return {
        battleLogs: base.map((b) => ({
          ...b,
          myTeam: null,
          myTrack: null,
          myTapCount: 0,
          didIWin: false,
        })),
        reactionLogs: [],
      };

    default:
      return { battleLogs: base, reactionLogs: MOCK_ROUND_REACTIONS };
  }
}

function DevResultContent() {
  const searchParams = useSearchParams();
  const caseParam = searchParams.get('case') || '2win';
  const { battleLogs, reactionLogs } = buildCase(caseParam);

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col justify-center items-center">
      <TasteResultScreen
        nickname="DevTester_77"
        battleLogs={battleLogs}
        reactionLogs={reactionLogs}
        onSubmitFeedback={(rating, comment) => {
          alert(`[Dev Feedback] Rating: ${rating}, Comment: "${comment}"`);
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
