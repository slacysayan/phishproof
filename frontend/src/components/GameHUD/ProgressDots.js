import React from 'react';

export const ProgressDots = ({ current, total }) => (
  <div className="flex items-center gap-1.5" data-testid="hud-progress-dots">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`rounded-full transition-all ${
          i < current ? 'h-1.5 w-6 bg-[#5C6BC0]' : i === current ? 'h-1.5 w-4 bg-white/80' : 'h-1.5 w-1.5 bg-white/25'
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
