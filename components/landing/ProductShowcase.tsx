'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/landing/SectionHeading';

export function ProductShowcase() {
  return (
    <section id="studio" className="container py-24">
      <SectionHeading
        title="A premium dashboard for sonic storytelling."
        subtitle="Studio workflow"
        description="Designed for music teams and creative agencies, ONBEAT gives you interactive design tools, motion-controlled audio scenes, and seamless publishing for digital launches."
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Wave forms</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Visualize sound in a premium dashboard.</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Adjust volume, motion, and harmonic layering while previewing cinematic audio sequences in real time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-lg font-semibold text-white">Instant theme sync</p>
                <p className="mt-2 text-sm text-slate-400">Switch themes across visual and audio palettes with one click.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-lg font-semibold text-white">Live motion controls</p>
                <p className="mt-2 text-sm text-slate-400">Animate sound transitions and layer cues for product and campaign launches.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/70 to-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/90 p-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Featured build</p>
              <h3 className="text-2xl font-semibold text-white">Flexible scene builder</h3>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm font-semibold text-white">Dynamic layers</p>
                <p className="mt-2 text-sm text-slate-400">Assign sounds to launch sections with immersive spatial mixing.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm font-semibold text-white">Performance preview</p>
                <p className="mt-2 text-sm text-slate-400">Play back motion-synced brand moments before publishing.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
