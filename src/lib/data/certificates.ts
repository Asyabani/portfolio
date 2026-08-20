export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Month + year as printed on the certificate */
  date: string;
  image: string;
  linkType: 'external' | 'detail' | 'none';
  link?: string;
}

// Titles, issuers, and dates transcribed from the certificate images themselves.
// Order: most relevant / most recent first — the first six show on the home page.
export const certificates: Certificate[] = [
  {
    id: 'jwd',
    title: 'Junior Web Developer — VSGA Digital Talent Scholarship',
    issuer: 'KOMINFO · Digitalent · Telkom University',
    date: 'Aug 2023',
    image: '/img/jwd.png',
    linkType: 'detail',
  },
  {
    id: 'gits-best-team',
    title: 'Best Team — Certificate of Achievement, GITS Academy',
    issuer: 'GITS Academy · SMKDEV',
    date: 'Sep 2024',
    image: '/img/gits-best-team.webp',
    linkType: 'detail',
  },
  {
    id: 'dicoding-frontend',
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    issuer: 'Dicoding',
    date: 'May 2024',
    image: '/img/Dicoding(FrontEnd).png',
    linkType: 'detail',
  },
  {
    id: 'minibootcamp',
    title: 'Introduction to React JS — Mini Bootcamp',
    issuer: 'Edspert.id',
    date: 'Sep 2023',
    image: '/img/minibootcampp.png',
    linkType: 'detail',
  },
  {
    id: 'dicoding-js',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding',
    date: 'Sep 2023',
    image: '/img/js.png',
    linkType: 'detail',
  },
  {
    id: 'dicoding-web',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding',
    date: 'Sep 2023',
    image: '/img/dasar-web.png',
    linkType: 'detail',
  },
  {
    id: 'node-js',
    title: 'Web Development Path (Node.js)',
    issuer: 'Progate',
    date: 'Aug 2020',
    image: '/img/p1.png',
    linkType: 'detail',
  },
  {
    id: 'flutter',
    title: 'Introduction to Flutter — Mini Bootcamp',
    issuer: 'Edspert.id',
    date: 'Sep 2023',
    image: '/img/flutter.png',
    linkType: 'detail',
  },
  {
    id: 'dicoding-devcoach',
    title: 'DevCoach 142: iOS — Akses Data dari Server dengan URL Session',
    issuer: 'Dicoding Event',
    date: 'Mar 2024',
    image: '/img/Dicoding(Devcoach).png',
    linkType: 'detail',
  },
  {
    id: 'dicoding-basic',
    title: 'Memulai Pemrograman dengan Kotlin',
    issuer: 'Dicoding',
    date: 'Dec 2022',
    image: '/img/dicoding.png',
    linkType: 'detail',
  },
  {
    id: 'data-science',
    title: 'Introduction to Data Science with R',
    issuer: 'DQLab',
    date: 'Jan 2023',
    image: '/img/dq.png',
    linkType: 'detail',
  },
  {
    id: 'cybersecurity-1',
    title: 'Cyber Security Training — CompTIA Linux+, Security+, PenTest+',
    issuer: 'InfraDigital Foundation · Mastercard Center for Inclusive Growth',
    date: 'Jul 2021',
    image: '/img/c1.png',
    linkType: 'detail',
  },
  {
    id: 'cybersecurity-2',
    title: 'Cyber Security Professional Development Workshop',
    issuer: 'InfraDigital Foundation · Dampak Sosial Indonesia',
    date: 'Apr 2021',
    image: '/img/c2.png',
    linkType: 'detail',
  },
];
