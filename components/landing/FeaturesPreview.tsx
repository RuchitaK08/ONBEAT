'use client';

import { motion } from 'framer-motion';
import { BarChart3, PlugZap, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const previewCards = [
  {
    title: 'AI BPM Matching',
    description: 'Smart tempo detection that keeps your playlist aligned with every workout phase.',
    icon: BarChart3,
  },
  {
    title: 'Spotify Sync',
    description: 'Real-time playlist updates and seamless account connection across all sessions.',
    icon: PlugZap,
  },
  {
    title: 'Smart Recommendations',
    description: 'Personalized song curation based on mood, energy and workout goals.',
    icon: Sparkles,
  },
];

export function FeaturesPreview() {
  return (
    <section id="features" className="container py-20">
      <div className="grid gap-10 xl:grid-cols-3">
        {previewCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Card className="h-full p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-pink-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
