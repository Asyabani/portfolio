import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  aboutEducation,
  aboutExperience,
  aboutStack,
  resumeCertifications,
  resumeProfile,
  resumeProjectIds,
} from '@/lib/data/about';
import { projects } from '@/lib/data/projects';
import { resumeUrl } from '@/lib/data/social';
import { SITE_URL } from '@/lib/site';
import { ResumeActions } from '@/components/resume/ResumeActions';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Nurzaman Asyabani — frontend & fullstack developer from Bandung, Indonesia: experience, selected projects, skills, education, and certifications.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume — Nurzaman Asyabani',
    description:
      'Frontend & fullstack developer from Bandung, Indonesia — experience, selected projects, skills, education, and certifications.',
    url: '/resume',
  },
};

const sectionTitle =
  'text-[11px] font-semibold uppercase tracking-[0.3em] text-primary border-b border-slate-200 pb-2 mb-4';
const muted = 'text-slate-500';

export default function ResumePage() {
  const featured = resumeProjectIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const siteHost = SITE_URL.replace(/^https?:\/\//, '');

  return (
    <main className="min-h-screen bg-[#f0f1fa] dark:bg-[#050b23] text-dark dark:text-white pt-28 md:pt-32 pb-20 transition-colors duration-500 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 print:px-0 print:max-w-none">
        <div className="w-full px-4 print:px-0">
          {/* Page chrome — hidden in print */}
          <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              About
            </Link>
            <ResumeActions pdfHref={resumeUrl} />
          </div>

          {/* The sheet: always "paper" colours so it prints/reads the same in both themes */}
          <article className="resume-sheet max-w-4xl mx-auto bg-white text-[#0f172a] rounded-[15px] shadow-lg print:shadow-none print:rounded-none px-7 py-9 sm:px-12 sm:py-12 print:px-0 print:py-0 text-[13.5px] leading-relaxed print:leading-snug">
            {/* Header */}
            <header className="border-b border-slate-200 pb-6 mb-7 print:pb-4 print:mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {resumeProfile.name}
              </h1>
              <p className="mt-1.5 text-base sm:text-lg font-medium text-primary">
                {resumeProfile.title}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-slate-600">
                <li>{resumeProfile.location}</li>
                <li>
                  <a href={`mailto:${resumeProfile.email}`} className="hover:text-primary">
                    {resumeProfile.email}
                  </a>
                </li>
                <li>
                  <a href={`https://${resumeProfile.website}`} className="hover:text-primary">
                    {resumeProfile.website}
                  </a>
                </li>
                <li>
                  <a href={`https://${resumeProfile.github}`} className="hover:text-primary">
                    {resumeProfile.github}
                  </a>
                </li>
                <li>
                  <a href={`https://${resumeProfile.linkedin}`} className="hover:text-primary">
                    {resumeProfile.linkedin}
                  </a>
                </li>
              </ul>
            </header>

            {/* Summary */}
            <section className="mb-7">
              <h2 className={sectionTitle}>Summary</h2>
              <p className="text-slate-700">{resumeProfile.summary}</p>
            </section>

            {/* Experience */}
            <section className="mb-7">
              <h2 className={sectionTitle}>Experience</h2>
              <ol className="space-y-5 print:space-y-3">
                {aboutExperience.map(job => (
                  <li key={`${job.company}-${job.period}`} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-semibold text-[15px]">
                        {job.role}
                        <span className="font-normal text-slate-600"> · {job.company}</span>
                      </h3>
                      <p className={`text-[12.5px] ${muted}`}>
                        {job.period}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                    <ul className="mt-1.5 list-disc pl-5 space-y-1 text-slate-700 marker:text-primary/60">
                      {job.points.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            {/* Selected projects */}
            <section className="mb-7">
              <h2 className={sectionTitle}>Selected projects</h2>
              <ul className="space-y-4 print:space-y-2.5">
                {featured.map(project => (
                  <li key={project.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-semibold text-[15px]">
                        {project.title}
                        {project.liveUrl && (
                          <span className="font-normal text-slate-600">
                            {' '}
                            · {project.liveUrl.replace(/^https?:\/\//, '')}
                          </span>
                        )}
                      </h3>
                      {project.period && (
                        <p className={`text-[12.5px] ${muted}`}>{project.period}</p>
                      )}
                    </div>
                    {project.role && (
                      <p className="text-[12.5px] text-slate-600">{project.role}</p>
                    )}
                    {project.description && (
                      <p className="mt-1 text-slate-700">{project.description}</p>
                    )}
                    {project.stack && (
                      <p className={`mt-1 text-[12.5px] ${muted}`}>
                        {project.stack.slice(0, 7).join(' · ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className={`mt-3 text-[12.5px] ${muted}`}>
                Full case studies with screenshots: {siteHost}/projects
              </p>
            </section>

            {/* Skills */}
            <section className="mb-7 break-inside-avoid">
              <h2 className={sectionTitle}>Skills</h2>
              <dl className="space-y-1.5">
                {aboutStack.map(group => (
                  <div key={group.group} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="sm:w-40 shrink-0 font-semibold text-slate-800">
                      {group.group}
                    </dt>
                    <dd className="text-slate-700">{group.items.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Education */}
            <section className="mb-7 break-inside-avoid">
              <h2 className={sectionTitle}>Education</h2>
              <ul className="space-y-2">
                {aboutEducation.map(edu => (
                  <li key={edu.school} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p>
                      <span className="font-semibold">{edu.school}</span>
                      <span className="text-slate-600"> · {edu.degree}</span>
                    </p>
                    <p className={`text-[12.5px] ${muted}`}>{edu.period}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Certifications */}
            <section className="break-inside-avoid">
              <h2 className={sectionTitle}>Certifications</h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 marker:text-primary/60">
                {resumeCertifications.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
