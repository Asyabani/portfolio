'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Certificate } from '@/lib/data/certificates';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CertificateYearGroup {
  year: number;
  items: Certificate[];
}

interface CertificateTimelineProps {
  groups: CertificateYearGroup[];
}

/**
 * CertificateTimeline
 *
 * Certificates grouped by year: sticky ghost year on the left, cards on the
 * right. Cards stagger in on scroll and tilt in 3D under a precise pointer.
 */
export function CertificateTimeline({ groups }: CertificateTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Entrance: year labels + card stagger */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        section
          .querySelectorAll<HTMLElement>('[data-year-label] > span')
          .forEach(label => {
            gsap.fromTo(
              label,
              { yPercent: 115 },
              {
                yPercent: 0,
                duration: 0.9,
                ease: 'power4.out',
                scrollTrigger: { trigger: label, start: 'top 88%' },
              }
            );
          });

        const cards = section.querySelectorAll<HTMLElement>('[data-cert-card]');
        gsap.set(cards, { y: 36, opacity: 0 });
        ScrollTrigger.batch(cards, {
          start: 'top 92%',
          once: true,
          onEnter: batch =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power3.out',
            }),
        });
      });

      /* 3D tilt under a precise pointer */
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const cleanups: (() => void)[] = [];
          section
            .querySelectorAll<HTMLElement>('[data-cert-tilt]')
            .forEach(card => {
              gsap.set(card, { transformPerspective: 900 });
              const toRx = gsap.quickTo(card, 'rotationX', {
                duration: 0.5,
                ease: 'power3',
              });
              const toRy = gsap.quickTo(card, 'rotationY', {
                duration: 0.5,
                ease: 'power3',
              });

              const onMove = (event: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const dx = (event.clientX - rect.left) / rect.width - 0.5;
                const dy = (event.clientY - rect.top) / rect.height - 0.5;
                toRx(dy * -8);
                toRy(dx * 10);
              };
              const onLeave = () => {
                toRx(0);
                toRy(0);
              };

              card.addEventListener('mousemove', onMove);
              card.addEventListener('mouseleave', onLeave);
              cleanups.push(() => {
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
              });
            });
          return () => cleanups.forEach(fn => fn());
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificate-timeline"
      className="pb-28 pt-8 md:pb-36 md:pt-14"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="space-y-14 md:space-y-28">
          {groups.map(group => (
            <div
              key={group.year}
              className="grid gap-6 border-t border-dark/10 pt-8 dark:border-white/10 lg:grid-cols-12 lg:gap-10 lg:pt-10"
            >
              <h2
                data-year-label
                className="overflow-hidden self-start text-5xl font-bold tracking-tight text-dark/20 dark:text-white/15 lg:sticky lg:top-32 lg:col-span-2 lg:text-6xl"
              >
                <span className="block">{group.year}</span>
              </h2>

              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-10 md:gap-y-12">
                {group.items.map(certificate => {
                  const isDetail = certificate.linkType === 'detail';
                  const hasLink = certificate.linkType !== 'none';
                  const inner = (
                    <>
                      <div
                        data-cert-tilt
                        className="relative aspect-video overflow-hidden rounded-[15px] bg-slate-200 shadow-lg shadow-slate-900/10 transition-shadow duration-500 will-change-transform group-hover:shadow-xl group-hover:shadow-slate-900/20 dark:bg-white/5 dark:shadow-black/40 dark:group-hover:shadow-black/60"
                      >
                        <Image
                          src={certificate.image}
                          alt={`${certificate.title} — ${certificate.issuer}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                        {hasLink && (
                          <span
                            className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/95 text-dark opacity-0 shadow-md shadow-slate-900/20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                            aria-hidden="true"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="mt-4 space-y-1">
                        <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary dark:group-hover:text-teal-300 md:text-lg">
                          {certificate.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-white/45">
                          {certificate.issuer} · {certificate.date}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <li key={certificate.id} data-cert-card>
                      {isDetail ? (
                        <Link
                          href={`/certificates/${certificate.id}`}
                          className="group block"
                        >
                          {inner}
                        </Link>
                      ) : hasLink ? (
                        <a
                          href={certificate.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
