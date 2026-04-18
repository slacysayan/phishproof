import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Kavach from '@/components/Mascot/Kavach';
import { ClayButton } from '@/components/UI/ClayButton';
import GlassCard from '@/components/UI/GlassCard';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';
import { AlertTriangle, Target, Phone, ChevronRight } from 'lucide-react';

const Breakdown = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    const s = sessionStorage.getItem('pp_breakdown');
    if (s) setState(JSON.parse(s));
  }, []);

  if (!state) {
    return (<div className="min-h-dvh bg-white flex items-center justify-center"><div className="pp-card p-6 text-[#242424]">Loading breakdown…</div></div>);
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
    <div className="min-h-dvh bg-white" data-testid="breakdown-page">
      <div className="mx-auto w-full max-w-[460px] px-4 pt-6 pb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Kavach size={56} expression="teaching" />
          <div>
            <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold">Kavach explains</div>
            <div className="font-bold text-xl text-[#242424]" style={{fontFamily:'var(--font-display)'}}>
              {scenario.isScam ? '🚨 This was a Scam' : '✅ This was Legitimate'}
            </div>
          </div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
          <ScenarioDeviceFrame type={scenario.type} content={scenario.content} highlight={true} targets={scenario.annotationTargets || []} />
        </motion.div>

        <div className="flex flex-col gap-3" data-testid="breakdown-teaching-cards">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-4 flex gap-3 items-start">
              <div className="h-9 w-9 rounded-xl bg-[#ff4b4b]/10 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-[#ff4b4b]" /></div>
              <div>
                <div className="font-bold text-sm text-[#242424] mb-1" style={{fontFamily:'var(--font-display)'}}>The Trick</div>
                <div className="text-[13px] text-[#4a4a4a] leading-relaxed">{scenario.teachingMoment}</div>
              </div>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <GlassCard className="p-4">
              <div className="flex gap-3 items-start mb-2">
                <div className="h-9 w-9 rounded-xl bg-[#ff9800]/10 flex items-center justify-center shrink-0"><Target className="w-5 h-5 text-[#ff9800]" /></div>
                <div>
                  <div className="font-bold text-sm text-[#242424] mb-1" style={{fontFamily:'var(--font-display)'}}>Red Flags</div>
                  <div className="text-[12px] text-[#6b6b6b]">These details exposed the scam:</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(scenario.redFlags || []).map((f, i) => (<div key={i} className="px-2.5 py-1 rounded-full bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 text-[11.5px] text-[#242424] font-medium">{f}</div>))}
                {(scenario.redFlags || []).length === 0 && <div className="text-[12px] text-[#6b6b6b]">No red flags — this one was legit!</div>}
              </div>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <GlassCard className="p-4 flex gap-3 items-start">
              <div className="h-9 w-9 rounded-xl bg-[#58cc02]/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#58a700]" /></div>
              <div>
                <div className="font-bold text-sm text-[#242424] mb-1" style={{fontFamily:'var(--font-display)'}}>Do This IRL</div>
                <div className="text-[13px] text-[#4a4a4a] leading-relaxed">{scenario.actionAdvice}</div>
                <div className="text-[11px] text-[#898989] mt-2">Cyber fraud helpline: <span className="font-mono text-[#242424] font-semibold">1930</span> • <span className="font-mono text-[#242424] font-semibold">cybercrime.gov.in</span></div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <ClayButton variant="primary" size="xl" onClick={continueGame} className="w-full mt-3 flex items-center justify-center gap-2" data-testid="breakdown-continue-button">
          Got it, Kavach! <ChevronRight className="w-5 h-5" />
        </ClayButton>
      </div>
    </div>
  );
};

export default Breakdown;
