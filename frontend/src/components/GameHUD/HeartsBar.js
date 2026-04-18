import React from 'react';
import { Heart } from 'lucide-react';

export const HeartsBar = ({ hearts, max = 5 }) => (
  <div className="flex items-center gap-1" data-testid="hud-hearts">
    {Array.from({ length: max }).map((_, i) => {
      const filled = i < hearts;
      return (
        <Heart
          key={i}
          className={`w-5 h-5 transition-all ${filled ? 'text-[#F44336] fill-[#F44336]' : 'text-white/25'}`}
          data-testid={`heart-${i}${filled ? '-filled' : '-empty'}`}
        />
      );
    })}
  </div>
);

export default HeartsBar;
