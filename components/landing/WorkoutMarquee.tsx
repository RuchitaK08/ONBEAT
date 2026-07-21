'use client';

import { motion } from 'framer-motion';

const workouts = ['Running', 'HIIT', 'Cycling', 'Walking', 'Strength', 'Yoga', 'Pilates', 'Dance', 'CrossFit'];

export function WorkoutMarquee() {
  return (
    <section id="how-it-works" className="container overflow-hidden py-20">
      <div className="rounded-[3rem] border border-white/10 bg-white/5 px-5 py-6 shadow-[0_40px_120px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300/80">Workout types</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Pick your pace and stay in rhythm.
            </h2>
          </div>
          <div className="hidden rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 sm:flex">
            Smooth, infinite motion.
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2.5rem] bg-[#0d1018]/80 p-4">
          <motion.div
            className="flex w-[calc(200%+1rem)] gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          >
            {[...workouts, ...workouts].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
