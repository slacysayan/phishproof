import React from 'react';
import AnnotatableText from './AnnotatableText';
import { Signal, Wifi, Battery, ArrowLeft, MoreVertical } from 'lucide-react';

export const SMSBubble = ({ content, highlight, targets }) => {
  if (!content) return null;
  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-android-sms">
      {/* Status bar */}
      <div className="h-7 px-3 flex items-center justify-between text-[10px] text-white/70 bg-[#0A0F22] border-b border-white/5">
        <span>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
        </div>
      </div>
      {/* App header */}
      <div className="h-14 px-3 flex items-center gap-3 bg-[#111A33] border-b border-white/5">
        <ArrowLeft className="w-4 h-4 text-white/70" />
        <div className="flex-1">
          <div className="font-heading font-bold text-sm">{content.sender}</div>
          <div className="text-[10px] text-white/50">SMS</div>
        </div>
        <MoreVertical className="w-4 h-4 text-white/70" />
      </div>
      {/* Messages */}
      <div className="p-3 min-h-[220px] flex flex-col">
        <div className="text-[10px] text-center text-white/45 mb-2">{content.timestamp}</div>
        <div className="max-w-[85%] rounded-2xl bg-white/10 border border-white/10 px-3 py-2.5 mb-2">
          <div className="font-mono text-[12.5px] leading-relaxed text-white/90 break-words">
            <AnnotatableText text={content.message} targets={targets || []} highlight={highlight} />
          </div>
          <div className="text-[10px] text-white/45 mt-1">{content.timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default SMSBubble;
