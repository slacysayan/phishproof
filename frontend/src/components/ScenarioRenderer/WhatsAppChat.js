import React from 'react';
import AnnotatableText from './AnnotatableText';
import { ChevronLeft, Phone, MoreVertical, Check, CheckCheck } from 'lucide-react';

export const WhatsAppChat = ({ content, highlight, targets }) => {
  if (!content) return null;
  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-whatsapp">
      <div className="h-12 px-3 flex items-center gap-2 bg-[#0F1630] border-b border-white/5">
        <ChevronLeft className="w-4 h-4 text-white/80" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#43A047] to-[#5C6BC0] flex items-center justify-center font-heading font-black text-white text-xs">
          {content.senderName?.[0] || '?'}
        </div>
        <div className="flex-1">
          <div className="font-heading font-bold text-sm leading-none">{content.senderName}</div>
          <div className="text-[10px] text-white/55 font-mono">{content.senderNumber}</div>
        </div>
        <Phone className="w-4 h-4 text-white/70" />
        <MoreVertical className="w-4 h-4 text-white/70" />
      </div>
      <div className="p-3 min-h-[240px] flex flex-col gap-2">
        {(content.messages || []).map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.isIncoming ? '' : 'ml-auto'}`}>
            <div className={`rounded-2xl border border-white/10 px-3 py-2 ${m.isIncoming ? 'bg-white/10' : 'bg-[rgba(67,160,71,0.18)]'}`}>
              <div className="font-mono text-[12.5px] leading-relaxed text-white/90 break-words">
                <AnnotatableText text={m.text} targets={targets || []} highlight={highlight} />
              </div>
              <div className="flex items-center gap-1 justify-end mt-1 text-[10px] text-white/55">
                <span>{m.time}</span>
                {!m.isIncoming && <CheckCheck className="w-3 h-3 text-[#4facfe]" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppChat;
