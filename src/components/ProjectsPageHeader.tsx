'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoaderReady } from '@/hooks/useLoaderReady';

interface ProjectsPageHeaderProps {
  totalProjects: number;
}

export function ProjectsPageHeader({ totalProjects }: ProjectsPageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const loaderReady = useLoaderReady();

  useEffect(() => {
    if (!loaderReady) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power4.out',
          }
        );
      }

      gsap.fromTo(
        [countRef.current, iconRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );

      const line = containerRef.current?.querySelector(
        '.project-page-header-line'
      );
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            transformOrigin: 'center',
          }
        );
      }

      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.5,
            ease: 'power2.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loaderReady]);

  return (
    <div ref={containerRef} className="text-center">
      <div className="flex items-center justify-center gap-6">
        <h1
          ref={titleRef}
          className="font-normal text-dark text-8xl mb-4 sm:text-9xl lg:text-[14rem] leading-none dark:text-white"
        >
          PROJECTS
        </h1>
        <div className="flex flex-col items-center gap-3 text-dark dark:text-white mb-4">
          <span
            ref={countRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-normal"
          >
            {totalProjects}
          </span>
          <svg
            ref={iconRef}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      </div>

      <div className="project-page-header-line mx-auto mt-8 h-0.5 w-32 bg-linear-to-r from-teal-500 via-teal-400 to-cyan-400" />
      <p
        ref={descriptionRef}
        className="max-w-2xl mx-auto mt-6 text-dark/70 dark:text-white/70 text-base sm:text-lg"
      >
        From experimental concepts to production-ready builds, explore every
        project we&apos;ve crafted with precision and forward-thinking detail.
      </p>
    </div>
  );
}
