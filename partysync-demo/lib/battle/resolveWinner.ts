import { BattleSide, BattlePreset, RoundResult } from '@/types';

export function resolveWinner(
  preset: BattlePreset,
  scoreA: number,
  scoreB: number,
  myTeam: BattleSide | null,
  myTapCount: number
): RoundResult {
  let winnerSide: BattleSide;

  if (scoreA > scoreB) {
    winnerSide = 'A';
  } else if (scoreB > scoreA) {
    winnerSide = 'B';
  } else {
    // Random tie-break
    winnerSide = Math.random() < 0.5 ? 'A' : 'B';
  }

  const winner = winnerSide === 'A' ? preset.trackA : preset.trackB;
  const total = scoreA + scoreB;
  const ratioA = total > 0 ? Number((scoreA / total).toFixed(2)) : 0.5;
  const ratioB = total > 0 ? Number((scoreB / total).toFixed(2)) : 0.5;
  const didIWin = myTeam !== null && myTeam === winnerSide;

  // 사용자가 한 번도 탭하지 않았다면 선택 없음(null). 승리곡으로 대체하지 않는다.
  const myTrack =
    myTeam === 'A' ? preset.trackA : myTeam === 'B' ? preset.trackB : null;

  return {
    round: preset.round,
    winner,
    winnerSide,
    myTeam,
    myTrack,
    myTapCount,
    didIWin,
    scoreA,
    scoreB,
    ratioA,
    ratioB,
  };
}
