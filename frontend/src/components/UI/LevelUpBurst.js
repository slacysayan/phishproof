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
    confetti({ particleCount: 300, spread: 140, origin: { y: 0.45 }, colors: ['#58cc02','#1cb0f6','#ffb703','#ff4b4b'] });
    gsap.fromTo(numberRef.current, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2.4)' });
    setTimeout(() => { if (mascotRef.current) mascotRef.current.playExpression('excited'); }, 400);
  }, []);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)' }} data-testid="levelup-overlay">
        <div className="bg-white rounded-[20px] shadow-[0_30px_80px_rgba(34,42,53,0.15),0_0_0_1px_rgba(34,42,53,0.08)] w-full max-w-sm p-8 text-center">
          <div className="text-[#898989] uppercase tracking-widest text-xs mb-1 font-semibold">Level Up!</div>
          <div ref={numberRef} className="font-bold text-8xl gradient-text leading-none mb-3" style={{fontFamily:'var(--font-display)'}}>{newLevel}</div>
          <div className="mb-4"><Kavach ref={mascotRef} size={120} expression="excited" /></div>
          <h2 className="text-2xl font-bold text-[#242424] mb-1" style={{fontFamily:'var(--font-display)'}}>{levelData.title}</h2>
          <p className="text-[#6b6b6b] mb-6 text-sm">New title unlocked — keep going!</p>
          <ClayButton variant="primary" onClick={onClose} data-testid="levelup-close" className="w-full">Continue</ClayButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelUpBurst;
