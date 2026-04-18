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
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#58cc02','#1cb0f6','#ffb703','#ff4b4b','#ff9800'] });
    gsap.fromTo(badgeRef.current, { y: -200, scale: 0.3, rotation: -30 }, { y: 0, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)' });
  }, [badge]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)' }} data-testid="badge-unlock-overlay">
        <div className="bg-white rounded-[20px] shadow-[0_30px_80px_rgba(34,42,53,0.15),0_0_0_1px_rgba(34,42,53,0.08)] w-full max-w-sm p-8 text-center">
          <div className="text-[#898989] uppercase tracking-widest text-xs mb-2 font-semibold">Badge Unlocked!</div>
          <div ref={badgeRef} className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-[#ffb703] via-[#ff9800] to-[#ff4b4b] flex items-center justify-center text-6xl mb-4 shadow-[0_18px_40px_rgba(255,183,3,0.35)] border-4 border-white">
            {badge.icon}
          </div>
          <h2 className="text-3xl font-bold text-[#242424] mb-1" style={{fontFamily:'var(--font-display)'}}>{badge.name}</h2>
          <p className="text-[#6b6b6b] mb-6">{badge.desc}</p>
          <ClayButton variant="primary" onClick={onClose} data-testid="badge-unlock-close" className="w-full">Awesome!</ClayButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgeUnlock;
