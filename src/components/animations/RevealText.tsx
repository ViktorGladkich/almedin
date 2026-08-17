'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type Split = 'word' | 'char' | 'line';

interface RevealTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** How the string is broken up before staggering. */
  split?: Split;
  /** Seconds before the reveal starts. Use to choreograph against sibling elements. */
  delay?: number;
  /** Fire on mount instead of on scroll. Use for anything above the fold. */
  immediate?: boolean;
}

const STAGGER: Record<Split, number> = { char: 0.02, word: 0.04, line: 0.08 };

/**
 * Masked reveal: each unit sits inside an overflow-hidden box and slides up
 * from below its own baseline, so the text appears to be uncovered rather
 * than to fade in.
 *
 * Changes vs the previous version:
 * - `once: true` — it used to replay every time you scrolled back up.
 * - No `rotateX`/`opacity` on the unit. A masked slide is cleaner; the old
 *   opacity fade cancelled out the mask and made the edge look soft.
 * - `char` and `line` modes added, so headlines and labels can share one API.
 * - Respects prefers-reduced-motion.
 */
export function RevealText({
  text,
  className = '',
  as: Component = 'p',
  split = 'word',
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const units = container.current.querySelectorAll<HTMLElement>('.reveal-unit');
      if (!units.length) return;

      if (prefersReducedMotion()) {
        gsap.set(units, { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        units,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          delay,
          ease: 'expo.out',
          stagger: STAGGER[split],
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: container.current,
                  start: 'top 88%',
                  once: true,
                },
              }),
        }
      );
    },
    { scope: container, dependencies: [text, split, immediate] }
  );

  const units =
    split === 'char'
      ? Array.from(text)
      : split === 'line'
        ? text.split('\n')
        : text.split(' ');

  return (
    <Component ref={container} className={cn('block', className)}>
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          // The mask. pb/mb pair gives descenders room without adding layout space.
          className={cn(
            'inline-flex overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom',
            split === 'line' && 'block'
          )}
        >
          <span className="reveal-unit inline-block will-change-transform">
            {unit === ' ' ? '\u00A0' : unit}
            {split === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Component>
  );
}