import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export const WrongShake = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 0.6 }}
    className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
    data-testid="wrong-flash"
  >
    <div className="absolute inset-0 bg-[rgba(244,67,54,0.14)]" />
    <div className="relative w-36 h-36 rounded-full bg-[rgba(244,67,54,0.28)] border-4 border-[rgba(244,67,54,0.6)] backdrop-blur-md flex items-center justify-center">
      <XCircle className="w-20 h-20 text-[#F44336]" />
    </div>
  </motion.div>
);

export default WrongShake;
