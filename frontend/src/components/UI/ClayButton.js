import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'text-white bg-[rgb(var(--pp-indigo))] hover:bg-[rgba(92,107,192,0.92)] shadow-[0_18px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-10px_24px_rgba(0,0,0,0.25)] border-white/10',
  success: 'text-white bg-[rgb(var(--pp-correct))] hover:bg-[rgba(76,175,80,0.92)] shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-10px_22px_rgba(0,0,0,0.22)] border-white/10',
  danger: 'text-white bg-[rgb(var(--pp-wrong))] hover:bg-[rgba(244,67,54,0.92)] shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-10px_22px_rgba(0,0,0,0.22)] border-white/10',
  neutral: 'text-[#0B1020] bg-[rgba(255,255,255,0.9)] hover:bg-white shadow-[var(--pp-shadow-clay-1),var(--pp-shadow-clay-2),var(--pp-shadow-clay-3)] border-white/20',
  ghost: 'text-white bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.18)] border border-white/15 backdrop-blur-[18px] shadow-[var(--pp-shadow-glass-1),var(--pp-shadow-glass-2)]',
  gold: 'text-[#0B1020] bg-[rgb(var(--pp-xp))] hover:bg-[rgba(255,215,0,0.92)] shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-10px_22px_rgba(0,0,0,0.18)] border-white/20',
};

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm',
  lg: 'h-14 px-6 text-base',
  xl: 'h-16 px-8 text-lg',
};

export const ClayButton = React.forwardRef(({ className, variant = 'primary', size = 'lg', disabled, children, ...props }, ref) => (
  <button
    ref={ref}
    disabled={disabled}
    className={cn(
      'rounded-[18px] font-heading font-extrabold tracking-wide border transition-[transform,background-color,box-shadow] duration-150 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-ring)] disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {children}
  </button>
));
ClayButton.displayName = 'ClayButton';

export default ClayButton;
