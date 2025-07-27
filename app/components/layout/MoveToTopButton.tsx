"use client";
import React, { useState, useEffect } from "react";

const MoveToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setVisible(scrollTop > 200);
      setProgress(percent);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate fill height (from bottom)
  const waveHeight = 56; // px, SVG viewBox height
  const fillY = Math.max(0, waveHeight - progress * waveHeight);

  return (
    <button
      onClick={handleClick}
      aria-label="Move to top"
      className={`fixed z-50 bottom-6 right-6 bg-[#56B9F0]  text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ boxShadow: "0 2px 16px rgba(44, 62, 149, 0.18)", cursor : 'pointer', overflow: 'hidden', position: 'fixed' }}
    >
      {/* Static solid fill */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="28" cy="28" r="28" />
          </clipPath>
        </defs>
        <g clipPath="url(#circle-clip)">
          <rect
            x="0"
            y={fillY}
            width="56"
            height={waveHeight - fillY}
            fill="#2E3E95"
            style={{ transition: 'y 0.2s, height 0.2s' }}
          />
        </g>
      </svg>
      {/* Double chevron up icon (SVG) */}
      <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 15.59L12 11l4.59 4.59L18 14.17l-6-6-6 6 1.41 1.42z" fill="black"/>
          <path d="M7.41 11.59L12 7l4.59 4.59L18 10.17l-6-6-6 6 1.41 1.42z" fill="black"/>
        </svg>
      </span>
    </button>
  );
};

export default MoveToTopButton; 