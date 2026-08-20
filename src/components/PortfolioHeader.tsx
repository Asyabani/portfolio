'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * PortfolioHeader Component - Client Component
 *
 * Displays "Featured Work" heading with random character animation
 */
export function PortfolioHeader() {
  const containerRef = useRef<HTMLDivElement>(null);

  const featuredText = 'Featured Work';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create character spans
    const charElements: HTMLElement[] = [];
    const chars = featuredText.split('');

    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block char-char';
      span.style.opacity = '0';
      span.style.whiteSpace = 'pre';
      container.appendChild(span);
      charElements.push(span);
    });

    container.innerHTML = '';
    charElements.forEach(el => container.appendChild(el));

    // Animate characters in
    charElements.forEach((charEl, index) => {
      const targetChar =
        randomChars[Math.floor(Math.random() * randomChars.length)];

      gsap.to(charEl, {
        opacity: 1,
        duration: 0.03,
        onStart: () => {
          if (charEl.textContent === targetChar) {
            charEl.textContent = targetChar;
            charEl.style.opacity = '1';
          }
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });
    });

    // Final reveal
    const revealDelay = 0.2 + chars.length * 0.03;
    setTimeout(() => {
      charElements.forEach(charEl => {
        charEl.style.opacity = '1';
      });
    }, revealDelay * 1000);

    return () => {
      gsap.killTweensOf(container);
      charElements.forEach(el => el.remove());
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div className="w-full px-4">
      <div className="w-full mx-auto text-center mb-16">
        <h2
          ref={containerRef}
          className="font-normal text-dark text-4xl sm:text-5xl lg:text-6xl leading-none dark:text-white relative inline-block"
        ></h2>
      </div>
    </div>
  );
}
