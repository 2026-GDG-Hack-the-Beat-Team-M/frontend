const BARS = [40, 72, 55, 88, 62, 100, 48, 82, 58, 74, 44, 66];

export function Visualizer() {
  return (
    <div className="flex h-7 items-center justify-center gap-1" aria-hidden="true">
      {BARS.map((height, index) => (
        <span key={index} className="nowplaying-eq block w-1 rounded-full bg-gradient-to-t from-accent to-accent-light" style={{ height: `${height}%`, animationDelay: `${index * -90}ms`, animationDuration: `${700 + (index % 4) * 130}ms` }} />
      ))}
      <style>{`
        .nowplaying-eq { transform-origin: center; animation: equalize ease-in-out infinite alternate; }
        @keyframes equalize { from { transform: scaleY(.35); opacity: .55; } to { transform: scaleY(1); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .nowplaying-eq { animation: none; opacity: .8; } }
      `}</style>
    </div>
  );
}
