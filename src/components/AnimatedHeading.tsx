'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export function AnimatedHeading({
  text,
  className = '',
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    const chars = text.split('');
    const charElements = chars.map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block opacity-0 translate-x-8';
      container.appendChild(span);
      return span;
    });
    gsap.to(charElements, {
      opacity: 1,
      x: 0,
      duration: 0.12,
      stagger: 0.045,
      ease: 'power2.out',
      delay: 0.2,
    });
    return () => {
      container.innerHTML = '';
    };
  }, [text]);

  return (
    <h2
      ref={containerRef}
      className={`font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center mb-12 ${className}`.trim()}
    ></h2>
  );
}
