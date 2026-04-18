import React, { useState } from 'react';
import { ClayButton } from '@/components/UI/ClayButton';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';
import { CheckCircle2, Eye } from 'lucide-react';

// Shows scenario with highlighted targets; player taps targets they believe are red flags.
export const SpotTheFlag = ({ scenario, onAnswer, disabled }) => {
  const [selected, setSelected] = useState([]);
  const targets = scenario.annotationTargets || [];

  const toggle = (t) => {
    if (disabled) return;
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const submit = () => {
    // Correct if at least half of flags identified AND only flags (no extras)
    const matches = selected.filter((s) => targets.includes(s)).length;
    const extras = selected.filter((s) => !targets.includes(s)).length;
    const threshold = Math.max(1, Math.ceil(targets.length * 0.5));
    const correct = matches >= threshold && extras === 0;
    onAnswer(correct ? 'correct' : 'incorrect', { selected });
  };

  return (
    <div className="flex flex-col gap-4">
      <ScenarioDeviceFrame type={scenario.type} content={scenario.content} highlight={false} targets={[]} />
      <div className="pp-glass px-4 py-3">
        <div className="flex items-center gap-2 mb-2 text-white font-heading font-bold text-sm">
          <Eye className="w-4 h-4 text-[#FF9800]" /> Tap the red flags you spot
        </div>
        <div className="flex flex-wrap gap-2">
          {targets.map((t, i) => {
            const on = selected.includes(t);
            return (
              <button
                key={i}
                disabled={disabled}
                onClick={() => toggle(t)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-mono border transition-all ${on ? 'bg-[rgba(255,152,0,0.25)] border-[rgba(255,152,0,0.6)] text-white' : 'bg-white/10 border-white/20 text-white/80'}`}
                data-testid={`flag-chip-${i}`}
              >
                {t}
              </button>
            );
          })}
          {targets.length === 0 && (
            <div className="text-xs text-white/60">No red flags here! This is legit.</div>
          )}
        </div>
      </div>
      <ClayButton
        variant="primary"
        size="lg"
        disabled={disabled}
        onClick={submit}
        data-testid="submit-flags-button"
        className="w-full flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" /> Submit
      </ClayButton>
    </div>
  );
};

export default SpotTheFlag;
