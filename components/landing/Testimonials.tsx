import { TestimonialCard } from '@/components/landing/TestimonialCard';
import { SectionHeading } from '@/components/landing/SectionHeading';

const testimonials = [
  {
    quote: 'ONBEAT turned our launch into a cinematic audio journey that elevated the entire brand experience.',
    name: 'Maya Kline',
    role: 'Creative Director, Pulse Labs'
  },
  {
    quote: 'The sound workflow is effortless and the motion-led previews feel polished from first use.',
    name: 'Noah Reyes',
    role: 'Founder, Echo Collective'
  },
  {
    quote: 'A premium audio platform with powerful tools for modern studios and immersive campaigns.',
    name: 'Aria Chen',
    role: 'Head of Studio, Neon Aura'
  }
];

export function Testimonials() {
  return (
    <section id="pricing" className="container space-y-10 py-24">
      <SectionHeading
        title="Trusted by creative teams building better sound launch experiences."
        subtitle="Testimonials"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} quote={item.quote} name={item.name} role={item.role} />
        ))}
      </div>
    </section>
  );
}
