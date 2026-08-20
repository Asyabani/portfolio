'use client';

/**
 * ProjectsScrollReveal
 *
 * Phase 1 – curtain: panel slides up from 100vh → 0 covering the sticky hero.
 * Phase 2 – locked: once the panel fully covers the hero, Lenis is stopped and
 *   the browser's native scroll is locked so the user cannot go back up to the
 *   hero. The projects-world inside handles its own carousel scroll.
 *
 * Unlock: ProjectsWorld calls window.__unlockProjectsScroll() when the user
 *   reaches the end of the carousel. That restores scroll and lets the footer
 *   become reachable.
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

export function ProjectsScrollReveal({ children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  // Guard: ignore onEnterBack immediately after onLeave snap
  const lockingRef = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          inner,
          { y: '100vh' },
          {
            y: '0vh',
            ease: 'none',
            scrollTrigger: {
              trigger: outer,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.3,
              pin: false,
              onLeave: () => {
                if (lockedRef.current) return;
                lockedRef.current = true;
                lockingRef.current = true;

                // Stop Lenis so smooth scroll doesn't keep running.
                const lenis = (
                  window as Window & { lenis?: { stop(): void; start(): void } }
                ).lenis;
                lenis?.stop();

                // Force panel to final position immediately
                gsap.set(inner, { y: 0 });

                // Snap window to the top of the inner panel.
                const panelTop =
                  inner.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: panelTop, behavior: 'instant' });

                // Lock body scroll — ProjectsWorld will unlock via
                // unlockScroll() when carousel ends.
                document.body.style.overflow = 'hidden';

                // Allow onEnterBack after the snap settles
                setTimeout(() => {
                  lockingRef.current = false;
                }, 200);
              },
              onEnterBack: () => {
                // Skip if we just locked (snap can re-enter trigger range)
                if (lockingRef.current) return;
                // Unlock if user scrolls back up.
                lockedRef.current = false;
                document.body.style.overflow = '';
                inner.style.overflow = '';
                const lenis = (
                  window as Window & { lenis?: { stop(): void; start(): void } }
                ).lenis;
                lenis?.start();
              },
            },
          }
        );
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
      lockedRef.current = false;
      lockingRef.current = false;
      document.body.style.overflow = '';
    };
  }, []);

  return (
    /* Extra bottom padding so the footer has space after the sticky panel */
    <div ref={outerRef} className="projects-scroll-reveal-spacer">
      <div ref={innerRef} className="projects-scroll-reveal">
        {children}
      </div>
    </div>
  );
}
