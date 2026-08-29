interface TagTickerProps { tags: string[]; }

export function TagTicker({ tags }: TagTickerProps) {
  if (tags.length === 0) return null;
  const repeatedTags = [...tags, ...tags];
  return (
    <div className="-mx-4 overflow-hidden border-y border-white/5 py-2.5 opacity-75" aria-hidden="true">
      <div className="flex w-max gap-5 whitespace-nowrap motion-safe:animate-marquee motion-reduce:translate-x-0">
        {repeatedTags.map((tag, index) => <span key={`${tag}-${index}`} className="text-xs font-semibold text-ink-dim">{tag}</span>)}
      </div>
    </div>
  );
}
