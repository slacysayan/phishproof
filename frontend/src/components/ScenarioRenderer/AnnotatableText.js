// Annotation helper: wraps given target strings in the message with a highlight span
import React from 'react';

export const AnnotatableText = ({ text = '', targets = [], highlight = false, className = '' }) => {
  if (!text) return null;
  if (!highlight || !targets || targets.length === 0) {
    return <span className={className}>{text}</span>;
  }
  // Sort targets by length desc to avoid overlapping replacement issues
  const sorted = [...targets].sort((a, b) => b.length - a.length);
  // Build regex
  const pattern = new RegExp('(' + sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
  const parts = text.split(pattern);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (sorted.includes(p)) {
          return (
            <mark key={i} className="annot-red" data-testid="annotated-flag">
              {p}
            </mark>
          );
        }
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </span>
  );
};

export default AnnotatableText;
