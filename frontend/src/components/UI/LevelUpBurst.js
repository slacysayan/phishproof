import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { ClayButton } from './ClayButton';
import { LEVELS } from '@/data/gameConfig';
import Kavach from '@/components/Mascot/Kavach';

export const LevelUpBurst = ({ newLevel, onClose }) => {
  const numberRef = useRef(null);
  const mascotRef = useRef(null);
  const levelData = LEVELS.find((l) => l.level === newLevel) || LEVELS[0];

  useEffect(() => {
    confetti({
      particleCount: 300,
      spread: 140,
      origin: { y: 0.45 },
      colors: ['#FFD700', '#5C6BC0', '#F44336', '#4CAF50', '#4facfe'],
    });
    gsap.fromTo(
      numberRef.current,
      { scale: 0, rotation: -90 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2.4)' }
    );
    setTimeout(() => {
      if (mascotRef.current) mascotRef.current.playExpression('excited');
    }, 400);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(10,15,34,0.78)', backdropFilter: 'blur(18px)' }}
        data-testid="levelup-overlay"
      >
        <div className="pp-glass w-full max-w-sm p-8 text-center">
          <div className="text-white/70 uppercase tracking-widest text-xs mb-1">Level Up!</div>
          <div ref={numberRef} className="font-heading font-black text-8xl gradient-text leading-none mb-3">
            {newLevel}
          </div>
          <div className="mb-4">
            <Kavach ref={mascotRef} size={120} expression="excited" />
          </div>
          <h2 className="text-2xl font-heading font-black text-white mb-1">{levelData.title}</h2>
          <p className="text-white/70 mb-6 text-sm">New title unlocked — keep going!</p>
          <ClayButton variant="primary" onClick={onClose} data-testid="levelup-close" className="w-full">Continue</ClayButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelUpBurst;
