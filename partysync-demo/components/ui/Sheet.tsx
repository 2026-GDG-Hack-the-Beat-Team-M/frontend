import React, { useEffect } from 'react';
import { clsx } from 'clsx';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Sheet({ isOpen, onClose, title, children }: SheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative z-10 w-full max-w-md bg-surface-2 border-t border-white/10 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto hide-scrollbar">
        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-5" />

        {title && (
          <h3 className="text-lg font-bold text-ink text-center mb-4 tracking-wide font-kr">
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  );
}
