import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Kavach from '@/components/Mascot/Kavach';
import { Star, RotateCw, Home, TrendingUp, Target, Zap, Trophy, ChevronRight } from 'lucide-react';
import { playSFX } from '@/lib/soundFX';
import { useGameStore } from '@/store/gameStore';
import { getLevelProgress } from '@/data/gameConfig';

/* ─── Stat Pill ─── */
const StatPill = ({ icon: Icon, iconColor, label, value, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white rounded-2xl border border-[#0000000d] shadow-[var(--pp-shadow-card)] p-4 text-center"
  >
    <Icon className={`w-5 h-5 mx-auto mb-1.5 ${iconColor}`} />
    <div className="font-bold text-lg text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
    <div className="text-[10px] text-[#898989] uppercase font-semibold tracking-wider mt-0.5">{label}</div>
  </motion.div>
);

const Results = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [state, setState] = useState(null);
  const xpRef = useRef(null);
  const starsRef = useRef([]);
  const { soundEnabled, xp } = useGameStore();
  const levelProgress = getLevelProgress(xp);

  useEffect(() => {
    const s = sessionStorage.getItem('pp_results');
    if (s) setState(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (!state) return;
    const stars = state.stars || 0;

    // Star reveal animation
    starsRef.current.forEach((el, i) => {
      if (!el) return;
      if (i < stars) {
        gsap.fromTo(el, { scale: 0, rotation: -180, opacity: 0 }, {
          scale: 1, rotation: 0, opacity: 1,
          duration: 0.6, delay: 0.4 + i * 0.3, ease: 'back.out(2.5)',
        });
        setTimeout(() => playSFX('xp', soundEnabled), (0.4 + i * 0.3) * 1000);
      } else {
        gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.2, duration: 0.4, delay: 0.4 + i * 0.15 });
      }
    });

    // XP counter animation
    if (xpRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: state.sessionXP || 0,
        duration: 1.8, delay: 0.6, ease: 'power2.out',
        onUpdate: () => { if (xpRef.current) xpRef.current.textContent = Math.round(obj.val); },
      });
    }

    // Confetti for 2+ stars
    if (stars >= 2) {
      setTimeout(() => { 
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.35 }, colors: ['#58cc02', '#1cb0f6', '#ffb703', '#ff4b4b', '#ce82ff'] }); 
      }, 1000);
    }
    if (stars === 3) {
      setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.5 }, colors: ['#ffb703', '#ffd700'] });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors: ['#ffb703', '#ffd700'] });
      }, 1400);
    }
  }, [state, soundEnabled]);

  if (!state) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center">
        <div className="pp-card p-6 text-[#242424] text-center">
          <div className="pp-shimmer h-4 w-32 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  const { stars = 0, sessionXP = 0, correctCount = 0, total = 8, failed } = state;
  const accuracy = Math.round((correctCount / total) * 100);

  const getResultConfig = () => {
    if (failed) return { title: 'Lesson Failed', subtitle: 'Lost all hearts. Don\'t give up!', bg: 'bg-[#ffdfe0]', emoji: '💔', color: '#ff4b4b', expr: 'sad' };
    if (stars === 3) return { title: 'Perfect!', subtitle: 'Flawless victory — you\'re scam-proof! 🏆', bg: 'bg-[#d7ffb8]', emoji: '👑', color: '#58cc02', expr: 'excited' };
    if (stars === 2) return { title: 'Great work!', subtitle: 'Almost perfect — keep it up!', bg: 'bg-[#d7ffb8]', emoji: '🌟', color: '#58cc02', expr: 'happy' };
    if (stars === 1) return { title: 'Not bad!', subtitle: 'Room to improve — try again for 3 stars!', bg: 'bg-[#fff3cd]', emoji: '💪', color: '#ff9800', expr: 'idle' };
    return { title: 'Try again!', subtitle: 'You can do better!', bg: 'bg-[#ffdfe0]', emoji: '🔄', color: '#ff4b4b', expr: 'sad' };
  };

  const config = getResultConfig();

  return (
    <div className={`min-h-dvh ${config.bg} transition-colors`} data-testid="results-page">
      <div className="mx-auto w-full max-w-[480px] px-4 pt-8 pb-10 flex flex-col gap-6">
        {/* Mascot */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center"
        >
          <Kavach size={130} expression={config.expr} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-center"
        >
          <div className="text-4xl mb-2">{config.emoji}</div>
          <h1 className="text-[42px] font-bold leading-none" style={{ fontFamily: 'var(--font-display)', color: config.color }}>{config.title}</h1>
          <p className="text-[#6b6b6b] mt-2 text-sm">{config.subtitle}</p>
        </motion.div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-4" data-testid="results-stars">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} ref={(el) => (starsRef.current[i] = el)} className="opacity-0">
              <Star className={`w-16 h-16 ${i < stars ? 'text-[#ffb703] fill-[#ffb703] drop-shadow-[0_8px_20px_rgba(255,183,3,0.4)]' : 'text-[#e5e5e5]'}`} />
            </div>
          ))}
        </div>

        {/* XP Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-[#0000000d] shadow-[var(--pp-shadow-card)] p-5 text-center"
          data-testid="results-stars-xp"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-[#ffb703] fill-[#ffb703]" />
            <span className="text-xs text-[#898989] uppercase tracking-widest font-bold">XP Earned</span>
          </div>
          <div ref={xpRef} data-testid="results-xp-counter" className="font-bold text-5xl leading-none my-1" style={{ fontFamily: 'var(--font-display)', color: '#ffb703' }}>0</div>
          
          {/* Level progress */}
          {levelProgress.next && (
            <div className="mt-3">
              <div className="h-2.5 rounded-full bg-[#e5e5e5] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress.percent}%` }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#58cc02] to-[#78e808]"
                />
              </div>
              <div className="text-[10px] text-[#898989] mt-1.5">{levelProgress.needed} XP to <span className="font-bold text-[#242424]">{levelProgress.next.title}</span></div>
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatPill icon={Target} iconColor="text-[#1cb0f6]" label="Correct" value={`${correctCount}/${total}`} delay={0.6} />
          <StatPill icon={TrendingUp} iconColor="text-[#58cc02]" label="Accuracy" value={`${accuracy}%`} delay={0.7} />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 mt-2"
        >
          <button
            onClick={() => navigate('/map')}
            className="pp-duo-btn pp-duo-green h-14 w-full text-sm flex items-center justify-center gap-2"
            data-testid="results-back-to-map-button"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => { try { sessionStorage.removeItem(`pp_scenarios_${lessonId}`); sessionStorage.removeItem('pp_resume'); } catch(e){} navigate(`/lesson/${lessonId}`); }}
            className="pp-duo-btn pp-duo-ghost h-12 w-full text-xs flex items-center justify-center gap-2"
            data-testid="results-retry-button"
          >
            <RotateCw className="w-4 h-4" /> {failed ? 'Try Again' : 'Practice Again'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
