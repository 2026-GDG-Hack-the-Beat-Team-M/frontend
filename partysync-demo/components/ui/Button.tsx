import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { triggerHaptic } from '@/lib/shared/haptics';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  haptic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      haptic = true,
      onClick,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (haptic) triggerHaptic(10);
      onClick?.(e);
    };

    const baseStyles =
      'inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none rounded-2xl min-h-[48px] min-w-[48px]';

    const variants = {
      primary:
        'bg-gradient-to-r from-accent to-accent-light text-white shadow-glow-accent hover:brightness-110 active:brightness-95',
      secondary:
        'bg-surface-2 hover:bg-surface-3 text-ink border border-white/10 shadow-lift-1 active:bg-surface-1',
      outline:
        'bg-transparent border border-accent text-accent hover:bg-accent/10 active:bg-accent/20',
      ghost:
        'bg-transparent text-ink-dim hover:text-ink hover:bg-white/5 active:bg-white/10',
      critical:
        'bg-gradient-to-r from-critical to-critical-light text-white shadow-glow-critical hover:brightness-110 active:brightness-95',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-semibold',
      md: 'px-6 py-3.5 text-sm md:text-base tracking-wide',
      lg: 'px-8 py-4 text-base md:text-lg font-bold tracking-wider',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            isFullWidth && 'w-full',
            className
          )
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
