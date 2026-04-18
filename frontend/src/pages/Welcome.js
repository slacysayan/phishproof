import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Kavach from '@/components/Mascot/Kavach';
import { ClayButton } from '@/components/UI/ClayButton';
import { useGameStore } from '@/store/gameStore';
import { ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: '📱', text: '43% of Indian teens clicked a phishing link' },
  { icon: '💸', text: 'UPI fraud up 300% in 3 years' },
  { icon: '⚠️', text: '28% shared OTP with strangers' },
];

const Welcome = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const { setPlayerName, playerName, ensureDailyMissions } = useGameStore();
  const [name, setName] = useState(playerName || '');

  useEffect(() => {
    ensureDailyMissions();
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' });
    if (statsRef.current) {
      tl.fromTo(statsRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    }
  }, [ensureDailyMissions]);

  const start = () => {
    if (name.trim()) setPlayerName(name.trim());
    navigate('/map');
  };

  return (
    <div className="min-h-dvh pp-animated-bg relative overflow-hidden" data-testid="welcome-page">
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="pp-orb pp-orb-3" />
      <div className="relative z-10 mx-auto w-full max-w-[440px] px-4 pt-8 pb-12 flex flex-col gap-6">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }} className="pp-float flex justify-center">
          <Kavach size={160} expression="idle" />
        </motion.div>
        <div ref={titleRef} className="text-center">
          <h1 className="font-heading font-black text-5xl leading-none mb-2 gradient-text" data-testid="welcome-title">PhishProof</h1>
          <p className="text-white/85 text-base font-medium">Train your brain. Outsmart every scam.</p>
        </div>

        <div ref={statsRef} className="flex flex-col gap-2">
          {stats.map((s, i) => (
            <div key={i} className="pp-glass px-4 py-2.5 flex items-center gap-3" data-testid={`welcome-stat-${i}`}>
              <span className="text-lg">{s.icon}</span>
              <span className="text-white/90 text-[13px] font-medium">{s.text}</span>
            </div>
          ))}
        </div>

        <div className="pp-glass p-4 mt-1">
          <label className="block text-xs text-white/75 mb-2 font-heading font-bold uppercase tracking-widest">Your name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Arjun"
            className="w-full h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-white placeholder-white/40 focus:outline-none focus:border-white/35"
            data-testid="welcome-name-input"
            maxLength={24}
          />
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <ClayButton variant="primary" size="xl" onClick={start} data-testid="welcome-start-button" className="w-full flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" /> Start Training
          </ClayButton>
          <div className="flex items-center justify-center gap-5 text-[11px] text-white/55 pt-1">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> No login</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 60+ scenarios</span>
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 6 categories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
