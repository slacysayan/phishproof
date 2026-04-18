import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';
import { CheckCircle2 } from 'lucide-react';

export const WhatWouldYouDo = ({ scenario, onAnswer, disabled }) => {
  const options = scenario.options || [];
  const question = scenario.question || 'What would you do?';
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (opt) => {
    if (disabled) return;
    setSelectedId(opt.id);
    // Delay to show selection feedback
    setTimeout(() => {
      onAnswer(opt.correct ? 'correct' : 'incorrect', { chosen: opt });
    }, 300);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Scenario Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ScenarioDeviceFrame type={scenario.type} content={scenario.content} />
      </motion.div>

      {/* Question */}
      <div className="text-center" data-testid="question-prompt">
        <div className="text-[11px] text-[#898989] uppercase tracking-widest font-semibold mb-1">Choose wisely</div>
        <h3 className="font-bold text-lg text-[#242424] leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
          {question}
        </h3>
      </div>

      {/* Option Cards */}
      <div className="flex flex-col gap-2.5" data-testid="wwyd-options">
        {options.map((opt, i) => {
          const isSelected = selectedId === opt.id;
          const letter = String.fromCharCode(65 + i); // A, B, C, D

          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              disabled={disabled}
              onClick={() => handleSelect(opt)}
              className={`relative w-full rounded-2xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-[#1cb0f6] bg-[#1cb0f6]/5 shadow-[0_3px_0_#0e91d1]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#d0d0d0] shadow-[0_2px_0_#e5e5e5]'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              data-testid={`wwyd-option-${opt.id}`}
            >
              <div className="flex items-start gap-3">
                {/* Letter badge */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
                  isSelected
                    ? 'bg-[#1cb0f6] text-white'
                    : 'bg-[#f5f5f5] text-[#6b6b6b]'
                }`} style={{ fontFamily: 'var(--font-display)' }}>
                  {letter}
                </div>
                <span className="text-[13.5px] leading-relaxed text-[#242424] font-medium pt-0.5">
                  {opt.text}
                </span>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1cb0f6]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default WhatWouldYouDo;
