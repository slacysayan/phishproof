import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, AlertTriangle } from 'lucide-react';
import { ClayButton } from '@/components/UI/ClayButton';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';

export const LegitOrScam = ({ scenario, onAnswer, disabled }) => {
  const cardRef = useRef(null);

  const handle = (guess) => {
    if (disabled) return;
    const card = cardRef.current;
    if (card) {
      const dir = guess === 'legit' ? 1 : -1;
      gsap.to(card, { x: dir * 120, rotate: dir * 8, opacity: 0.8, duration: 0.25, ease: 'power2.out' });
    }
    onAnswer(guess);
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={cardRef}>
        <ScenarioDeviceFrame type={scenario.type} content={scenario.content} />
      </div>
      <div className="text-center text-white/80 text-sm font-heading font-bold mt-1" data-testid="question-prompt">
        Is this legit or a scam?
      </div>
      <div className="grid grid-cols-2 gap-3" data-testid="game-actions">
        <ClayButton
          variant="danger"
          size="xl"
          onClick={() => handle('scam')}
          disabled={disabled}
          data-testid="game-scam-button"
          className="flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-5 h-5" /> SCAM
        </ClayButton>
        <ClayButton
          variant="success"
          size="xl"
          onClick={() => handle('legit')}
          disabled={disabled}
          data-testid="game-legit-button"
          className="flex items-center justify-center gap-2"
        >
          <Shield className="w-5 h-5" /> LEGIT
        </ClayButton>
      </div>
    </div>
  );
};

export default LegitOrScam;
