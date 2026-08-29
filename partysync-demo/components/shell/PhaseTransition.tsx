import React from 'react';

interface PhaseTransitionProps {
  children: React.ReactNode;
  phaseKey: string;
}

export function PhaseTransition({ children, phaseKey }: PhaseTransitionProps) {
  return (
    <div
      key={phaseKey}
      className="w-full flex-1 flex flex-col transition-all duration-300 ease-out animate-in fade-in"
    >
      {children}
    </div>
  );
}
