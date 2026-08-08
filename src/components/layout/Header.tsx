'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { CTAButton } from '@/components/ui/CTAButton';

const MENU_LINKS = [
  { 
    name: 'Projekte', 
    href: '/projects',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )
  },
  { 
    name: 'Über uns', 
    href: '/about',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    )
  },
  { 
    name: 'Kontakt', 
    href: '/contact',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  { 
    name: 'Blog', 
    href: '/blog',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  },
  { 
    name: 'Startseite', 
    href: '/',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // 3D Flip Down & Elastic Snap Entrance Animation on page load
  useEffect(() => {
    if (headerRef.current) {
      const items = headerRef.current.querySelectorAll('.pointer-events-auto');
      
      gsap.fromTo(
        items,
        { 
          opacity: 0, 
          y: -30,
          rotateX: -75,
          scale: 0.88,
          transformPerspective: 800,
          transformOrigin: 'top center'
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          scale: 1, 
          duration: 1.1, 
          stagger: 0.1, 
          ease: 'back.out(1.5)', 
          delay: 0.35,
          clearProps: 'transform,perspective'
        }
      );
    }
  }, []);

  useEffect(() => {
    const menus = [mobileMenuRef.current, desktopMenuRef.current].filter((el): el is HTMLDivElement => Boolean(el));

    menus.forEach((menuContent) => {
      const items = menuContent.querySelectorAll('.menu-item-link');

      if (isOpen) {
        gsap.killTweensOf([menuContent, items]);
        
        gsap.to(menuContent, {
          height: 'auto',
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        });

        gsap.fromTo(
          items,
          { y: 14, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.45,
            stagger: 0.05,
            delay: 0.05,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform,filter' });
            }
          }
        );
      } else {
        gsap.killTweensOf([menuContent, items]);

        gsap.to(items, {
          y: -6,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
        });

        gsap.to(menuContent, {
          height: 0,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.inOut',
        });
      }
    });
  }, [isOpen]);

  return (
    <header 
      ref={headerRef}
      className="fixed top-6 sm:top-6 md:top-10 left-0 right-0 z-[100] px-6 md:px-10 flex items-start justify-between pointer-events-none select-none"
    >
      {/* ============================================================ */}
      {/* MOBILE UNIFIED CAPSULE (Visible on < sm)                     */}
      {/* ============================================================ */}
      <div 
        className="sm:hidden pointer-events-auto w-full bg-[#0D0D0D] text-[#F2F0EC] border border-white/10 rounded-[14px] p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Top Bar Row */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between h-[44px] pl-3.5 pr-1 cursor-pointer"
        >
          {/* Logo on Left */}
          <Link href="/" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-[#ff3131] [mask:url('/logo.png')_no-repeat_center/contain] [-webkit-mask:url('/logo.png')_no-repeat_center/contain]" />
            <span className="font-display font-medium text-[13px] tracking-[0.2em] uppercase text-[#F2F0EC]">
              ALMEDIN®
            </span>
          </Link>

          {/* Square Hamburger Button on Right */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="w-9 h-9 bg-white/10 hover:bg-white/15 rounded-[8px] flex justify-center items-center relative transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <div 
              className={cn(
                "relative w-4 h-4 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isOpen ? "rotate-[180deg]" : "rotate-0"
              )}
            >
              {/* Top Line */}
              <span 
                className={cn(
                  "absolute w-4 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                  isOpen 
                    ? "rotate-45 translate-y-0" 
                    : "-translate-y-[3px]"
                )} 
              />
              {/* Bottom Line */}
              <span 
                className={cn(
                  "absolute w-4 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                  isOpen 
                    ? "-rotate-45 translate-y-0" 
                    : "translate-y-[3px]"
                )} 
              />
            </div>
          </button>
        </div>        {/* Expandable Menu Links on Mobile */}
        <div 
          ref={mobileMenuRef} 
          className="h-0 opacity-0 overflow-hidden px-1"
        >
          <div className="pt-2 pb-2.5 border-t border-white/10 flex flex-col gap-1.5">
            {/* Links */}
            {MENU_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-item-link group flex items-center w-full cursor-pointer opacity-0"
              >
                <div className="flex-1 h-10 px-3 bg-white/[0.04] active:bg-white/10 border border-white/10 rounded-[10px] flex items-center justify-between text-white transition-all duration-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-white/10 rounded-[5px] flex items-center justify-center text-white/90 shrink-0">
                      {link.icon}
                    </div>
                    <span className="font-display text-[12px] uppercase tracking-[0.15em] font-medium text-white/90">
                      {link.name}
                    </span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}

            {/* Bottom Row inside Mobile Menu Drawer: CTA & Socials aligned to 40px (h-10) */}
            <div className="menu-item-link pt-2 mt-0.5 border-t border-white/10 flex items-center justify-between gap-1.5 opacity-0">
              <div className="flex-1 h-10 flex items-center">
                <CTAButton text="Termin buchen" href="/contact" variant="primary" size="responsive" className="w-full justify-center" />
              </div>
              
              <div className="h-10 flex items-center gap-1 bg-white/5 border border-white/10 px-1 rounded-[10px] shrink-0">
                <a 
                  href="https://wa.me/49123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white/5 active:bg-[#ff3131] text-white/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.626-.491-5.2-1.42l-.373-.222-3.865 1.013 1.031-3.766-.244-.389c-1.024-1.631-1.564-3.518-1.564-5.457 0-5.696 4.635-10.33 10.334-10.33 2.76 0 5.353 1.077 7.305 3.031 1.952 1.954 3.028 4.548 3.028 7.308 0 5.697-4.636 10.331-10.333 10.333"/></svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white/5 active:bg-[#ff3131] text-white/80 transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP 3-PART HEADER (Visible on sm and up)                 */}
      {/* ============================================================ */}

      {/* Left - Social Icons (WhatsApp, Instagram, LinkedIn) */}
      <div className="pointer-events-auto bg-[#0D0D0D] text-[#F2F0EC] border border-white/10 p-1 rounded-[10px] hidden sm:flex items-center gap-1 shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
        {/* WhatsApp */}
        <a 
          href="https://wa.me/49123456789" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white/5 hover:bg-[#ff3131] text-[#F2F0EC]/80 hover:text-white transition-all duration-300 cursor-pointer"
          aria-label="WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.626-.491-5.2-1.42l-.373-.222-3.865 1.013 1.031-3.766-.244-.389c-1.024-1.631-1.564-3.518-1.564-5.457 0-5.696 4.635-10.33 10.334-10.33 2.76 0 5.353 1.077 7.305 3.031 1.952 1.954 3.028 4.548 3.028 7.308 0 5.697-4.636 10.331-10.333 10.333"/>
          </svg>
        </a>

        {/* Instagram */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white/5 hover:bg-[#ff3131] text-[#F2F0EC]/80 hover:text-white transition-all duration-300 cursor-pointer"
          aria-label="Instagram"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white/5 hover:bg-[#ff3131] text-[#F2F0EC]/80 hover:text-white transition-all duration-300 cursor-pointer"
          aria-label="LinkedIn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>

      {/* Center - ALMEDIN Logo */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-0 items-center justify-center">
        <Link 
          href="/" 
          className="pointer-events-auto bg-[#0D0D0D] text-[#F2F0EC] border border-white/10 px-5 h-[44px] rounded-[10px] flex items-center gap-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.4)] group transition-colors duration-300 hover:border-white/25"
        >
          <div className="w-4 h-4 bg-[#ff3131] [mask:url('/logo.png')_no-repeat_center/contain] [-webkit-mask:url('/logo.png')_no-repeat_center/contain] transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display font-medium text-[13px] tracking-[0.2em] uppercase text-[#F2F0EC] group-hover:text-[#ff3131] transition-colors">
            ALMEDIN®
          </span>
        </Link>
      </div>

      {/* Right - Actions (CTA Button + Floating Menu Capsule) */}
      <div className="hidden sm:flex pointer-events-auto items-start gap-3">
        {/* Termin buchen CTA Button — light variant */}
        <div>
          <CTAButton text="Termin buchen" href="/contact" variant="light" />
        </div>

        {/* Menu Floating Capsule */}
        <div 
          className={cn(
            "bg-[#0D0D0D] text-[#F2F0EC] border border-white/10 rounded-[10px] shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden",
            isOpen ? "w-[260px]" : "w-[120px]"
          )}
        >
          {/* Top Navbar Row */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between h-[44px] pl-3.5 pr-1 cursor-pointer group/menu select-none"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover/menu:text-white font-medium transition-colors">
              MENÜ
            </span>

            {/* Square Hamburger Toggle Button */}
            <button 
              type="button"
              className="w-9 h-9 bg-white/5 group-hover/menu:bg-white/10 rounded-[6px] flex justify-center items-center relative transition-colors group/btn cursor-pointer"
              aria-label="Toggle menu"
            >
              <div 
                className={cn(
                  "relative w-4 h-4 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen ? "rotate-[180deg]" : "rotate-0"
                )}
              >
                {/* Top Line */}
                <span 
                  className={cn(
                    "absolute w-4 h-[1.5px] bg-white/80 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                    isOpen 
                      ? "rotate-45 translate-y-0" 
                      : "-translate-y-[2.5px] group-hover/btn:translate-y-0"
                  )} 
                />
                {/* Bottom Line */}
                <span 
                  className={cn(
                    "absolute w-4 h-[1.5px] bg-white/80 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center",
                    isOpen 
                      ? "-rotate-45 translate-y-0" 
                      : "translate-y-[2.5px] group-hover/btn:translate-y-0"
                  )} 
                />
              </div>
            </button>
          </div>

          {/* Expandable Dropdown Content */}
          <div 
            ref={desktopMenuRef} 
            className="h-0 opacity-0 overflow-hidden px-2"
          >
            <div className="pt-2 pb-2.5 border-t border-white/10 flex flex-col gap-1.5">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="menu-item-link group flex items-center w-full cursor-pointer opacity-0"
                >
                  {/* Left Icon Square */}
                  <div className="w-0 group-hover:w-9 mr-0 group-hover:mr-1.5 h-9 opacity-0 group-hover:opacity-100 bg-white/10 border-0 group-hover:border group-hover:border-white/15 rounded-[6px] flex items-center justify-center text-white transition-all duration-300 ease-out overflow-hidden shrink-0">
                    {link.icon}
                  </div>

                  {/* Main Text Card */}
                  <div className="flex-1 h-9 px-3.5 bg-white/[0.03] group-hover:bg-white/10 border border-white/5 group-hover:border-white/15 rounded-[6px] flex items-center justify-start text-white/80 group-hover:text-white transition-all duration-300">
                    <span className="font-display text-[12px] uppercase tracking-wider font-medium">
                      {link.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
