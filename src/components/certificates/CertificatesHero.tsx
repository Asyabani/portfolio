'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { useLoaderReady } from '@/hooks/useLoaderReady';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CertificatesHeroProps {
  total: number;
  firstYear: number;
  lastYear: number;
}

/**
 * CertificatesHero
 *
 * Same editorial opening language as the projects page: masked headline
 * lines, factual lead, drawn rule with meta, gentle exit parallax.
 */
export function CertificatesHero({
  total,
  firstYear,
  lastYear,
}: CertificatesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderReady = useLoaderReady();

  useEffect(() => {
    if (!loaderReady) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lines = section.querySelectorAll<HTMLElement>(
          '[data-hero-line] > span'
        );
        const fades = section.querySelectorAll<HTMLElement>('[data-hero-fade]');
        const rule = section.querySelector<HTMLElement>('[data-hero-rule]');

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.fromTo(
          lines,
          { yPercent: 115, rotate: 2.5 },
          { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.14 }
        );
        if (rule) {
          tl.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
            '-=0.75'
          );
        }
        tl.fromTo(
          fades,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          '-=1.0'
        );

        gsap.to(content, {
          yPercent: -10,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [loaderReady]);

  const scrollToTimeline = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const lenis = (
      window as Window & {
        lenis?: { scrollTo(target: string, opts?: object): void };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo('#certificate-timeline', { offset: -40 });
    } else {
      document
        .getElementById('certificate-timeline')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end md:min-h-[88vh]"
    >
      <div
        ref={contentRef}
        className="container mx-auto px-6 pb-14 pt-36 sm:px-10 md:pb-16 lg:px-16 xl:px-24"
      >
        <h1 className="text-[clamp(2.5rem,11vw,8.5rem)] font-bold leading-[0.95] tracking-tight">
          <span className="block overflow-hidden" data-hero-line>
            <span className="block">Proof of</span>
          </span>
          <span className="block overflow-hidden" data-hero-line>
            <span className="block">
              <span className="italic font-extrabold text-primary dark:text-teal-400">
                practice
              </span>
              .
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-fade
            className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300/80 sm:text-lg"
          >
            {total} certifications earned between {firstYear} and {lastYear} —
            the KOMINFO Digital Talent Scholarship, Dicoding classes, React and
            Flutter bootcamps, cybersecurity and data-science training. They
            back the work; the projects do the talking.
          </p>
          <a
            data-hero-fade
            href="#certificate-timeline"
            onClick={scrollToTimeline}
            className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-dark/70 transition-colors duration-300 hover:text-primary dark:text-white/70 dark:hover:text-teal-300"
          >
            Browse by year
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <div
          data-hero-rule
          className="mt-10 h-px origin-left bg-dark/10 dark:bg-white/10 md:mt-12"
          aria-hidden="true"
        />
        <div
          data-hero-fade
          className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-white/40"
        >
          <span>Certifications &amp; training</span>
          <span>
            {firstYear} — {lastYear}
          </span>
        </div>
      </div>
    </section>
  );
}
