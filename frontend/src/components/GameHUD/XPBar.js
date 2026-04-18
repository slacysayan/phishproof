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
      <span className="text-[11px] font-bold text-[#ffb703] min-w-[20px] text-center leading-none" style={{fontFamily: 'var(--font-display)'}}>
        {current.level}
      </span>
      <div className="flex-1 h-2 rounded-full bg-[#f0f0f0] overflow-hidden relative">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-[#ffb703]"
          style={{ width: '0%' }}
        />
      </div>
      <span className="text-[11px] text-[#898989] tabular-nums" data-testid="hud-xp-value">
        {next ? `${xp}/${next.xp}` : `${xp} XP`}
      </span>
    </div>
  );
};

export default XPBar;
