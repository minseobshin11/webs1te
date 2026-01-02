'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { BlogPost } from '@/data/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

// Seeded random number generator for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Props {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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
      // Header and content animations
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Star twinkling animation
      if (starsRef.current) {
        const starElements = starsRef.current.querySelectorAll('.star');
        starElements.forEach((star, i) => {
          gsap.to(star, {
            opacity: () => 0.3 + seededRandom(i * 100) * 0.4,
            duration: 1 + seededRandom(i * 200) * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: seededRandom(i * 300) * 2,
          });
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen w-full bg-[#0a1628] pb-16 flex flex-col items-center relative"
      style={{ paddingTop: '120px' }}
    >
      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
        crossOrigin="anonymous"
      />

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]" style={{ zIndex: -1 }} />

      {/* Stars */}
      <div ref={starsRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.6,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        {/* Header - Airport boarding pass style */}
        <div ref={headerRef} className="mb-8">
          {/* Back navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#7eb8d8] hover:text-[#e8f4f8] transition-colors mb-6 text-sm"
            style={{ fontFamily: 'monospace' }}
          >
            <span>←</span>
            <span>BACK TO DEPARTURES</span>
          </Link>

          {/* Boarding pass header */}
          <div className="bg-[#1a3a5c] rounded-t-lg overflow-hidden">
            {/* Top accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#2a5a8c] via-[#7eb8d8] to-[#2a5a8c]" />

            <div className="px-6 py-6">
              {/* Topic & Date row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="bg-[#2a5a8c] px-3 py-1 rounded text-[#e8f4f8] text-xs tracking-wider"
                    style={{ fontFamily: 'monospace' }}>
                    {post.topic.toUpperCase()}
                  </span>
                  <span className="text-[#7eb8d8] text-sm" style={{ fontFamily: 'monospace' }}>
                    {post.date}
                  </span>
                </div>
                <span className="text-green-400 text-sm font-bold tracking-wider"
                  style={{ fontFamily: 'monospace', textShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}>
                  {post.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e8f4f8] mb-2"
                style={{ fontFamily: 'Georgia, serif' }}>
                {post.title}
              </h1>

              {/* Subtitle */}
              <p className="text-[#7eb8d8] text-base sm:text-lg">
                {post.subtitle}
              </p>

              {/* Author */}
              <div className="mt-4 pt-4 border-t border-[#2a5a8c]">
                <span className="text-[#4a6a8a] text-sm">Author: </span>
                <span className="text-[#e8f4f8] text-sm">{post.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="bg-[#0f2744] overflow-hidden shadow-xl"
        >
          <article className="px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
            {/* Custom styled content */}
            <div className="blog-content text-[#e4eef8] text-base sm:text-lg leading-normal">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                  // Headings - with extra top margin for visual separation
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl font-bold text-white pt-10 mt-4 mb-5 border-b border-[#2a5a8c] pb-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-semibold text-white pt-8 mt-4 mb-4 border-b border-[#2a5a8c] pb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-semibold text-white pt-6 mt-4 mb-3">
                      {children}
                    </h3>
                  ),
                  // Paragraphs with tighter line height
                  p: ({ children, className, style }) => (
                    <p className={`text-[#e4eef8] leading-normal mb-4 ${className || ''}`} style={style}>
                      {children}
                    </p>
                  ),
                  // Lists
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside ml-6 space-y-2 text-[#e4eef8] mb-5">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside ml-6 space-y-2 text-[#e4eef8] mb-5">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[#e4eef8] leading-normal pl-1">
                      {children}
                    </li>
                  ),
                  // Strong/Bold
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">
                      {children}
                    </strong>
                  ),
                  // Inline code
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !className;

                    if (isInline) {
                      return (
                        <code className="bg-[#1a3a5c] text-[#7ec8e8] px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className={`${className} text-sm`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Code blocks - add more margin
                  pre: ({ children }) => (
                    <pre className="bg-[#0a1628] border border-[#1a3a5c] rounded-lg p-4 sm:p-6 overflow-x-auto mt-6 mb-2 text-sm sm:text-base">
                      {children}
                    </pre>
                  ),
                  // Blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#7ec8e8] pl-4 sm:pl-6 my-6 text-[#a8c8e0] italic">
                      {children}
                    </blockquote>
                  ),
                  // Tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse text-sm sm:text-base">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-[#1a3a5c]">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-white font-semibold border border-[#2a5a8c]">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 sm:px-4 py-2 sm:py-3 border border-[#1a3a5c] text-[#d4e4f4]">
                      {children}
                    </td>
                  ),
                  // Horizontal rule
                  hr: () => (
                    <hr className="border-[#2a5a8c] my-8" />
                  ),
                  // Images - no auto caption since we use explicit *Figure X* captions
                  img: ({ src, alt, className, style }) => (
                    <img
                      src={src}
                      alt={alt || ''}
                      className={className || "w-full rounded-lg border border-[#1a3a5c]"}
                      style={style}
                    />
                  ),
                  // Emphasis - handle figure captions with more spacing
                  em: ({ children }) => {
                    const text = String(children);
                    if (text.startsWith('Figure')) {
                      return (
                        <span className="block text-center text-sm text-[#7eb8d8] mt-3 italic">
                          {children}
                        </span>
                      );
                    }
                    return <em className="italic text-[#a8d0e8]">{children}</em>;
                  },
                  // Superscript for footnote references
                  sup: ({ children }) => (
                    <sup className="text-[#7ec8e8] text-xs font-medium cursor-pointer hover:text-[#a8e0f8]">
                      {children}
                    </sup>
                  ),
                  // Figure wrapper for spacing
                  figure: ({ children, className, style }) => (
                    <figure className={className || ''} style={style}>
                      {children}
                    </figure>
                  ),
                  // Links - handle footnote links specially  
                  a: ({ href, children, className }) => {
                    const isFootnoteLink = href?.startsWith('#footnote-');
                    if (isFootnoteLink) {
                      return (
                        <a
                          href={href}
                          className="text-[#7ec8e8] hover:text-[#a8e0f8] no-underline scroll-smooth"
                        >
                          {children}
                        </a>
                      );
                    }
                    return (
                      <a
                        href={href}
                        className="text-[#7ec8e8] hover:text-[#a8e0f8] underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    );
                  },
                  // Div handler for footnote items and styled divs
                  div: ({ id, children, className, style }) => {
                    if (id?.startsWith('footnote-')) {
                      return (
                        <div
                          id={id}
                          className="text-[#a8c8e0] text-sm leading-relaxed mb-2 scroll-mt-32"
                        >
                          {children}
                        </div>
                      );
                    }
                    return <div id={id} className={className} style={style}>{children}</div>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>

        {/* Footer - Boarding pass style to match header */}
        <div className="bg-[#1a3a5c] rounded-b-lg overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#7eb8d8] hover:text-[#e8f4f8] transition-colors text-sm"
              style={{ fontFamily: 'monospace' }}
            >
              <span>←</span>
              <span>BACK TO DEPARTURES</span>
            </Link>
            <span className="text-[#4a6a8a] text-xs" style={{ fontFamily: 'monospace' }}>
              END OF TRANSMISSION
            </span>
          </div>
          {/* Bottom accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#2a5a8c] via-[#7eb8d8] to-[#2a5a8c]" />
        </div>
      </div>
    </div>
  );
}
