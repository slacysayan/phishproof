import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Lock, Star, Crown, Flame, ListTodo, X, Heart, Zap, Home, BookOpen, Shield, Trophy, MoreHorizontal, Gift, ChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { CATEGORIES, getLevelFromXP, getLevelProgress, BADGES } from '@/data/gameConfig';
import { getLessons } from '@/data/scenarios';
import Kavach from '@/components/Mascot/Kavach';
import { ClayButton } from '@/components/UI/ClayButton';
import { ReviewTab, BadgesTab, HeartsTab, ProfileTab, MoreTab } from '@/components/SkillMapTabs';

/* ─── Winding path positions for Duolingo-style zig-zag ─── */
const getNodePosition = (index, total) => {
  // Generate a sinusoidal wave path - nodes zigzag left-center-right
  const amplitude = 80; // how far left/right
  const positions = ['center', 'right', 'right', 'center', 'left', 'left'];
  const pos = positions[index % positions.length];
  let x = 0;
  if (pos === 'left') x = -amplitude;
  if (pos === 'right') x = amplitude;
  return x;
};

/* ─── Lesson Node (Large interactive circle) ─── */
const LessonNode = ({ lesson, unlocked, active, progress, onClick, xOffset, index }) => {
  const cat = CATEGORIES.find((c) => c.id === lesson.category);
  const stars = progress?.stars || 0;
  const completed = progress?.completed;
  const nodeRef = useRef(null);

  // Determine color scheme
  const getNodeStyle = () => {
    if (completed && stars === 3) return { bg: '#58cc02', border: '#46a302', shadow: '#3d8c02', iconColor: '#fff' };
    if (completed) return { bg: '#58cc02', border: '#46a302', shadow: '#3d8c02', iconColor: '#fff' };
    if (active) return { bg: '#1cb0f6', border: '#0e91d1', shadow: '#0b7db5', iconColor: '#fff' };
    return { bg: '#e5e5e5', border: '#d0d0d0', shadow: '#c0c0c0', iconColor: '#afafaf' };
  };
  const style = getNodeStyle();

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${xOffset}px)` }}>
      {/* Crown for perfect (3-star) */}
      {stars === 3 && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-6 z-10"
        >
          <Crown className="w-7 h-7 text-[#ffb703] fill-[#ffb703] drop-shadow-md" />
        </motion.div>
      )}

      <motion.button
        ref={nodeRef}
        whileHover={{ scale: unlocked ? 1.12 : 1 }}
        whileTap={{ scale: unlocked ? 0.9 : 1 }}
        disabled={!unlocked}
        onClick={onClick}
        className="relative w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full flex flex-col items-center justify-center transition disabled:cursor-not-allowed"
        style={{
          background: style.bg,
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: style.border,
          boxShadow: `0 6px 0 ${style.shadow}`,
          color: style.iconColor,
        }}
        data-testid={`skill-map-node-${lesson.id}`}
      >
        {unlocked ? (
          <>
            <span className="text-3xl leading-none drop-shadow-sm">{cat?.icon}</span>
            <span className="mt-0.5 font-bold text-[9px] md:text-[10px] uppercase tracking-wider opacity-90" style={{ fontFamily: 'var(--font-display)' }}>
              L{lesson.order}
            </span>
          </>
        ) : (
          <Lock className="w-6 h-6 opacity-60" />
        )}

        {/* Active pulse ring */}
        {active && unlocked && !completed && (
          <div className="absolute inset-0 rounded-full border-[3px] border-[#1cb0f6] animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>

      {/* Star indicators below node */}
      {completed && (
        <div className="flex gap-0.5 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < stars ? 'text-[#ffb703] fill-[#ffb703]' : 'text-[#ddd]'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Treasure Chest (between lessons) ─── */
const TreasureChest = ({ unlocked, stars }) => {
  const opened = stars > 0;
  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.1 : 1, rotate: unlocked ? 5 : 0 }}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl ${
        opened ? 'bg-[#ffb703]/20 shadow-md' : unlocked ? 'bg-[#ffb703]/10 border-2 border-dashed border-[#ffb703]/30' : 'bg-[#e5e5e5]/30'
      }`}
    >
      {opened ? '🏆' : unlocked ? '🎁' : '📦'}
    </motion.div>
  );
};

/* ─── Section Header Card (Liquid Glassmorphic) ─── */
const SectionHeader = ({ category, sectionIndex, isUnlocked, completedCount, totalCount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`w-full rounded-3xl p-5 md:p-6 mb-8 relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
      isUnlocked
        ? 'border border-white/20 dark:border-white/10'
        : 'bg-[#e5e5e5]/40 dark:bg-white/5 border border-white/10'
    }`}
    style={isUnlocked ? { 
      background: `linear-gradient(135deg, ${category.color}cc 0%, ${category.color}66 100%)`,
      boxShadow: `0 12px 40px -12px ${category.color}80, inset 0 1px 1px rgba(255,255,255,0.4)`
    } : {}}
    data-testid={`skill-section-${category.id}`}
  >
    {/* Liquid highlight effect */}
    {isUnlocked && <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-3xl" />}
    
    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className={`text-[10px] md:text-[11px] uppercase tracking-widest font-black ${isUnlocked ? 'text-white/80 drop-shadow-sm' : 'text-[#898989]'}`}>
          Section {sectionIndex + 1}, Unit {completedCount}/{totalCount}
        </div>
        <div className={`font-black text-2xl md:text-3xl mt-1 tracking-tight ${isUnlocked ? 'text-white drop-shadow-md' : 'text-[#999]'}`} style={{ fontFamily: 'var(--font-display)' }}>
          {category.icon} <span className="ml-1">{category.name}</span>
        </div>
        <div className={`text-xs md:text-sm mt-1.5 font-bold ${isUnlocked ? 'text-white/80' : 'text-[#bbb]'}`}>
          {category.desc}
        </div>
      </div>
      {!isUnlocked && (
        <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <Lock className="w-5 h-5 text-[#898989]" />
        </div>
      )}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════ */
/*               MAIN SKILL MAP               */
/* ═══════════════════════════════════════════ */
const SkillMap = () => {
  const navigate = useNavigate();
  const { xp, streak, lessonProgress, soundEnabled, toggleSound, playerName, dailyMissions, ensureDailyMissions, claimMission, badges } = useGameStore();
  const [showMissions, setShowMissions] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const pathRef = useRef(null);

  useEffect(() => { ensureDailyMissions(); }, [ensureDailyMissions]);

  // GSAP entrance animations
  useEffect(() => {
    gsap.fromTo('.skill-node', 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
    );
    gsap.fromTo('.section-card',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  const lessons = useMemo(() => getLessons(), []);
  const level = getLevelFromXP(xp);
  const levelProgress = getLevelProgress(xp);

  const isLessonUnlocked = (lesson, idx) => {
    if (idx === 0) return true;
    const prev = lessons[idx - 1];
    return !!lessonProgress[prev.id]?.completed;
  };

  // Find the active (next to play) lesson
  const activeLessonIdx = useMemo(() => {
    for (let i = 0; i < lessons.length; i++) {
      if (!lessonProgress[lessons[i].id]?.completed) return i;
    }
    return lessons.length - 1;
  }, [lessons, lessonProgress]);

  const grouped = useMemo(() => {
    const groups = {};
    lessons.forEach((l) => { if (!groups[l.category]) groups[l.category] = []; groups[l.category].push(l); });
    return groups;
  }, [lessons]);

  const completedMissions = dailyMissions?.missions?.filter(m => m.done && !m.claimed).length || 0;
  const totalCompleted = lessons.filter(l => lessonProgress[l.id]?.completed).length;

  return (
    <div className="min-h-dvh bg-white flex flex-col" data-testid="skill-map-page">
      {/* ─── TOP STATS BAR (Duolingo-style) ─── */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#0000000a]">
        <div className="mx-auto max-w-[480px] px-4 py-2.5 flex items-center justify-between">
          {/* Streak */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#f5f5f5] transition" onClick={() => setShowMissions(true)}>
            <Flame className="w-5 h-5 text-[#ff9800] fill-[#ff9800]" />
            <span className="font-bold text-sm text-[#ff9800]" style={{ fontFamily: 'var(--font-display)' }}>{streak.count}</span>
          </button>

          {/* XP / Gems */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl">
            <div className="w-5 h-5 rounded-full bg-[#1cb0f6] flex items-center justify-center">
              <Zap className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="font-bold text-sm text-[#1cb0f6]" style={{ fontFamily: 'var(--font-display)' }}>{xp}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl">
            <Heart className="w-5 h-5 text-[#ff4b4b] fill-[#ff4b4b]" />
            <span className="font-bold text-sm text-[#ff4b4b]" style={{ fontFamily: 'var(--font-display)' }}>5</span>
          </div>

          {/* Missions */}
          <button
            onClick={() => setShowMissions(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#f5f5f5] transition"
            data-testid="skill-map-daily-missions-button"
          >
            <Trophy className="w-5 h-5 text-[#ffb703]" />
            {completedMissions > 0 && (
              <div className="absolute -top-1 -right-0.5 h-4 w-4 rounded-full bg-[#ff4b4b] text-white text-[9px] font-bold flex items-center justify-center">{completedMissions}</div>
            )}
          </button>
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'learn' && (
          <div ref={pathRef} className="pb-24">
            <div className="mx-auto w-full max-w-[480px] px-4 pt-6">
          {/* Player greeting + level */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold">Hi{playerName ? `, ${playerName}` : ''}</div>
              <div className="font-bold text-xl text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>{level.title}</div>
            </div>
            <div className="pp-float">
              <Kavach size={56} expression="idle" />
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="mb-8 bg-[#f5f5f5] rounded-full p-1">
            <div className="relative h-3 rounded-full overflow-hidden bg-[#e5e5e5]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress.percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#58cc02] to-[#78e808]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white drop-shadow-sm">
                {levelProgress.next ? `${Math.round(levelProgress.percent)}%` : 'MAX'}
              </div>
            </div>
          </div>

          {/* ─── WINDING PATH ─── */}
          {CATEGORIES.map((cat, ci) => {
            const catLessons = grouped[cat.id] || [];
            const catUnlocked = ci === 0 || (ci > 0 && CATEGORIES.slice(0, ci).every((prevCat) => (grouped[prevCat.id] || []).every((ls) => lessonProgress[ls.id]?.completed)));
            const completedInCat = catLessons.filter(l => lessonProgress[l.id]?.completed).length;

            return (
              <div key={cat.id} className="mb-4" data-testid={`skill-category-${cat.id}`}>
                {/* Section Header */}
                <div className="section-card">
                  <SectionHeader
                    category={cat}
                    sectionIndex={ci}
                    isUnlocked={catUnlocked}
                    completedCount={completedInCat}
                    totalCount={catLessons.length}
                  />
                </div>

                {/* Winding Path of Nodes */}
                <div className="relative flex flex-col items-center gap-6 md:gap-8 py-4">
                  {/* Vertical dotted connector line */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full" style={{ background: 'repeating-linear-gradient(to bottom, #e5e5e5 0px, #e5e5e5 8px, transparent 8px, transparent 16px)' }} />

                  {catLessons.map((ls, li) => {
                    const globalIdx = lessons.findIndex((x) => x.id === ls.id);
                    const unlocked = catUnlocked && isLessonUnlocked(ls, globalIdx);
                    const isActive = globalIdx === activeLessonIdx;
                    const xOffset = getNodePosition(li, catLessons.length);

                    return (
                      <React.Fragment key={ls.id}>
                        {/* Treasure chest before every 2nd lesson */}
                        {li === 1 && (
                          <div className="skill-node relative z-10" style={{ transform: `translateX(${getNodePosition(li - 1, catLessons.length) * 0.3}px)` }}>
                            <TreasureChest unlocked={catUnlocked && completedInCat >= 1} stars={completedInCat} />
                          </div>
                        )}

                        <div className="skill-node relative z-10">
                          <LessonNode
                            lesson={ls}
                            unlocked={unlocked}
                            active={isActive}
                            progress={lessonProgress[ls.id]}
                            onClick={() => navigate(`/lesson/${ls.id}`)}
                            xOffset={xOffset}
                            index={li}
                          />

                          {/* Kavach mascot cameo at active lesson */}
                          {isActive && unlocked && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                              className="absolute z-20 pp-float"
                              style={{
                                top: '-15px',
                                [xOffset >= 0 ? 'left' : 'right']: xOffset >= 0 ? '100%' : '100%',
                                marginLeft: xOffset >= 0 ? '12px' : undefined,
                                marginRight: xOffset < 0 ? '12px' : undefined,
                              }}
                            >
                              <Kavach size={52} expression="happy" />
                            </motion.div>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}

                  {/* Category completion reward */}
                  {completedInCat === catLessons.length && catLessons.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="skill-node relative z-10 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffb703] to-[#f57c00] flex items-center justify-center shadow-lg text-3xl">
                        🏅
                      </div>
                      <span className="text-[10px] font-bold text-[#ffb703] mt-2 uppercase tracking-wider">Complete!</span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Overall Completion */}
          {totalCompleted === lessons.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">👑</div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="gradient-text">Scam Immune!</span>
              </h2>
              <p className="text-sm text-[#898989]">You've mastered all scam categories. Stay vigilant!</p>
            </motion.div>
          )}
        </div>
      </div>
        )}
        
        {activeTab === 'review' && <div className="mx-auto max-w-[480px]"><ReviewTab /></div>}
        {activeTab === 'badges' && <div className="mx-auto max-w-[480px]"><BadgesTab /></div>}
        {activeTab === 'streak' && <div className="mx-auto max-w-[480px]"><HeartsTab /></div>}
        {activeTab === 'profile' && <div className="mx-auto max-w-[480px]"><ProfileTab /></div>}
        {activeTab === 'more' && <div className="mx-auto max-w-[480px]"><MoreTab /></div>}
      </div>

      {/* ─── BOTTOM TAB BAR (Duolingo-style) ─── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#0000000a] safe-area-pb">
        <div className="mx-auto max-w-[480px] flex items-center justify-around py-2 px-2">
          {[
            { id: 'learn', icon: Home, label: 'Learn', color: '#1cb0f6', active: true },
            { id: 'review', icon: BookOpen, label: 'Review', color: '#ce82ff' },
            { id: 'badges', icon: Shield, label: 'Badges', color: '#1cb0f6' },
            { id: 'streak', icon: Heart, label: 'Hearts', color: '#ff4b4b' },
            { id: 'profile', icon: Trophy, label: 'Profile', color: '#ffb703' },
            { id: 'more', icon: MoreHorizontal, label: 'More', color: '#898989' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-[#ddf4ff]' : 'hover:bg-[#f5f5f5]'
                }`}
              >
                <Icon className="w-6 h-6" style={{ color: isActive ? tab.color : '#afafaf' }} />
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? '' : 'text-[#afafaf]'}`} style={isActive ? { color: tab.color } : {}}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── DAILY MISSIONS DRAWER ─── */}
      <AnimatePresence>
        {showMissions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.35)' }}
            onClick={() => setShowMissions(false)}
            data-testid="daily-missions-drawer"
          >
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] bg-white rounded-t-[28px] p-5 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
            >
              {/* Drawer handle */}
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 rounded-full bg-[#e5e5e5]" />
              </div>

              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold">Today's</div>
                  <h2 className="font-bold text-2xl text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>Daily Missions</h2>
                </div>
                <button onClick={() => setShowMissions(false)} className="h-9 w-9 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424] hover:bg-[#ebebeb] transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {(dailyMissions?.missions || []).map((m) => (
                  <div key={m.id} className="rounded-2xl bg-[#fafafa] border border-[#0000000d] p-4 flex items-center gap-3" data-testid={`mission-${m.id}`}>
                    <div className="text-2xl w-10 h-10 flex items-center justify-center">{m.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#242424] text-sm truncate" style={{ fontFamily: 'var(--font-display)' }}>{m.desc}</div>
                      <div className="h-2 rounded-full bg-[#e5e5e5] mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (m.progress / m.target) * 100)}%` }}
                          className="h-full rounded-full bg-[#58cc02]"
                        />
                      </div>
                      <div className="text-[10px] text-[#6b6b6b] mt-1.5 flex items-center gap-2">
                        <span>{m.progress}/{m.target}</span>
                        <span className="text-[#ffb703] font-bold">+{m.xp} XP</span>
                      </div>
                    </div>
                    {m.done && !m.claimed && (
                      <ClayButton variant="gold" size="sm" onClick={() => claimMission(m.id)} data-testid={`mission-claim-${m.id}`}>Claim</ClayButton>
                    )}
                    {m.claimed && <span className="text-[10px] text-[#58a700] font-bold uppercase">✓</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillMap;
