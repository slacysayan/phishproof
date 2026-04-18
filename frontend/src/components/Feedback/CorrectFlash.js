import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const CorrectFlash = () => (
  <>
    {/* Full-screen green tint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.12, 0] }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 pointer-events-none bg-[#58cc02]"
    />

    {/* Center icon burst */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.3, 1.4, 2] }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
      data-testid="correct-flash"
    >
      <div className="w-28 h-28 rounded-full bg-[#58cc02]/20 border-4 border-[#58cc02]/40 backdrop-blur-md flex items-center justify-center">
        <CheckCircle2 className="w-16 h-16 text-[#58cc02]" />
      </div>
    </motion.div>

    {/* Bottom banner (Duolingo-style) */}
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-[500px] px-4 pb-6">
        <div className="bg-[#d7ffb8] border-t-2 border-[#58cc02] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#58cc02] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#58a700] text-sm" style={{ fontFamily: 'var(--font-display)' }}>Correct!</div>
            <div className="text-[12px] text-[#58a700]/70">Great instincts 🎯</div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
);

export default CorrectFlash;
