'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BuildingProps {
  type: 'modern' | 'classic' | 'industrial' | 'residential';
  isHovered?: boolean;
  className?: string;
}

export default function Building({ 
  type, 
  isHovered = false,
  className = '' 
}: BuildingProps) {
  const buildingRef = useRef<SVGSVGElement>(null);
  const windowsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!windowsRef.current) return;

    const windows = windowsRef.current.querySelectorAll('.window');
    
    if (isHovered) {
      // Light up all windows when hovered
      gsap.to(windows, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.015,
        ease: 'power2.out',
      });
    } else {
      // Random flickering when not hovered
      windows.forEach((win) => {
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        const baseOpacity = Math.random() * 0.4 + 0.3;
        gsap.to(win, {
          opacity: baseOpacity,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    return () => {
      gsap.killTweensOf(windows);
    };
  }, [isHovered]);

  const renderBuilding = () => {
    switch (type) {
      // MeOoOw Processor - Futuristic CPU tower with parallel pipelines
      // Represents: superscalar OoO processor, register renaming, ROB, parallel execution
      case 'modern':
        return (
          <svg
            ref={buildingRef}
            viewBox="0 0 100 200"
            className={`w-full h-full ${className}`}
            fill="none"
          >
            {/* Main tower - represents the processor core */}
            <rect x="20" y="25" width="60" height="175" fill="#0d2137" />
            
            {/* Three parallel pipeline sections */}
            <rect x="22" y="30" width="17" height="165" fill="#153555" />
            <rect x="41" y="30" width="18" height="165" fill="#1a4570" />
            <rect x="61" y="30" width="17" height="165" fill="#153555" />
            
            {/* ROB (Reorder Buffer) - top section with special glow */}
            <rect x="20" y="25" width="60" height="25" fill="#0a1a2a" />
            <rect x="25" y="28" width="50" height="19" fill="#1a3050" stroke="#3a7aaa" strokeWidth="1" />
            
            {/* Antenna array - like CPU pins/connections */}
            <rect x="30" y="10" width="3" height="18" fill="#2a5a8a" />
            <rect x="40" y="5" width="3" height="23" fill="#3a7aaa" />
            <rect x="50" y="8" width="3" height="20" fill="#2a5a8a" />
            <rect x="60" y="12" width="3" height="16" fill="#2a5a8a" />
            
            {/* Central processing unit indicator - glowing core */}
            <rect x="38" y="0" width="8" height="8" fill="#00ffff" opacity="0.8" />
            <rect x="40" y="2" width="4" height="4" fill="#ffffff" opacity="0.9" />
            
            {/* Pipeline stage windows - representing execution units */}
            <g ref={windowsRef}>
              {/* Left pipeline - Integer ALU */}
              {[...Array(12)].map((_, row) => (
                <rect
                  key={`left-${row}`}
                  className="window"
                  x={25}
                  y={55 + row * 13}
                  width="11"
                  height="9"
                  fill="#00ccff"
                  opacity={0.5}
                />
              ))}
              {/* Center pipeline - Main execution */}
              {[...Array(12)].map((_, row) => (
                <rect
                  key={`center-${row}`}
                  className="window"
                  x={44}
                  y={55 + row * 13}
                  width="12"
                  height="9"
                  fill="#00ffcc"
                  opacity={0.6}
                />
              ))}
              {/* Right pipeline - FPU/Branch */}
              {[...Array(12)].map((_, row) => (
                <rect
                  key={`right-${row}`}
                  className="window"
                  x={64}
                  y={55 + row * 13}
                  width="11"
                  height="9"
                  fill="#00ccff"
                  opacity={0.5}
                />
              ))}
              {/* ROB status lights */}
              {[...Array(8)].map((_, i) => (
                <rect
                  key={`rob-${i}`}
                  className="window"
                  x={28 + i * 6}
                  y={32}
                  width="4"
                  height="4"
                  fill="#00ff88"
                  opacity={0.7}
                />
              ))}
            </g>
            
            {/* Circuit traces on sides */}
            <line x1="20" y1="60" x2="15" y2="60" stroke="#3a7aaa" strokeWidth="1" />
            <line x1="20" y1="90" x2="12" y2="90" stroke="#3a7aaa" strokeWidth="1" />
            <line x1="20" y1="120" x2="15" y2="120" stroke="#3a7aaa" strokeWidth="1" />
            <line x1="80" y1="75" x2="85" y2="75" stroke="#3a7aaa" strokeWidth="1" />
            <line x1="80" y1="105" x2="88" y2="105" stroke="#3a7aaa" strokeWidth="1" />
            <line x1="80" y1="135" x2="85" y2="135" stroke="#3a7aaa" strokeWidth="1" />
            
            {/* Base/socket */}
            <rect x="15" y="195" width="70" height="5" fill="#1a3050" />
          </svg>
        );

      // GPT-2 CUDA Acceleration - GPU/Data Center with massive parallelism
      // Represents: CUDA cores, memory hierarchies, Tensor Cores, parallel processing
      case 'industrial':
        return (
          <svg
            ref={buildingRef}
            viewBox="0 0 100 200"
            className={`w-full h-full ${className}`}
            fill="none"
          >
            {/* Main data center structure */}
            <rect x="10" y="35" width="80" height="165" fill="#0a1510" />
            
            {/* Server rack sections */}
            <rect x="12" y="40" width="38" height="155" fill="#102018" />
            <rect x="52" y="40" width="36" height="155" fill="#0d1a14" />
            
            {/* Cooling tower/exhaust on top */}
            <rect x="35" y="15" width="30" height="25" fill="#0d1a14" />
            <rect x="40" y="8" width="20" height="12" fill="#102018" />
            {/* Heat exhaust vents */}
            <rect x="42" y="5" width="4" height="6" fill="#1a3020" />
            <rect x="48" y="3" width="4" height="8" fill="#1a3020" />
            <rect x="54" y="5" width="4" height="6" fill="#1a3020" />
            
            {/* NVIDIA-green accent stripe */}
            <rect x="10" y="35" width="80" height="3" fill="#76b900" opacity="0.8" />
            
            {/* GPU Core grid - massive parallelism visualization */}
            <g ref={windowsRef}>
              {/* Left rack - Tensor Cores (green tint) */}
              {[...Array(14)].map((_, row) => (
                [...Array(4)].map((_, col) => (
                  <rect
                    key={`tensor-${row}-${col}`}
                    className="window"
                    x={15 + col * 9}
                    y={48 + row * 10}
                    width="7"
                    height="6"
                    fill="#76b900"
                    opacity={0.5}
                  />
                ))
              ))}
              {/* Right rack - CUDA Cores (cyan tint) */}
              {[...Array(14)].map((_, row) => (
                [...Array(4)].map((_, col) => (
                  <rect
                    key={`cuda-${row}-${col}`}
                    className="window"
                    x={54 + col * 8}
                    y={48 + row * 10}
                    width="6"
                    height="6"
                    fill="#00ff88"
                    opacity={0.4}
                  />
                ))
              ))}
              {/* Memory indicators on cooling tower */}
              {[...Array(5)].map((_, i) => (
                <rect
                  key={`mem-${i}`}
                  className="window"
                  x={38 + i * 5}
                  y={20}
                  width="3"
                  height="8"
                  fill="#76b900"
                  opacity={0.6}
                />
              ))}
            </g>
            
            {/* Server status lights */}
            <circle cx="18" cy="43" r="2" fill="#00ff00" opacity="0.8" />
            <circle cx="26" cy="43" r="2" fill="#00ff00" opacity="0.6" />
            <circle cx="82" cy="43" r="2" fill="#76b900" opacity="0.8" />
            
            {/* Cooling vents on side */}
            <rect x="5" y="60" width="5" height="20" fill="#1a3020" />
            <rect x="5" y="90" width="5" height="20" fill="#1a3020" />
            <rect x="5" y="120" width="5" height="20" fill="#1a3020" />
            <rect x="90" y="70" width="5" height="25" fill="#1a3020" />
            <rect x="90" y="110" width="5" height="25" fill="#1a3020" />
            
            {/* Ground/foundation with cable access */}
            <rect x="5" y="195" width="90" height="5" fill="#1a3020" />
          </svg>
        );

      // CosmOS - Layered OS architecture building
      // Represents: kernel, filesystem, virtual memory, Unix layers
      case 'classic':
        return (
          <svg
            ref={buildingRef}
            viewBox="0 0 100 200"
            className={`w-full h-full ${className}`}
            fill="none"
          >
            {/* Main building - layered architecture */}
            <rect x="15" y="30" width="70" height="170" fill="#1a1a2e" />
            
            {/* User Space layer (top) - lightest */}
            <rect x="15" y="30" width="70" height="45" fill="#2a2a4e" />
            <text x="50" y="20" fontSize="6" fill="#6a8a9c" textAnchor="middle" fontFamily="monospace">USER</text>
            
            {/* System Call interface - divider line */}
            <rect x="15" y="75" width="70" height="3" fill="#5a7a9a" />
            
            {/* Kernel Space (middle) - medium */}
            <rect x="15" y="78" width="70" height="60" fill="#22223a" />
            <text x="50" y="108" fontSize="5" fill="#4a6a8c" textAnchor="middle" fontFamily="monospace">KERNEL</text>
            
            {/* Filesystem layer divider */}
            <rect x="15" y="138" width="70" height="2" fill="#4a6a8a" />
            
            {/* Hardware Abstraction (bottom) - darkest */}
            <rect x="15" y="140" width="70" height="60" fill="#1a1a28" />
            
            {/* Decorative Unix-style top terminal */}
            <rect x="20" y="8" width="60" height="22" fill="#0a0a15" stroke="#3a5a7a" strokeWidth="1" />
            {/* Terminal title bar */}
            <rect x="20" y="8" width="60" height="6" fill="#2a3a4a" />
            <circle cx="25" cy="11" r="2" fill="#ff5f56" />
            <circle cx="31" cy="11" r="2" fill="#ffbd2e" />
            <circle cx="37" cy="11" r="2" fill="#27ca40" />
            {/* Terminal prompt */}
            <text x="24" y="24" fontSize="5" fill="#27ca40" fontFamily="monospace">$_</text>
            
            {/* Column accents - like system pillars */}
            <rect x="15" y="30" width="4" height="170" fill="#2a3a4a" />
            <rect x="81" y="30" width="4" height="170" fill="#2a3a4a" />
            
            {/* Windows representing processes/threads */}
            <g ref={windowsRef}>
              {/* User space processes */}
              {[...Array(3)].map((_, row) => (
                [...Array(5)].map((_, col) => (
                  <rect
                    key={`user-${row}-${col}`}
                    className="window"
                    x={22 + col * 12}
                    y={35 + row * 12}
                    width="9"
                    height="8"
                    fill="#7ab8d8"
                    opacity={0.5}
                  />
                ))
              ))}
              {/* Kernel modules */}
              {[...Array(4)].map((_, row) => (
                [...Array(5)].map((_, col) => (
                  <rect
                    key={`kernel-${row}-${col}`}
                    className="window"
                    x={22 + col * 12}
                    y={83 + row * 12}
                    width="9"
                    height="8"
                    fill="#5a9aba"
                    opacity={0.4}
                  />
                ))
              ))}
              {/* Hardware/Driver indicators */}
              {[...Array(4)].map((_, row) => (
                [...Array(5)].map((_, col) => (
                  <rect
                    key={`hw-${row}-${col}`}
                    className="window"
                    x={22 + col * 12}
                    y={145 + row * 12}
                    width="9"
                    height="8"
                    fill="#4a7a9a"
                    opacity={0.3}
                  />
                ))
              ))}
            </g>
            
            {/* Foundation - bare metal */}
            <rect x="10" y="195" width="80" height="5" fill="#2a3a4a" />
          </svg>
        );

      // Music Synthesizer - Concert hall/Studio with audio visualization
      // Represents: real-time audio, HDMI visual, multi-track, keyboard input
      case 'residential':
        return (
          <svg
            ref={buildingRef}
            viewBox="0 0 100 200"
            className={`w-full h-full ${className}`}
            fill="none"
          >
            {/* Main concert hall structure */}
            <rect x="10" y="50" width="80" height="150" fill="#1a1525" />
            
            {/* Angled roof - like a concert hall */}
            <polygon points="5,50 50,15 95,50" fill="#251a30" />
            
            {/* Stage lighting tower on roof */}
            <rect x="42" y="5" width="16" height="15" fill="#2a1f35" />
            <rect x="45" y="0" width="10" height="8" fill="#1a1525" />
            
            {/* Spotlight beams from roof */}
            <polygon points="48,8 35,50 40,50" fill="#ff6b9d" opacity="0.15" />
            <polygon points="52,8 65,50 60,50" fill="#9d6bff" opacity="0.15" />
            
            {/* Main display screen area (HDMI output) */}
            <rect x="20" y="55" width="60" height="35" fill="#0a0515" stroke="#3a2a4a" strokeWidth="1" />
            
            {/* Audio wave visualization on screen */}
            <g ref={windowsRef}>
              {/* Equalizer bars - audio visualization */}
              {[...Array(12)].map((_, i) => {
                const heights = [15, 25, 20, 30, 22, 28, 18, 32, 24, 20, 26, 16];
                const colors = ['#ff6b9d', '#ff9d6b', '#ffeb6b', '#9dff6b', '#6bff9d', '#6bffeb', 
                               '#6b9dff', '#9d6bff', '#ff6b9d', '#ff9d6b', '#ffeb6b', '#9dff6b'];
                return (
                  <rect
                    key={`eq-${i}`}
                    className="window"
                    x={24 + i * 4.5}
                    y={85 - heights[i]}
                    width="3"
                    height={heights[i]}
                    fill={colors[i]}
                    opacity={0.7}
                  />
                );
              })}
              
              {/* Speaker grilles - left and right */}
              {[...Array(6)].map((_, row) => (
                [...Array(3)].map((_, col) => (
                  <circle
                    key={`spk-left-${row}-${col}`}
                    className="window"
                    cx={18 + col * 5}
                    cy={105 + row * 8}
                    r={1.5}
                    fill="#6b4a8a"
                    opacity={0.5}
                  />
                ))
              ))}
              {[...Array(6)].map((_, row) => (
                [...Array(3)].map((_, col) => (
                  <circle
                    key={`spk-right-${row}-${col}`}
                    className="window"
                    cx={72 + col * 5}
                    cy={105 + row * 8}
                    r={1.5}
                    fill="#6b4a8a"
                    opacity={0.5}
                  />
                ))
              ))}
              
              {/* Control room windows */}
              {[...Array(3)].map((_, row) => (
                [...Array(4)].map((_, col) => (
                  <rect
                    key={`ctrl-${row}-${col}`}
                    className="window"
                    x={32 + col * 10}
                    y={105 + row * 15}
                    width="7"
                    height="10"
                    fill="#9d8aff"
                    opacity={0.4}
                  />
                ))
              ))}
              
              {/* Stage/spotlight indicators on roof */}
              <circle className="window" cx={35} cy={35} r={3} fill="#ff6b9d" opacity={0.6} />
              <circle className="window" cx={50} cy={28} r={3} fill="#ffeb6b" opacity={0.6} />
              <circle className="window" cx={65} cy={35} r={3} fill="#9d6bff" opacity={0.6} />
            </g>
            
            {/* Piano keyboard at entrance */}
            <rect x="25" y="180" width="50" height="20" fill="#1a1015" />
            {/* White keys */}
            {[...Array(8)].map((_, i) => (
              <rect key={`wkey-${i}`} x={27 + i * 6} y={182} width="5" height="16" fill="#e8e0f0" />
            ))}
            {/* Black keys */}
            {[0, 1, 3, 4, 5].map((i) => (
              <rect key={`bkey-${i}`} x={31 + i * 6} y={182} width="3" height="10" fill="#1a1015" />
            ))}
            
            {/* Foundation */}
            <rect x="5" y="195" width="90" height="5" fill="#2a1f35" />
          </svg>
        );

      default:
        return null;
    }
  };

  return renderBuilding();
}
