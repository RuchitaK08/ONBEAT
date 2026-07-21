import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeatureCardProps {
  title: string;
  description: string;
  label: string;
}

export function FeatureCard({ title, description, label }: FeatureCardProps) {
  return (
    <Card className="p-6 transition duration-300 hover:-translate-y-1 hover:bg-slate-900/80">
      <Badge className="mb-4">{label}</Badge>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </Card>
  );
}
