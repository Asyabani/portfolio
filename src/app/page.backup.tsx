import { HeroAnimated } from '@/components/HeroAnimated';
import { PortfolioGrid } from '@/components/PortfolioGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - GSAP Animated */}
      <HeroAnimated />

      {/* Portfolio Grid + Certificates — inside scroll-reveal curtain */}
      <PortfolioGrid />
    </main>
  );
}
