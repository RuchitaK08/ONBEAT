import { cn } from '@/components/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-glow backdrop-blur-xl',
        className
      )}
      {...props}
    />
  );
}
