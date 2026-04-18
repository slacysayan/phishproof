import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { BADGES } from '@/data/gameConfig';
import { ClayButton } from './ClayButton';

export const BadgeUnlock = ({ badgeId, onClose }) => {
  const badgeRef = useRef(null);
  const badge = BADGES.find((b) => b.id === badgeId);

  useEffect(() => {
    if (!badge) return;
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#5C6BC0', '#F44336', '#4CAF50', '#F093FB'],
    });
    gsap.fromTo(
      badgeRef.current,
      { y: -200, scale: 0.3, rotation: -30 },
      { y: 0, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)' }
    );
  }, [badge]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(10,15,34,0.72)', backdropFilter: 'blur(16px)' }}
        data-testid="badge-unlock-overlay"
      >
        <div className="pp-glass w-full max-w-sm p-8 text-center">
          <div className="text-white/70 uppercase tracking-widest text-xs mb-2">Badge Unlocked!</div>
          <div
            ref={badgeRef}
            className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD700] via-[#F5576C] to-[#F093FB] flex items-center justify-center text-6xl mb-4 shadow-[0_18px_50px_rgba(255,215,0,0.35)] border-4 border-white/40"
          >
            {badge.icon}
          </div>
          <h2 className="text-3xl font-heading font-black text-white mb-1">{badge.name}</h2>
          <p className="text-white/75 mb-6">{badge.desc}</p>
          <ClayButton variant="gold" onClick={onClose} data-testid="badge-unlock-close" className="w-full">Awesome!</ClayButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgeUnlock;
