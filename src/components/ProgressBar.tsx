'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LOADER_COMPLETE_EVENT = 'app-loader-complete';
const LOADER_SEEN_KEY = 'app-loader-seen'; // sessionStorage: full intro once per session

/**
 * The intro should play once per browser session. Later full reloads (or
 * back/forward navigations) skip straight to the page, as does anyone who
 * asked their OS for reduced motion. The inline <head> script in layout.tsx
 * mirrors this check so the very first paint already knows to skip.
 */
const shouldSkipLoader = () => {
  if (typeof window === 'undefined') return false;
  try {
    if (window.sessionStorage.getItem(LOADER_SEEN_KEY)) return true;
  } catch {
    // sessionStorage unavailable (privacy mode) — fall through and play
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const markLoaderSeen = () => {
  try {
    window.sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  } catch {
    // ignore
  }
};

export function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showSplit, setShowSplit] = useState(false);
  const skipRef = useRef<boolean | null>(null);
  const getSkip = () => {
    if (skipRef.current === null) skipRef.current = shouldSkipLoader();
    return skipRef.current;
  };

  const loaderRef = useRef<HTMLDivElement>(null);
  const splitLeftRef = useRef<HTMLSpanElement>(null);
  const splitRightRef = useRef<HTMLSpanElement>(null);
  const splitCrossRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (getSkip()) {
      // No intro this time: the page is already visible from first paint
      // (html.loader-skip), so just drop the loader markup and tell listeners.
      // No zoom-reveal here — it would flash content that is already showing.
      const raf = requestAnimationFrame(() => {
        setIsVisible(false);
        window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
      });
      return () => cancelAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      const progressState = { value: 0 };
      const timeline = gsap.timeline();

      timeline.to(progressState, {
        value: 100,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.round(progressState.value)),
      });

      timeline.add(() => {
        setShowSplit(true);
        if (splitLeftRef.current) {
          gsap.set(splitLeftRef.current, {
            transformOrigin: 'top right',
            scaleX: 1,
            opacity: 1,
          });
        }
        if (splitRightRef.current) {
          gsap.set(splitRightRef.current, {
            transformOrigin: 'top left',
            scaleX: 1,
            opacity: 1,
          });
        }
      });

      timeline.add('split-morph');

      timeline.to(
        splitLeftRef.current,
        {
          rotation: 20,
          x: -4,
          // yPercent: 160,
          // xPercent: -55,
          width: '12px',
          height: '90px',
          duration: 0.45,
          ease: 'power3.inOut',
        },
        'split-morph'
      );

      timeline.to(
        splitRightRef.current,
        {
          rotation: -20,
          x: -4,
          // yPercent: 160,
          // xPercent: 55,
          width: '12px',
          height: '90px',
          duration: 0.45,
          ease: 'power3.inOut',
        },
        'split-morph'
      );

      timeline.fromTo(
        splitCrossRef.current,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'center',
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        },
        'split-morph+=0.25'
      );

      timeline.add('final-reveal', '+=0.15');

      timeline.to(
        loaderRef.current,
        {
          scale: 1000,
          y: -5500,
          opacity: 0.3,
          duration: 0.7,
          ease: 'power4.in',
          onComplete: () => {
            markLoaderSeen();
            // Zoom-reveal <main> via a class on <html> (which has
            // suppressHydrationWarning) — mutating <main> directly races
            // with hydration of streamed segments (pages with loading.tsx)
            const html = document.documentElement;
            html.classList.add('page-reveal-active');
            window.setTimeout(
              () => html.classList.remove('page-reveal-active'),
              1000
            );
            requestAnimationFrame(() => {
              setIsVisible(false);
              // Fire AFTER loader is fully gone so hero content is visible
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
              }
            });
          },
        },
        'final-reveal'
      );
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const html = document.documentElement;
    const body = document.body;

    if (isVisible && !getSkip()) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.classList.add('global-loader-active');
    } else {
      // Explicitly unlock — set to 'auto' so the CSS default `overflow:hidden`
      // on <html> doesn't stay in effect after the loader leaves.
      html.style.overflow = 'auto';
      body.style.overflow = '';
      html.classList.remove('global-loader-active');
    }

    return () => {
      html.style.overflow = 'auto';
      body.style.overflow = '';
      html.classList.remove('global-loader-active');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const formattedProgress = String(progress).padStart(3, '0');

  return (
    <div
      id="global-loader"
      ref={loaderRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#05060a]"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-10 text-white">
        <div className="relative w-full max-w-2xl h-36">
          {!showSplit && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div
                id="loader-track"
                className="h-2 w-full rounded-full bg-white/15 overflow-hidden"
              >
                <div
                  id="loader-fill"
                  className="h-full bg-white origin-left"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative w-full max-w-3xl h-1.5 ${
                showSplit ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span
                ref={splitLeftRef}
                className="absolute left-1/2 top-1/2 block h-full w-1/2 -translate-x-full -translate-y-1/2 rounded-full bg-white"
              ></span>
              <span
                ref={splitRightRef}
                className="absolute left-1/2 top-1/2 block h-full w-1/2 -translate-y-1/2 rounded-full bg-white"
              ></span>
              <span
                ref={splitCrossRef}
                className="absolute left-1/2 right-1/2 top-[58%] block h-2.5 w-10 -translate-x-1/2 rounded-full bg-white"
              ></span>
            </div>
          </div>

          <p
            className={`pointer-events-none absolute bottom-0 right-0 text-4xl font-semibold tracking-[0.35em] text-white/70 transition-all duration-500 ${
              showSplit
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {formattedProgress}%
          </p>
        </div>
      </div>
    </div>
  );
}
