"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Zap, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-80, 80], [14, -14]);
  const rotateY = useTransform(pointerX, [-80, 80], [-14, 14]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    pointerX.set(x / 12);
    pointerY.set(y / 12);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section id="home" className="container relative pt-28 pb-32 lg:pt-32 lg:pb-36">
      <div className="grid gap-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-5">
            <p className="text-[0.65rem] uppercase tracking-[0.65em] text-white/50">ONBEAT</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight leading-tight text-white sm:text-6xl">
              Music that moves with you.
            </h1>
            <p className="max-w-2xl text-base leading-9 text-slate-300 sm:text-lg">
              Stop skipping songs during workouts. Connect Spotify once, choose your session, and we’ll
              generate the perfect playlist based on BPM, mood and energy.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm leading-6 text-slate-300 sm:gap-6">
            <div className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span>Chrome Extension</span>
            </div>
            <div className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <Music className="h-4 w-4 text-sky-300" />
              <span>Spotify Connected</span>
            </div>
            <div className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-violet-300" />
              <span>AI Powered</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="#download" variant="primary" className="min-w-[11rem]">
              Get Started
            </Button>
            <Button href="#how-it-works" variant="secondary" className="min-w-[11rem]">
              Live Demo
            </Button>
          </div>
        </motion.div>

        <div className="relative flex justify-center">
          {/* Ambient lights */}
          <div className="pointer-events-none absolute -left-36 top-0 h-80 w-80 rounded-full bg-pink-500/8 blur-[220px]" />
          <div className="pointer-events-none absolute -right-40 top-8 h-96 w-96 rounded-full bg-violet-500/8 blur-[260px]" />
          <div className="pointer-events-none absolute -right-8 -bottom-6 h-64 w-64 rounded-full bg-sky-500/8 blur-[200px]" />

          <div className="relative flex items-center justify-center">
            {/* Floating playlist card (top-left) */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              animate={{ opacity: 1, y: [0, -8, 0], rotate: [-6, -3, -6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[-6rem] top-[-5rem] z-20 w-56 rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-xl shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300">Today's Playlist</p>
                  <p className="text-sm font-semibold text-white">HIIT Session</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">42 Songs</p>
                  <p className="text-sm font-semibold text-white">165 BPM</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-semibold text-white">45 min</p>
              </div>
            </motion.div>

            {/* Floating Spotify status (top-right) */}
            <motion.div
              initial={{ opacity: 0, y: 16, rotate: 6 }}
              animate={{ opacity: 1, y: [0, -6, 0], rotate: [6, 3, 6] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[-5.5rem] top-[-3.5rem] z-20 w-44 rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-xl shadow-lg"
            >
              <p className="text-xs text-slate-300">Spotify Connected</p>
              <p className="text-sm font-semibold text-white">Premium</p>
              <p className="mt-1 text-xs text-slate-400">Library Synced</p>
            </motion.div>

            {/* BPM waveform card (bottom-left) */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -4 }}
              animate={{ opacity: 1, y: [0, -6, 0], rotate: [-4, 2, -4] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[-6rem] bottom-[-4.5rem] z-10 w-64 rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300">BPM</p>
                  <p className="text-sm font-semibold text-white">165 BPM</p>
                </div>
                <div className="w-36">
                  <svg viewBox="0 0 120 24" className="w-full h-6">
                    <motion.path
                      d="M0 12 C10 6, 20 18,30 12 C40 6,50 18,60 12 C70 6,80 18,90 12 C100 6,110 18,120 12"
                      fill="none"
                      stroke="url(#g)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ pathLength: [0, 1, 0.8, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <defs>
                      <linearGradient id="g" x1="0%" x2="100%">
                        <stop offset="0%" stopColor="#ff5ea0" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Circular Energy Ring (bottom-right) */}
            <motion.div
              initial={{ opacity: 0, y: 12, rotate: 4 }}
              animate={{ opacity: 1, y: [0, -6, 0], rotate: [4, -2, 4] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[-6.5rem] bottom-[-5rem] z-20 w-36"
            >
              <div className="rounded-full bg-white/6 p-3 shadow-lg border border-white/10 backdrop-blur-xl">
                <svg viewBox="0 0 36 36" className="w-20 h-20">
                  <defs>
                    <linearGradient id="rg" x1="0%" x2="100%">
                      <stop offset="0%" stopColor="#ff5ea0" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="url(#rg)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="94"
                    strokeDashoffset={"7.52"}
                    animate={{ strokeDashoffset: [94 - (94 * 0.92), 94 - (94 * 0.95), 94 - (94 * 0.92)] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>
                <div className="mt-2 text-center">
                  <p className="text-xs text-slate-300">Energy</p>
                  <p className="text-sm font-semibold text-white">92%</p>
                </div>
              </div>
            </motion.div>

            {/* Phone mockup (center, kept largest) */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ y: -6 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 24 }}
              className="relative z-50 max-w-[22rem] rounded-[3rem] border border-white/8 bg-gradient-to-b from-white/6 to-white/3 p-6 shadow-[0_80px_220px_rgba(143,71,255,0.18)] backdrop-blur-3xl"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle,_rgba(255,94,200,0.16),transparent_30%)] opacity-70" />
              <div className="relative rounded-[2.5rem] border border-white/6 bg-[#0f1118]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <div className="mb-6 flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur-xl">
                  <span className="font-semibold">Workout</span>
                  <span className="rounded-full bg-pink-500/15 px-3 py-1 font-semibold text-pink-200">HIIT</span>
                </div>
                <div className="space-y-5">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Recommended</p>
                      <p className="mt-2 text-4xl font-semibold text-white">165 BPM</p>
                    </div>
                    <div className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Songs Found</p>
                      <p className="mt-2 text-4xl font-semibold text-white">42</p>
                    </div>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                    <p className="font-medium text-white">Energy</p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400" />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">High</p>
                  </div>
                </div>
                <Button href="#download" variant="primary" className="mt-6 w-full justify-between px-6 py-4 shadow-[0_24px_60px_rgba(143,71,255,0.18)] hover:shadow-[0_32px_84px_rgba(255,94,200,0.2)]">
                  Generate Playlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
