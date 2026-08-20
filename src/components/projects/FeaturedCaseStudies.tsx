'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project, ProjectStatus } from '@/lib/data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-progress': 'In progress',
  private: 'Private build',
  'side-project': 'Side project',
  archived: 'Archived',
  concept: 'Concept',
};

/** Compress "Mar 2026 — present" → "2026 —", "Sep 2025 — Mar 2026" → "2025 — 2026" */
function shortPeriod(period?: string): string | null {
  if (!period) return null;
  const years = period.match(/\d{4}/g);
  if (!years) return null;
  const ongoing = /present/i.test(period);
  if (ongoing) return `${years[0]} —`;
  if (years.length > 1 && years[0] !== years[years.length - 1]) {
    return `${years[0]} — ${years[years.length - 1]}`;
  }
  return years[0];
}

interface FeaturedCaseStudiesProps {
  projects: Project[];
  total: number;
}

/**
 * FeaturedCaseStudies
 *
 * Alternating editorial rows for the flagship projects: clip-path cover
 * reveal, scrubbed image parallax, staggered meta entrance, hover zoom.
 */
export function FeaturedCaseStudies({
  projects,
  total,
}: FeaturedCaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const headingLine = section.querySelector<HTMLElement>(
          '[data-cs-heading] > span'
        );
        if (headingLine) {
          gsap.fromTo(
            headingLine,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.05,
              ease: 'power4.out',
              scrollTrigger: { trigger: section, start: 'top 80%' },
            }
          );
        }

        section
          .querySelectorAll<HTMLElement>('[data-cs-row]')
          .forEach(row => {
            const metaItems = row.querySelectorAll<HTMLElement>(
              '[data-cs-meta] > *'
            );
            if (metaItems.length) {
              gsap.fromTo(
                metaItems,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  stagger: 0.09,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: row, start: 'top 72%' },
                }
              );
            }
          });
      });

      /* Cover reveal + scrubbed parallax are desktop-only: per-frame clip-path
         and transform work stutters on phones */
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          section
            .querySelectorAll<HTMLElement>('[data-cs-row]')
            .forEach(row => {
              const media = row.querySelector<HTMLElement>('[data-cs-media]');
              const parallax =
                row.querySelector<HTMLElement>('[data-cs-parallax]');

              if (media) {
                gsap.fromTo(
                  media,
                  { clipPath: 'inset(10% 7% 10% 7% round 15px)', scale: 0.97 },
                  {
                    clipPath: 'inset(0% 0% 0% 0% round 15px)',
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: row, start: 'top 78%' },
                  }
                );
              }
              if (parallax) {
                gsap.fromTo(
                  parallax,
                  { yPercent: -7 },
                  {
                    yPercent: 7,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: row,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: true,
                    },
                  }
                );
              }
            });
        }
      );

      /* Mobile: one cheap fade-up per cover instead */
      mm.add(
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        () => {
          section
            .querySelectorAll<HTMLElement>('[data-cs-media]')
            .forEach(media => {
              gsap.fromTo(
                media,
                { y: 24, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: media, start: 'top 88%' },
                }
              );
            });
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToIndex = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const lenis = (
      window as Window & {
        lenis?: { scrollTo(target: string, opts?: object): void };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo('#project-index', { offset: -40 });
    } else {
      document
        .getElementById('project-index')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="pt-20 md:pt-28">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <h2
            data-cs-heading
            className="overflow-hidden text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="block">Case studies</span>
          </h2>
          <a
            href="#project-index"
            onClick={scrollToIndex}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 hover:text-primary dark:text-white/50 dark:hover:text-teal-300"
          >
            All {total} projects ↓
          </a>
        </div>

        <div className="space-y-16 md:space-y-36">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;
            const period = shortPeriod(project.period);
            return (
              <article
                key={project.id}
                data-cs-row
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                {/* Cover */}
                <Link
                  href={project.url}
                  aria-label={`${project.title} case study`}
                  data-cs-media
                  className={`group relative block aspect-[16/10] overflow-hidden rounded-[15px] bg-slate-200 shadow-lg shadow-slate-900/10 dark:bg-white/5 dark:shadow-black/40 lg:col-span-7 ${
                    flipped ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]">
                    <div
                      data-cs-parallax
                      className="absolute inset-x-0 -inset-y-[10%]"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} — screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-top"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                </Link>

                {/* Meta */}
                <div
                  data-cs-meta
                  className={`space-y-5 lg:col-span-5 ${
                    flipped ? 'lg:order-1' : ''
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-white/45">
                    {project.category}
                    {project.status && (
                      <>
                        {' '}
                        ·{' '}
                        {project.status === 'live' ? (
                          <span className="inline-flex items-baseline gap-1.5 text-primary dark:text-teal-300">
                            <span
                              className="inline-block h-1.5 w-1.5 animate-pulse self-center rounded-full bg-primary dark:bg-teal-300"
                              aria-hidden="true"
                            />
                            Live
                          </span>
                        ) : (
                          PROJECT_STATUS_LABEL[project.status]
                        )}
                      </>
                    )}
                    {period && <> · {period}</>}
                  </p>

                  <h3 className="text-2xl font-bold tracking-tight md:text-4xl xl:text-[2.75rem] xl:leading-[1.05]">
                    <Link
                      href={project.url}
                      className="transition-colors duration-300 hover:text-primary dark:hover:text-teal-300"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {project.description && (
                    <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300/80 md:text-base">
                      {project.description}
                    </p>
                  )}

                  {project.role && (
                    <p className="text-sm text-slate-500 dark:text-white/50">
                      {project.role}
                    </p>
                  )}

                  {project.stack && (
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map(item => (
                        <li
                          key={item}
                          className="rounded-full border border-dark/15 px-3 py-1 text-xs text-slate-600 dark:border-white/15 dark:text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={project.url}
                    className="group/cta relative inline-flex items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 dark:text-teal-300"
                  >
                    View case study
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
