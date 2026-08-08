'use client';

import { useRef } from 'react';
import { ShieldCheck, HardHat, Leaf, FileSearch, Clock } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const ITEMS = [
  { text: 'Qualitätskontrolle', icon: ShieldCheck },
  { text: 'Sicherheit zuerst', icon: HardHat },
  { text: 'Nachhaltiges Bauen', icon: Leaf },
  { text: 'Transparente Prozesse', icon: FileSearch },
  { text: 'Pünktliche Lieferung', icon: Clock },
];

/**
 * Infinite marquee.
 *
 * The list renders TWICE and translates by exactly -50%. That is the smallest
 * construction that closes seamlessly: at -50% the track shows a frame
 * pixel-identical to its start, so the reset is invisible. Four copies at -25%
 * looks the same and costs four times the DOM.
 */
export function Ticker({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to('.ticker-track', { xPercent: -50, ease: 'none', duration: 26, repeat: -1 });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={cn(
        'w-full overflow-hidden flex items-center pt-[10px] pb-6 border-y border-page-hair',
        '[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]',
        '[-webkit-mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]',
        className
      )}
    >
      <div className="ticker-track flex items-center w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-14 pr-14" aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <span key={item.text} className="flex items-center gap-3 shrink-0 text-page-ink">
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-lg md:text-xl font-medium tracking-tight whitespace-nowrap">
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}