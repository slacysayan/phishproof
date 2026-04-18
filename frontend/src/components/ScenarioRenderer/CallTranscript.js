import React from 'react';
import AnnotatableText from './AnnotatableText';
import { PhoneCall as PhoneIcon, PhoneOff } from 'lucide-react';

export const CallTranscript = ({ content, highlight, targets }) => {
  if (!content) return null;
  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-phone-call">
      <div className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#5C6BC0]/30 to-transparent text-center">
        <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Incoming Call</div>
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#5C6BC0] to-[#F093FB] flex items-center justify-center font-heading font-black text-3xl mb-3">
          {content.callerName?.[0] || '?'}
        </div>
        <div className="font-heading font-black text-xl mb-0.5">{content.callerName}</div>
        <div className="text-[12px] text-white/70">{content.callerOrg}</div>
        <div className="text-[11px] text-white/55 font-mono mt-1">{content.callerNumber}</div>
      </div>
      <div className="px-3 py-3 space-y-2">
        {(content.dialogue || []).map((d, i) => (
          <div key={i} className={`flex ${d.speaker === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] rounded-2xl border border-white/10 px-3 py-2 ${d.speaker === 'You' ? 'bg-[rgba(92,107,192,0.22)]' : 'bg-white/10'}`}>
              <div className="text-[10px] uppercase tracking-widest font-heading text-white/55 mb-0.5">{d.speaker}</div>
              <div className="font-mono text-[12.5px] leading-relaxed text-white/90">
                <AnnotatableText text={d.text} targets={targets || []} highlight={highlight} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 grid grid-cols-2 gap-3">
        <button disabled className="h-12 rounded-full bg-[rgb(var(--pp-scam))] text-white font-heading font-extrabold text-xs flex items-center justify-center gap-2">
          <PhoneOff className="w-4 h-4" /> Decline
        </button>
        <button disabled className="h-12 rounded-full bg-[rgb(var(--pp-safe))] text-white font-heading font-extrabold text-xs flex items-center justify-center gap-2">
          <PhoneIcon className="w-4 h-4" /> Accept
        </button>
      </div>
    </div>
  );
};

export default CallTranscript;
