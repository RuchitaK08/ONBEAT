'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section id="download" className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-2xl"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-slate-300/80">Ready to stay ONBEAT?</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Bring your workout into perfect rhythm.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300">
          Install the Chrome extension now and let ONBEAT build workouts that move with your mood, pace, and energy.
        </p>
        <Button href="#" variant="primary" className="mt-10 px-10 py-4 text-base">
          Install Extension
        </Button>
      </motion.div>
    </section>
  );
}
