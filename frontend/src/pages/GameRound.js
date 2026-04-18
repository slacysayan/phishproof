import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import GameHUD from '@/components/GameHUD/GameHUD';
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
import { XP_VALUES, BADGES } from '@/data/gameConfig';
import { playSFX } from '@/lib/soundFX';
import { Heart, X } from 'lucide-react';
import { ClayButton } from '@/components/UI/ClayButton';

const HEARTS_MAX = 5;
const ROUND_COUNT = 8;

const GameRound = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const category = (lessonId || '').split('-')[0];
  const boardRef = useRef(null);
  const scenarioWrapRef = useRef(null);
  const kavachRef = useRef(null);

  const { xp, streak, addXP, unlockBadge, bumpStat, stats, soundEnabled, toggleSound, recordActivity, updateMissionProgress, completeLesson } = useGameStore();

  const scenarios = useMemo(() => {
    // Check resume flag - if not resuming, start fresh
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

  // Resume state if available
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
  const [flash, setFlash] = useState(null); // 'correct' | 'wrong' | null
  const [disabled, setDisabled] = useState(false);
  const [kavachState, setKavachState] = useState('idle');
  const [levelUp, setLevelUp] = useState(null);
  const [newBadge, setNewBadge] = useState(null);
  const [perfectLesson, setPerfectLesson] = useState(true);

  const scenario = scenarios[round];

  useEffect(() => { setAnswerTime(Date.now()); setKavachState('thinking'); }, [round]);

  useEffect(() => {
    if (scenarioWrapRef.current) {
      gsap.fromTo(
        scenarioWrapRef.current,
        { y: 120, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }
      );
    }
  }, [round]);

  // Check hearts = 0 (must run on every render before any early return)
  useEffect(() => {
    if (hearts === 0) {
      const results = { stars: 0, sessionXP, correctCount, total: ROUND_COUNT, lessonId, perfectLesson: false, failed: true };
      sessionStorage.setItem('pp_results', JSON.stringify(results));
      setTimeout(() => navigate(`/results/${lessonId}`), 900);
    }
  }, [hearts]); // eslint-disable-line

  if (!scenario) {
    // No scenarios — bounce
    return (
      <div className="min-h-dvh pp-animated-bg flex items-center justify-center">
        <div className="pp-glass p-6 text-center text-white">
          <p>No lesson found.</p>
          <ClayButton variant="primary" onClick={() => navigate('/map')} className="mt-4">Back</ClayButton>
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
    const isCorrect = result === 'correct' || result === 'legit' || result === 'scam';
    let correct = false;
    if (result === 'correct' || result === 'incorrect') {
      correct = result === 'correct';
    } else {
      // LegitOrScam: compare scenario.isScam
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
      const r = addXP(earned);
      setCorrectCount((p) => p + 1);
      setInSessionStreak((p) => p + 1);
      bumpStat('fastCorrect', fast ? 1 : 0);
      if (scenario.category === 'sms') bumpStat('phishingCaught');
      if (scenario.category === 'upi') bumpStat('upiCaught');
      if (scenario.content?.message?.toLowerCase?.().includes('otp') || scenario.statement?.toLowerCase?.().includes('otp')) bumpStat('otpCaught');
      // Badges
      tryUnlockBadge('first_blood');
      const postStats = { ...stats };
      postStats.phishingCaught = (postStats.phishingCaught || 0) + (scenario.category === 'sms' ? 1 : 0);
      postStats.upiCaught = (postStats.upiCaught || 0) + (scenario.category === 'upi' ? 1 : 0);
      postStats.fastCorrect = (postStats.fastCorrect || 0) + (fast ? 1 : 0);
      if (postStats.fastCorrect >= 10) tryUnlockBadge('speed_demon');
      if (postStats.phishingCaught >= 25) tryUnlockBadge('phish_hunter');
      // Daily missions
      if (scenario.category === 'upi') updateMissionProgress('catch_upi');
      if (scenario.category === 'sms' || (scenario.content?.url || '').length) updateMissionProgress('spot_domains');
      updateMissionProgress('catch_phish');
      if (inSessionStreak + 1 >= 5) updateMissionProgress('streak_game');

      if (r.leveledUp) setTimeout(() => setLevelUp(r.newLevel), 700);

      // GSAP burst
      if (boardRef.current) {
        gsap.to(boardRef.current, { backgroundColor: 'rgba(76,175,80,0.18)', duration: 0.15, yoyo: true, repeat: 1 });
      }
      setTimeout(() => { next(); }, 1100);
    } else {
      playSFX('wrong', soundEnabled);
      setFlash('wrong');
      setKavachState('sad');
      setHearts((h) => Math.max(0, h - 1));
      setPerfectLesson(false);
      setInSessionStreak(0);
      if (boardRef.current) {
        gsap.fromTo(boardRef.current,
          { x: 0 },
          { keyframes: [{ x: -12 }, { x: 12 }, { x: -8 }, { x: 8 }, { x: 0 }], duration: 0.5, ease: 'power1.inOut' }
        );
      }
      // After flash, go to breakdown
      setTimeout(() => { goToBreakdown(); }, 900);
    }
  };

  const goToBreakdown = () => {
    // Persist session data via query state
    const sessionState = {
      scenario,
      round,
      total: ROUND_COUNT,
      hearts: Math.max(0, hearts - 1),
      sessionXP,
      correctCount,
      lessonId,
      perfectLesson: false,
      inSessionStreak,
      nextRound: round + 1,
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

  // Hearts=0 effect is above
  return (
    <div className="min-h-dvh pp-animated-bg relative overflow-hidden" data-testid="game-round-page">
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="relative z-10">
        <GameHUD
          xp={xp}
          hearts={hearts}
          streakCount={streak.count}
          streakMultiplier={inSessionStreak >= 2 ? 1.5 : 1}
          currentRound={round}
          totalRounds={ROUND_COUNT}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onBack={() => navigate('/map')}
        />
        <div ref={boardRef} className="mx-auto w-full max-w-[440px] px-4 pt-4 pb-10 flex flex-col gap-3" data-testid="game-board">
          <div className="flex items-center justify-between px-1">
            <div className="text-[11px] text-white/60 uppercase tracking-widest">Round {round + 1}/{ROUND_COUNT}</div>
            <div className="flex items-center gap-2">
              <Kavach ref={kavachRef} size={40} expression={kavachState} />
            </div>
          </div>
          <div ref={scenarioWrapRef}>
            {renderQuestion()}
          </div>
        </div>
      </div>

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
