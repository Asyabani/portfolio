import type { Metadata } from 'next';
import { CreativeProcess } from '@/components/CreativeProcess';
import '@/app/creative-process.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Nurzaman Asyabani is: a frontend & fullstack developer from Bandung, Indonesia, working with React, Next.js, Laravel, and GSAP — background, toolkit, experience at Kawalu, EGDev, and others, and education.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Nurzaman Asyabani',
    description:
      'Frontend & fullstack developer from Bandung, Indonesia — background, toolkit, experience, and education.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <CreativeProcess />;
}
