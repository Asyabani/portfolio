'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoaderReady } from '@/hooks/useLoaderReady';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FeaturedHeading Component - Client Component
 *
 * Displays a large heading with per-character reveal animation from bottom.
 * Used for section titles like "Featured Work" and "Achievements".
 */
interface FeaturedHeadingProps {
  className?: string;
  text?: string;
}

export function FeaturedHeading({
  className = '',
  text = 'Featured Work',
}: FeaturedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderReady = useLoaderReady();

  const featuredText = text;

  useEffect(() => {
    if (!loaderReady) return;

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    // Create character spans
    const chars = featuredText.split('');
    const charElements: HTMLElement[] = chars.map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block';
      span.style.whiteSpace = 'pre';
      container.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      gsap.set(charElements, { opacity: 0, y: 20 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'restart none restart none',
          },
        })
        .to(charElements, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          stagger: 0.08,
          ease: 'back.out(1.2)',
        });
    }, container);

    return () => {
      ctx.revert();
      container.innerHTML = '';
    };
  }, [loaderReady, featuredText]);

  return (
    <h2
      ref={containerRef}
      className={`font-normal text-4xl sm:text-5xl lg:text-[8rem] leading-none text-dark dark:text-white ${className}`.trim()}
    ></h2>
  );
}
