'use client';

import { HoverSlideText } from '@/components/ui/HoverSlideText';

interface CTAButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'light';
}

export function CTAButton({ text, href = '/contact', onClick, className = '', variant = 'primary' }: CTAButtonProps) {
  const isLight = variant === 'light';
  const bgClass = isLight ? 'bg-[#fffcf4]' : 'bg-[#ff3131]';
  const textClass = isLight ? 'text-black' : 'text-white';
  const hoverBgClass = isLight ? 'bg-[#fffcf4]' : 'bg-[#ff3131]';
  const hoverTextClass = isLight ? 'text-black' : 'text-white';

  const content = (
    <>
      {/* Text area — slides RIGHT on hover */}
      <div
        className={`inline-flex items-center justify-center h-[44px] px-5 ${bgClass} ${textClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/cta:translate-x-[47px]`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <span className="text-[12px] font-bold tracking-[0.15em] uppercase whitespace-nowrap">
          <HoverSlideText text={text} className="justify-center" />
        </span>
      </div>

      {/* Right arrow — starts flat (→), rotates OUT upward on hover */}
      <div
        className="relative overflow-hidden h-[44px] w-[44px] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div
          className={`absolute inset-0 grid place-items-center ${bgClass} ${textClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/cta:-rotate-90`}
          style={{
            transformOrigin: '100% 0%',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

      {/* Left arrow — hidden, slides IN from left on hover, already rotated ↗ */}
      <div className="absolute left-0 top-0 overflow-hidden h-[44px] w-[44px] pointer-events-none">
        <div
          className={`absolute inset-0 grid place-items-center ${hoverBgClass} ${hoverTextClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform rotate-90 group-hover/cta:rotate-0`}
          style={{
            transformOrigin: '0% 100%',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-[-45deg]">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </>
  );

  const sharedClass = `group group/cta relative inline-flex items-stretch gap-[3px] overflow-hidden cursor-pointer flex-shrink-0 rounded-md ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={sharedClass} aria-label={text}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={sharedClass} aria-label={text}>
      {content}
    </a>
  );
}
