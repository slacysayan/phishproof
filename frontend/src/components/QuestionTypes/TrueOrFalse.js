import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldX, Quote } from 'lucide-react';

export const TrueOrFalse = ({ scenario, onAnswer, disabled }) => {
  const cardRef = useRef(null);

  const handle = (guess) => {
    if (disabled) return;
    // 3D card flip
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateY: 180, duration: 0.5, ease: 'power2.inOut' });
    }
    const correct = (guess === 'true') === !!scenario.isTrue;
    onAnswer(correct ? 'correct' : 'incorrect', { guess });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Fact Card */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-6 md:p-8 min-h-[200px] flex flex-col items-center justify-center text-center shadow-lg"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        data-testid="tof-card"
      >
        <div className="text-white/50 text-[10px] uppercase tracking-[3px] font-bold mb-4">Safety Fact Check</div>
        <div className="flex items-start gap-2 mb-2">
          <Quote className="w-5 h-5 text-white/30 shrink-0 mt-1" />
        </div>
        <div className="font-bold text-xl md:text-2xl text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
          "{scenario.statement}"
        </div>
        <div className="mt-4 text-white/40 text-[10px] uppercase tracking-widest font-semibold">True or False?</div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3" data-testid="tof-actions">
        <button
          disabled={disabled}
          onClick={() => handle('false')}
          className="pp-duo-btn pp-duo-red h-14 text-sm flex items-center justify-center gap-2 w-full"
          data-testid="tof-false-button"
        >
          <ShieldX className="w-5 h-5" /> FALSE
        </button>
        <button
          disabled={disabled}
          onClick={() => handle('true')}
          className="pp-duo-btn pp-duo-green h-14 text-sm flex items-center justify-center gap-2 w-full"
          data-testid="tof-true-button"
        >
          <ShieldCheck className="w-5 h-5" /> TRUE
        </button>
      </div>
    </div>
  );
};

export default TrueOrFalse;
