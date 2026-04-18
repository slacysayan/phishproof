import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Star, Crown, Flame, ListTodo, X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { CATEGORIES, getLevelFromXP } from '@/data/gameConfig';
import { getLessons } from '@/data/scenarios';
import Kavach from '@/components/Mascot/Kavach';
import GameHUD from '@/components/GameHUD/GameHUD';
import { ClayButton } from '@/components/UI/ClayButton';
import { GlassCard } from '@/components/UI/GlassCard';

const Lesson = ({ lesson, unlocked, progress, onClick }) => {
  const cat = CATEGORIES.find((c) => c.id === lesson.category);
  const stars = progress?.stars || 0;
  return (
    <motion.button
      whileHover={{ scale: unlocked ? 1.04 : 1 }}
      whileTap={{ scale: unlocked ? 0.96 : 1 }}
      disabled={!unlocked}
      onClick={onClick}
      className={`relative w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center transition disabled:cursor-not-allowed ${
        unlocked
          ? 'bg-white border-2 border-[#58cc02] shadow-[0_5px_0_#58a700,0_0_0_1px_rgba(34,42,53,0.08)]'
          : 'bg-[#f5f5f5] border-2 border-[#e5e5e5] shadow-[0_3px_0_#d0d0d0]'
      }`}
      data-testid={`skill-map-node-${lesson.id}`}
    >
      <span className="text-3xl leading-none">{cat?.icon}</span>
      <span className={`mt-0.5 font-bold text-[10px] uppercase tracking-wider ${unlocked ? 'text-[#58a700]' : 'text-[#898989]'}`} style={{fontFamily:'var(--font-display)'}}>L{lesson.order}</span>
      {!unlocked && <Lock className="absolute w-3.5 h-3.5 text-[#898989] top-2 right-2" />}
      {stars > 0 && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow-[var(--pp-shadow-card)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < stars ? 'text-[#ffb703] fill-[#ffb703]' : 'text-[#e0e0e0]'}`} />
          ))}
        </div>
      )}
      {stars === 3 && <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-[#ffb703]" />}
    </motion.button>
  );
};

const SkillMap = () => {
  const navigate = useNavigate();
  const { xp, streak, lessonProgress, soundEnabled, toggleSound, playerName, dailyMissions, ensureDailyMissions, claimMission } = useGameStore();
  const [showMissions, setShowMissions] = useState(false);

  React.useEffect(() => { ensureDailyMissions(); }, [ensureDailyMissions]);

  const lessons = useMemo(() => getLessons(), []);
  const level = getLevelFromXP(xp);

  const isLessonUnlocked = (lesson, idx) => {
    if (idx === 0) return true;
    const prev = lessons[idx - 1];
    return !!lessonProgress[prev.id]?.completed;
  };

  const grouped = useMemo(() => {
    const groups = {};
    lessons.forEach((l) => { if (!groups[l.category]) groups[l.category] = []; groups[l.category].push(l); });
    return groups;
  }, [lessons]);

  const completedMissions = dailyMissions?.missions?.filter(m => m.done && !m.claimed).length || 0;

  return (
    <div className="min-h-dvh bg-white" data-testid="skill-map-page">
      <GameHUD xp={xp} streakCount={streak.count} soundEnabled={soundEnabled} onToggleSound={toggleSound} onBack={() => navigate('/')} />
      <div className="mx-auto w-full max-w-[460px] px-4 pt-4 pb-24" data-testid="skill-map">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold">Hi{playerName ? `, ${playerName}` : ''}</div>
            <div className="font-bold text-xl text-[#242424]" style={{fontFamily:'var(--font-display)'}}>{level.title}</div>
          </div>
          <Kavach size={60} expression="idle" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <GlassCard className="p-3 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#ff9800]/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#ff9800]" />
            </div>
            <div>
              <div className="text-[10px] text-[#898989] uppercase font-semibold">Streak</div>
              <div className="font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>{streak.count} day{streak.count !== 1 && 's'}</div>
            </div>
          </GlassCard>
          <button onClick={() => setShowMissions(true)} className="relative bg-white rounded-[var(--pp-r-md)] shadow-[var(--pp-shadow-card)] p-3 flex items-center gap-2 transition hover:shadow-[var(--pp-shadow-card-hover)]" data-testid="skill-map-daily-missions-button">
            <div className="w-9 h-9 rounded-lg bg-[#58cc02]/10 flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-[#58a700]" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#898989] uppercase font-semibold">Missions</div>
              <div className="font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>View</div>
            </div>
            {completedMissions > 0 && <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#ff4b4b] text-white text-[10px] font-bold flex items-center justify-center">{completedMissions}</div>}
          </button>
        </div>

        {CATEGORIES.map((cat, ci) => {
          const catLessons = grouped[cat.id] || [];
          const catUnlocked = ci === 0 || (ci > 0 && CATEGORIES.slice(0, ci).every((prevCat) => grouped[prevCat.id].every((ls) => lessonProgress[ls.id]?.completed)));
          return (
            <div key={cat.id} className="mb-8" data-testid={`skill-category-${cat.id}`}>
              <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-[#fafafa] border border-[#0000000d]">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-2xl" style={{ background: cat.color + '22' }}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#242424] text-sm leading-tight" style={{fontFamily:'var(--font-display)'}}>{cat.name}</div>
                  <div className="text-[11px] text-[#6b6b6b]">{cat.desc}</div>
                </div>
                {!catUnlocked && <Lock className="w-4 h-4 text-[#bbb]" />}
              </div>
              <div className="relative flex flex-col items-center gap-7 py-3">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-[#eee] rounded-full" />
                {catLessons.map((ls, li) => {
                  const lessonIdx = lessons.findIndex((x) => x.id === ls.id);
                  const unlocked = catUnlocked && isLessonUnlocked(ls, lessonIdx);
                  const offsetX = li % 2 === 0 ? '-34px' : '34px';
                  return (
                    <div key={ls.id} className="relative" style={{ transform: `translateX(${offsetX})` }}>
                      <Lesson lesson={ls} unlocked={unlocked} progress={lessonProgress[ls.id]} onClick={() => navigate(`/lesson/${ls.id}`)} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {showMissions && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={() => setShowMissions(false)} data-testid="daily-missions-drawer">
          <motion.div initial={{ y: 400 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-[480px] bg-white rounded-t-[24px] p-5 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold">Today's</div>
                <h2 className="font-bold text-2xl text-[#242424]" style={{fontFamily:'var(--font-display)'}}>Daily Missions</h2>
              </div>
              <button onClick={() => setShowMissions(false)} className="h-9 w-9 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424]"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {(dailyMissions?.missions || []).map((m) => (
                <div key={m.id} className="rounded-xl bg-[#fafafa] border border-[#0000000d] p-3 flex items-center gap-3" data-testid={`mission-${m.id}`}>
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-[#242424] text-sm" style={{fontFamily:'var(--font-display)'}}>{m.desc}</div>
                    <div className="h-1.5 rounded-full bg-[#e5e5e5] mt-1 overflow-hidden">
                      <div className="h-full rounded-full bg-[#58cc02]" style={{ width: `${Math.min(100, (m.progress / m.target) * 100)}%` }} />
                    </div>
                    <div className="text-[10px] text-[#6b6b6b] mt-1">{m.progress}/{m.target} • +{m.xp} XP</div>
                  </div>
                  {m.done && !m.claimed && (<ClayButton variant="gold" size="sm" onClick={() => claimMission(m.id)} data-testid={`mission-claim-${m.id}`}>Claim</ClayButton>)}
                  {m.claimed && <span className="text-[10px] text-[#58a700] font-bold uppercase">Claimed</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillMap;
