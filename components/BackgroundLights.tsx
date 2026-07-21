'use client';

import { motion } from 'framer-motion';

export function BackgroundLights() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-8 h-[26rem] w-[26rem] rounded-full bg-[rgba(255,94,200,0.18)] blur-[160px]"
        animate={{ x: [0, 14, 0], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[rgba(154,108,255,0.16)] blur-[200px]"
        animate={{ x: [0, -16, 0], y: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[18%] top-[35%] h-[22rem] w-[22rem] rounded-full bg-[rgba(102,178,255,0.12)] blur-[180px]"
        animate={{ x: [0, 10, 0], y: [0, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[rgba(255,94,200,0.14)] blur-[220px]"
        animate={{ x: [0, -12, 0], y: [0, -8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
