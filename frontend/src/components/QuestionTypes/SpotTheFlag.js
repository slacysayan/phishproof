import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Eye, X } from 'lucide-react';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';

export const SpotTheFlag = ({ scenario, onAnswer, disabled }) => {
  const [selected, setSelected] = useState([]);
  const targets = scenario.annotationTargets || [];

  const toggle = (t) => {
    if (disabled) return;
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const submit = () => {
    const matches = selected.filter((s) => targets.includes(s)).length;
    const extras = selected.filter((s) => !targets.includes(s)).length;
    const threshold = Math.max(1, Math.ceil(targets.length * 0.5));
    const correct = matches >= threshold && extras === 0;
    onAnswer(correct ? 'correct' : 'incorrect', { selected });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Scenario Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ScenarioDeviceFrame type={scenario.type} content={scenario.content} highlight={false} targets={[]} />
      </motion.div>

      {/* Red Flag Picker */}
      <div className="bg-white rounded-2xl border border-[#0000000d] shadow-[var(--pp-shadow-card)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-[#ff9800]/10 flex items-center justify-center">
            <Eye className="w-4 h-4 text-[#ff9800]" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#242424]" style={{ fontFamily: 'var(--font-display)' }}>Tap the red flags</div>
            <div className="text-[10px] text-[#898989]">{selected.length} / {targets.length} selected</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {targets.map((t, i) => {
            const on = selected.includes(t);
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.92 }}
                disabled={disabled}
                onClick={() => toggle(t)}
                className={`px-3.5 py-2 rounded-xl text-[12px] font-medium border-2 transition-all ${
                  on
                    ? 'bg-[#ff9800]/10 border-[#ff9800] text-[#e65100] shadow-[0_2px_0_#e65100]'
                    : 'bg-[#f5f5f5] border-[#e5e5e5] text-[#6b6b6b] hover:border-[#d0d0d0]'
                }`}
                data-testid={`flag-chip-${i}`}
              >
                {on && <span className="mr-1">🚩</span>}
                {t}
                {on && (
                  <X className="w-3 h-3 ml-1 inline-block text-[#e65100]" />
                )}
              </motion.button>
            );
          })}
          {targets.length === 0 && (
            <div className="text-xs text-[#898989] py-2">No red flags here — this is legit! ✅</div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={disabled || selected.length === 0}
        onClick={submit}
        className="pp-duo-btn pp-duo-green h-14 w-full text-sm flex items-center justify-center gap-2"
        data-testid="submit-flags-button"
      >
        <CheckCircle2 className="w-5 h-5" /> Check Answer
      </button>
    </div>
  );
};

export default SpotTheFlag;
