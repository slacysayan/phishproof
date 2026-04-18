import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Heart, Settings, Flame, Moon, Sun, Info } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { BADGES } from '@/data/gameConfig';
import { ClayButton } from '@/components/UI/ClayButton';

export const ReviewTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-8 pb-32">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-[#242424] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Daily Review</h2>
      <p className="text-[#898989] text-sm">Practice makes perfect! Review your past mistakes to build scam immunity.</p>
    </div>
    <div className="bg-white rounded-3xl p-6 border-b-4 border-[#e5e5e5] shadow-sm flex flex-col items-center">
      <div className="w-24 h-24 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl">📚</span>
      </div>
      <h3 className="font-bold text-[#242424] mb-2">No mistakes yet!</h3>
      <p className="text-[#898989] text-center text-sm mb-6">Play more levels to unlock personalized review sessions.</p>
      <ClayButton variant="primary" disabled>Start Review</ClayButton>
    </div>
  </motion.div>
);

export const BadgesTab = () => {
  const { badges } = useGameStore();
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-8 pb-32">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#242424] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Achievements</h2>
        <p className="text-[#898989] text-sm">Collect all the badges to become a Phishing Defense Master.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {BADGES.map(badge => {
          const unlocked = badges.includes(badge.id);
          return (
            <div key={badge.id} className={`p-4 rounded-2xl flex flex-col items-center text-center ${unlocked ? 'bg-white border-2 border-[#1cb0f6]' : 'bg-[#f5f5f5] opacity-60'}`}>
              <div className="text-4xl mb-3">{unlocked ? badge.icon : '🔒'}</div>
              <div className="font-bold text-sm text-[#242424] mb-1">{badge.name}</div>
              <div className="text-[10px] text-[#898989]">{badge.desc}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export const HeartsTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-8 pb-32">
    <div className="text-center mb-8">
      <div className="text-6xl mb-4 text-[#ff4b4b] animate-pulse">❤️</div>
      <h2 className="text-2xl font-bold text-[#242424] mb-2" style={{ fontFamily: 'var(--font-display)' }}>You have 5 Hearts</h2>
      <p className="text-[#898989] text-sm">Keep playing to learn! Hearts refill automatically over time.</p>
    </div>
    
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-5 border-b-4 border-[#e5e5e5] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1cb0f6]/10 flex items-center justify-center text-[#1cb0f6]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-[#242424]">Practice to Earn</div>
            <div className="text-xs text-[#898989]">Review past lessons for hearts</div>
          </div>
        </div>
        <ClayButton variant="primary" size="sm">Practice</ClayButton>
      </div>
      
      <div className="bg-white rounded-3xl p-5 border-b-4 border-[#e5e5e5] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#ffb703]/10 flex items-center justify-center text-[#ffb703]">
            <span className="font-bold text-xl">💎</span>
          </div>
          <div>
            <div className="font-bold text-[#242424]">Refill with Gems</div>
            <div className="text-xs text-[#898989]">Get full hearts instantly</div>
          </div>
        </div>
        <div className="font-bold text-[#1cb0f6] bg-[#1cb0f6]/10 px-3 py-1.5 rounded-xl text-sm">350 💎</div>
      </div>
    </div>
  </motion.div>
);

export const ProfileTab = () => {
  const { playerName, xp, streak, toggleDarkMode, darkMode } = useGameStore();
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>Profile</h2>
        <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424] hover:bg-[#e5e5e5] transition">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="bg-white rounded-3xl p-6 border-b-4 border-[#e5e5e5] shadow-sm flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-[#1cb0f6] to-[#0e91d1] rounded-full mb-4 flex items-center justify-center shadow-md">
          <span className="text-3xl font-bold text-white uppercase">{playerName?.charAt(0) || 'U'}</span>
        </div>
        <h3 className="font-bold text-xl text-[#242424]">{playerName || 'Agent X'}</h3>
        <p className="text-[#898989] text-sm">Member since Apr 2026</p>
      </div>
      
      <h3 className="font-bold text-lg text-[#242424] mb-3 ml-1" style={{ fontFamily: 'var(--font-display)' }}>Statistics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border-2 border-[#e5e5e5] flex items-center gap-3">
          <Flame className="w-8 h-8 text-[#ff9800] fill-[#ff9800]" />
          <div>
            <div className="font-bold text-xl text-[#242424]">{streak.count}</div>
            <div className="text-[10px] text-[#898989] uppercase tracking-wide font-bold">Day Streak</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border-2 border-[#e5e5e5] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1cb0f6] flex items-center justify-center text-white"><span className="text-sm font-bold">XP</span></div>
          <div>
            <div className="font-bold text-xl text-[#242424]">{xp}</div>
            <div className="text-[10px] text-[#898989] uppercase tracking-wide font-bold">Total XP</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MoreTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-8 pb-32">
    <h2 className="text-2xl font-bold text-[#242424] mb-6" style={{ fontFamily: 'var(--font-display)' }}>More</h2>
    
    <div className="bg-white rounded-3xl border-b-4 border-[#e5e5e5] shadow-sm overflow-hidden">
      {[
        { icon: Settings, label: 'Settings', color: '#898989' },
        { icon: Info, label: 'About PhishProof', color: '#1cb0f6' },
        { icon: Shield, label: 'Privacy Policy', color: '#58cc02' },
      ].map((item, i) => (
        <button key={item.label} className={`w-full flex items-center justify-between p-5 hover:bg-[#f5f5f5] transition ${i !== 2 ? 'border-b border-[#0000000a]' : ''}`}>
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" style={{ color: item.color }} />
            <span className="font-bold text-[#242424]">{item.label}</span>
          </div>
        </button>
      ))}
    </div>
  </motion.div>
);
