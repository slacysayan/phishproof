import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Kavach from '@/components/Mascot/Kavach';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';
import { AlertTriangle, Target, Phone, ChevronRight, Shield, BookOpen, Heart } from 'lucide-react';

const TeachingCard = ({ icon: Icon, iconBg, iconColor, title, children, delay = 0 }) => (
  <motion.div
    initial={{ x: -30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    className="bg-white rounded-2xl border border-[#0000000d] shadow-[var(--pp-shadow-card)] p-4 flex gap-3 items-start"
  >
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-bold text-sm text-[#242424] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>{title}</div>
      {children}
    </div>
  </motion.div>
);

const Breakdown = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    const s = sessionStorage.getItem('pp_breakdown');
    if (s) setState(JSON.parse(s));
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!state) return;
    gsap.fromTo('.breakdown-mascot', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' });
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center">
        <div className="pp-card p-6 text-[#242424] text-center">
          <div className="pp-shimmer h-4 w-32 rounded-full mx-auto mb-3" />
          <p className="text-sm text-[#898989]">Loading breakdown…</p>
        </div>
      </div>
    );
  }

  const { scenario, hearts, sessionXP, correctCount, nextRound, total } = state;

  const continueGame = () => {
    if (hearts === 0) {
      const results = { stars: 0, sessionXP, correctCount, total, lessonId, failed: true };
      sessionStorage.setItem('pp_results', JSON.stringify(results));
      navigate(`/results/${lessonId}`);
    } else if (nextRound >= total) {
      const stars = hearts >= 5 ? 3 : hearts >= 3 ? 2 : 1;
      const results = { stars, sessionXP, correctCount, total, lessonId };
      sessionStorage.setItem('pp_results', JSON.stringify(results));
      navigate(`/results/${lessonId}`);
    } else {
      sessionStorage.setItem('pp_resume', JSON.stringify({ hearts, sessionXP, correctCount, round: nextRound }));
      navigate(`/lesson/${lessonId}?resume=1`);
    }
  };

  return (
    <div className="min-h-dvh bg-[#ffdfe0]" data-testid="breakdown-page">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#0000000a]">
        <div className="mx-auto max-w-[480px] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff4b4b] fill-[#ff4b4b]" />
            <span className="font-bold text-sm text-[#ff4b4b]" style={{ fontFamily: 'var(--font-display)' }}>{hearts}</span>
          </div>
          <div className="text-[11px] text-[#898989] font-semibold uppercase tracking-wider">
            Round {(nextRound || 0)}/{total}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[480px] px-4 pt-6 pb-10 flex flex-col gap-5">
        {/* Mascot + Header */}
        <div className="flex items-center gap-4 breakdown-mascot">
          <Kavach size={64} expression="teaching" />
          <div>
            <div className="text-[11px] text-[#ea2b2b]/60 uppercase tracking-widest font-bold">Kavach explains</div>
            <h1 className="font-bold text-2xl text-[#ea2b2b]" style={{ fontFamily: 'var(--font-display)' }}>
              {scenario.isScam ? '🚨 This was a Scam' : '✅ This was Legitimate'}
            </h1>
          </div>
        </div>

        {/* Scenario Replay */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <ScenarioDeviceFrame type={scenario.type} content={scenario.content} highlight={true} targets={scenario.annotationTargets || []} />
        </motion.div>

        {/* Teaching Cards */}
        <div className="flex flex-col gap-3" data-testid="breakdown-teaching-cards">
          <TeachingCard
            icon={AlertTriangle}
            iconBg="bg-[#ff4b4b]/10"
            iconColor="text-[#ff4b4b]"
            title="The Trick"
            delay={0.15}
          >
            <p className="text-[13px] text-[#4a4a4a] leading-relaxed">{scenario.teachingMoment}</p>
          </TeachingCard>

          <TeachingCard
            icon={Target}
            iconBg="bg-[#ff9800]/10"
            iconColor="text-[#ff9800]"
            title="Red Flags to Spot"
            delay={0.25}
          >
            <div className="flex flex-wrap gap-2 mt-1">
              {(scenario.redFlags || []).map((f, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-[#ff4b4b]/8 border border-[#ff4b4b]/15 text-[11px] text-[#c62828] font-medium">
                  🚩 {f}
                </span>
              ))}
              {(scenario.redFlags || []).length === 0 && (
                <span className="text-[12px] text-[#6b6b6b]">No red flags — this one was legit!</span>
              )}
            </div>
          </TeachingCard>

          <TeachingCard
            icon={Phone}
            iconBg="bg-[#58cc02]/10"
            iconColor="text-[#58a700]"
            title="What to Do IRL"
            delay={0.35}
          >
            <p className="text-[13px] text-[#4a4a4a] leading-relaxed">{scenario.actionAdvice}</p>
            <div className="mt-3 p-2.5 rounded-xl bg-[#f5f5f5] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1cb0f6] shrink-0" />
              <div className="text-[11px] text-[#6b6b6b]">
                Cyber fraud helpline: <span className="font-mono text-[#242424] font-bold">1930</span> • <span className="font-mono text-[#242424] font-bold">cybercrime.gov.in</span>
              </div>
            </div>
          </TeachingCard>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={continueGame}
            className="pp-duo-btn pp-duo-green h-14 w-full text-sm flex items-center justify-center gap-2"
            data-testid="breakdown-continue-button"
          >
            {hearts === 0 ? 'See Results' : nextRound >= total ? 'Finish Lesson' : "Got it, let's continue!"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Breakdown;
