'use client';
import { Project } from '@/data/projects';
import Building from '@/components/Building';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import Link from 'next/link';


// Seeded random number generator for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Generate stars with fixed positions (no random for hydration consistency)
  const stars = useMemo(() => [
    { id: 0, left: 8, top: 10, size: 2 },
    { id: 1, left: 15, top: 5, size: 1.5 },
    { id: 2, left: 25, top: 18, size: 2 },
    { id: 3, left: 35, top: 8, size: 1 },
    { id: 4, left: 45, top: 22, size: 2.5 },
    { id: 5, left: 55, top: 12, size: 1.5 },
    { id: 6, left: 65, top: 25, size: 2 },
    { id: 7, left: 75, top: 15, size: 1 },
    { id: 8, left: 85, top: 20, size: 2 },
    { id: 9, left: 92, top: 8, size: 1.5 },
    { id: 10, left: 5, top: 35, size: 2 },
    { id: 11, left: 20, top: 40, size: 1 },
    { id: 12, left: 40, top: 38, size: 2.5 },
    { id: 13, left: 60, top: 42, size: 1.5 },
    { id: 14, left: 80, top: 35, size: 2 },
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Animate building
      gsap.from(buildingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate content
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Twinkling stars
      const starElements = starsRef.current?.querySelectorAll('.star');
      starElements?.forEach((star, i) => {
        const baseOpacity = seededRandom(i * 4.5) * 0.3 + 0.1;
        const maxOpacity = seededRandom(i * 5.5) * 0.5 + 0.4;
        const duration = seededRandom(i * 6.5) * 3 + 1;
        const delay = seededRandom(i * 7.5) * 2;

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
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#132743] to-[#1a3a5c] relative overflow-hidden"
    >
      {/* Stars */}
      <div ref={starsRef}>
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
        className="relative z-10 pb-20 w-full flex justify-center"
        style={{
          paddingTop: '140px', // Explicit top padding to clear fixed navbar
          paddingLeft: 'max(1.5rem, 3vw)',
          paddingRight: 'max(1.5rem, 3vw)',
        }}
      >
        <div className="w-full max-w-4xl">
          {/* Back button */}
          <div style={{ marginBottom: '48px' }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#7eb8c4] hover:text-[#e8dfd6] transition-colors duration-300 group"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm tracking-wide">Back to Projects</span>
            </Link>
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* Building illustration */}
            <div ref={buildingRef} className="flex flex-col items-center flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[220px]">
              <div className="w-full aspect-[2/3]">
                <Building type={project.buildingType} isHovered={true} />
              </div>
              <div className="w-full h-3 sm:h-4 bg-gradient-to-t from-[#1a3a5c] to-[#2a4a6c] rounded-t-sm" />
              <p className="text-xs text-[#7eb8c4] mt-3 sm:mt-4">{project.period}</p>
            </div>

            {/* Project details */}
            <div ref={contentRef} className="w-full max-w-xl lg:max-w-none">
              {/* Title and description */}
              <div>
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#e8dfd6] mb-3 sm:mb-4 tracking-wide text-center lg:text-left"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {project.title}
                </h1>
                <p className="text-base sm:text-lg text-[#a0b4c0] leading-relaxed text-center lg:text-left">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div style={{ marginTop: '12px' }}>
                <h2 className="text-xs sm:text-sm tracking-widest uppercase text-[#7eb8c4] text-center lg:text-left" style={{ marginBottom: '12px' }}>
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#1a3a5c]/50 text-[#e8dfd6] rounded-full border border-[#2a4a6c]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Long description */}
              <div style={{ marginTop: '24px' }}>
                <h2 className="text-xs sm:text-sm tracking-widest uppercase text-[#7eb8c4] text-center lg:text-left" style={{ marginBottom: '8px' }}>
                  About This Project
                </h2>
                <div className="text-sm sm:text-base text-[#a0b4c0] leading-relaxed space-y-3 sm:space-y-4">
                  {project.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.links.length > 0 || project.note) && (
                <div style={{ marginTop: '24px' }}>
                  <h2 className="text-xs sm:text-sm tracking-widest uppercase text-[#7eb8c4] text-center lg:text-left" style={{ marginBottom: '12px' }}>
                    Links & Resources
                  </h2>
                  <div className="flex flex-col gap-4 items-center lg:items-start">
                    {project.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                        {project.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-[#2a4a6c]/50 text-[#e8dfd6] rounded-lg border border-[#3a5a7c] hover:bg-[#3a5a7c] transition-colors duration-300"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Private Code Note */}
                    {project.note && (
                      <div className="flex items-center gap-2 text-sm text-[#a0b4c0] italic bg-[#1a3a5c]/30 px-4 py-2 rounded-lg border border-[#2a4a6c]/50">
                        <svg className="w-4 h-4 text-[#7eb8c4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {project.note}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Placeholder for future links */}
              {project.links.length === 0 && !project.note && (
                <div className="p-3 sm:p-4 border border-dashed border-[#2a4a6c] rounded-lg" style={{ marginTop: '24px' }}>
                  <p className="text-xs sm:text-sm text-[#6a8a9c] italic text-center lg:text-left">
                    Links to reports, slides, and demos will be added here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#1a3a5c]/50 to-transparent pointer-events-none" />
    </div>
  );
}
