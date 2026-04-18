import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getLevelProgress } from '@/data/gameConfig';

export const XPBar = ({ xp }) => {
  const fillRef = useRef(null);
  const { current, next, percent } = getLevelProgress(xp);

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, { width: `${percent}%`, duration: 0.8, ease: 'power2.out' });
    }
  }, [percent]);

  return (
    <div className="flex items-center gap-2 flex-1" data-testid="hud-xp-bar">
      <span className="text-[11px] font-heading font-black text-[#FFD700] min-w-[24px] text-center leading-none">
        {current.level}
      </span>
      <div className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden relative">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#F5576C] shadow-[0_0_10px_rgba(255,215,0,0.6)]"
          style={{ width: '0%' }}
        />
      </div>
      <span className="text-[11px] text-white/60 tabular-nums" data-testid="hud-xp-value">
        {next ? `${xp}/${next.xp}` : `${xp} XP`}
      </span>
    </div>
  );
};

export default XPBar;
