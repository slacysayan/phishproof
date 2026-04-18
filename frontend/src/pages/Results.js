import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Kavach from '@/components/Mascot/Kavach';
import { ClayButton } from '@/components/UI/ClayButton';
import GlassCard from '@/components/UI/GlassCard';
import { Star, RotateCw, Home, ChevronRight } from 'lucide-react';
import { playSFX } from '@/lib/soundFX';
import { useGameStore } from '@/store/gameStore';

const Results = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [state, setState] = useState(null);
  const xpRef = useRef(null);
  const starsRef = useRef([]);
  const { soundEnabled } = useGameStore();

  useEffect(() => {
    const s = sessionStorage.getItem('pp_results');
    if (s) setState(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (!state) return;
    // Animate stars in
    const stars = state.stars || 0;
    starsRef.current.forEach((el, i) => {
      if (!el) return;
      if (i < stars) {
        gsap.fromTo(el, { scale: 0, rotation: -180, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5, delay: i * 0.25, ease: 'back.out(2)' });
        setTimeout(() => playSFX('xp', soundEnabled), i * 250 + 100);
      } else {
        gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.3, duration: 0.4, delay: i * 0.15 });
      }
    });
    // Animate XP counter
    if (xpRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: state.sessionXP || 0,
        duration: 1.5,
        delay: 0.4,
        ease: 'power2.out',
        onUpdate: () => { if (xpRef.current) xpRef.current.textContent = Math.round(obj.val); },
      });
    }
    if (stars >= 2) {
      setTimeout(() => {
        confetti({ particleCount: 160, spread: 90, origin: { y: 0.4 }, colors: ['#FFD700','#5C6BC0','#4CAF50','#F5576C'] });
      }, 800);
    }
  }, [state, soundEnabled]);

  if (!state) {
    return (
      <div className="min-h-dvh pp-animated-bg flex items-center justify-center">
        <div className="pp-glass p-6 text-white">Loading results…</div>
      </div>
    );
  }

  const { stars = 0, sessionXP = 0, correctCount = 0, total = 8, failed } = state;
  const accuracy = Math.round((correctCount / total) * 100);
  const title = failed ? 'Lesson Failed' : stars === 3 ? 'Perfect!' : stars === 2 ? 'Great work!' : stars === 1 ? 'Not bad!' : 'Try again!';
  const expr = failed ? 'sad' : stars >= 2 ? 'excited' : 'idle';

  return (
    <div className="min-h-dvh pp-animated-bg relative overflow-hidden" data-testid="results-page">
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="relative z-10 mx-auto w-full max-w-[440px] px-4 pt-8 pb-10 flex flex-col gap-5">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center">
          <Kavach size={140} expression={expr} />
        </motion.div>
        <div className="text-center">
          <h1 className="font-heading font-black text-4xl text-white gradient-text">{title}</h1>
          <p className="text-white/70 mt-1 text-sm">{failed ? 'Lost all hearts. Retry to master this lesson.' : 'Lesson complete'}</p>
        </div>

        <div className="flex items-center justify-center gap-3" data-testid="results-stars">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              ref={(el) => (starsRef.current[i] = el)}
              className={`w-14 h-14 ${i < stars ? 'text-[#FFD700] fill-[#FFD700] drop-shadow-[0_12px_24px_rgba(255,215,0,0.35)]' : 'text-white/30'}`}
            />
          ))}
        </div>

        <GlassCard className="p-5 text-center" data-testid="results-stars-xp">
          <div className="text-xs text-white/65 uppercase tracking-widest">XP Earned</div>
          <div ref={xpRef} data-testid="results-xp-counter" className="font-heading font-black text-5xl text-[#FFD700] leading-none my-2">0</div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div><div className="text-[11px] text-white/60 uppercase">Correct</div><div className="font-heading font-black text-white">{correctCount}/{total}</div></div>
            <div className="w-px h-8 bg-white/10" />
            <div><div className="text-[11px] text-white/60 uppercase">Accuracy</div><div className="font-heading font-black text-white">{accuracy}%</div></div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <ClayButton variant="ghost" size="lg" onClick={() => { try { sessionStorage.removeItem(`pp_scenarios_${lessonId}`); sessionStorage.removeItem('pp_resume'); } catch(e){} navigate(`/lesson/${lessonId}`); }} data-testid="results-retry-button" className="flex items-center justify-center gap-2">
            <RotateCw className="w-4 h-4" /> Try Again
          </ClayButton>
          <ClayButton variant="primary" size="lg" onClick={() => navigate('/map')} data-testid="results-back-to-map-button" className="flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Skill Map
          </ClayButton>
        </div>
      </div>
    </div>
  );
};

export default Results;
