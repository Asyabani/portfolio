'use client';

/**
 * PortfolioScrollReveal
 *
 * Scroll-driven reveal for the Featured Work + Certificates sections on the
 * homepage. The panel starts translated down and slides up as the user scrolls
 * past the hero, with a rounded top edge and shadow. Once in place, individual
 * child elements animate in with stagger.
 *
 * Unlike the projects page version, this does NOT use scroll locking — the
 * content is taller than one viewport (portfolio + certificates), so it flows
 * naturally after the reveal.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: React.ReactNode;
}

export function PortfolioScrollReveal({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // ── Curtain slide-up ──
        // The whole panel starts below and slides into place.
        gsap.fromTo(
          wrapper,
          { y: '20vh' },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'top 50%',
              scrub: 0.8,
            },
          }
        );

        // ── Staggered card reveals ──
        const cards = wrapper.querySelectorAll('.portfolio-reveal-card');
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });

          ScrollTrigger.create({
            trigger: wrapper,
            start: 'top 60%',
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
              });
            },
          });
        }

        // ── Heading + tagline reveal ──
        const heading = wrapper.querySelector('.portfolio-reveal-heading');
        const tagline = wrapper.querySelector('.portfolio-reveal-tagline');

        if (heading) {
          gsap.set(heading, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: wrapper,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              gsap.to(heading, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
              });
            },
          });
        }

        if (tagline) {
          gsap.set(tagline, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: wrapper,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              gsap.to(tagline, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: 0.15,
                ease: 'power3.out',
              });
            },
          });
        }

        // ── CTA button ──
        const cta = wrapper.querySelector('.portfolio-reveal-cta');
        if (cta) {
          gsap.set(cta, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: cta,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(cta, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
              });
            },
          });
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <div className="portfolio-scroll-reveal-spacer">
      <div ref={wrapperRef} className="portfolio-scroll-reveal">
        {children}
      </div>
    </div>
  );
}
