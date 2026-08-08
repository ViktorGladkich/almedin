'use client';

import { useRef, ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type Variant = 'lift' | 'mask' | 'settle';

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /**
   * lift   — short travel + fade. The default. Quiet, works anywhere.
   * mask   — slides out from behind a hard edge. No fade at all.
   * settle — arrives slightly overshot and settles. For single hero-level items.
   */
  variant?: Variant;
}

/**
 * Entrance wrapper.
 *
 * The previous version animated y, opacity, scale, rotationX AND blur at once.
 * Five simultaneous properties is what makes a reveal read as a default: the
 * eye can't tell what the motion is *about*, so it registers as "something
 * generic happened". It was also expensive — animating `filter: blur()` forces
 * a repaint every frame and cannot be handed to the compositor.
 *
 * Each variant here commits to ONE idea. Travel is short (nothing moves more
 * than 28px) because long travel on scroll entrances reads as a slideshow.
 */
export function FadeInUp({
  children,
  className = '',
  delay = 0,
  variant = 'lift',
}: FadeInUpProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;

      const target = variant === 'mask' ? el.firstElementChild : el;
      if (!target) return;

      if (prefersReducedMotion()) {
        gsap.set(target, { clearProps: 'all' });
        return;
      }

      const trigger = {
        trigger: el,
        start: 'top 86%',
        once: true, // never replay on the way back up
      };

      if (variant === 'mask') {
        gsap.fromTo(
          target,
          { yPercent: 108 },
          { yPercent: 0, duration: 1.15, delay, ease: 'expo.out', scrollTrigger: trigger }
        );
        return;
      }

      if (variant === 'settle') {
        gsap.fromTo(
          target,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            delay,
            // A single overshoot, small enough to feel like weight rather
            // than a bounce effect.
            ease: 'back.out(1.1)',
            scrollTrigger: trigger,
          }
        );
        return;
      }

      gsap.fromTo(
        target,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay, ease: 'expo.out', scrollTrigger: trigger }
      );
    },
    { scope: container, dependencies: [variant] }
  );

  return (
    <div
      ref={container}
      className={cn(variant === 'mask' && 'overflow-hidden', className)}
    >
      {variant === 'mask' ? (
        <div className="will-change-transform">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}