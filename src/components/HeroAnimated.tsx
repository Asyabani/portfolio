'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useLoaderReady } from '@/hooks/useLoaderReady';
import { useTheme } from '@/contexts/ThemeContext';
import { socialLinks } from '@/lib/data/social';

/**
 * HeroAnimated Component
 *
 * Full-screen hero: large headline left, profile photo right.
 * Per-character reveal animation (like FeaturedHeading) on loader complete.
 */
export function HeroAnimated() {
  const containerRef = useRef<HTMLElement>(null);
  // Plain-text line refs — characters injected by JS
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const businessRef = useRef<HTMLSpanElement>(null);
  // Line2 has mixed content (oval + text) — handled separately
  const worksRef = useRef<HTMLSpanElement>(null);
  const asHardRef = useRef<HTMLSpanElement>(null);
  const ovalRef = useRef<SVGEllipseElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const loaderReady = useLoaderReady();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!loaderReady) return;

    // Helper: split a text node into individual char <span>s, return them
    const splitToChars = (el: HTMLElement, text: string): HTMLSpanElement[] => {
      el.innerHTML = '';
      return text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'inline-block';
        span.style.whiteSpace = 'pre';
        el.appendChild(span);
        return span;
      });
    };

    const chars1 = splitToChars(line1Ref.current!, 'Web design that');
    const charsWorks = splitToChars(worksRef.current!, 'works');
    const charsAsHard = splitToChars(asHardRef.current!, '\u00A0as hard');
    const chars3 = splitToChars(line3Ref.current!, 'as the\u00A0');
    const chars4 = splitToChars(line4Ref.current!, 'behind it');

    // "business" already has its own styled span — split its text node
    const charsBusiness = businessRef.current
      ? splitToChars(businessRef.current, 'business')
      : [];

    const allChars = [
      ...chars1,
      ...charsWorks,
      ...charsAsHard,
      ...chars3,
      ...charsBusiness,
      ...chars4,
    ];

    gsap.set(allChars, { opacity: 0, y: 20 });
    gsap.set(introRef.current, { opacity: 0, y: 12 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(photoRef.current, { opacity: 0, scale: 0.9, x: 40 });

    // Oval start hidden — use actual path length for seamless draw
    const oval = ovalRef.current;
    if (oval) {
      const len = oval.getTotalLength();
      gsap.set(oval, { strokeDasharray: len, strokeDashoffset: len });
    }

    const tl = gsap.timeline();

    // Name + role eyebrow leads the sequence
    tl.to(introRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Per-character reveal — slower stagger & longer duration
    const CHARS_START = 0.25; // headline begins while the eyebrow is still settling
    tl.to(
      allChars,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.055,
        ease: 'back.out(1.4)',
      },
      CHARS_START
    );

    // Oval draws itself — starts when "works" chars begin (after chars1)
    if (oval) {
      tl.to(
        oval,
        { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
        CHARS_START + chars1.length * 0.055 // offset = when "works" starts
      );
    }

    // CTA fades in after all chars
    tl.to(
      ctaRef.current,
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.3'
    );

    // Photo comes in from right, same time as text starts
    tl.to(
      photoRef.current,
      { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'power2.out' },
      0
    );

    return () => {
      tl.kill();
    };
  }, [loaderReady]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center bg-[#f0f1fa] dark:bg-[#07090f] overflow-hidden transition-colors duration-500 sticky top-0 z-1"
    >
      {/* Subtle radial glow — dark mode only */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 30% 50%, rgba(13,148,136,0.09) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* ── Left: Headline ── */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow: who + what — the one line a visitor should read first */}
            <p
              ref={introRef}
              className="mb-5 md:mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.28em] uppercase"
            >
              <span className="text-dark dark:text-white">Nurzaman Asyabani</span>
              <span
                aria-hidden="true"
                className="h-px w-6 bg-primary/70 dark:bg-teal-400/70"
              />
              <span className="text-primary dark:text-teal-400">
                Fullstack Developer
              </span>
            </p>

            {/* One h1 for the page; each visual line is a block span */}
            <h1 className="text-[2rem] sm:text-[2.4rem] md:text-5xl lg:text-6xl xl:text-[5rem] font-bold leading-[1.1] tracking-tight text-dark/50 dark:text-white/55">
              {/* Line 1: "Web design that" */}
              <span ref={line1Ref} className="block" />

              {/* Line 2: ⟨works⟩ as hard */}
              <span className="flex flex-wrap items-center">
                {/* "works" with oval */}
                <span className="relative inline-block mr-3">
                  <svg
                    className="absolute pointer-events-none"
                    style={{ inset: '-14% -18%', width: '136%', height: '128%' }}
                    viewBox="0 0 136 128"
                    preserveAspectRatio="none"
                    overflow="visible"
                  >
                    <ellipse
                      ref={ovalRef}
                      cx="68"
                      cy="64"
                      rx="62"
                      ry="58"
                      fill="none"
                      stroke={isDark ? 'white' : '#0f172a'}
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      transform="rotate(-90 68 64)"
                      style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
                    />
                  </svg>
                  <span
                    ref={worksRef}
                    className="relative italic text-dark dark:text-white px-2"
                  />
                </span>
                {/* "as hard" */}
                <span ref={asHardRef} />
              </span>

              {/* Line 3: "as the business" */}
              <span className="block">
                <span ref={line3Ref} className="inline">
                  {/* "as the " filled by JS */}
                </span>
                <span
                  ref={businessRef}
                  className="hero-business text-primary dark:text-teal-400 italic font-extrabold"
                />
              </span>

              {/* Line 4: "behind it" */}
              <span className="block">
                <span
                  ref={line4Ref}
                  className="text-primary dark:text-teal-400 italic font-extrabold"
                />
              </span>
            </h1>

            {/* CTA pair: primary (work) + secondary (contact) */}
            <div
              ref={ctaRef}
              className="mt-8 md:mt-12 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white hover:bg-teal-700 dark:bg-teal-400 dark:text-[#050b23] dark:hover:bg-teal-300 text-xs font-semibold tracking-[0.2em] uppercase px-8 sm:px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(13,148,136,0.28)] transition-all duration-300"
              >
                View My Projects
              </Link>
              <a
                href={socialLinks.email}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-dark/30 dark:border-white/30 text-dark/80 dark:text-white/80 hover:text-dark dark:hover:text-white hover:border-dark/70 dark:hover:border-white/70 text-xs font-semibold tracking-[0.2em] uppercase px-8 sm:px-10 py-4 rounded-full transition-all duration-300"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div
            ref={photoRef}
            className="shrink-0 flex items-center justify-center"
          >
            <div className="relative w-52 h-52 sm:w-80 sm:h-80 lg:w-104 lg:h-104 rounded-full overflow-hidden bg-white/5 shadow-2xl">
              <Image
                src="/img/profile-2026.jpg"
                alt="Nurzaman Asyabani"
                fill
                sizes="(max-width: 640px) 208px, (max-width: 1024px) 320px, 416px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
