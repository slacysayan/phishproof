import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const CorrectFlash = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 2.4] }}
    transition={{ duration: 0.75, ease: 'easeOut' }}
    className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
    data-testid="correct-flash"
  >
    <div className="w-36 h-36 rounded-full bg-[rgba(76,175,80,0.28)] border-4 border-[rgba(76,175,80,0.6)] backdrop-blur-md flex items-center justify-center">
      <CheckCircle2 className="w-20 h-20 text-[#4CAF50]" />
    </div>
  </motion.div>
);

export default CorrectFlash;
