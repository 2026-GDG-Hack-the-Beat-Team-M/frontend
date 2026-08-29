import { RoundResult, RoundReaction, Track } from '@/types';
import presets from './presets.json';

export const MOCK_TRACK_WINNER: Track = presets[0].trackA;
export const MOCK_TRACK_LOSER: Track = presets[0].trackB;

export const MOCK_ROUND_RESULTS: RoundResult[] = [
  {
    round: 1,
    winner: presets[0].trackA,
    winnerSide: 'A',
    myTeam: 'A',
    myTapCount: 68,
    didIWin: true,
    scoreA: 1247,
    scoreB: 1102,
    ratioA: 0.53,
    ratioB: 0.47,
  },
  {
    round: 2,
    winner: presets[1].trackB,
    winnerSide: 'B',
    myTeam: 'A',
    myTapCount: 52,
    didIWin: false,
    scoreA: 980,
    scoreB: 1150,
    ratioA: 0.46,
    ratioB: 0.54,
  },
  {
    round: 3,
    winner: presets[2].trackA,
    winnerSide: 'A',
    myTeam: 'A',
    myTapCount: 75,
    didIWin: true,
    scoreA: 1420,
    scoreB: 1210,
    ratioA: 0.54,
    ratioB: 0.46,
  },
];

export const MOCK_ROUND_REACTIONS: RoundReaction[] = [
  {
    round: 1,
    trackId: presets[0].trackA.id,
    reaction: 'good',
    tags: ['#비트가_신나요', '#플로어_폭발'],
    isLiked: true,
  },
  {
    round: 2,
    trackId: presets[1].trackB.id,
    reaction: 'soso',
    tags: ['#드랍이_약함'],
    isLiked: false,
  },
  {
    round: 3,
    trackId: presets[2].trackA.id,
    reaction: 'good',
    tags: ['#떼창각', '#새벽감성'],
    isLiked: true,
  },
];
