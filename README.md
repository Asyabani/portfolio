# Nurzaman Asyabani - Web Developer Portfolio

A high-performance, modern portfolio website built with Next.js 16, TypeScript, and Tailwind CSS v4. This portfolio showcases web development projects, certificates, and professional work.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **React**: React 19.2.3
- **Font**: Inter (Google Fonts, optimized via next/font)
- **Deployment**: Vercel (recommended)

## Features

- **Server-Side Rendering**: Static generation for maximum performance
- **Image Optimization**: Automatic WebP/AVIF conversion with next/image
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, JSON-LD structured data
- **Dark Mode Support**: Automatic dark mode based on system preference
- **Glass Morphism UI**: Modern glass effect on navigation
- **Smooth Scrolling**: Native smooth scroll behavior
- **Performance**: Lighthouse score 95+ targeted

## Project Structure

```
portfolio-next/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles & Tailwind
│   │   └── portfolio/
│   │       └── [id]/            # Dynamic project detail pages
│   │           ├── page.tsx     # Project detail page
│   │           ├── loading.tsx  # Loading skeleton
│   │           └── error.tsx    # Error boundary
│   ├── components/              # React components
│   │   ├── Navigation.tsx       # Navbar with hamburger menu
│   │   ├── Hero.tsx            # Hero section
│   │   ├── PortfolioGrid.tsx   # Projects grid
│   │   ├── ProjectCard.tsx     # Individual project card
│   │   ├── CertificateGrid.tsx # Certificates gallery
│   │   ├── CertificateCard.tsx # Individual certificate card
│   │   └── Footer.tsx          # Footer component
│   └── lib/
│       └── data/                # Static data
│           ├── projects.ts      # 16 projects data
│           ├── certificates.ts  # 12 certificates data
│           └── social.ts        # Social media links
├── public/                      # Static assets
│   ├── img/                    # 52 project/certificate images
│   └── file/                   # Resume PDFs
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd portfolio-next
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Build Commands

### Development

```bash
npm run dev          # Start development server
```

### Production

```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Linting

```bash
npm run lint         # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**:
- Visit [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js settings
- Click "Deploy"

3. **Custom Domain** (optional):
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### Other Platforms

The project can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Cloudflare Pages
- Self-hosted with Docker

### Environment Variables

Currently, no environment variables are required. If you add analytics or other services:
1. Create `.env.local` file
2. Add variables (e.g., `NEXT_PUBLIC_GA_ID`)
3. Access via `process.env.NEXT_PUBLIC_GA_ID`

## Content Management

### Adding New Projects

Edit `/src/lib/data/projects.ts`:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    id: 'unique-project-id',           // Unique identifier
    title: 'Project Title',             // Display name
    description: 'Brief description',   // Project description
    image: '/img/project-image.png',    // Image path in public/img/
    category: 'Web App',                // Category: Web App, E-commerce, PWA, etc.
    linkType: 'external',               // 'external' or 'detail'
    url: 'https://example.com'          // External URL or '/portfolio/unique-project-id'
  }
]
```

**For external links** (other websites):
- Set `linkType: 'external'`
- Set `url: 'https://external-site.com'`

**For detail pages** (custom page):
- Set `linkType: 'detail'`
- Set `url: '/portfolio/your-project-id'`
- Next.js automatically generates the page using `generateStaticParams`

**Add project image**:
1. Place image in `/public/img/your-image.png`
2. Reference as `/img/your-image.png` in the `image` field

### Adding New Certificates

Edit `/src/lib/data/certificates.ts`:

```typescript
export const certificates: Certificate[] = [
  // ... existing certificates
  {
    id: 'unique-cert-id',              // Unique identifier
    title: 'Certificate Title',         // Certificate name
    issuer: 'Issuing Organization',     // Organization name
    date: '2024',                       // Year or date
    image: '/img/certificate.png'       // Certificate image path
  }
]
```

### Updating Social Links

Edit `/src/lib/data/social.ts`:

```typescript
export const socialLinks: SocialLinks = {
  linkedin: 'https://linkedin.com/in/your-profile',
  github: 'https://github.com/your-username',
  instagram: 'https://instagram.com/your-username',
  twitter: 'https://twitter.com/your-username',
  tiktok: 'https://tiktok.com/@your-username',
  discord: 'https://discord.com/your-server',
  email: 'mailto:your-email@example.com'
}
```

### Updating Resume

1. Place your resume PDF in `/public/file/resume.pdf`
2. Update the download link in `/src/components/Navigation.tsx`:
```typescript
<Link href="/file/resume.pdf" download>Resume</Link>
```

### Updating SEO Metadata

Edit `/src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Web Developer Portfolio",
  description: "Your portfolio description",
  // ... update other fields
}
```

## Performance Optimization

The site is optimized for maximum performance:

- **Static Generation**: All pages pre-rendered at build time
- **Server Components**: Minimal client-side JavaScript
- **Image Optimization**: Automatic WebP/AVIF with responsive sizes
- **Font Optimization**: Self-hosting Google Fonts with zero layout shift
- **Code Splitting**: Automatic route-based code splitting
- **Compression**: Gzip compression enabled
- **Cache Strategy**: Images cached for 60 seconds

### Lighthouse Scores (Target)

- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

## Customization

### Colors

Edit `/src/app/globals.css`:

```css
:root {
  --color-primary: #0d9488;    /* Teal */
  --color-secondary: #64748b;  /* Slate */
  --color-dark: #0f172a;       /* Dark blue-gray */
}
```

### Fonts

The project uses Inter font. To change:

1. Edit `/src/app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-your-font'
})
```

2. Update CSS variable in `/src/app/globals.css`:
```css
--font-sans: var(--font-your-font)
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

2. Update dependencies:
```bash
npm update
npm run build
```

### Images Not Loading

- Ensure all images are in `/public/img/`
- Check image paths start with `/img/` (not `/public/img/`)
- Verify image filenames match exactly (case-sensitive)

### Type Errors

Run TypeScript in strict mode:
```bash
npx tsc --noEmit
```

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: nurzamanasya@gmail.com
- Website: [asyabani.github.io/portfolio](https://asyabani.github.io/portfolio/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Remix Icon](https://remixicon.com/)
- Developed by Nurzaman Asyabani

---

**Last Updated**: February 2026
**Version**: 1.0.0
