import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnnotatableText from './AnnotatableText';
import { ChevronLeft, Signal, Wifi, Battery, ShieldCheck } from 'lucide-react';

export const UPIScreen = ({ content, highlight, targets }) => {
  const timerRef = useRef(null);
  useEffect(() => {
    if (!timerRef.current || !content?.timerSeconds) return;
    gsap.fromTo(timerRef.current, { width: '100%' }, { width: '0%', duration: content.timerSeconds, ease: 'linear' });
  }, [content]);

  if (!content) return null;

  return (
    <div className="w-full bg-[#0B1020] text-white" data-testid="scenario-bhim-upi">
      <div className="h-7 px-3 flex items-center justify-between text-[10px] text-white/70 bg-[#0A0F22] border-b border-white/5">
        <span>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1"><Signal className="w-3 h-3" /><Wifi className="w-3 h-3" /><Battery className="w-3 h-3" /></div>
      </div>
      <div className="h-14 px-4 flex items-center gap-3 bg-[#1565C0]">
        <ChevronLeft className="w-5 h-5" />
        <div className="flex-1 font-heading font-extrabold text-base">BHIM UPI</div>
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div className="px-5 py-5">
        <div className="text-center">
          <div className="text-xs text-white/60 mb-1">
            {content.action === 'collect_request' ? 'Payment Request' : content.action === 'qr_scan' ? 'QR Scan' : 'Pay to'}
          </div>
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD700] to-[#F5576C] flex items-center justify-center font-heading font-black text-white text-xl mb-2">
            {content.requesterName?.[0] || '?'}
          </div>
          <div className="font-heading font-black text-base mb-0.5">
            <AnnotatableText text={content.requesterName} targets={targets || []} highlight={highlight} />
          </div>
          <div className="text-[11px] text-white/60 font-mono mb-4">
            <AnnotatableText text={content.vpa} targets={targets || []} highlight={highlight} />
          </div>
          <div className="font-heading font-black text-5xl text-white mb-1">
            {content.action === 'qr_scan' ? 'QR' : `₹${content.amount}`}
          </div>
          <div className="text-sm text-white/80 mb-4">
            <AnnotatableText text={content.note} targets={targets || []} highlight={highlight} />
          </div>
          {content.action === 'collect_request' && (
            <div className="rounded-xl bg-[rgba(255,152,0,0.16)] border border-[rgba(255,152,0,0.35)] text-white/90 text-[11px] px-3 py-2 text-left mb-4">
              ⚠️ You are being asked to PAY. Tapping Pay sends your money.
            </div>
          )}
          {!!content.timerSeconds && content.timerSeconds > 0 && (
            <div className="mb-4">
              <div className="text-[10px] text-white/60 mb-1">Request expires in {content.timerSeconds}s</div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div ref={timerRef} className="h-full rounded-full bg-[#F44336]" style={{ width: '100%' }} />
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button disabled className="h-11 rounded-xl bg-white/10 text-white/70 font-heading font-extrabold text-sm">Decline</button>
            <button disabled className="h-11 rounded-xl bg-[#5C6BC0]/90 text-white font-heading font-extrabold text-sm">{content.action === 'qr_scan' ? 'Scan' : 'Pay'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPIScreen;
