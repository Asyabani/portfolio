import { certificates } from '@/lib/data/certificates';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getRelatedCertificates } from '@/lib/utils/relatedItems';
import { CertificateCardAnimated } from '@/components/CertificateCardAnimated';

type Params = Promise<{ id: string }>;

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return certificates.map(certificate => ({ id: certificate.id }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const certificate = certificates.find(c => c.id === id);

  if (!certificate) {
    return { title: 'Certificate Not Found' };
  }

  const description = `${certificate.title} issued by ${certificate.issuer} (${certificate.date}) — earned by Nurzaman Asyabani.`;

  return {
    title: certificate.title,
    description,
    alternates: { canonical: `/certificates/${certificate.id}` },
    openGraph: {
      type: 'article',
      title: `${certificate.title} — Nurzaman Asyabani`,
      description,
      url: `/certificates/${certificate.id}`,
      images: [{ url: certificate.image, alt: certificate.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${certificate.title} — Nurzaman Asyabani`,
      description,
      images: [certificate.image],
    },
  };
}

export default async function CertificatePage({ params }: { params: Params }) {
  const { id } = await params;
  const certificate = certificates.find(c => c.id === id);

  if (!certificate) {
    notFound();
  }

  const relatedCertificates = getRelatedCertificates(certificates, id);

  return (
    <main className="min-h-screen bg-[#f0f1fa] dark:bg-[#050b23] text-dark dark:text-white pt-28 md:pt-32 pb-20 transition-colors duration-500">
      {/* Same container as /projects and /certificates: container + px-4, inner px-4 */}
      <div className="container mx-auto px-4">
        <article className="w-full px-4">
          {/* Back */}
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All certificates
          </Link>

          {/* Header */}
          <header className="mt-8 md:mt-10 max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-primary dark:text-teal-300">
              Certificate · {certificate.date}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              {certificate.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300/85">
              Issued by {certificate.issuer}.
            </p>
          </header>

          {/* Certificate image */}
          <div className="mt-10 md:mt-12 relative overflow-hidden rounded-[15px] shadow-lg bg-white dark:bg-white/5">
            <div className="relative aspect-[4/3] sm:aspect-video">
              <Image
                src={certificate.image}
                alt={`${certificate.title} — ${certificate.issuer}`}
                fill
                priority
                className="object-contain p-4 sm:p-8"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
              />
            </div>
          </div>

          {/* Meta */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 border-t border-dark/10 dark:border-white/10 pt-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                Issuer
              </p>
              <p className="mt-2 text-lg font-medium">{certificate.issuer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                Date
              </p>
              <p className="mt-2 text-lg font-medium">{certificate.date}</p>
            </div>
            {certificate.link && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary dark:text-gray-400">
                  Credential
                </p>
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary text-white hover:bg-teal-700 dark:bg-teal-400 dark:text-[#050b23] dark:hover:bg-teal-300 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                >
                  View credential
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </article>

        {/* Related */}
        {relatedCertificates.length > 0 && (
          <section className="w-full px-4 mt-20 md:mt-28">
            <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                More from {certificate.issuer}
              </h2>
              <Link
                href="/certificates"
                className="hidden sm:inline-flex text-xs font-semibold tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-teal-300 transition-colors"
              >
                See all certificates
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedCertificates.slice(0, 3).map(related => (
                <CertificateCardAnimated
                  key={related.id}
                  certificate={related}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
