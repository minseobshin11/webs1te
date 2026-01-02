'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const contactLinks = [
  {
    name: 'Email',
    href: 'mailto:minseob.shin11@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: 'minseob.shin11@gmail.com',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/minseob-shin',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'Connect on LinkedIn',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/minseobshin11',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'View my projects',
  },
];

export default function Contact() {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
    >
      {/* Road scene - TRUE first-person: standing ON the road, road extends beyond viewport */}
      <div className="relative min-h-[50vh] md:min-h-[70vh] overflow-hidden">
        {/* SVG Road - the road at bottom is WIDER than viewport (we're standing on it) */}
        {/* Using a wider viewBox ratio and cover behavior for consistent appearance */}
        {/* Mobile: positioned higher (-top-[20vh]) to show road instead of sky */}
        {/* Desktop: normal position */}
        <svg
          className="absolute left-0 right-0 w-full h-[70vh] md:h-full md:inset-0 -top-[20vh] md:top-0"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* 
              SEAMLESS TRANSITION from Hero:
              Day mode: Hero ends with peachy sunset colors
              Dark mode: Hero ends with deep blue night sky
            */}

            {/* Sky gradient - Day vs Night */}
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {isDarkMode ? (
                <>
                  <stop offset="0%" stopColor="#2d3a52" />
                  <stop offset="15%" stopColor="#1a2a4a" />
                  <stop offset="40%" stopColor="#152238" />
                  <stop offset="70%" stopColor="#101c2e" />
                  <stop offset="100%" stopColor="#0a1420" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#e8a07a" />
                  <stop offset="15%" stopColor="#e09572" />
                  <stop offset="40%" stopColor="#d08a68" />
                  <stop offset="70%" stopColor="#c4805c" />
                  <stop offset="100%" stopColor="#b87850" />
                </>
              )}
            </linearGradient>

            {/* Field gradients - Day vs Night */}
            <linearGradient id="leftFieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {isDarkMode ? (
                <>
                  <stop offset="0%" stopColor="#1a2530" />
                  <stop offset="20%" stopColor="#151e28" />
                  <stop offset="50%" stopColor="#101820" />
                  <stop offset="100%" stopColor="#0a1015" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#a07850" />
                  <stop offset="20%" stopColor="#8b6d48" />
                  <stop offset="50%" stopColor="#6d5538" />
                  <stop offset="100%" stopColor="#4a3d28" />
                </>
              )}
            </linearGradient>

            <linearGradient id="rightFieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {isDarkMode ? (
                <>
                  <stop offset="0%" stopColor="#1c2835" />
                  <stop offset="20%" stopColor="#18222c" />
                  <stop offset="50%" stopColor="#121a22" />
                  <stop offset="100%" stopColor="#0c1218" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#a58055" />
                  <stop offset="20%" stopColor="#90704a" />
                  <stop offset="50%" stopColor="#705840" />
                  <stop offset="100%" stopColor="#4d4030" />
                </>
              )}
            </linearGradient>

            {/* Road surface - dark asphalt */}
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#2a2a2a" : "#4a4a4a"} />
              <stop offset="40%" stopColor={isDarkMode ? "#222222" : "#3d3d3d"} />
              <stop offset="100%" stopColor={isDarkMode ? "#1a1a1a" : "#2a2a2a"} />
            </linearGradient>

            {/* Glow filter for road lights */}
            <filter id="roadLightGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 
            RESPONSIVE DESIGN:
            - ViewBox is 1000x800 (taller to work with various aspect ratios)
            - Horizon at y=200 (25% from top)
            - Road extends WAY beyond edges at bottom for that "standing on road" feel
            - Using xMidYMid slice to crop evenly and maintain perspective
          */}

          {/* Sky/atmosphere band at top - extends higher for tall viewports */}
          <rect x="-500" y="-200" width="2000" height="420" fill="url(#skyGradient)" />

          {/* Left field - perspective trapezoid, extends beyond viewport */}
          <polygon
            points="-500,200 450,200 -800,800 -2000,800 -2000,200"
            fill="url(#leftFieldGradient)"
          />

          {/* Right field - perspective trapezoid, extends beyond viewport */}
          <polygon
            points="550,200 1500,200 3000,200 3000,800 1800,800"
            fill="url(#rightFieldGradient)"
          />

          {/* THE ROAD - extends far beyond viewport at bottom */}
          {/* At y=200 (horizon): road is 100px wide (450 to 550) */}
          {/* At y=800 (bottom): road is 2600px wide (-800 to 1800) */}
          <polygon
            points="450,200 550,200 1800,800 -800,800"
            fill="url(#roadGradient)"
          />

          {/* Road edge lines - subtle */}
          <line
            x1="450" y1="200"
            x2="-800" y2="800"
            stroke="#666"
            strokeWidth="2"
            opacity="0.4"
          />
          <line
            x1="550" y1="200"
            x2="1800" y2="800"
            stroke="#666"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Road side lights - only in dark mode, client-side only */}
          {mounted && isDarkMode && (() => {
            const lights = [];
            const horizonY = 200;
            const bottomY = 800;
            const numLights = 8;

            for (let i = 0; i < numLights; i++) {
              const t = Math.pow(i / numLights, 2.2);
              const y = horizonY + t * (bottomY - horizonY);

              // Calculate x positions based on road edges with perspective
              const roadLeftX = 450 - (450 + 800) * t;
              const roadRightX = 550 + (1800 - 550) * t;

              // Light size scales with perspective
              const lightSize = 3 + t * 12;
              const glowSize = lightSize * 3;

              if (y < bottomY - 50 && y > horizonY + 20) {
                // Left side lights (orange)
                lights.push(
                  <g key={`left-${i}`}>
                    <ellipse
                      cx={roadLeftX - 20 - t * 50}
                      cy={y}
                      rx={glowSize}
                      ry={glowSize / 2}
                      fill="#ffa500"
                      opacity={0.15 + t * 0.2}
                    />
                    <ellipse
                      cx={roadLeftX - 20 - t * 50}
                      cy={y}
                      rx={lightSize}
                      ry={lightSize / 2}
                      fill="#ffcc00"
                      opacity={0.7 + t * 0.3}
                      filter="url(#roadLightGlow)"
                    >
                      <animate
                        attributeName="opacity"
                        values={`${0.7 + t * 0.3};${0.5 + t * 0.2};${0.7 + t * 0.3}`}
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                    </ellipse>
                  </g>
                );

                // Right side lights (orange)
                lights.push(
                  <g key={`right-${i}`}>
                    <ellipse
                      cx={roadRightX + 20 + t * 50}
                      cy={y}
                      rx={glowSize}
                      ry={glowSize / 2}
                      fill="#ffa500"
                      opacity={0.15 + t * 0.2}
                    />
                    <ellipse
                      cx={roadRightX + 20 + t * 50}
                      cy={y}
                      rx={lightSize}
                      ry={lightSize / 2}
                      fill="#ffcc00"
                      opacity={0.7 + t * 0.3}
                      filter="url(#roadLightGlow)"
                    >
                      <animate
                        attributeName="opacity"
                        values={`${0.7 + t * 0.3};${0.5 + t * 0.2};${0.7 + t * 0.3}`}
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2 + 0.1}s`}
                      />
                    </ellipse>
                  </g>
                );
              }
            }
            return lights;
          })()}

          {/* Yellow center dashes - with proper perspective, client-side only */}
          {mounted && (() => {
            const dashes = [];
            const horizonY = 200;
            const bottomY = 800;

            // Create dashes with exponential spacing (bunched at horizon, spread near viewer)
            const numDashes = 12;

            for (let i = 0; i < numDashes; i++) {
              // Exponential distribution - more compressed near horizon
              const t = Math.pow(i / numDashes, 2.4);
              const tNext = Math.pow((i + 0.3) / numDashes, 2.4);

              const y1 = horizonY + t * (bottomY - horizonY);
              const y2 = Math.min(horizonY + tNext * (bottomY - horizonY), bottomY - 5);

              // Width scales with perspective
              const width = 2 + t * 14;

              // Opacity increases as dashes get closer
              const opacity = 0.5 + t * 0.5;

              if (y1 < bottomY - 30) {
                dashes.push(
                  <line
                    key={i}
                    x1="500"
                    y1={y1}
                    x2="500"
                    y2={y2}
                    stroke="#c9a227"
                    strokeWidth={width}
                    strokeLinecap="round"
                    opacity={opacity}
                  />
                );
              }
            }

            return dashes;
          })()}

          {/* Soft atmospheric haze at horizon line for depth */}
          <rect x="-500" y="185" width="2000" height="35" fill={isDarkMode ? "#1a2a4a" : "#b87850"} opacity="0.25" />

          {/* Stars in the night sky - only in dark mode, client-side only */}
          {mounted && isDarkMode && (() => {
            const stars = [];
            for (let i = 0; i < 40; i++) {
              const x = (Math.sin(i * 7.3) * 10000 % 1) * 1000;
              const y = (Math.sin(i * 3.7) * 10000 % 1) * 180;
              const size = (Math.sin(i * 5.1) * 10000 % 1) * 2 + 0.5;
              const opacity = (Math.sin(i * 2.3) * 10000 % 1) * 0.5 + 0.3;
              stars.push(
                <circle
                  key={`star-${i}`}
                  cx={x}
                  cy={y}
                  r={size}
                  fill="#ffffff"
                  opacity={opacity}
                >
                  <animate
                    attributeName="opacity"
                    values={`${opacity};${opacity * 0.4};${opacity}`}
                    dur={`${2 + (i % 3)}s`}
                    repeatCount="indefinite"
                    begin={`${(i % 5) * 0.5}s`}
                  />
                </circle>
              );
            }
            return stars;
          })()}
        </svg>

        {/* Content overlay on the road */}
        <div className="relative z-10 min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center px-6 py-8 md:py-0 gap-4 md:gap-6">
          {/* Let's Connect heading */}
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            }}
          >
            Let&apos;s Connect
          </h2>

          {/* Subtitle */}
          <p
            className={`text-white/85 text-base md:text-lg font-light text-center max-w-md transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              textShadow: '0 1px 10px rgba(0,0,0,0.5)',
            }}
          >
            I&apos;m always open to new opportunities and conversations
          </p>

          {/* Contact links cluster - always horizontal */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-4">
            {contactLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={link.name}
                className={`group flex items-center justify-center p-2.5 sm:p-3 md:p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:bg-black/35 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms'
                }}
              >
                <div className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-white/20 text-white group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}