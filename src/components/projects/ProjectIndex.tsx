'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project, ProjectStatus } from '@/lib/data/projects';
import { PROJECT_STATUS_LABEL } from './FeaturedCaseStudies';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATUS_DOT: Record<ProjectStatus, string> = {
  live: 'bg-teal-500 dark:bg-teal-400 animate-pulse',
  'in-progress': 'bg-amber-400',
  private: 'bg-slate-400/70 dark:bg-white/30',
  'side-project': 'bg-slate-400/70 dark:bg-white/30',
  archived: 'bg-slate-400/70 dark:bg-white/30',
  concept: 'bg-slate-400/70 dark:bg-white/30',
};

interface ProjectIndexProps {
  projects: Project[];
}

/**
 * ProjectIndex
 *
 * The complete archive as an animated index: category filter pills collapse
 * and expand rows, rows stagger in on scroll, and on precise pointers a
 * floating cover preview trails the cursor across the list.
 */
export function ProjectIndex({ projects }: ProjectIndexProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewShownRef = useRef(false);
  const quickMove = useRef<{
    x?: (v: number) => void;
    y?: (v: number) => void;
    r?: (v: number) => void;
  }>({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const prevCategoryRef = useRef('All');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach(p =>
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    );
    return [
      { name: 'All', count: projects.length },
      ...[...counts.entries()].map(([name, count]) => ({ name, count })),
    ];
  }, [projects]);

  /* Entrance: rows stagger in as they scroll into view */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = list.querySelectorAll<HTMLElement>('[data-index-link]');
        gsap.set(rows, { y: 30, opacity: 0 });
        ScrollTrigger.batch(rows, {
          start: 'top 94%',
          once: true,
          onEnter: batch =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.06,
              ease: 'power3.out',
            }),
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  /* Cursor-trailing preview — precise pointers only */
  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;

    const fine = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    );
    if (!fine.matches) return;

    gsap.set(preview, { autoAlpha: 0, scale: 0.9 });
    quickMove.current = {
      x: gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3' }),
      y: gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3' }),
      r: gsap.quickTo(preview, 'rotation', { duration: 0.6, ease: 'power3' }),
    };

    let lastX = 0;
    const onMove = (event: MouseEvent) => {
      const x = event.clientX - 160;
      const y = event.clientY - 200;
      const tilt = gsap.utils.clamp(-7, 7, (event.clientX - lastX) * 0.35);
      lastX = event.clientX;
      if (!previewShownRef.current) {
        gsap.set(preview, { x, y });
      } else {
        quickMove.current.x?.(x);
        quickMove.current.y?.(y);
        quickMove.current.r?.(tilt);
      }
    };

    section.addEventListener('mousemove', onMove);
    return () => {
      section.removeEventListener('mousemove', onMove);
      gsap.killTweensOf(preview);
    };
  }, []);

  const showPreview = useCallback((id: string) => {
    setPreviewId(id);
    const preview = previewRef.current;
    if (!preview) return;
    if (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    previewShownRef.current = true;
    gsap.to(preview, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, []);

  const hidePreview = useCallback(() => {
    const preview = previewRef.current;
    if (!preview || !previewShownRef.current) return;
    previewShownRef.current = false;
    gsap.to(preview, {
      autoAlpha: 0,
      scale: 0.9,
      rotation: 0,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, []);

  /* Filter: collapse rows out, expand matches back in */
  useEffect(() => {
    if (prevCategoryRef.current === activeCategory) return;
    prevCategoryRef.current = activeCategory;
    const list = listRef.current;
    if (!list) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const rows = list.querySelectorAll<HTMLElement>('[data-index-row]');

    rows.forEach(row => {
      const matches =
        activeCategory === 'All' || row.dataset.category === activeCategory;
      const isCollapsed = row.dataset.collapsed === 'true';
      if (matches && isCollapsed) {
        row.dataset.collapsed = 'false';
        if (reduce) {
          gsap.set(row, { height: 'auto', opacity: 1 });
        } else {
          gsap.set(row, { height: 'auto' });
          gsap.from(row, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'height',
          });
          gsap.to(row, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        }
      } else if (!matches && !isCollapsed) {
        row.dataset.collapsed = 'true';
        if (reduce) {
          gsap.set(row, { height: 0, opacity: 0 });
        } else {
          gsap.to(row, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
        }
      }
    });

    const refresh = gsap.delayedCall(0.55, () => ScrollTrigger.refresh());
    return () => {
      refresh.kill();
    };
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="project-index"
      className="pb-28 pt-24 md:pb-36 md:pt-36"
      onMouseLeave={hidePreview}
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            All projects
          </h2>
          <span className="text-sm text-slate-500 dark:text-white/40">
            {projects.length} total, 2022 — 2026
          </span>
        </div>

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map(({ name, count }) => {
            const isActive = activeCategory === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(name)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive
                    ? 'border-transparent bg-primary text-white dark:bg-teal-400 dark:text-[#050b23]'
                    : 'border-dark/15 text-slate-600 hover:border-primary/60 hover:text-primary dark:border-white/15 dark:text-white/60 dark:hover:border-teal-300/60 dark:hover:text-teal-300'
                }`}
              >
                {name}
                <span
                  className={`ml-1.5 ${
                    isActive
                      ? 'text-white/70 dark:text-[#050b23]/60'
                      : 'text-slate-400 dark:text-white/35'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ul ref={listRef} className="border-t border-dark/10 dark:border-white/10">
          {projects.map(project => (
            <li
              key={project.id}
              data-index-row
              data-category={project.category}
              data-collapsed="false"
              className="overflow-hidden"
            >
              <Link
                href={project.url}
                data-index-link
                onMouseEnter={() => showPreview(project.id)}
                className="group relative flex flex-col gap-1.5 border-b border-dark/10 py-5 dark:border-white/10 md:grid md:grid-cols-12 md:items-center md:gap-4 md:py-6"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-primary/[0.05] transition-transform duration-500 ease-out group-hover:scale-x-100 dark:bg-teal-400/[0.06]"
                  aria-hidden="true"
                />
                <span className="relative text-xl font-semibold tracking-tight transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-primary dark:group-hover:text-teal-300 md:col-span-5 md:text-2xl">
                  {project.title}
                </span>
                <span className="flex items-center gap-3 md:contents">
                  <span className="relative text-sm text-slate-500 dark:text-white/45 md:col-span-3">
                    {project.category}
                  </span>
                  <span className="relative flex items-center gap-2 text-sm text-slate-500 dark:text-white/45 md:col-span-3">
                    {project.status && (
                      <>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`}
                          aria-hidden="true"
                        />
                        {PROJECT_STATUS_LABEL[project.status]}
                      </>
                    )}
                  </span>
                </span>
                <span className="relative hidden justify-self-end text-dark/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100 dark:text-white/40 dark:group-hover:text-teal-300 md:col-span-1 md:block md:-translate-x-2">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating cover preview — trails the cursor on precise pointers */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[320px] overflow-hidden rounded-[15px] bg-slate-200 opacity-0 shadow-2xl shadow-slate-900/30 will-change-transform dark:bg-white/10 dark:shadow-black/60 lg:block"
      >
        {projects.map(project => (
          <Image
            key={project.id}
            src={project.image}
            alt=""
            fill
            sizes="320px"
            loading="lazy"
            className={`object-cover object-top transition-opacity duration-300 ${
              previewId === project.id ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
