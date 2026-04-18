import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Star, Crown, ChevronRight, Target, Flame, ListTodo, X } from 'lucide-react';
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
      className={`relative w-[92px] h-[92px] rounded-full flex flex-col items-center justify-center transition disabled:cursor-not-allowed ${
        unlocked
          ? 'bg-[rgba(255,255,255,0.85)] shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-10px_24px_rgba(0,0,0,0.22)] border border-white/20'
          : 'bg-[rgba(255,255,255,0.15)] border border-white/15 backdrop-blur-[10px] opacity-70'
      }`}
      data-testid={`skill-map-node-${lesson.id}`}
    >
      <span className="text-3xl leading-none">{cat?.icon}</span>
      <span className={`mt-1 font-heading font-black text-[11px] ${unlocked ? 'text-[#0B1020]' : 'text-white/60'}`}>Lesson {lesson.order}</span>
      {!unlocked && <Lock className="absolute w-4 h-4 text-white/70 top-2 right-2" />}
      {stars > 0 && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? 'text-[#FFD700] fill-[#FFD700]' : 'text-white/30'}`} />
          ))}
        </div>
      )}
      {stars === 3 && <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-[#FFD700]" />}
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
    lessons.forEach((l) => {
      if (!groups[l.category]) groups[l.category] = [];
      groups[l.category].push(l);
    });
    return groups;
  }, [lessons]);

  const completedMissions = dailyMissions?.missions?.filter(m => m.done && !m.claimed).length || 0;

  return (
    <div className="min-h-dvh pp-animated-bg relative overflow-hidden" data-testid="skill-map-page">
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="relative z-10">
        <GameHUD xp={xp} streakCount={streak.count} soundEnabled={soundEnabled} onToggleSound={toggleSound} onBack={() => navigate('/')} />
        <div className="mx-auto w-full max-w-[440px] px-4 pt-4 pb-28" data-testid="skill-map">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] text-white/60 uppercase tracking-widest">Welcome back{playerName ? `, ${playerName}` : ''}</div>
              <div className="font-heading font-black text-xl text-white">{level.title}</div>
            </div>
            <Kavach size={64} expression="idle" />
          </div>

          <div className="flex gap-2 mb-5">
            <GlassCard className="flex-1 p-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF9800]" />
              <div>
                <div className="text-[10px] text-white/60 uppercase">Streak</div>
                <div className="font-heading font-black text-white">{streak.count} day{streak.count !== 1 && 's'}</div>
              </div>
            </GlassCard>
            <button
              onClick={() => setShowMissions(true)}
              className="relative flex-1 pp-glass p-3 flex items-center gap-2 transition hover:bg-white/20"
              data-testid="skill-map-daily-missions-button"
            >
              <ListTodo className="w-5 h-5 text-[#FFD700]" />
              <div className="text-left">
                <div className="text-[10px] text-white/60 uppercase">Daily Missions</div>
                <div className="font-heading font-black text-white">View</div>
              </div>
              {completedMissions > 0 && <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#F44336] text-white text-[10px] font-heading font-black flex items-center justify-center">{completedMissions}</div>}
            </button>
          </div>

          {CATEGORIES.map((cat, ci) => {
            const catLessons = grouped[cat.id] || [];
            const catUnlocked = ci === 0 || (ci > 0 && CATEGORIES.slice(0, ci).every((prevCat) => grouped[prevCat.id].every((ls) => lessonProgress[ls.id]?.completed)));
            return (
              <div key={cat.id} className="mb-8" data-testid={`skill-category-${cat.id}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: cat.color }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-heading font-black text-white text-sm leading-tight">{cat.name}</div>
                    <div className="text-[11px] text-white/60">{cat.desc}</div>
                  </div>
                  {!catUnlocked && <Lock className="w-4 h-4 text-white/50" />}
                </div>

                <div className="relative flex flex-col items-center gap-6 py-4">
                  {/* dashed connector */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px] bg-gradient-to-b from-white/10 via-white/20 to-white/10 rounded-full" />
                  {catLessons.map((ls, li) => {
                    const lessonIdx = lessons.findIndex((x) => x.id === ls.id);
                    const unlocked = catUnlocked && isLessonUnlocked(ls, lessonIdx);
                    const offsetX = li % 2 === 0 ? '-30px' : '30px';
                    return (
                      <div key={ls.id} className="relative" style={{ transform: `translateX(${offsetX})` }}>
                        <Lesson
                          lesson={ls}
                          unlocked={unlocked}
                          progress={lessonProgress[ls.id]}
                          onClick={() => navigate(`/lesson/${ls.id}`)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Missions Drawer */}
      {showMissions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: 'rgba(10,15,34,0.6)', backdropFilter: 'blur(10px)' }}
          onClick={() => setShowMissions(false)}
          data-testid="daily-missions-drawer"
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] pp-glass rounded-t-[28px] p-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] text-white/60 uppercase tracking-widest">Today’s</div>
                <h2 className="font-heading font-black text-2xl text-white">Daily Missions</h2>
              </div>
              <button onClick={() => setShowMissions(false)} className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {(dailyMissions?.missions || []).map((m) => (
                <div key={m.id} className="rounded-2xl bg-white/10 border border-white/10 p-3 flex items-center gap-3" data-testid={`mission-${m.id}`}>
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="flex-1">
                    <div className="font-heading font-bold text-white text-sm">{m.desc}</div>
                    <div className="h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                      <div className="h-full rounded-full bg-[#FFD700]" style={{ width: `${Math.min(100, (m.progress / m.target) * 100)}%` }} />
                    </div>
                    <div className="text-[10px] text-white/60 mt-1">{m.progress}/{m.target} • +{m.xp} XP</div>
                  </div>
                  {m.done && !m.claimed && (
                    <ClayButton variant="gold" size="sm" onClick={() => claimMission(m.id)} data-testid={`mission-claim-${m.id}`}>Claim</ClayButton>
                  )}
                  {m.claimed && <span className="text-[10px] text-[#4CAF50] font-heading font-bold uppercase">Claimed</span>}
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
