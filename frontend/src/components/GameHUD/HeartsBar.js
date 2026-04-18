import React from 'react';
import { Heart } from 'lucide-react';

export const HeartsBar = ({ hearts, max = 5 }) => (
  <div className="flex items-center gap-0.5" data-testid="hud-hearts">
    {Array.from({ length: max }).map((_, i) => {
      const filled = i < hearts;
      return (
        <Heart
          key={i}
          className={`w-4 h-4 transition-all ${filled ? 'text-[#ff4b4b] fill-[#ff4b4b]' : 'text-[#e5e5e5]'}`}
          data-testid={`heart-${i}${filled ? '-filled' : '-empty'}`}
        />
      );
    })}
  </div>
);

export default HeartsBar;
