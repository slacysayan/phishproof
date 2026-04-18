import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Kavach from '@/components/Mascot/Kavach';
import { useGameStore } from '@/store/gameStore';
import { ChevronRight, ShieldCheck } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const { setPlayerName, playerName, ensureDailyMissions } = useGameStore();
  const [name, setName] = useState(playerName || '');

  useEffect(() => {
    ensureDailyMissions();
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, [ensureDailyMissions]);

  const start = () => {
    if (name.trim()) setPlayerName(name.trim());
    navigate('/map');
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col" data-testid="welcome-page">
      <nav className="border-b border-[#0000000d]">
        <div className="mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <Kavach size={36} expression="idle" />
            <span className="font-display font-bold text-lg" style={{fontFamily: 'var(--font-display)'}}>PhishProof</span>
          </button>
          <div className="text-xs text-[#898989]">Step 1 of 1</div>
        </div>
      </nav>

      <div className="flex-1 mx-auto w-full max-w-[460px] px-4 py-10 flex flex-col items-center text-center">
        <div className="pp-float mb-6">
          <Kavach size={180} expression="happy" />
        </div>

        <div ref={titleRef}>
          <h1 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight mb-3" style={{fontFamily: 'var(--font-display)'}}>
            Hi! I'm <span className="text-[#58cc02]">Kavach</span>.<br />I'll teach you to spot scams.
          </h1>
          <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">
            Tell me your name so I can cheer you on during lessons. (Optional — you can skip.)
          </p>
        </div>

        <div className="w-full mt-8">
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#898989] mb-2">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Arjun"
            className="w-full h-14 rounded-xl bg-white border-2 border-[#e5e5e5] focus:border-[#1cb0f6] px-4 text-[#242424] placeholder-[#b0b0b0] text-base font-medium outline-none transition-colors"
            data-testid="welcome-name-input"
            maxLength={24}
            onKeyDown={(e) => { if (e.key === 'Enter') start(); }}
          />
        </div>

        <div className="w-full mt-8 flex flex-col gap-3">
          <button onClick={start} className="pp-duo-btn pp-duo-green h-14 w-full text-sm flex items-center justify-center gap-2" data-testid="welcome-start-button">
            Let's Go <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={start} className="text-sm text-[#898989] hover:text-[#242424] py-2" data-testid="welcome-skip-button">
            Skip & play as guest
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-[#0000000d] w-full">
          <div className="flex items-center justify-center gap-2 text-xs text-[#898989]">
            <ShieldCheck className="w-4 h-4 text-[#58cc02]" /> We save your progress only on this device.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
