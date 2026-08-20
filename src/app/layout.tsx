import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import { NavigationAnimated } from '@/components/NavigationAnimated';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SoundProvider } from '@/contexts/SoundContext';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomScrollbar } from '@/components/CustomScrollbar';
import { ProgressBar } from '@/components/ProgressBar';
import './globals.css';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — Nurzaman Asyabani',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Nurzaman Asyabani',
    'web developer',
    'frontend developer',
    'fullstack developer',
    'portfolio',
    'Bandung',
    'Indonesia',
    'React',
    'Next.js',
    'Laravel',
    'GSAP',
    'EGDev',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  category: 'technology',
  alternates: { canonical: '/' },
  verification: {
    google: '42xlCAZ2owRrbP8LXY1Kn_flhIQHelZ38Gdga_7RMqY',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // images come from app/opengraph-image.tsx (file convention)
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@NurzamanAsyaba1',
    // images come from app/twitter-image.tsx (file convention)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f1fa' },
    { media: '(prefers-color-scheme: dark)', color: '#050b23' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Nurzaman Asyabani',
  url: SITE_URL,
  image: `${SITE_URL}/img/profile-2026.jpg`,
  jobTitle: 'Frontend & Fullstack Developer',
  description:
    'Frontend developer at Kawalu and fullstack developer at Exempli Gratia (EGDev), based in Bandung, Indonesia — React/Next.js and TypeScript on the front end; Node, Laravel, Go, and PostgreSQL behind it. Primary author of the Kawalu Next.js rewrite. Information Systems student at Universitas Terbuka.',
  email: 'mailto:nurzamanasya@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://www.linkedin.com/in/nurzaman-asyabani/',
    'https://github.com/Asyabani',
    'https://x.com/NurzamanAsyaba1',
    'https://www.instagram.com/asyabanii_/',
    'https://www.tiktok.com/@asyabanii',
  ],
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Kawalu',
      url: 'https://kawalu.id',
    },
    {
      '@type': 'Organization',
      name: 'Exempli Gratia (EGDev)',
      url: 'https://egdev.id',
    },
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Universitas Terbuka (Open University of Indonesia)',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'SMK Negeri 2 Tasikmalaya',
    },
  ],
  knowsAbout: [
    'Web Development',
    'Frontend Development',
    'Fullstack Development',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'GSAP',
    'Three.js',
    'SvelteKit',
    'Node.js',
    'Express',
    'Laravel',
    'Go',
    'PostgreSQL',
    'Prisma',
    'MongoDB',
    'Redis',
    'Docker',
    'Playwright',
    'Progressive Web Apps',
    'Information Systems',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  author: { '@id': `${SITE_URL}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={dmSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization script - inline in head to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // The intro loader plays once per session (see ProgressBar).
                  // Skip the pre-paint lock when it won't play, so the page is
                  // visible from the very first frame instead of flashing.
                  var skipLoader = false;
                  try {
                    skipLoader = !!sessionStorage.getItem('app-loader-seen') ||
                      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  } catch (e) {}
                  if (!skipLoader) {
                    // Lock scroll immediately — before any paint — so scrollbar
                    // never appears during the loading animation.
                    document.documentElement.style.overflow = 'hidden';
                    document.documentElement.classList.add('global-loader-active');
                  } else {
                    document.documentElement.classList.add('loader-skip');
                  }

                  // Light is the default; dark only when the visitor chose it
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={dmSans.className}>
        {/* Plain <script> (not next/script) so the JSON-LD is in the SSR HTML
            for every crawler, not injected after hydration */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              <CustomScrollbar>
                <ProgressBar />
                <NavigationAnimated />
                {children}
                <Footer />
              </CustomScrollbar>
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
