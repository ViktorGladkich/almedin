'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInUp({ children, className = '', delay = 0 }: FadeInUpProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.fromTo(
        container.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotationX: -15,
          filter: 'blur(15px)',
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          delay: delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
