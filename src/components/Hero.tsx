'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/context/ThemeContext';

// Seeded random for consistent initial positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate stars with seeded random for consistency
function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 3 + 2) * 70, // Only in top 70% of sky
      size: seededRandom(i * 3 + 3) * 2 + 1,
      opacity: seededRandom(i * 3 + 4) * 0.5 + 0.3,
      twinkleDelay: seededRandom(i * 3 + 5) * 3,
    });
  }
  return stars;
}

const stars = generateStars(80);

// Shooting Star Component with randomization after each animation
interface ShootingStarProps {
  initialDelay: number;
}

function ShootingStar({ initialDelay }: ShootingStarProps) {
  // Generate random values for position and angle
  // Using SCREEN coordinates: 0°=right, 90°=down, 180°=left, 270°=up
  const generateRandomValues = () => ({
    x: Math.random() * 70 + 10,         // 10-80% from left
    y: Math.random() * 25 + 5,          // 5-30% from top  
    angle: Math.random() * 90 + 45,     // 45-135° in screen coords (down-right to down-left)
    duration: Math.random() * 1 + 2,    // 2-3 seconds
  });

  const [values, setValues] = useState(generateRandomValues);
  const [animationKey, setAnimationKey] = useState(0);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  // SCREEN COORDINATES: 0°=right, 90°=down, 180°=left, 270°=up
  // This matches CSS transform conventions where +Y is down
  //
  // CSS ROTATION:
  // - rotate(0deg): top of element points UP
  // - rotate(90deg): top points RIGHT (clockwise rotation)
  // - rotate(180deg): top points DOWN
  // - rotate(135deg): top points DOWN-RIGHT
  // - rotate(225deg): top points DOWN-LEFT
  //
  // For the bright HEAD (top of gradient) to point in direction of travel:
  // CSS rotation = screenAngle + 90°
  //
  // Translation uses screen coords directly:
  // dx = cos(angle) * distance  (positive = right)
  // dy = sin(angle) * distance  (positive = down on screen)
  
  const rotation = values.angle + 90; // CSS rotation for head to point in travel direction
  const angleRad = (values.angle * Math.PI) / 180;
  const distance = 300;
  const dx = Math.cos(angleRad) * distance;
  const dy = Math.sin(angleRad) * distance;

  // Handle animation end - randomize and restart
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleAnimationEnd = () => {
      setValues(generateRandomValues());
      setAnimationKey(prev => prev + 1);
      setIsFirstRun(false);
    };

    element.addEventListener('animationend', handleAnimationEnd);
    return () => element.removeEventListener('animationend', handleAnimationEnd);
  }, [animationKey]); // Re-attach listener when key changes (new element created)

  // Create unique keyframe name for this instance
  const keyframeName = `shooting-star-${animationKey}-${Math.round(values.angle)}`;

  return (
    <>
      <style>{`
        @keyframes ${keyframeName} {
          0% {
            transform: translate(0, 0) rotate(${rotation}deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          60% {
            opacity: 0.8;
          }
          100% {
            transform: translate(${dx}px, ${dy}px) rotate(${rotation}deg);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={elementRef}
        key={animationKey}
        style={{
          position: 'absolute',
          left: `${values.x}%`,
          top: `${values.y}%`,
          width: '2px',
          height: '70px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 30%, transparent)',
          borderRadius: '2px',
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.3)',
          opacity: 0,
          animation: `${keyframeName} ${values.duration}s ease-out forwards`,
          animationDelay: isFirstRun ? `${initialDelay}s` : '0.5s',
          animationFillMode: 'backwards',
        }}
      />
    </>
  );
}

export default function Hero() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const cloudAnimationRef = useRef<number | null>(null);
  const cloudPositionsRef = useRef<number[]>([]);

  // Cloud animation using requestAnimationFrame for reliable looping
  const animateClouds = useCallback(() => {
    const clouds = cloudsRef.current?.querySelectorAll('.cloud');
    if (!clouds || clouds.length === 0) return;

    const screenWidth = window.innerWidth;
    const cloudWidth = 350;
    const speeds = [0.3, 0.4, 0.5, 0.35]; // pixels per frame

    clouds.forEach((cloud, i) => {
      const htmlCloud = cloud as HTMLElement;
      cloudPositionsRef.current[i] += speeds[i] || 0.3;
      
      // When cloud goes past right edge, reset to left
      if (cloudPositionsRef.current[i] > screenWidth + cloudWidth) {
        cloudPositionsRef.current[i] = -cloudWidth;
      }
      
      htmlCloud.style.transform = `translateX(${cloudPositionsRef.current[i]}px)`;
    });

    cloudAnimationRef.current = requestAnimationFrame(animateClouds);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(nameRef.current, { opacity: 0, y: 50 });
      gsap.set(taglineRef.current, { opacity: 0, y: 30 });
      gsap.set(planeRef.current, { opacity: 0, x: -100, y: 20 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          planeRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.8'
        );

      // Floating plane animation
      gsap.to(planeRef.current, {
        y: -15,
        x: 10,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    }, heroRef);

    // Initialize cloud positions
    const screenWidth = window.innerWidth;
    const cloudWidth = 350;
    cloudPositionsRef.current = [
      seededRandom(1) * screenWidth - cloudWidth,
      seededRandom(2) * screenWidth - cloudWidth,
      seededRandom(3) * screenWidth - cloudWidth,
      seededRandom(4) * screenWidth - cloudWidth,
    ];

    // Start cloud animation
    cloudAnimationRef.current = requestAnimationFrame(animateClouds);

    return () => {
      ctx.revert();
      if (cloudAnimationRef.current) {
        cancelAnimationFrame(cloudAnimationRef.current);
      }
    };
  }, [animateClouds]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background - Day/Night transition */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#0a1628] via-[#1a2a4a] to-[#2d3a52]' 
            : 'bg-gradient-to-b from-[#fcd5c0] via-[#f5b896] to-[#e8a07a]'
        }`} 
      />

      {/* Stars - only visible in dark mode */}
      <div 
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
        {/* Shooting stars - randomized position and direction after each animation */}
        <ShootingStar initialDelay={1} />
        <ShootingStar initialDelay={4} />
        <ShootingStar initialDelay={7} />
        {/* Moon */}
        <div 
          className="absolute top-[8%] right-[20%] w-16 h-16 md:w-20 md:h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fef6e8 0%, #f5e6c8 50%, #e8d4b0 100%)',
            boxShadow: '0 0 40px rgba(254, 246, 232, 0.4), 0 0 80px rgba(254, 246, 232, 0.2)',
          }}
        />
      </div>

      {/* Animated Clouds */}
      <div ref={cloudsRef} className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'opacity-30' : 'opacity-100'}`}>
        {/* Cloud 1 - Large, top */}
        <div className="cloud absolute top-[10%] left-0 w-64 h-32 opacity-60">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <ellipse cx="60" cy="60" rx="50" ry="30" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.4" />
            <ellipse cx="100" cy="50" rx="60" ry="35" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.5" />
            <ellipse cx="150" cy="60" rx="45" ry="25" fill={isDarkMode ? "#2a3a5a" : "#5a9dad"} opacity="0.3" />
          </svg>
        </div>

        {/* Cloud 2 - Medium, higher */}
        <div className="cloud absolute top-[15%] left-0 w-48 h-24 opacity-50">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <ellipse cx="50" cy="55" rx="40" ry="25" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.5" />
            <ellipse cx="100" cy="50" rx="55" ry="30" fill={isDarkMode ? "#2a3a5a" : "#5a9dad"} opacity="0.4" />
            <ellipse cx="140" cy="55" rx="35" ry="22" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.3" />
          </svg>
        </div>

        {/* Cloud 3 - Small, middle */}
        <div className="cloud absolute top-[25%] left-0 w-32 h-16 opacity-40">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <ellipse cx="100" cy="50" rx="70" ry="35" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.4" />
          </svg>
        </div>

        {/* Cloud 4 - Bottom accent */}
        <div className="cloud absolute top-[55%] left-0 w-56 h-28 opacity-30">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <ellipse cx="70" cy="55" rx="55" ry="28" fill={isDarkMode ? "#2a3a5a" : "#5a9dad"} opacity="0.3" />
            <ellipse cx="130" cy="50" rx="50" ry="30" fill={isDarkMode ? "#3a4a6a" : "#7eb8c4"} opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Plane SVG - Clickable for dark mode toggle */}
      <svg
        ref={planeRef}
        className="absolute top-[20%] right-[15%] w-48 md:w-64 lg:w-80 h-auto z-10 cursor-pointer"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleDarkMode}
        role="button"
        aria-label="Toggle dark mode"
      >
        {/* Plane glow in dark mode */}
        {isDarkMode && (
          <>
            <ellipse cx="150" cy="75" rx="100" ry="35" fill="url(#planeGlow)" opacity="0.4" />
          </>
        )}

        {/* Plane body */}
        <ellipse cx="150" cy="75" rx="90" ry="25" fill="#f8f4f0" />
        <ellipse cx="150" cy="75" rx="90" ry="25" fill="url(#planeGradient)" />

        {/* Cockpit windows - with glow in dark mode */}
        {isDarkMode && (
          <ellipse cx="80" cy="70" rx="18" ry="14" fill="#4a90a0" opacity="0.6" filter="url(#windowGlow)" />
        )}
        <ellipse cx="80" cy="70" rx="15" ry="12" fill={isDarkMode ? "#7ec8d8" : "#5a9dad"} opacity="0.8" />
        <ellipse cx="80" cy="70" rx="12" ry="9" fill={isDarkMode ? "#a0e8f8" : "#7eb8c4"} opacity="0.5" />

        {/* Cabin windows with lights in dark mode */}
        {isDarkMode && (
          <>
            <ellipse cx="110" cy="68" rx="5" ry="4" fill="#fef6c8" opacity="0.9" filter="url(#windowGlow)" />
            <ellipse cx="130" cy="68" rx="5" ry="4" fill="#fef6c8" opacity="0.8" filter="url(#windowGlow)" />
            <ellipse cx="150" cy="68" rx="5" ry="4" fill="#fef6c8" opacity="0.9" filter="url(#windowGlow)" />
            <ellipse cx="170" cy="68" rx="5" ry="4" fill="#fef6c8" opacity="0.7" filter="url(#windowGlow)" />
          </>
        )}

        {/* Wing */}
        <path
          d="M120 85 L180 85 L200 95 L160 100 L110 95 Z"
          fill="#e8e4e0"
          stroke="#d4d0cc"
          strokeWidth="1"
        />

        {/* Wing tip lights in dark mode */}
        {isDarkMode && (
          <>
            <circle cx="200" cy="95" r="3" fill="#ff4444" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="110" cy="95" r="3" fill="#44ff44" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Tail */}
        <path d="M230 75 L260 50 L265 55 L245 75 Z" fill="#f8f4f0" stroke="#e8e4e0" strokeWidth="1" />
        <path d="M235 75 L250 85 L240 90 L230 80 Z" fill="#e8e4e0" />

        {/* Tail light in dark mode */}
        {isDarkMode && (
          <circle cx="262" cy="52" r="2" fill="#ffffff" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.8s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Stripes */}
        <path d="M60 70 L200 70" stroke="#d4896a" strokeWidth="3" opacity="0.6" />

        {/* Text on plane */}
        <text
          x="140"
          y="80"
          fontSize="10"
          fill="#6b5549"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0.7"
        >
          only to vancouver
        </text>

        {/* Wheels */}
        <ellipse cx="100" cy="105" rx="8" ry="8" fill="#4a4a4a" />
        <ellipse cx="100" cy="105" rx="5" ry="5" fill="#6a6a6a" />
        <ellipse cx="180" cy="105" rx="8" ry="8" fill="#4a4a4a" />
        <ellipse cx="180" cy="105" rx="5" ry="5" fill="#6a6a6a" />

        {/* Wheel struts */}
        <line x1="100" y1="95" x2="100" y2="100" stroke="#4a4a4a" strokeWidth="3" />
        <line x1="180" y1="95" x2="180" y2="100" stroke="#4a4a4a" strokeWidth="3" />

        {/* Propeller */}
        <ellipse cx="55" cy="75" rx="3" ry="3" fill="#4a4a4a" />
        <ellipse cx="55" cy="75" rx="1" ry="20" fill="#8a8a8a" opacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 55 75"
            to="360 55 75"
            dur="0.1s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f0ebe6" stopOpacity="0.9" />
          </linearGradient>
          {/* Glow effects for dark mode */}
          <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="planeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef6c8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fef6c8" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6">
        <h1
          ref={nameRef}
          className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6 transition-colors duration-1000 ${
            isDarkMode ? 'text-[#e8dfd6]' : 'text-[#3d2e26]'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Minseob Shin
        </h1>
        <p
          ref={taglineRef}
          className={`text-lg md:text-xl lg:text-2xl font-light tracking-widest uppercase transition-colors duration-1000 ${
            isDarkMode ? 'text-[#a0b4c0]' : 'text-[#6b5549]'
          }`}
        >
          Computer Engineering Major at UIUC
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#contact" className={`flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
          isDarkMode ? 'text-[#a0b4c0]' : 'text-[#6b5549]'
        }`}>
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

      {/* Ground/Runway hint at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-t from-[#1a2530] via-[#243040] to-transparent opacity-50'
          : 'bg-gradient-to-t from-[#8b7355] via-[#a08060] to-transparent opacity-30'
      }`} />
    </section>
  );
}
