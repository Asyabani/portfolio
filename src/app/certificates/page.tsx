import { certificates } from '@/lib/data/certificates';
import type { Metadata } from 'next';
import { CertificatesHero } from '@/components/certificates/CertificatesHero';
import {
  CertificateTimeline,
  type CertificateYearGroup,
} from '@/components/certificates/CertificateTimeline';

export const metadata: Metadata = {
  title: 'Certificates',
  description: `${certificates.length} certifications earned by Nurzaman Asyabani — KOMINFO Digital Talent Scholarship, Dicoding, React and Flutter bootcamps, cybersecurity and data-science training.`,
  alternates: { canonical: '/certificates' },
  openGraph: {
    title: 'Certificates — Nurzaman Asyabani',
    description: `${certificates.length} certifications — KOMINFO Digital Talent Scholarship, Dicoding, bootcamps, cybersecurity and data-science training.`,
    url: '/certificates',
  },
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

const yearOf = (date: string) => Number(date.match(/\d{4}/)?.[0] ?? 0);
const monthOf = (date: string) =>
  MONTH_INDEX[date.match(/[A-Za-z]{3}/)?.[0] ?? ''] ?? 0;

export default function AllCertificatesPage() {
  const years = [...new Set(certificates.map(c => yearOf(c.date)))].sort(
    (a, b) => b - a
  );
  const groups: CertificateYearGroup[] = years.map(year => ({
    year,
    items: certificates
      .filter(c => yearOf(c.date) === year)
      .sort((a, b) => monthOf(b.date) - monthOf(a.date)),
  }));
  const firstYear = years[years.length - 1];
  const lastYear = years[0];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f0f1fa] text-dark transition-colors duration-500 dark:bg-[#050b23] dark:text-white">
      <CertificatesHero
        total={certificates.length}
        firstYear={firstYear}
        lastYear={lastYear}
      />
      <CertificateTimeline groups={groups} />
    </main>
  );
}
