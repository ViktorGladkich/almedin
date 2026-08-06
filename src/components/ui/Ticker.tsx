'use client';

import { ShieldCheck, HardHat, Leaf, FileSearch, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const items = [
  { text: 'Qualitätskontrolle', icon: ShieldCheck },
  { text: 'Sicherheit zuerst', icon: HardHat },
  { text: 'Nachhaltiges Bauen', icon: Leaf },
  { text: 'Transparente Prozesse', icon: FileSearch },
  { text: 'Pünktliche Lieferung', icon: Clock },
];

export function Ticker({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // The items are duplicated 4 times. So to loop perfectly, 
    // we move it by 25% (which corresponds to 1 original list length).
    gsap.to('.ticker-track', {
      xPercent: -25,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });
  }, { scope: container });

  return (
    <div 
      ref={container}
      className={cn("w-full overflow-hidden flex items-center py-10", className)}
      style={{ 
        maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)'
      }}
    >
      <div className="ticker-track flex items-center gap-16 whitespace-nowrap w-max">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-black">
            <item.icon className="w-6 h-6 opacity-70 text-[#FF3131]" />
            <span className="text-xl md:text-2xl font-medium tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
