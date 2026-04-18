import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Kavach from '@/components/Mascot/Kavach';
import { ClayButton } from '@/components/UI/ClayButton';
import GlassCard from '@/components/UI/GlassCard';
import { Star, RotateCw, Home } from 'lucide-react';
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
    if (xpRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, { val: state.sessionXP || 0, duration: 1.5, delay: 0.4, ease: 'power2.out', onUpdate: () => { if (xpRef.current) xpRef.current.textContent = Math.round(obj.val); } });
    }
    if (stars >= 2) {
      setTimeout(() => { confetti({ particleCount: 160, spread: 90, origin: { y: 0.4 }, colors: ['#58cc02','#1cb0f6','#ffb703','#ff4b4b'] }); }, 800);
    }
  }, [state, soundEnabled]);

  if (!state) {
    return (<div className="min-h-dvh bg-white flex items-center justify-center"><div className="pp-card p-6 text-[#242424]">Loading results…</div></div>);
  }

  const { stars = 0, sessionXP = 0, correctCount = 0, total = 8, failed } = state;
  const accuracy = Math.round((correctCount / total) * 100);
  const title = failed ? 'Lesson Failed' : stars === 3 ? 'Perfect!' : stars === 2 ? 'Great work!' : stars === 1 ? 'Not bad!' : 'Try again!';
  const expr = failed ? 'sad' : stars >= 2 ? 'excited' : 'idle';

  return (
    <div className="min-h-dvh bg-white" data-testid="results-page">
      <div className="mx-auto w-full max-w-[460px] px-4 pt-10 pb-10 flex flex-col gap-6">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center">
          <Kavach size={140} expression={expr} />
        </motion.div>
        <div className="text-center">
          <h1 className="text-[40px] font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>{title}</h1>
          <p className="text-[#6b6b6b] mt-1 text-sm">{failed ? 'Lost all hearts. Retry to master this lesson.' : 'Lesson complete'}</p>
        </div>

        <div className="flex items-center justify-center gap-3" data-testid="results-stars">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} ref={(el) => (starsRef.current[i] = el)} className={`w-14 h-14 ${i < stars ? 'text-[#ffb703] fill-[#ffb703] drop-shadow-[0_8px_16px_rgba(255,183,3,0.35)]' : 'text-[#e5e5e5]'}`} />
          ))}
        </div>

        <GlassCard className="p-5 text-center" data-testid="results-stars-xp">
          <div className="text-xs text-[#898989] uppercase tracking-widest font-semibold">XP Earned</div>
          <div ref={xpRef} data-testid="results-xp-counter" className="font-bold text-5xl text-[#ffb703] leading-none my-2" style={{fontFamily:'var(--font-display)'}}>0</div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div><div className="text-[11px] text-[#898989] uppercase font-semibold">Correct</div><div className="font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>{correctCount}/{total}</div></div>
            <div className="w-px h-8 bg-[#e5e5e5]" />
            <div><div className="text-[11px] text-[#898989] uppercase font-semibold">Accuracy</div><div className="font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>{accuracy}%</div></div>
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
