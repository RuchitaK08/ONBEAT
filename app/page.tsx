import { Header } from '@/components/Header';
import { Hero } from '@/components/landing/Hero';
import { WorkoutMarquee } from '@/components/landing/WorkoutMarquee';
import { FeaturesPreview } from '@/components/landing/FeaturesPreview';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/Footer';
import { BackgroundLights } from '@/components/BackgroundLights';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <BackgroundLights />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10 noise-overlay" />

      <Header />

      <main className="relative">
        <Hero />
        <WorkoutMarquee />
        <FeaturesPreview />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
