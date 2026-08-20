'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll Component
 *
 * Wraps children with Lenis smooth scroll functionality
 * Integrates with GSAP ScrollTrigger for scroll-based animations
 *
 * @see https://github.com/darkroomengineering/lenis
 * @see https://greensock.com/scrolltrigger/
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with recommended settings from documentation
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    } as any);

    lenisRef.current = lenis;

    // Expose Lenis instance to window for CustomScrollbar
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Integrate Lenis with GSAP ScrollTrigger (recommended approach from docs)
    lenis.on('scroll', ScrollTrigger.update);

    // Store ticker function for proper cleanup
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    };

    // Add Lenis's raf to GSAP's ticker for optimal synchronization
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add(tickerFn);

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined') {
        (window as any).lenis = null;
      }
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
