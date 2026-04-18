import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import Kavach from '@/components/Mascot/Kavach';
import { useGameStore } from '@/store/gameStore';
import { getScenariosByCategory } from '@/data/scenarios';
import LegitOrScam from '@/components/QuestionTypes/LegitOrScam';
import SpotTheFlag from '@/components/QuestionTypes/SpotTheFlag';
import WhatWouldYouDo from '@/components/QuestionTypes/WhatWouldYouDo';
import TrueOrFalse from '@/components/QuestionTypes/TrueOrFalse';
import CorrectFlash from '@/components/Feedback/CorrectFlash';
import WrongShake from '@/components/Feedback/WrongShake';
import BadgeUnlock from '@/components/UI/BadgeUnlock';
import LevelUpBurst from '@/components/UI/LevelUpBurst';
import { XP_VALUES, BADGES, CATEGORIES } from '@/data/gameConfig';
import { playSFX } from '@/lib/soundFX';
import { Heart, X, ChevronLeft, Flame, Zap, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

const HEARTS_MAX = 5;
const ROUND_COUNT = 8;

/* ─── Minimalist Progress Bar (Duolingo-style) ─── */
const RoundProgress = ({ current, total }) => (
  <div className="flex-1 h-3.5 rounded-full bg-[#e5e5e5] overflow-hidden relative">
    <motion.div
      className="h-full rounded-full bg-[#58cc02]"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
    {/* Notch marks */}
    <div className="absolute inset-0 flex">
      {Array.from({ length: total - 1 }).map((_, i) => (
        <div
          key={i}
          className="h-full w-[2px] bg-white/40"
          style={{ marginLeft: `calc(${(100 / total)}% - 1px)` }}
        />
      ))}
    </div>
  </div>
);

/* ─── Hearts Display ─── */
const HeartsDisplay = ({ hearts, maxHearts = HEARTS_MAX }) => (
  <div className="flex items-center gap-0.5">
    <Heart className="w-5 h-5 text-[#ff4b4b] fill-[#ff4b4b]" />
    <span className="font-bold text-sm text-[#ff4b4b] tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>{hearts}</span>
  </div>
);

/* ─── Streak Indicator ─── */
const StreakIndicator = ({ count, multiplier }) => {
  if (count < 2) return null;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ff9800]/10 border border-[#ff9800]/20"
    >
      <Flame className="w-3.5 h-3.5 text-[#ff9800] fill-[#ff9800]" />
      <span className="text-[10px] font-bold text-[#ff9800] uppercase tracking-wider">{count}× Streak</span>
      {multiplier > 1 && <span className="text-[10px] font-bold text-[#ff9800]">• {multiplier}× XP</span>}
    </motion.div>
  );
};

/* ─── XP Pop (appears on correct answer) ─── */
const XPPop = ({ amount, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ y: 0, opacity: 1, scale: 0.8 }}
        animate={{ y: -60, opacity: 0, scale: 1.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-4 right-4 z-50 font-bold text-lg"
        style={{ fontFamily: 'var(--font-display)', color: '#ffb703' }}
      >
        +{amount} XP
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════ */
/*              MAIN GAME ROUND               */
/* ═══════════════════════════════════════════ */
const GameRound = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const category = (lessonId || '').split('-')[0];
  const boardRef = useRef(null);
  const scenarioWrapRef = useRef(null);
  const kavachRef = useRef(null);

  const cat = CATEGORIES.find(c => c.id === category);

  const { xp, streak, addXP, unlockBadge, bumpStat, stats, soundEnabled, toggleSound, recordActivity, updateMissionProgress, completeLesson, darkMode, toggleDarkMode } = useGameStore();

  const scenarios = useMemo(() => {
    const isResume = typeof window !== 'undefined' && window.location.search.includes('resume=1');
    if (isResume) {
      try {
        const stored = sessionStorage.getItem(`pp_scenarios_${lessonId}`);
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    const list = getScenariosByCategory(category, ROUND_COUNT);
    try { sessionStorage.setItem(`pp_scenarios_${lessonId}`, JSON.stringify(list)); } catch (e) {}
    return list;
  }, [category, lessonId]);

  const resume = React.useMemo(() => {
    try {
      const r = sessionStorage.getItem('pp_resume');
      if (r) { sessionStorage.removeItem('pp_resume'); return JSON.parse(r); }
    } catch (e) {}
    return null;
  }, []);

  const [round, setRound] = useState(resume?.round ?? 0);
  const [hearts, setHearts] = useState(resume?.hearts ?? HEARTS_MAX);
  const [inSessionStreak, setInSessionStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(resume?.correctCount ?? 0);
  const [sessionXP, setSessionXP] = useState(resume?.sessionXP ?? 0);
  const [answerTime, setAnswerTime] = useState(Date.now());
  const [flash, setFlash] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [kavachState, setKavachState] = useState('idle');
  const [levelUp, setLevelUp] = useState(null);
  const [newBadge, setNewBadge] = useState(null);
  const [perfectLesson, setPerfectLesson] = useState(true);
  const [xpPop, setXpPop] = useState({ visible: false, amount: 0 });

  const scenario = scenarios[round];

  useEffect(() => { setAnswerTime(Date.now()); setKavachState('thinking'); }, [round]);

  // Scenario slide-in animation
  useEffect(() => {
    if (scenarioWrapRef.current) {
      gsap.fromTo(
        scenarioWrapRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }
  }, [round]);

  // Hearts = 0 → game over
  useEffect(() => {
    if (hearts === 0) {
      const results = { stars: 0, sessionXP, correctCount, total: ROUND_COUNT, lessonId, perfectLesson: false, failed: true };
      sessionStorage.setItem('pp_results', JSON.stringify(results));
      setTimeout(() => navigate(`/results/${lessonId}`), 900);
    }
  }, [hearts]); // eslint-disable-line

  if (!scenario) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center">
        <div className="pp-card p-6 text-center text-[#242424]">
          <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>No lesson found.</p>
          <button onClick={() => navigate('/map')} className="pp-duo-btn pp-duo-green h-12 px-6 text-xs mt-4">Back to Map</button>
        </div>
      </div>
    );
  }

  const tryUnlockBadge = (id) => {
    if (unlockBadge(id)) {
      setTimeout(() => setNewBadge(id), 400);
    }
  };

  const finishWithAnswer = (result, meta = {}) => {
    let correct = false;
    if (result === 'correct' || result === 'incorrect') {
      correct = result === 'correct';
    } else {
      correct = (result === 'scam') === !!scenario.isScam;
    }

    setDisabled(true);
    const timeTaken = (Date.now() - answerTime) / 1000;
    const fast = timeTaken < 8;

    if (correct) {
      playSFX('correct', soundEnabled);
      setFlash('correct');
      setKavachState('happy');
      const baseXP = XP_VALUES.correct + (fast ? XP_VALUES.speedBonus : 0);
      const multiplier = inSessionStreak >= 2 ? XP_VALUES.streakMultiplier : 1;
      const earned = Math.round(baseXP * multiplier);
      setSessionXP((p) => p + earned);
      setXpPop({ visible: true, amount: earned });
      setTimeout(() => setXpPop({ visible: false, amount: 0 }), 1200);
      const r = addXP(earned);
      setCorrectCount((p) => p + 1);
      setInSessionStreak((p) => p + 1);
      bumpStat('fastCorrect', fast ? 1 : 0);
      if (scenario.category === 'sms') bumpStat('phishingCaught');
      if (scenario.category === 'upi') bumpStat('upiCaught');
      if (scenario.content?.message?.toLowerCase?.().includes('otp') || scenario.statement?.toLowerCase?.().includes('otp')) bumpStat('otpCaught');
      tryUnlockBadge('first_blood');
      const postStats = { ...stats };
      postStats.phishingCaught = (postStats.phishingCaught || 0) + (scenario.category === 'sms' ? 1 : 0);
      postStats.upiCaught = (postStats.upiCaught || 0) + (scenario.category === 'upi' ? 1 : 0);
      postStats.fastCorrect = (postStats.fastCorrect || 0) + (fast ? 1 : 0);
      if (postStats.fastCorrect >= 10) tryUnlockBadge('speed_demon');
      if (postStats.phishingCaught >= 25) tryUnlockBadge('phish_hunter');
      if (scenario.category === 'upi') updateMissionProgress('catch_upi');
      if (scenario.category === 'sms' || (scenario.content?.url || '').length) updateMissionProgress('spot_domains');
      updateMissionProgress('catch_phish');
      if (inSessionStreak + 1 >= 5) updateMissionProgress('streak_game');

      if (r.leveledUp) setTimeout(() => setLevelUp(r.newLevel), 700);

      // Green flash on board
      if (boardRef.current) {
        gsap.fromTo(boardRef.current, { borderColor: 'rgba(88,204,2,0.6)' }, { borderColor: 'transparent', duration: 0.8 });
      }
      setTimeout(() => { next(); }, 1100);
    } else {
      playSFX('wrong', soundEnabled);
      setFlash('wrong');
      setKavachState('sad');
      setHearts((h) => Math.max(0, h - 1));
      setPerfectLesson(false);
      setInSessionStreak(0);
      // Shake
      if (boardRef.current) {
        gsap.fromTo(boardRef.current,
          { x: 0 },
          { keyframes: [{ x: -12 }, { x: 12 }, { x: -8 }, { x: 8 }, { x: 0 }], duration: 0.5, ease: 'power1.inOut' }
        );
      }
      setTimeout(() => { goToBreakdown(); }, 900);
    }
  };

  const goToBreakdown = () => {
    const sessionState = {
      scenario, round, total: ROUND_COUNT,
      hearts: Math.max(0, hearts - 1), sessionXP, correctCount,
      lessonId, perfectLesson: false, inSessionStreak, nextRound: round + 1,
    };
    sessionStorage.setItem('pp_breakdown', JSON.stringify(sessionState));
    navigate(`/breakdown/${lessonId}`);
  };

  const next = () => {
    if (round + 1 >= ROUND_COUNT) return finishLesson();
    setFlash(null);
    setDisabled(false);
    setRound((r) => r + 1);
  };

  const finishLesson = () => {
    recordActivity();
    updateMissionProgress('play_any');
    const stars = hearts >= 5 ? 3 : hearts >= 3 ? 2 : hearts >= 1 ? 1 : 0;
    if (stars >= 1) {
      if (perfectLesson) {
        tryUnlockBadge('unbreakable');
        updateMissionProgress('perfect_lesson');
      }
      if (scenario.category === 'kyc' && stars === 3) tryUnlockBadge('bank_whisperer');
      if (scenario.category === 'upi' && stars === 3) tryUnlockBadge('upi_master');
      completeLesson(lessonId, stars, sessionXP, perfectLesson);
    }
    const results = { stars, sessionXP, correctCount, total: ROUND_COUNT, lessonId, perfectLesson };
    sessionStorage.setItem('pp_results', JSON.stringify(results));
    try { sessionStorage.removeItem(`pp_scenarios_${lessonId}`); } catch (e) {}
    setTimeout(() => navigate(`/results/${lessonId}`), 200);
  };

  const renderQuestion = () => {
    const qt = scenario.questionType || 'legit_or_scam';
    if (qt === 'legit_or_scam') return <LegitOrScam scenario={scenario} onAnswer={finishWithAnswer} disabled={disabled} />;
    if (qt === 'spot_the_flag') return <SpotTheFlag scenario={scenario} onAnswer={finishWithAnswer} disabled={disabled} />;
    if (qt === 'what_would_you_do') return <WhatWouldYouDo scenario={scenario} onAnswer={finishWithAnswer} disabled={disabled} />;
    if (qt === 'true_or_false') return <TrueOrFalse scenario={scenario} onAnswer={finishWithAnswer} disabled={disabled} />;
    return <LegitOrScam scenario={scenario} onAnswer={finishWithAnswer} disabled={disabled} />;
  };

  return (
    <div className="min-h-dvh bg-white relative overflow-hidden" data-testid="game-round-page">
      {/* ─── Top Bar ─── */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#0000000a]">
        <div className="mx-auto max-w-[500px] px-4 py-3 flex items-center gap-3">
          {/* Close / Back */}
          <button onClick={() => navigate('/map')} className="h-9 w-9 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center transition" aria-label="Back" data-testid="hud-back">
            <X className="w-5 h-5 text-[#afafaf]" />
          </button>

          {/* Progress Bar */}
          <RoundProgress current={round + (flash === 'correct' ? 1 : 0)} total={ROUND_COUNT} />

          {/* Hearts */}
          <HeartsDisplay hearts={hearts} />
        </div>
      </div>

      {/* ─── Game Content ─── */}
      <div className="relative z-10 mx-auto w-full max-w-[500px] px-4 pt-4 pb-10">
        {/* Category + Round label */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {cat && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f5f5f5]">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-[11px] font-bold text-[#6b6b6b] uppercase tracking-wider">{cat.name}</span>
              </div>
            )}
            <StreakIndicator count={inSessionStreak} multiplier={inSessionStreak >= 2 ? 1.5 : 1} />
          </div>
          <div className="flex items-center gap-2">
            <Kavach ref={kavachRef} size={40} expression={kavachState} />
          </div>
        </div>

        {/* Question Card */}
        <div
          ref={boardRef}
          className="rounded-2xl border-2 border-transparent transition-colors"
          data-testid="game-board"
        >
          <div ref={scenarioWrapRef}>
            {renderQuestion()}
          </div>
        </div>

        {/* XP Pop Animation */}
        <XPPop amount={xpPop.amount} visible={xpPop.visible} />

        {/* Settings toggles */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={toggleSound} className="text-[#afafaf] hover:text-[#242424] transition p-2" aria-label="Toggle Sound" data-testid="hud-sound">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button onClick={toggleDarkMode} className="text-[#afafaf] hover:text-[#242424] transition p-2" aria-label="Toggle Dark Mode" data-testid="hud-dark-mode">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ─── Feedback Overlays ─── */}
      <AnimatePresence>
        {flash === 'correct' && <CorrectFlash />}
        {flash === 'wrong' && <WrongShake />}
      </AnimatePresence>

      {levelUp && <LevelUpBurst newLevel={levelUp} onClose={() => { playSFX('levelup', soundEnabled); setLevelUp(null); }} />}
      {newBadge && <BadgeUnlock badgeId={newBadge} onClose={() => { playSFX('badge', soundEnabled); setNewBadge(null); }} />}
    </div>
  );
};

export default GameRound;
