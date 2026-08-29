interface ReactionRateBarProps { goodCount: number; soSoCount: number; badCount: number; }

function percentages(counts: number[]) {
  const safe = counts.map((count) => Math.max(0, count));
  const total = safe.reduce((sum, count) => sum + count, 0);
  if (total === 0) return { values: [0, 0, 0], total: 0 };

  const exact = safe.map((count) => (count / total) * 100);
  const values = exact.map(Math.floor);
  const remainder = 100 - values.reduce((sum, value) => sum + value, 0);
  const order = exact.map((value, index) => ({ index, fraction: value - values[index] })).sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index += 1) values[order[index].index] += 1;
  return { values, total };
}

export function ReactionRateBar({ goodCount, soSoCount, badCount }: ReactionRateBarProps) {
  const { values: [goodPct, soSoPct, badPct], total } = percentages([goodCount, soSoCount, badCount]);

  return (
    <section className="w-full space-y-2" aria-label="실시간 반응률">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-ink">실시간 반응률</span>
        <span className="text-ink-dim">방금 {total.toLocaleString()}명 반응</span>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full bg-accent transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${goodPct}%` }} />
        <div className="h-full bg-yellow-400 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${soSoPct}%` }} />
        <div className="h-full bg-slate-500 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${badPct}%` }} />
      </div>
      <div className="flex items-center justify-between font-en text-[11px] font-bold tabular-nums sm:text-xs">
        <span className="text-accent-light">🔥 {goodPct}%</span>
        <span className="text-yellow-300">😐 {soSoPct}%</span>
        <span className="text-slate-300">🥱 {badPct}%</span>
      </div>
    </section>
  );
}
