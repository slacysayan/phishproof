import React from 'react';
import ScenarioDeviceFrame from '@/components/ScenarioRenderer/ScenarioDeviceFrame';
import { ClayButton } from '@/components/UI/ClayButton';

export const WhatWouldYouDo = ({ scenario, onAnswer, disabled }) => {
  const options = scenario.options || [];
  const question = scenario.question || 'What would you do?';

  return (
    <div className="flex flex-col gap-4">
      <ScenarioDeviceFrame type={scenario.type} content={scenario.content} />
      <div className="text-center text-white font-heading font-bold text-sm" data-testid="question-prompt">{question}</div>
      <div className="grid grid-cols-1 gap-2.5" data-testid="wwyd-options">
        {options.map((opt) => (
          <ClayButton
            key={opt.id}
            variant="ghost"
            size="lg"
            disabled={disabled}
            onClick={() => onAnswer(opt.correct ? 'correct' : 'incorrect', { chosen: opt })}
            className="text-left justify-start whitespace-normal h-auto py-3 text-[13.5px] leading-snug"
            data-testid={`wwyd-option-${opt.id}`}
          >
            <span className="font-heading font-black mr-2 text-white/70">{opt.id.toUpperCase()}.</span>
            <span className="font-body font-medium text-white/95">{opt.text}</span>
          </ClayButton>
        ))}
      </div>
    </div>
  );
};

export default WhatWouldYouDo;
