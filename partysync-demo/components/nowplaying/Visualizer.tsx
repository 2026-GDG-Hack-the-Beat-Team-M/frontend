import React from 'react';

export function Visualizer() {
  const bars = [
    { height: '60%', delay: '0s' },
    { height: '90%', delay: '0.2s' },
    { height: '40%', delay: '0.4s' },
    { height: '100%', delay: '0.1s' },
    { height: '75%', delay: '0.3s' },
    { height: '50%', delay: '0.5s' },
    { height: '85%', delay: '0.25s' },
    { height: '65%', delay: '0.15s' },
  ];

  return (
    <div className="flex items-end justify-center gap-1.5 h-6 py-1">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1 bg-accent rounded-full animate-pulse"
          style={{
            height: bar.height,
            animationDuration: '0.8s',
            animationDelay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}
