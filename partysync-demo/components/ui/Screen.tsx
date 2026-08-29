import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isCritical?: boolean;
}

export function Screen({ children, className, isCritical = false, ...props }: ScreenProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'relative w-full max-w-md min-h-screen mx-auto bg-bg text-ink flex flex-col justify-between overflow-hidden px-4 py-6 safe-top safe-bottom',
          className
        )
      )}
      {...props}
    >
      {/* Top Ambient Glow Orb */}
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[340px] rounded-full blur-[90px] transition-colors duration-700 opacity-30',
          isCritical ? 'bg-critical' : 'bg-accent'
        )}
      />

      {/* Bottom Ambient Glow Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-1/2 -translate-x-1/2 w-[380px] h-[300px] rounded-full blur-[100px] bg-neon-purple/20 opacity-25"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
