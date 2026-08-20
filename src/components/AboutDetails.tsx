import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import {
  aboutEducation,
  aboutExperience,
  aboutFacts,
  aboutIntro,
  aboutStack,
} from '@/lib/data/about';
import { socialLinks } from '@/lib/data/social';
import { certificates } from '@/lib/data/certificates';

const eyebrow =
  'text-xs font-semibold uppercase tracking-[0.35em] text-primary dark:text-teal-300';
const label =
  'text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400';

/**
 * AboutDetails — the substantive half of the About page.
 * Sits after the cinematic scroll sequence and answers the questions a
 * recruiter or client actually has: who, where, what stack, what history.
 * Server-renderable (no hooks) so the copy is in the HTML for SEO.
 */
export function AboutDetails() {
  return (
    <section
      id="story"
      aria-labelledby="about-story-heading"
      className="relative bg-[#f0f1fa] dark:bg-[#030711] text-dark dark:text-white font-normal tracking-normal transition-colors duration-500"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 md:py-32 space-y-24 md:space-y-32">
        {/* ── Intro ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className={eyebrow}>{aboutIntro.eyebrow}</p>
            <h2
              id="about-story-heading"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight"
            >
              {aboutIntro.headline}
            </h2>
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300/85 max-w-2xl">
              {aboutIntro.paragraphs.map(text => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>
          </div>

          <dl className="lg:col-span-5 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-6 border-t border-dark/10 dark:border-white/10 pt-8 lg:border-t-0 lg:pt-16 lg:border-l lg:pl-12">
            {aboutFacts.map(fact => (
              <div key={fact.label}>
                <dt className={label}>{fact.label}</dt>
                <dd className="mt-1.5 text-base font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Stack ─────────────────────────────────────── */}
        <div>
          <p className={eyebrow}>Toolkit</p>
          <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
            What I build with
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {aboutStack.map(group => (
              <div key={group.group}>
                <p className={label}>{group.group}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className="rounded-full border border-dark/15 dark:border-white/15 px-3.5 py-1.5 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Experience ────────────────────────────────── */}
        <div>
          <p className={eyebrow}>Experience</p>
          <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
            Where I&apos;ve worked
          </h3>
          <ol className="mt-8 divide-y divide-dark/10 dark:divide-white/10 border-y border-dark/10 dark:border-white/10">
            {aboutExperience.map(job => (
              <li
                key={`${job.company}-${job.period}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7"
              >
                <div className="md:col-span-3">
                  <p className="text-sm font-semibold text-primary dark:text-teal-300">
                    {job.period}
                  </p>
                  {job.location && (
                    <p className="mt-1 text-sm text-secondary dark:text-gray-400">
                      {job.location}
                    </p>
                  )}
                </div>
                <div className="md:col-span-9">
                  <h4 className="text-lg sm:text-xl font-semibold tracking-tight">
                    {job.role}
                    <span className="text-secondary dark:text-gray-400 font-normal">
                      {' '}
                      · {job.company}
                    </span>
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300/85 list-disc pl-5 marker:text-primary/60 dark:marker:text-teal-300/60">
                    {job.points.map(point => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Education + CTA ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className={eyebrow}>Education</p>
            <ul className="mt-6 space-y-6">
              {aboutEducation.map(edu => (
                <li key={edu.school}>
                  <p className="text-lg font-semibold tracking-tight">
                    {edu.school}
                  </p>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300/85">
                    {edu.degree}
                  </p>
                  <p className="mt-1 text-sm text-secondary dark:text-gray-400">
                    {edu.period}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-300/85">
              Plus {certificates.length} certificates from Dicoding, Digitalent
              Scholarship (KOMINFO), and more —{' '}
              <Link
                href="/certificates"
                className="underline decoration-primary/50 underline-offset-4 hover:text-primary dark:hover:text-teal-300 transition-colors"
              >
                see them all
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-12 lg:border-l border-dark/10 dark:border-white/10">
            <p className={eyebrow}>Let&apos;s work together</p>
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
              Have a project in mind? Tell me about it.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300/85 max-w-md">
              I reply to every email. Share the goal, the timeline, and where the
              design stands — I&apos;ll come back with how I&apos;d approach it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={socialLinks.email}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-white hover:bg-teal-700 dark:bg-teal-400 dark:text-[#050b23] dark:hover:bg-teal-300 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                Email me
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-dark/30 dark:border-white/30 hover:border-primary hover:text-primary dark:hover:border-teal-300 dark:hover:text-teal-300 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                Resume
                <FileText className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
