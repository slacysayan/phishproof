import React from 'react';

export const ProgressDots = ({ current, total }) => (
  <div className="flex items-center gap-1" data-testid="hud-progress-dots">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`rounded-full transition-all ${
          i < current ? 'h-1 w-5 bg-[#58cc02]' : i === current ? 'h-1 w-3 bg-[#242424]' : 'h-1 w-1 bg-[#e0e0e0]'
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
