import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';

export const LegitOrScam = ({ scenario, onAnswer, disabled }) => {
  const cardRef = useRef(null);

  const handle = (guess) => {
    if (disabled) return;
    const card = cardRef.current;
    if (card) {
      const dir = guess === 'legit' ? 1 : -1;
      gsap.to(card, { x: dir * 100, rotate: dir * 6, opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
    onAnswer(guess);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Scenario Preview */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <ScenarioDeviceFrame type={scenario.type} content={scenario.content} />
      </motion.div>

      {/* Question Prompt */}
      <div className="text-center" data-testid="question-prompt">
        <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold mb-1">Analyze this message</div>
        <h3 className="font-bold text-xl text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>
          Is this legit or a scam?
        </h3>
      </div>

      {/* Duo-style Action Buttons */}
      <div className="grid grid-cols-2 gap-3" data-testid="game-actions">
        <button
          onClick={() => handle('scam')}
          disabled={disabled}
          className="pp-duo-btn pp-duo-red h-14 text-sm flex items-center justify-center gap-2 w-full"
          data-testid="game-scam-button"
        >
          <AlertTriangle className="w-5 h-5" /> SCAM
        </button>
        <button
          onClick={() => handle('legit')}
          disabled={disabled}
          className="pp-duo-btn pp-duo-green h-14 text-sm flex items-center justify-center gap-2 w-full"
          data-testid="game-legit-button"
        >
          <Shield className="w-5 h-5" /> LEGIT
        </button>
      </div>
    </div>
  );
};

export default LegitOrScam;
