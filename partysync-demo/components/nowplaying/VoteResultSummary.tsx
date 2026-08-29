interface VoteResultSummaryProps { scoreA: number; scoreB: number; winnerScore?: number; userPickedWinner: boolean; }

export function VoteResultSummary({ scoreA, scoreB, winnerScore, userPickedWinner }: VoteResultSummaryProps) {
  const safeA = Math.max(0, scoreA);
  const safeB = Math.max(0, scoreB);
  const total = safeA + safeB;
  const resolvedWinnerScore = Math.max(0, winnerScore ?? Math.max(safeA, safeB));
  const winnerPercent = total > 0 ? Math.round((resolvedWinnerScore / total) * 100) : 0;

  return (
    <section className="my-3 w-full rounded-2xl border border-white/10 bg-surface-1/90 p-3 text-center" aria-label="투표 결과">
      <p className="font-en text-sm font-bold tabular-nums text-ink">
        {safeA.toLocaleString()} <span className="px-1 text-ink-muted">vs</span> {safeB.toLocaleString()}
        <span className="ml-2 text-accent-light">{winnerPercent}%로 승리</span>
      </p>
      {userPickedWinner ? (
        <p className="mt-1.5 text-sm font-bold text-neon-green">🙌 내가 고른 곡이 이겼어요!</p>
      ) : (
        <div className="mt-1.5 text-sm text-ink-dim"><p className="font-bold text-ink">아쉽게 졌어요</p><p className="text-xs">다음 배틀에서 뒤집어봐요</p></div>
      )}
    </section>
  );
}
