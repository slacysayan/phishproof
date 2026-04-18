import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ClayButton } from '@/components/UI/ClayButton';
import { ShieldCheck, ShieldX } from 'lucide-react';

export const TrueOrFalse = ({ scenario, onAnswer, disabled }) => {
  const cardRef = useRef(null);

  const handle = (guess) => {
    if (disabled) return;
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 180, duration: 0.5, ease: 'power2.inOut' });
    // scenario.isTrue is the truth; guess is 'true' or 'false'
    const correct = (guess === 'true') === !!scenario.isTrue;
    onAnswer(correct ? 'correct' : 'incorrect', { guess });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={cardRef}
        className="pp-glass p-6 min-h-[180px] flex items-center justify-center text-center"
        style={{ transformStyle: 'preserve-3d' }}
        data-testid="tof-card"
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60 mb-3 font-heading">Safety Fact Check</div>
          <div className="font-heading font-black text-xl text-white leading-snug">“{scenario.statement}”</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3" data-testid="tof-actions">
        <ClayButton variant="danger" size="xl" disabled={disabled} onClick={() => handle('false')} data-testid="tof-false-button" className="flex items-center justify-center gap-2">
          <ShieldX className="w-5 h-5" /> FALSE
        </ClayButton>
        <ClayButton variant="success" size="xl" disabled={disabled} onClick={() => handle('true')} data-testid="tof-true-button" className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5" /> TRUE
        </ClayButton>
      </div>
    </div>
  );
};

export default TrueOrFalse;
