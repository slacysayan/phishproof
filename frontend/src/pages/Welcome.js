import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Kavach from '@/components/Mascot/Kavach';
import { useGameStore } from '@/store/gameStore';
import { ChevronRight, ShieldCheck, Sparkles, Target, Flame } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { setPlayerName, playerName, ensureDailyMissions } = useGameStore();
  const [name, setName] = useState(playerName || '');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    ensureDailyMissions();
    // Staggered entrance
    gsap.fromTo('.welcome-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    );
  }, [ensureDailyMissions]);

  const start = () => {
    if (name.trim()) setPlayerName(name.trim());
    // Playful exit animation
    gsap.to(contentRef.current, { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => navigate('/map') });
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col" data-testid="welcome-page">
      {/* Minimal Top Bar */}
      <nav className="border-b border-[#0000000a]">
        <div className="mx-auto max-w-[480px] px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <Kavach size={32} expression="idle" />
            <span className="font-bold text-base text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>PhishProof</span>
          </button>
          <div className="flex items-center gap-1 text-[10px] text-[#898989] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Getting Started
          </div>
        </div>
      </nav>

      {/* Content */}
      <div ref={contentRef} className="flex-1 mx-auto w-full max-w-[460px] px-4 py-8 flex flex-col items-center">
        {/* Mascot */}
        <div className="welcome-item pp-float mb-6">
          <Kavach size={160} expression="happy" />
        </div>

        {/* Heading */}
        <div className="welcome-item text-center mb-8">
          <h1 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Hi! I'm <span className="text-[#58cc02]">Kavach</span>.
            <br />I'll teach you to
            <br />spot scams.
          </h1>
          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-[340px] mx-auto">
            Learn to identify phishing, UPI fraud, and social engineering through bite-sized lessons.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="welcome-item grid grid-cols-3 gap-3 w-full mb-8">
          {[
            { icon: Target, label: '50+ Scenarios', color: '#1cb0f6' },
            { icon: Flame, label: 'Daily Streaks', color: '#ff9800' },
            { icon: ShieldCheck, label: '100% Free', color: '#58cc02' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="bg-[#f5f5f5] rounded-2xl p-3 text-center">
              <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color }} />
              <div className="text-[10px] font-bold text-[#6b6b6b] uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Name Input */}
        <div className="welcome-item w-full mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[#898989] mb-2">Your name (optional)</label>
          <div className={`relative rounded-2xl border-2 transition-colors ${focused ? 'border-[#1cb0f6]' : 'border-[#e5e5e5]'}`}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="e.g. Arjun"
              className="w-full h-14 rounded-2xl bg-transparent px-4 text-[#242424] placeholder-[#c0c0c0] text-base font-medium outline-none"
              data-testid="welcome-name-input"
              maxLength={24}
              onKeyDown={(e) => { if (e.key === 'Enter') start(); }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="welcome-item w-full flex flex-col gap-3">
          <button
            onClick={start}
            className="pp-duo-btn pp-duo-green h-14 w-full text-sm flex items-center justify-center gap-2"
            data-testid="welcome-start-button"
          >
            Let's Go <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={start}
            className="text-sm text-[#898989] hover:text-[#242424] py-2 transition"
            data-testid="welcome-skip-button"
          >
            Skip & play as guest
          </button>
        </div>

        {/* Privacy Footer */}
        <div className="welcome-item mt-auto pt-8 w-full">
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#afafaf]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#58cc02]" />
            Progress saved locally on your device only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
