import React from 'react';
import { Flame } from 'lucide-react';

export const StreakBadge = ({ count, multiplier }) => (
  <div className="flex items-center gap-1 font-heading font-black text-sm text-white" data-testid="hud-streak">
    <Flame className={`w-5 h-5 text-[#FF9800] ${count >= 1 ? 'pp-fire' : ''}`} style={{ filter: count >= 3 ? 'drop-shadow(0 0 10px rgba(255,152,0,0.8))' : 'none' }} />
    <span>{count}</span>
    {multiplier && multiplier > 1 && (
      <span className="text-[10px] text-[#FFD700]">x{multiplier}</span>
    )}
  </div>
);

export default StreakBadge;
