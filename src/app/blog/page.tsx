'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { posts, TOPICS, Topic, getPostsByTopic } from '@/data/posts';

// Seeded random number generator for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function BlogPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>('All');
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const filteredPosts = getPostsByTopic(selectedTopic);

  // Generate stars with fixed positions for hydration consistency
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
      // Animate header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate board rows
      const rows = boardRef.current?.querySelectorAll('.board-row');
      if (rows) {
        gsap.from(rows, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Twinkling stars
      const starElements = starsRef.current?.querySelectorAll('.star');
      starElements?.forEach((star, i) => {
        const baseOpacity = seededRandom(i * 4.4) * 0.3 + 0.1;
        const maxOpacity = seededRandom(i * 5.5) * 0.4 + 0.4;
        const duration = seededRandom(i * 6.6) * 3 + 1.5;
        const delay = seededRandom(i * 7.7) * 2;

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
  }, [mounted, selectedTopic]);

  // Format date to airport style (e.g., "NOV 25")
  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ON TIME': return 'text-green-400';
      case 'DELAYED': return 'text-yellow-400';
      case 'BOARDING': return 'text-blue-400';
      case 'DEPARTED': return 'text-gray-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full bg-[#0a1628] pb-16 flex flex-col items-center relative overflow-hidden"
      style={{ paddingTop: '120px' }}
    >
      {/* Background gradient - absolute positioned */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#1a2a4a]" />
      
      {/* Stars - higher opacity for visibility */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size * 1.5}px`,
              height: `${star.size * 1.5}px`,
              opacity: 0.6,
              boxShadow: '0 0 3px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Subtle ambient glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to top, rgba(26, 58, 92, 0.4) 0%, transparent 100%)',
        }}
      />
      
      {/* Main content - needs to be above background elements */}
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Airport Style */}
        <div ref={headerRef} className="mb-8">
          {/* Main title bar */}
          <div className="bg-[#1a3a5c] rounded-t-lg px-6 py-4 border-b-2 border-[#2a5a8c]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[#7eb8d8] text-sm tracking-wider">✈</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#e8f4f8] tracking-wide"
                    style={{ fontFamily: 'monospace' }}>
                  DEPARTURES
                </h1>
                <span className="text-[#7eb8d8] text-sm tracking-wider hidden sm:inline">출발 | 出発</span>
              </div>
              
              {/* Digital clock style */}
              <div className="text-[#ffd700] text-xl sm:text-2xl font-bold tracking-wider"
                   style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
            </div>
          </div>

          {/* Topic filter bar - horizontally scrollable on mobile */}
          <div className="bg-[#0d2137] px-3 sm:px-4 py-3 border-b border-[#1a3a5c] overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              <span className="text-[#7eb8d8] text-xs tracking-wider mr-1 flex-shrink-0">FILTER:</span>
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-2 sm:px-3 py-1 text-xs tracking-wider transition-all duration-200 rounded whitespace-nowrap flex-shrink-0 ${
                    selectedTopic === topic
                      ? 'bg-[#2a5a8c] text-[#e8f4f8] shadow-lg shadow-[#2a5a8c]/30'
                      : 'text-[#7eb8d8] hover:bg-[#1a3a5c] hover:text-[#e8f4f8]'
                  }`}
                  style={{ fontFamily: 'monospace' }}
                >
                  {topic.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div className="bg-[#1a3a5c] px-3 sm:px-4 py-2 grid grid-cols-12 gap-1 sm:gap-2 text-[#7eb8d8] text-[10px] sm:text-xs tracking-wider border-b border-[#2a5a8c]"
               style={{ fontFamily: 'monospace' }}>
            <div className="col-span-2">DATE</div>
            <div className="col-span-3 sm:col-span-2">TOPIC</div>
            <div className="col-span-5 sm:col-span-6">TITLE</div>
            <div className="col-span-2 text-right">STATUS</div>
          </div>
        </div>

        {/* Flight board - Posts list */}
        <div ref={boardRef} className="space-y-1">
          {filteredPosts.length === 0 ? (
            <div className="bg-[#0d2137] px-6 py-12 text-center">
              <p className="text-[#7eb8d8] text-lg" style={{ fontFamily: 'monospace' }}>
                NO FLIGHTS SCHEDULED
              </p>
              <p className="text-[#4a6a8a] text-sm mt-2">
                Check back later for updates
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => {
              const { month, day } = formatDateShort(post.date);
              
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="board-row block"
                >
                  <div className={`
                    bg-[#0d2137] hover:bg-[#142d4a] 
                    px-3 sm:px-4 py-3 sm:py-4 
                    grid grid-cols-12 gap-1 sm:gap-2 items-center
                    border-l-4 border-transparent hover:border-[#7eb8d8]
                    transition-all duration-200
                    group
                  `}>
                    {/* Date - Timeline style */}
                    <div className="col-span-2 flex flex-col items-center">
                      <span className="text-[#ffd700] text-[10px] sm:text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                        {month}
                      </span>
                      <span className="text-[#e8f4f8] text-base sm:text-xl font-bold" style={{ fontFamily: 'monospace' }}>
                        {day}
                      </span>
                    </div>

                    {/* Topic */}
                    <div className="col-span-3 sm:col-span-2 overflow-hidden">
                      <span className="text-[#7eb8d8] text-[10px] sm:text-sm tracking-wider truncate block"
                            style={{ fontFamily: 'monospace' }}>
                        {post.topic.toUpperCase().slice(0, 10)}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="col-span-5 sm:col-span-6 overflow-hidden">
                      <h3 className="text-[#e8f4f8] text-xs sm:text-base font-medium group-hover:text-[#7eb8d8] transition-colors truncate"
                          style={{ fontFamily: 'monospace' }}>
                        {post.title}
                      </h3>
                      <p className="text-[#4a6a8a] text-[10px] sm:text-sm truncate mt-0.5 hidden sm:block">
                        {post.subtitle}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-right overflow-hidden">
                      <span className={`text-[10px] sm:text-sm font-bold tracking-wider ${getStatusColor(post.status)}`}
                            style={{ fontFamily: 'monospace', textShadow: '0 0 8px currentColor' }}>
                        {post.status.replace(' ', '\u00A0')}
                      </span>
                    </div>
                  </div>

                  {/* Timeline connector line */}
                  {index < filteredPosts.length - 1 && (
                    <div className="relative h-1 bg-[#0d2137]">
                      <div className="absolute left-[4.5%] sm:left-[3.5%] top-0 w-0.5 h-full bg-[#1a3a5c]" />
                    </div>
                  )}
                </Link>
              );
            })
          )}
        </div>

        {/* Bottom info bar */}
        <div className="mt-8 bg-[#1a3a5c] rounded-b-lg px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[#7eb8d8] text-xs tracking-wider" style={{ fontFamily: 'monospace' }}>
            {filteredPosts.length} POST{filteredPosts.length !== 1 ? 'S' : ''} SCHEDULED
          </div>
          <div className="text-[#4a6a8a] text-xs">
            기술 도움이 필요하시면 언제든지 연락주세요
          </div>
        </div>
      </div>
    </div>
  );
}
