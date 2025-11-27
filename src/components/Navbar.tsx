'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Determine if we're on a dark-themed page (projects or blog)
  // Also use dark theme on homepage when dark mode is enabled
  const isHomePage = pathname === '/';
  const isDarkTheme = pathname.startsWith('/projects') || pathname.startsWith('/blog') || (isHomePage && isDarkMode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic colors based on theme - with visible contrast
  const bgClass = isDarkTheme
    ? isScrolled
      ? 'bg-[#0a1628]/95 backdrop-blur-md'
      : 'bg-[#0a1628]/90 backdrop-blur-sm'
    : isScrolled
      ? 'bg-[#fef6f0]/95 backdrop-blur-md shadow-md'
      : 'bg-[#f5b896]/90 backdrop-blur-sm shadow-sm'; // Changed to peach (more visible) with shadow

  const textClass = isDarkTheme
    ? 'text-[#e8dfd6] hover:text-white'
    : 'text-[#3d2e26] hover:text-[#6b5549]';

  const linkClass = isDarkTheme
    ? 'text-[#a0b4c0] hover:text-white'
    : 'text-[#6b5549] hover:text-[#3d2e26]';

  const activeClass = isDarkTheme
    ? 'text-[#7eb8c4]'
    : 'text-[#d4896a]';

  const underlineClass = isDarkTheme
    ? 'bg-white'
    : 'bg-[#3d2e26]';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
    >
      <div 
        className="w-full py-2 sm:py-3"
        style={{
          paddingLeft: 'max(1.5rem, 3vw)',
          paddingRight: 'max(1.5rem, 3vw)',
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo / Name */}
          <Link
            href="/"
            className={`text-base sm:text-lg font-light tracking-wide transition-colors duration-300 ${textClass}`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            MS
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/projects"
              className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                pathname.startsWith('/projects') ? activeClass : linkClass
              }`}
            >
              Projects
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${underlineClass} ${
                pathname.startsWith('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/blog"
              className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                pathname.startsWith('/blog') ? activeClass : linkClass
              }`}
            >
              Blog
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${underlineClass} ${
                pathname.startsWith('/blog') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 relative group ${linkClass}`}
            >
              Resume
              <span className={`absolute -bottom-1 left-0 w-0 h-px ${underlineClass} transition-all duration-300 group-hover:w-full`} />
            </a>
            <Link
              href="/#contact"
              className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 relative group ${linkClass}`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 w-0 h-px ${underlineClass} transition-all duration-300 group-hover:w-full`} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
