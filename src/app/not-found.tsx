'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoaderReady } from '@/hooks/useLoaderReady';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderReady = useLoaderReady();

  useEffect(() => {
    if (!loaderReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.nf-number',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );

      tl.fromTo(
        '.nf-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        '.nf-link',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loaderReady]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-[#f5f6ff] dark:bg-[#081226] transition-colors duration-500 px-4"
    >
      <div className="flex items-end gap-2 overflow-hidden">
        <span className="nf-number text-[20vw] md:text-[12vw] font-bold leading-none text-slate-800 dark:text-white opacity-0">
          4
        </span>
        <span className="nf-number text-[20vw] md:text-[12vw] font-bold leading-none text-teal-500 opacity-0">
          0
        </span>
        <span className="nf-number text-[20vw] md:text-[12vw] font-bold leading-none text-slate-800 dark:text-white opacity-0">
          4
        </span>
      </div>

      <p className="nf-text mt-4 text-lg md:text-xl text-slate-600 dark:text-gray-400 text-center opacity-0">
        Page not found
      </p>

      <Link
        href="/"
        className="nf-link mt-8 px-6 py-3 text-sm rounded-4xl uppercase tracking-widest border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-white dark:hover:border-teal-500 transition-all duration-300 opacity-0"
      >
        Back to Home
      </Link>
    </main>
  );
}
