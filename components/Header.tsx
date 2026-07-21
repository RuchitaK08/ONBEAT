'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Github', href: 'https://github.com', external: true },
  { label: 'Download', href: '#download' }
];

export function Header() {
  return (
    <header className="sticky top-6 z-50 mx-auto w-full border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.15)]">
      <div className="container flex items-center justify-between gap-4 py-5">
        <motion.a
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          href="#home"
          className="text-lg font-semibold tracking-[0.35em] text-white"
        >
          ONBEAT
        </motion.a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="text-sm text-slate-300 transition duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button href="#download" variant="secondary" className="hidden md:inline-flex">
          Install
        </Button>
      </div>
    </header>
  );
}
