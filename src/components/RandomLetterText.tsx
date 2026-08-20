'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface RandomLetterTextProps {
  text: string;
  className?: string;
  perCharDelay?: number;
  loopDelay?: number;
}

export function RandomLetterText({
  text,
  className,
  perCharDelay = 30,
  loopDelay = 0,
}: RandomLetterTextProps) {
  const letters = useMemo(() => text.split(''), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startReveal = useCallback(
    function startRevealInner() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }

      setVisibleCount(0);

      if (letters.length === 0) {
        return;
      }

      let currentIndex = 0;
      intervalRef.current = setInterval(
        () => {
          currentIndex += 1;
          setVisibleCount(previous => {
            const nextValue = Math.max(previous, currentIndex);
            return nextValue > letters.length ? letters.length : nextValue;
          });

          if (currentIndex >= letters.length) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            if (loopDelay > 0) {
              loopTimeoutRef.current = setTimeout(() => {
                startRevealInner();
              }, loopDelay);
            }
          }
        },
        Math.max(10, perCharDelay)
      );
    },
    [letters, loopDelay, perCharDelay]
  );

  useEffect(() => {
    startReveal();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, [startReveal]);

  // Group letters into whole words so lines can only break at spaces \u2014
  // bare inline-block letter spans would wrap mid-word on narrow screens.
  let letterIndex = 0;
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      {words.map((word, wordIdx) => {
        const rendered = (
          <span
            key={`word-${wordIdx}`}
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {word.split('').map(letter => {
              const index = letterIndex++;
              const isVisible = index < visibleCount;
              return (
                <span
                  key={`${letter}-${index}`}
                  className="inline-block transition-all duration-300 ease-out will-change-transform"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0)'
                      : 'translateY(0.25rem)',
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        );
        letterIndex++; // account for the space consumed by split(' ')
        return wordIdx < words.length - 1 ? [rendered, ' '] : rendered;
      })}
    </span>
  );
}
