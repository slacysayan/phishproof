import React from 'react';
import AnnotatableText from './AnnotatableText';
import { Lock, ChevronLeft, ChevronRight, RotateCw, Star } from 'lucide-react';

export const FakeWebsite = ({ content, highlight, targets }) => {
  if (!content) return null;
  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-fake-website">
      {/* Browser chrome */}
      <div className="h-9 px-2 flex items-center gap-2 bg-[#111A33] border-b border-white/5">
        <ChevronLeft className="w-3.5 h-3.5 text-white/50" />
        <ChevronRight className="w-3.5 h-3.5 text-white/50" />
        <RotateCw className="w-3.5 h-3.5 text-white/50" />
        <div className="flex-1 flex items-center gap-1.5 rounded-full bg-black/30 border border-white/10 px-2 py-1">
          <Lock className="w-3 h-3 text-white/60" />
          <div className="font-mono text-[10.5px] text-white/85 truncate">
            <AnnotatableText text={content.url} targets={targets || []} highlight={highlight} />
          </div>
        </div>
        <Star className="w-3.5 h-3.5 text-white/50" />
      </div>
      <div className="p-4 min-h-[220px]">
        <div className="text-[10px] text-white/45 mb-1">{content.pageTitle}</div>
        <div className="font-heading font-black text-lg leading-snug mb-3">
          <AnnotatableText text={content.heading} targets={targets || []} highlight={highlight} />
        </div>
        {Array.isArray(content.urgencyElements) && content.urgencyElements.length > 0 && (
          <div className="rounded-xl bg-[rgba(229,57,53,0.16)] border border-[rgba(229,57,53,0.35)] px-3 py-2 mb-3 text-[12px]">
            {content.urgencyElements.map((u, i) => (
              <div key={i}>
                <AnnotatableText text={u} targets={targets || []} highlight={highlight} />
              </div>
            ))}
          </div>
        )}
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 font-mono text-[12.5px] leading-relaxed text-white/90">
          <AnnotatableText text={content.bodyText || content.content} targets={targets || []} highlight={highlight} />
        </div>
      </div>
    </div>
  );
};

export default FakeWebsite;
