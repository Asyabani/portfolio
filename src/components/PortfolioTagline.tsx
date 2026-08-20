'use client';

import { useEffect, useState } from 'react';
import { useLoaderReady } from '@/hooks/useLoaderReady';
import { RandomLetterText } from './RandomLetterText';

const TAGLINE_TEXT =
  'A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS.';

interface PortfolioTaglineProps {
  className?: string;
}

export function PortfolioTagline({ className }: PortfolioTaglineProps) {
  const loaderReady = useLoaderReady();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!loaderReady) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setShouldAnimate(true);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loaderReady]);

  if (!shouldAnimate) {
    return <span className={className}>{TAGLINE_TEXT}</span>;
  }

  return (
    <RandomLetterText
      key="portfolio-tagline"
      text={TAGLINE_TEXT}
      className={className}
      perCharDelay={25}
    />
  );
}
