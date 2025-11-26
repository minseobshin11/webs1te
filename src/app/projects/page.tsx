'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Building from '@/components/Building';

// Seeded random number generator for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Generate stars with fixed positions (no random for hydration consistency)
  const stars = useMemo(() => [
    { id: 0, left: 5, top: 8, size: 2 },
    { id: 1, left: 12, top: 15, size: 1.5 },
    { id: 2, left: 20, top: 5, size: 2.5 },
    { id: 3, left: 28, top: 22, size: 1 },
    { id: 4, left: 35, top: 12, size: 2 },
    { id: 5, left: 42, top: 28, size: 1.5 },
    { id: 6, left: 50, top: 8, size: 2 },
    { id: 7, left: 58, top: 18, size: 1 },
    { id: 8, left: 65, top: 25, size: 2.5 },
    { id: 9, left: 72, top: 10, size: 1.5 },
    { id: 10, left: 78, top: 20, size: 2 },
    { id: 11, left: 85, top: 5, size: 1 },
    { id: 12, left: 92, top: 15, size: 2 },
    { id: 13, left: 8, top: 35, size: 1.5 },
    { id: 14, left: 18, top: 42, size: 2 },
    { id: 15, left: 25, top: 38, size: 1 },
    { id: 16, left: 38, top: 45, size: 2.5 },
    { id: 17, left: 48, top: 35, size: 1.5 },
    { id: 18, left: 55, top: 48, size: 2 },
    { id: 19, left: 68, top: 40, size: 1 },
    { id: 20, left: 75, top: 50, size: 2 },
    { id: 21, left: 88, top: 38, size: 1.5 },
    { id: 22, left: 95, top: 45, size: 2 },
    { id: 23, left: 3, top: 55, size: 1 },
    { id: 24, left: 15, top: 52, size: 2.5 },
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Fade in title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out',
      });

      // Stagger in buildings from bottom
      const buildings = buildingsRef.current?.querySelectorAll('.building-card');
      if (buildings) {
        gsap.from(buildings, {
          opacity: 0,
          y: 100,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Twinkling stars with varying brightness
      const starElements = starsRef.current?.querySelectorAll('.star');
      starElements?.forEach((star, i) => {
        const baseOpacity = seededRandom(i * 4.4) * 0.4 + 0.2;
        const maxOpacity = seededRandom(i * 5.5) * 0.5 + 0.5;
        const duration = seededRandom(i * 6.6) * 3 + 1;
        const delay = seededRandom(i * 7.7) * 3;

        gsap.fromTo(
          star,
          { opacity: baseOpacity },
          {
            opacity: maxOpacity,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay,
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-gradient-to-b from-[#0a1628] via-[#132743] to-[#1a3a5c] relative overflow-x-hidden">
      {/* Stars */}
      <div ref={starsRef} className="fixed inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content - using inline style to ensure padding works */}
      <div 
        className="relative z-10 pb-20 w-full flex flex-col items-center"
        style={{
          paddingTop: '140px', // Explicit top padding to clear fixed navbar
          paddingLeft: 'max(1.5rem, 3vw)',
          paddingRight: 'max(1.5rem, 3vw)',
        }}
      >
        <div className="w-full max-w-6xl">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#e8dfd6] text-center tracking-wide"
            style={{ 
              fontFamily: 'Georgia, serif',
              marginBottom: '2.5rem', // 40px gap between title and subtitle
            }}
          >
            Projects
          </h1>
          <p 
            className="text-center text-[#a0b4c0] max-w-2xl mx-auto text-sm sm:text-base px-4"
            style={{
              marginBottom: '5rem', // 80px gap between subtitle and buildings
            }}
          >
            Each building represents a project I&apos;ve built. Tap to explore.
          </p>

          {/* Buildings grid - responsive layout */}
          <div
            ref={buildingsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 place-items-center"
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="building-card group relative flex flex-col items-center cursor-pointer w-full max-w-[200px] sm:max-w-[220px]"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Building */}
                <div className="w-full aspect-[2/3] transition-transform duration-500 group-hover:-translate-y-2 sm:group-hover:-translate-y-4">
                  <Building
                    type={project.buildingType}
                    isHovered={hoveredProject === project.id}
                  />
                </div>

                {/* Ground/Platform */}
                <div className="w-full h-2 sm:h-3 md:h-4 bg-gradient-to-t from-[#1a3a5c] to-[#2a4a6c] rounded-t-sm" />

                {/* Project title - always visible on mobile, hover on desktop */}
                <div className="mt-3 sm:mt-4 text-center w-full px-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#e8dfd6] truncate">
                    {project.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#7eb8c4] mt-1 truncate">
                    {project.technologies.slice(0, 2).join(' • ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Ground line */}
          <div className="mt-12 sm:mt-16 h-px bg-gradient-to-r from-transparent via-[#2a4a6c] to-transparent" />
        </div>
      </div>

      {/* Ambient glow at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#1a3a5c]/50 to-transparent pointer-events-none" />
    </div>
  );
}
