'use client';

import { HoverSlideText } from '@/components/ui/HoverSlideText';

interface CTAButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'light';
  size?: 'default' | 'sm' | 'responsive';
}

export function CTAButton({
  text,
  href = '/contact',
  onClick,
  className = '',
  variant = 'primary',
  size = 'default',
}: CTAButtonProps) {
  const isLight = variant === 'light';
  const bgClass = isLight ? 'bg-[#fffcf4]' : 'bg-[#ff3131]';
  const textClass = isLight ? 'text-black' : 'text-white';
  const hoverBgClass = isLight ? 'bg-[#fffcf4]' : 'bg-[#ff3131]';
  const hoverTextClass = isLight ? 'text-black' : 'text-white';

  const isSm = size === 'sm';
  const isResp = size === 'responsive';

  const heightClass = isSm ? 'h-[36px]' : isResp ? 'h-10 md:h-[44px]' : 'h-[44px]';
  const pxClass = isSm ? 'px-3.5' : isResp ? 'px-4 md:px-5' : 'px-5';
  const fontClass = isSm
    ? 'text-[10px] tracking-[0.12em]'
    : isResp
    ? 'text-[11px] md:text-[12px] tracking-[0.13em] md:tracking-[0.15em]'
    : 'text-[12px] tracking-[0.15em]';
  const arrowDimClass = isSm ? 'h-[36px] w-[36px]' : isResp ? 'h-10 w-10 md:h-[44px] md:w-[44px]' : 'h-[44px] w-[44px]';
  const hoverTranslateClass = isSm
    ? 'group-hover/cta:translate-x-[39px]'
    : isResp
    ? 'group-hover/cta:translate-x-[43px] md:group-hover/cta:translate-x-[47px]'
    : 'group-hover/cta:translate-x-[47px]';

  const content = (
    <>
      {/* Text area — slides RIGHT on hover */}
      <div
        className={`inline-flex items-center justify-center ${heightClass} ${pxClass} ${bgClass} ${textClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${hoverTranslateClass} rounded-l-[10px]`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <span className={`${fontClass} font-bold uppercase whitespace-nowrap`}>
          <HoverSlideText text={text} className="justify-center" />
        </span>
      </div>

      {/* Right arrow — starts flat (→), rotates OUT upward on hover */}
      <div
        className={`relative overflow-hidden ${arrowDimClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-r-[10px]`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div
          className={`absolute inset-0 grid place-items-center ${bgClass} ${textClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/cta:-rotate-90 rounded-r-[10px]`}
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
      <div className={`absolute left-0 top-0 overflow-hidden ${arrowDimClass} pointer-events-none rounded-l-[10px]`}>
        <div
          className={`absolute inset-0 grid place-items-center ${hoverBgClass} ${hoverTextClass} transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-90 group-hover/cta:rotate-0 rounded-l-[10px]`}
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

  const sharedClass = `group group/cta relative inline-flex items-stretch gap-[3px] overflow-hidden cursor-pointer flex-shrink-0 rounded-[10px] ${className}`;

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
