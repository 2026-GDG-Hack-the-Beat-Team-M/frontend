import { RoundResult, RoundReaction, Track } from '@/types';
import { TRACK_LIST } from './tracks';
import { STATIC_MATCHUPS } from './matchups';

export const MOCK_MATCHUPS = STATIC_MATCHUPS;
export const MOCK_TRACK_WINNER: Track = TRACK_LIST.rescene;
export const MOCK_TRACK_LOSER: Track = TRACK_LIST.ariana_grande;

/**
 * 2승 1패 시나리오.
 * R1 리센느(승) / R2 뉴진스(패, 내 픽) / R3 에픽하이(승)
 * → 내가 고른 3곡: 리센느, 뉴진스, 에픽하이
 */
export const MOCK_ROUND_RESULTS: RoundResult[] = [
  {
    round: 1,
    winner: TRACK_LIST.rescene,
    winnerSide: 'B',
    myTeam: 'B',
    myTrack: TRACK_LIST.rescene,
    myTapCount: 68,
    didIWin: true,
    scoreA: 1120,
    scoreB: 1340,
    ratioA: 0.46,
    ratioB: 0.54,
  },
  {
    round: 2,
    winner: TRACK_LIST.dj_khaled,
    winnerSide: 'A',
    myTeam: 'B',
    myTrack: TRACK_LIST.newjeans,
    myTapCount: 52,
    didIWin: false,
    scoreA: 1210,
    scoreB: 980,
    ratioA: 0.55,
    ratioB: 0.45,
  },
  {
    round: 3,
    winner: TRACK_LIST.epik_high,
    winnerSide: 'A',
    myTeam: 'A',
    myTrack: TRACK_LIST.epik_high,
    myTapCount: 75,
    didIWin: true,
    scoreA: 1450,
    scoreB: 1180,
    ratioA: 0.55,
    ratioB: 0.45,
  },
];

/** 반응 대상은 언제나 그 라운드의 승리곡이다. */
export const MOCK_ROUND_REACTIONS: RoundReaction[] = [
  {
    round: 1,
    trackId: TRACK_LIST.rescene.id,
    reaction: 'good',
    tags: ['#비트가_신나요', '#플로어_폭발'],
    isLiked: true,
  },
  {
    round: 2,
    trackId: TRACK_LIST.dj_khaled.id,
    reaction: 'soso',
    tags: [],
    isLiked: false,
  },
  {
    round: 3,
    trackId: TRACK_LIST.epik_high.id,
    reaction: 'good',
    tags: ['#떼창각', '#새벽감성'],
    isLiked: true,
  },
];
