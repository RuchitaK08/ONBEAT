'use client';

import { cn } from '@/components/utils';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
}

export function Button({ className, variant = 'primary', href, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    variant === 'primary' && 'bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 text-white shadow-[0_20px_60px_rgba(111,66,255,0.24)] hover:-translate-y-0.5 hover:shadow-[0_28px_90px_rgba(111,66,255,0.28)]',
    variant === 'secondary' && 'border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15 hover:backdrop-brightness-110',
    variant === 'ghost' && 'bg-transparent text-slate-100 hover:bg-white/5',
    className
  );

  if (href) {
    return <a className={classes} href={href} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...props} />;
}
