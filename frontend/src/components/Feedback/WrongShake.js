import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';

export const WrongShake = () => (
  <>
    {/* Full-screen red tint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.1, 0] }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 pointer-events-none bg-[#ff4b4b]"
    />

    {/* Center icon */}
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 1.5], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
      data-testid="wrong-flash"
    >
      <div className="w-28 h-28 rounded-full bg-[#ff4b4b]/20 border-4 border-[#ff4b4b]/40 backdrop-blur-md flex items-center justify-center">
        <XCircle className="w-16 h-16 text-[#ff4b4b]" />
      </div>
    </motion.div>

    {/* Bottom banner (Duolingo-style) */}
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-[500px] px-4 pb-6">
        <div className="bg-[#ffdfe0] border-t-2 border-[#ff4b4b] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff4b4b] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#ea2b2b] text-sm" style={{ fontFamily: 'var(--font-display)' }}>Incorrect!</div>
            <div className="text-[12px] text-[#ea2b2b]/70">Let's learn from this one 🧠</div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
);

export default WrongShake;
