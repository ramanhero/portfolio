import React, { useState, useRef, useCallback } from "react";

import java from "../assets/AboutMeImgs/java.png"
import springboot from "../assets/AboutMeImgs/springboot.png"
import react from "../assets/AboutMeImgs/react.png"
import mongodb from "../assets/AboutMeImgs/mongodb.png"
import git from "../assets/AboutMeImgs/git.png"

const CATEGORIES = [
  {
    id: 1,
    label: "Languages",
    icon: java,
    items:
      "Java, SQL, HTML, CSS, TypeScript, JavaScript, Python, C",
  },
  {
    id: 2,
    label: "Backend",
    icon: springboot,
    items:
      "Spring Boot, Spring Security, JWT, REST APIs, CRUD, JPA/Hibernate, JDBC",
  },
  {
    id: 3,
    label: "Frontend",
    icon: react,
    items:
      "React (TS), Context API, Tailwind CSS, Routing, Forms, API Integration",
  },
  {
    id: 4,
    label: "DB & Cloud",
    icon: mongodb,
    items: "MySQL, MongoDB, PostgreSQL, AWS (EC2, S3)",
  },
  {
    id: 5,
    label: "Tools & DevOps",
    icon: git,
    items: "Git, GitHub, Docker, Postman, IntelliJ, VS Code, Maven, Linux",
  },
  {
    id: 6,
    label: "Core Concepts",
    icon: <CoreConceptsIcon />,
    items:
      "OOP, Exception Handling, Multithreading, Java Collections Framework, Data Structures & Algorithms (DSA), System Design",
  },
];

export default function AboutMe() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const CARD_HEIGHT = 140;
  const CARD_HEIGHT_HOVERED = 200;

  // Debounced leave: moving the mouse from one card straight into a
  // neighboring card still briefly crosses the flex gap. Clearing
  // hoveredIndex instantly on mouseleave would snap every card's
  // flex-grow back to 1 for a frame before the next card re-expands it
  // — visible as the other cards "flexing in and out". Delaying the
  // null-set lets a same-row mouseenter cancel it, so hoveredIndex goes
  // straight from A to B and nothing else changes.
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnter = useCallback((index) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      leaveTimeoutRef.current = null;
    }, 80);
  }, []);

  return (
    <section id="aboutme" className="w-full min-h-0 md:min-h-[900px] bg-white py-16 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-[900px] mx-auto text-center w-full">
        <h2 className="text-[18px] sm:text-[19px] font-bold text-[#1a1a2e] mb-4 sm:mb-5">
          What I do
        </h2>

        <p className="text-[13px] sm:text-[14px] leading-[1.8] sm:leading-[1.9] text-[#8a8f98] max-w-[620px] mx-auto px-2">
          Full-stack developer focused on the Java ecosystem and TypeScript frontends. I write secure Spring Boot backends, design optimized database schemas, and build event-driven microservices that handle real-time data pipelines.
        </p>

        <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1a1a2e] mt-12 sm:mt-16">
          Tech I Work With
        </h3>

        <p className="text-[11px] leading-[1.9] text-[#8a8f98] mb-8 md:mb-10">
          <span className="md:hidden">Core tech stack &amp; capabilities</span>
          <span className="hidden md:inline">hover it!</span>
        </p>

        {/* Mobile View: Clean 2-column or 1-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden text-left">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#f4f5f7] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-black/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  {typeof cat.icon === "string" ? (
                    <img
                      src={cat.icon}
                      alt={cat.label}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    cat.icon
                  )}
                </div>
                <span className="text-[13.5px] font-bold text-[#1a1a2e]">
                  {cat.label}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-[#4a4f58]">
                {cat.items}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop View: Cards flex to make room for whichever one is hovered */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-start justify-center">
          {CATEGORIES.map((cat, index) => {
            const isHovered = hoveredIndex === index;
            const grow =
              hoveredIndex === null ? 1 : isHovered ? 2.5 : 0.6;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  flexGrow: grow,
                  flexBasis: 0,
                  height: isHovered ? CARD_HEIGHT_HOVERED : CARD_HEIGHT,
                }}
                className="relative min-w-[70px] bg-[#f4f5f7] rounded-2xl overflow-hidden transition-[flex-grow,height] duration-300 ease-out"
              >
                {/* Default face: icon of the most recognizable tech + category name */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-3 transition-opacity duration-200 ease-out ${isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 32, height: 32 }}
                  >
                    {typeof cat.icon === "string" ? (
                      <img
                        src={cat.icon}
                        alt={cat.label}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      cat.icon
                    )}
                  </div>
                  <span className="text-[13px] font-medium text-[#1a1a2e] whitespace-nowrap">
                    {cat.label}
                  </span>
                </div>

                {/* Hover face: full skill list for that category */}
                <div
                  className={`absolute inset-0 flex flex-col items-start justify-start text-left p-6 overflow-y-auto transition-opacity duration-300 ease-out ${isHovered ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                  <span className="text-[12px] font-bold tracking-wide text-[#1a1a2e] mb-3 uppercase">
                    {cat.label}
                  </span>
                  <p className="text-[12.5px] leading-[1.7] text-[#4a4f58]">
                    {cat.items}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoreConceptsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="#4a4f58" strokeWidth="1.4" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" fill="#4a4f58" />
      <line x1="12" y1="2" x2="12" y2="5" stroke="#4a4f58" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="#4a4f58" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5" y2="12" stroke="#4a4f58" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="#4a4f58" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}