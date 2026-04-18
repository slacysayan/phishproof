import React from 'react';
import { cn } from '@/lib/utils';

// Duolingo-style 3D-pressed buttons with Cal.com palette discipline.
const variants = {
  primary: 'pp-duo-btn pp-duo-green',
  success: 'pp-duo-btn pp-duo-green',
  danger: 'pp-duo-btn pp-duo-red',
  neutral: 'pp-duo-btn pp-duo-dark',
  ghost: 'pp-duo-btn pp-duo-ghost',
  gold: 'pp-duo-btn pp-duo-blue',
};

const sizes = {
  sm: 'h-10 px-4 text-[11px]',
  md: 'h-12 px-5 text-xs',
  lg: 'h-14 px-6 text-xs',
  xl: 'h-14 px-7 text-sm',
};

export const ClayButton = React.forwardRef(({ className, variant = 'primary', size = 'lg', disabled, children, ...props }, ref) => (
  <button
    ref={ref}
    disabled={disabled}
    className={cn(variants[variant] || variants.primary, sizes[size] || sizes.lg, className)}
    {...props}
  >
    {children}
  </button>
));
ClayButton.displayName = 'ClayButton';

export default ClayButton;
