import React from 'react';
import { cn } from '@/lib/utils';

export const GlassCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    data-testid="glass-card"
    className={cn(
      'bg-white rounded-[var(--pp-r-md)] shadow-[var(--pp-shadow-card)]',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
GlassCard.displayName = 'GlassCard';

export default GlassCard;
