'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ImageMaskFilter } from '@/components/animations/ImageMaskFilter';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Räume schaffen, die Generationen überdauern',
    date: '1. Juni 2026',
    dateTime: '2026-06-01',
    category: 'Bautrends',
    image: '/images/blog_1.png',
    href: '/blog/building-spaces-that-last-for-generations',
  },
  {
    id: 2,
    title: 'Konsistenz in der Bauphase bewahren',
    date: '28. Mai 2026',
    dateTime: '2026-05-28',
    category: 'Projektmanagement',
    image: '/images/blog_2.png',
    href: '/blog/maintaining-consistency-through-construction',
  },
  {
    id: 3,
    title: 'Die Bedeutung der Materialwahl',
    date: '25. Mai 2026',
    dateTime: '2026-05-25',
    category: 'Materialinnovation',
    image: '/images/blog_3.png',
    href: '/blog/the-importance-of-material-selection',
  },
];

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.blog-item');
      if (!items.length) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true, // was replaying on every scroll back up
          },
        }
      );

      // Pointer work is skipped entirely on touch — otherwise the first tap
      // fires a synthetic mousemove and the button jumps in from nowhere.
      if (!window.matchMedia('(pointer: fine)').matches) return;

      // Cleanups are COLLECTED and returned from this function. Returning them
      // from inside forEach (as the previous version did) does nothing at all —
      // forEach discards callback return values, so the listeners were never
      // removed and accumulated on every remount.
      const cleanups: Array<() => void> = [];

      items.forEach((item) => {
        const tilt = item.querySelector<HTMLElement>('.blog-tilt');
        if (!tilt) return;

        const toRY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power2.out' });
        const toRX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power2.out' });

        let rect: DOMRect | null = null;

        const onMove = (e: MouseEvent) => {
          if (!rect) return;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          toRY((x / rect.width - 0.5) * 10);
          toRX(-(y / rect.height - 0.5) * 10);
        };

        const onEnter = () => {
          rect = item.getBoundingClientRect();
          item.addEventListener('mousemove', onMove);
        };

        const onLeave = () => {
          rect = null;
          toRY(0);
          toRX(0);
          item.removeEventListener('mousemove', onMove);
        };

        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('mouseleave', onLeave);

        cleanups.push(() => {
          item.removeEventListener('mouseenter', onEnter);
          item.removeEventListener('mouseleave', onLeave);
          item.removeEventListener('mousemove', onMove);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 md:py-32 max-w-[1400px] mx-auto overflow-hidden"
      style={{ paddingInline: 'var(--frame)' }}
    >
      <div className="w-full flex flex-col gap-10 md:gap-12">
        <h2
          className="text-3xl md:text-4xl font-display font-medium m-0"
          style={{ color: 'var(--page-ink)' }}
        >
          Feldnotizen
        </h2>

        <div className="w-full flex flex-col" style={{ borderTop: '1px solid var(--page-hair)' }}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="blog-item group relative flex flex-col lg:flex-row items-center justify-between py-9 lg:py-12"
              style={{ borderBottom: '1px solid var(--page-hair)' }}
            >
              {/* Left */}
              <div className="flex flex-col flex-1 gap-3 pr-0 lg:pr-12 w-full lg:w-auto z-10 pointer-events-none">
                <h3
                  className="text-2xl md:text-4xl lg:text-[52px] leading-[1.08] tracking-tight font-display m-0 transition-opacity duration-500 group-hover:opacity-60"
                  style={{ color: 'var(--page-ink)' }}
                >
                  {post.title}
                </h3>

                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'var(--page-muted)' }}
                >
                  <time dateTime={post.dateTime}>{post.date}</time>
                  <span
                    className="hidden sm:block w-1 h-1 rounded-full"
                    style={{ background: 'var(--page-hair)' }}
                  />
                  <span>{post.category}</span>
                </div>
              </div>

              {/*
                Right image.
                perspective lives on the OUTER element; the rotation lives on the
                inner one. The previous version had both on the same node, where
                perspective simply does not apply — so the "3D tilt" was a flat
                skew with no depth at all.
                overflow/rounding also stay out here: clipping on a transformed
                node flattens its 3D context.
              */}
              <div
                className="w-full lg:w-[440px] shrink-0 mt-7 lg:mt-0 relative overflow-hidden rounded-xl aspect-[1.5/1] z-10 pointer-events-none"
                style={{ perspective: '1000px', background: 'var(--page-surface)' }}
              >
                <div className="blog-tilt w-full h-full will-change-transform">
                  <ImageMaskFilter src={post.image} id={`blog-${post.id}`} />
                </div>
              </div>

              {/* Touch affordance — the hover button never appears on mobile */}
              <span
                className="lg:hidden absolute right-0 top-9 pointer-events-none"
                style={{ color: 'var(--page-muted)' }}
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}