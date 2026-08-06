'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import { HoverSlideText } from '@/components/ui/HoverSlideText';

const NAV_LINKS = [
  { name: 'Startseite', href: '/' },
  { name: 'Über uns', href: '/about' },
  { name: 'Projekte', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-6 px-6 max-w-[1400px] mx-auto">
      <div className="w-full flex gap-[10px] items-stretch h-[44px]">
        {/* Left - Logo */}
        <Link href="/" className="px-5 bg-black flex items-center justify-center gap-2.5 rounded-md flex-shrink-0 hover:bg-neutral-800 transition-colors overflow-hidden">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Image src="/logo.png" alt="Almedin Bau Logo" fill className="object-contain" />
          </div>
          <span className="text-white font-black text-[12px] tracking-widest uppercase">ALMEDIN</span>
        </Link>

        {/* Center - Navigation */}
        <nav className="hidden md:flex flex-1 gap-[10px]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex-1 flex items-center px-5 rounded-md text-[12px] font-semibold tracking-wider transition-colors duration-500 overflow-hidden",
                  isActive
                    ? "bg-black text-[#ff3131]"
                    : "bg-[#efeee5] text-black hover:bg-black hover:text-white"
                )}
              >
                <HoverSlideText text={link.name} className="h-4" />
              </Link>
            );
          })}
        </nav>

        {/* Right - Call to Action */}
        <CTAButton text="Termin buchen" href="/contact" />
      </div>
    </header>
  );
}
