import React, { useRef, useState, useCallback, useEffect } from "react";

import img1 from '../assets/ProjectsImgs/portfolioImg1.png';
import img2 from '../assets/ProjectsImgs/portfolioImg2.png';
import img3 from '../assets/ProjectsImgs/portfolioImg3.png';
import img4 from '../assets/ProjectsImgs/portfolioImg4.png';


const IMAGES = [
  {
    id: 1,
    src: img1,
    alt: "Misty snow-covered mountains",
    variant: "featured",
    title: "Career Copilot",
    description:
      "AI-powered platform that delivers personalized career roadmaps, skill gap analysis, and interview preparation to help job seekers achieve their goals.",
    tags: ["AI Mentor", "Skill Alignment"],
  },
  {
    id: 2,
    src: img2,
    alt: "Footprints across sand dunes at dusk",
    variant: "featured",
    title: "Skill Scale",
    description:
      "This platform delivers dynamic, adaptive assessments in real time, analyzing behavioral patterns phase by phase to expose deep knowledge and logical gaps.",
    tags: ["Behavioral Analytics", "Mind Mapping"],
  },
  {
    id: 3,
    src: img3,
    alt: "Footprints across sand dunes at dusk",
    variant: "featured",
    title: "Daily Habit",
    description:
      "Build consistent routines, visualize daily progress & compound habits through automated streak monitoring.",
    tags: ["Consistency", "Productivity"],
  },
  {
    id: 4,
    src: img4,
    alt: "Rocky sea stacks along the coastline",
    variant: "plain",
  },
];

export default function Portfolio() {
  const scrollRef = useRef(null);

  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const isHoveringCard = hoveredCardId !== null;

  // Rounding to whole pixels avoids the sub-pixel jitter/blur that
  // mix-blend-mode + fractional transforms tend to produce.
  const handleCardMouseMove = useCallback((e) => {
    setCursorPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  }, []);

  const handleCardMouseEnter = useCallback((e, id) => {
    setCursorPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    setHoveredCardId(id);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setHoveredCardId(null);
  }, []);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount });
    }
  };

  const CURSOR_SIZE = 100;

  return (
    <section id="projects" className="w-full min-h-0 bg-bg-light rounded-b-[32px] md:rounded-b-[40px] p-2.5 sm:p-6 md:p-8 overflow-hidden">
      <style>{`
        @media (min-width: 768px) {
          .card-no-cursor, .card-no-cursor * { cursor: none !important; }
        }
      `}</style>
      {/* Custom arrow cursor only on desktop */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[999] hidden md:flex items-center justify-center rounded-full"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          transform: `translate3d(${cursorPos.x - CURSOR_SIZE / 2}px, ${cursorPos.y - CURSOR_SIZE / 2}px, 0) scale(${isHoveringCard ? 1 : 0.4})`,
          opacity: isHoveringCard ? 1 : 0,
          transition: "transform 150ms ease-out, opacity 150ms ease-out",
          border: "6px solid #fff",
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          backfaceVisibility: "hidden",
        }}
      >
        <ArrowIcon
          direction="up-right"
          size={40}
          strokeWidth={4}
          linecap="round"
          linejoin="round"
          className="text-white"
        />
      </div>

      <div className="w-full max-w-[1504px] bg-white rounded-[24px] sm:rounded-[32px] pt-[30px] sm:pt-[50px] pb-[30px] sm:pb-[40px] shadow-2xl mx-auto overflow-hidden">
        <div className="relative text-center px-4 sm:px-16 pt-6 sm:pt-10 pb-6 sm:pb-14">
          <button
            onClick={() => scrollByAmount(-420)}
            aria-label="Scroll left"
            className="hidden sm:flex items-center justify-center absolute left-6 sm:left-16 top-[40%] -translate-y-1/2 w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <ArrowIcon direction="left" />
          </button>

          <h1 className="font-heading text-[clamp(2rem,6vw,4.5rem)] font-bold text-[#1A1A1A] leading-[1.05] uppercase pb-2 sm:pb-4">
            Projects
          </h1>

          {/* Mobile swipe hint */}
          <p className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-text-muted-light">
            ← swipe cards →
          </p>

          <button
            onClick={() => scrollByAmount(420)}
            aria-label="Scroll right"
            className="hidden sm:flex items-center justify-center absolute right-6 sm:right-16 top-[40%] -translate-y-1/2 w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Horizontally scrollable image gallery */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 sm:px-8"
        >
          {IMAGES.map((img) => (
            <div
              key={img.id}
              onMouseEnter={(e) => handleCardMouseEnter(e, img.id)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="card-no-cursor relative shrink-0 snap-center sm:snap-start rounded-[22px] sm:rounded-[28px] overflow-hidden h-[390px] sm:h-[480px] md:h-[560px] w-[82vw] sm:w-[48%] md:w-[30%] max-w-[420px]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {img.variant === "featured" && (
                <>
                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/80" />

                  {/* Top text content */}
                  <div className="absolute top-0 left-0 right-0 p-5 sm:p-7">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight mb-2 drop-shadow-md">
                      {img.title}
                    </h3>
                    <p className="text-white/85 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed max-w-full font-sans opacity-95">
                      {img.description}
                    </p>
                  </div>

                  {/* Bottom tags + icon */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {img.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] sm:text-[12px] text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/50 flex items-center justify-center text-white shrink-0 transition-opacity duration-150 ${
                        hoveredCardId === img.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <ArrowIcon direction="down-right" size={13} />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({
  direction = "right",
  size = 18,
  className = "",
  strokeWidth = 1.5,
  linecap = "round",
  linejoin = "round",
}) {
  const rotation =
    direction === "left"
      ? "rotate-180"
      : direction === "down-right"
        ? "rotate-45"
        : direction === "up-right"
          ? "-rotate-45"
          : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${rotation} ${className}`}
    >
      <path
        d="M2 12H22M22 12L15 5M22 12L15 19"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
      />
    </svg>
  );
}