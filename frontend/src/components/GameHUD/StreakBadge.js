import React from 'react';
import { Flame } from 'lucide-react';

export const StreakBadge = ({ count, multiplier }) => (
  <div className="flex items-center gap-1 font-bold text-xs text-[#242424]" data-testid="hud-streak" style={{fontFamily: 'var(--font-display)'}}>
    <Flame className={`w-4 h-4 text-[#ff9800] ${count >= 1 ? 'pp-fire' : ''}`} />
    <span>{count}</span>
    {multiplier && multiplier > 1 && (
      <span className="text-[10px] text-[#ffb703]">x{multiplier}</span>
    )}
  </div>
);

export default StreakBadge;
