import { FeatureCard } from '@/components/landing/FeatureCard';
import { SectionHeading } from '@/components/landing/SectionHeading';

const benefits = [
  {
    title: 'Immersive audio launches',
    description: 'Deploy motion-synced audio journeys with refined sonic palettes that support premium product storytelling.',
    label: 'Launch'
  },
  {
    title: 'Studio-ready workflows',
    description: 'Connect design, sound, and brand teams with seamless collaboration tools for quick iteration and consistent sound quality.',
    label: 'Studio'
  },
  {
    title: 'Cinematic branding',
    description: 'Craft memorable identities with layered audio, animated visual motion, and sonic triggers for modern experiences.',
    label: 'Identity'
  }
];

export function Benefits() {
  return (
    <section id="features" className="container space-y-10 py-24">
      <SectionHeading
        title="Everything your audio brand needs to stand out."
        subtitle="Why ONBEAT"
        description="From creative direction to motion-rich delivery, ONBEAT helps teams build unforgettable sound identities with elegant performance and premium polish."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((item) => (
          <FeatureCard key={item.title} title={item.title} description={item.description} label={item.label} />
        ))}
      </div>
    </section>
  );
}
