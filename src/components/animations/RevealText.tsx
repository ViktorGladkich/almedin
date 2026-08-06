'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function RevealText({ text, className = '', as: Component = 'p' }: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const words = container.current.querySelectorAll('.reveal-word');
      
      gsap.fromTo(
        words,
        {
          y: '100%',
          opacity: 0,
          rotateX: -45,
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
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
    <Component ref={container} className={cn(className, 'block')} style={{ perspective: '1000px' }}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.1em]"
          style={{ display: 'inline-flex' }}
        >
          <span className="reveal-word inline-block origin-top">{word}&nbsp;</span>
        </span>
      ))}
    </Component>
  );
}
