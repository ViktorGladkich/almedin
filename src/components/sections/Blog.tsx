'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Räume schaffen, die Generationen überdauern',
    date: '1. Juni 2026',
    category: 'Bautrends',
    image: '/images/blog_1.png',
    href: '/blog/building-spaces-that-last-for-generations',
  },
  {
    id: 2,
    title: 'Konsistenz in der Bauphase bewahren',
    date: '28. Mai 2026',
    category: 'Projektmanagement',
    image: '/images/blog_2.png',
    href: '/blog/maintaining-consistency-through-construction',
  },
  {
    id: 3,
    title: 'Die Bedeutung der Materialwahl',
    date: '25. Mai 2026',
    category: 'Materialinnovation',
    image: '/images/blog_3.png',
    href: '/blog/the-importance-of-material-selection',
  },
];

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const listItems = gsap.utils.toArray('.blog-item') as HTMLElement[];
    
    // Fade in animation on scroll
    gsap.fromTo(listItems, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Follow mouse logic for the View button and slight parallax for image
    listItems.forEach((item) => {
      const button = item.querySelector('.view-btn') as HTMLElement;
      const imgContainer = item.querySelector('.blog-img-container') as HTMLElement;
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        // Calculate position relative to the item container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(button, {
          x: x - button.offsetWidth / 2,
          y: y - button.offsetHeight / 2,
          duration: 0.5,
          ease: 'power3.out',
        });

        // Slight 3D hover effect on image based on mouse position
        const xPos = (x / rect.width - 0.5) * 10;
        const yPos = (y / rect.height - 0.5) * 10;
        
        gsap.to(imgContainer, {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1,
          ease: 'power2.out'
        });
      };
      
      const onMouseEnter = () => {
        gsap.to(button, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });
        item.addEventListener('mousemove', onMouseMove);
      };
      
      const onMouseLeave = () => {
        gsap.to(button, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' });
        gsap.to(imgContainer, { rotationY: 0, rotationX: 0, duration: 1, ease: 'power2.out' });
        item.removeEventListener('mousemove', onMouseMove);
      };

      item.addEventListener('mouseenter', onMouseEnter);
      item.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        item.removeEventListener('mouseenter', onMouseEnter);
        item.removeEventListener('mouseleave', onMouseLeave);
      };
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
      <div className="w-full flex flex-col gap-12">
        
        <h2 className="text-3xl md:text-4xl font-display font-medium text-black">
          Feldnotizen
        </h2>

        <div className="w-full flex flex-col border-t border-[#cccac2]">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={post.href}
              className="blog-item group relative flex flex-col lg:flex-row items-center justify-between py-10 lg:py-12 border-b border-[#cccac2] transition-colors"
            >
              {/* Left Content */}
              <div className="flex flex-col flex-1 gap-4 pr-8 lg:pr-12 w-full lg:w-auto z-10 pointer-events-none">
                <h3 className="text-3xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight font-display text-black mb-2 group-hover:text-neutral-700 transition-colors">
                  {post.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[#4d4c49] font-medium tracking-wide uppercase">
                  <span>{post.date}</span>
                  <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#cccac2]" />
                  <span>{post.category}</span>
                </div>
              </div>

              {/* View Button (Follows Mouse on Desktop) */}
              <div className="view-btn hidden lg:flex absolute left-0 top-0 z-20 opacity-0 scale-50 pointer-events-none">
                <div className="flex items-center gap-2 bg-[#fff31a] text-black px-6 py-3 rounded-xl font-medium shadow-xl whitespace-nowrap">
                  Ansehen
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Right Image */}
              <div className="blog-img-container w-full lg:w-[450px] shrink-0 mt-8 lg:mt-0 relative overflow-hidden rounded-xl aspect-[1.5/1] z-10 pointer-events-none perspective-[1000px]">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
