import React from 'react';
import AnnotatableText from './AnnotatableText';
import { Mail, Archive, Trash2, Reply } from 'lucide-react';

export const EmailViewer = ({ content, highlight, targets }) => {
  if (!content) return null;
  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-email">
      <div className="h-11 px-3 flex items-center justify-between bg-[#111A33] border-b border-white/5">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-white/70" />
          <span className="text-[11px] text-white/60">Inbox</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <Archive className="w-4 h-4" /><Trash2 className="w-4 h-4" /><Reply className="w-4 h-4" />
        </div>
      </div>
      <div className="p-3">
        <div className="font-heading font-black text-base leading-snug mb-2">
          <AnnotatableText text={content.subject} targets={targets || []} highlight={highlight} />
        </div>
        <div className="text-[11px] font-mono text-white/75 mb-1">
          <span className="text-white/45">From: </span>
          <AnnotatableText text={content.from} targets={targets || []} highlight={highlight} />
        </div>
        {content.replyTo && (
          <div className="text-[11px] font-mono text-white/60 mb-3">
            <span className="text-white/45">Reply-to: </span>
            <AnnotatableText text={content.replyTo} targets={targets || []} highlight={highlight} />
          </div>
        )}
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 mt-2">
          <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-white/90">
            <AnnotatableText text={content.body} targets={targets || []} highlight={highlight} />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EmailViewer;
