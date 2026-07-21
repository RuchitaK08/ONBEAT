import { Card } from '@/components/ui/card';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <p className="text-base leading-8 text-slate-200">“{quote}”</p>
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-slate-400">{role}</p>
      </div>
    </Card>
  );
}
