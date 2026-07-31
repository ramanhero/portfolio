import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
    {
        id: 1,
        role: "Senior Frontend Engineer & Systems Architect",
        company: "TechCorp Global Solutions Inc.",
        duration: "2024 — Present",
        description: "Spearheaded the structural migration of core platform architectures across distributed infrastructure environments. Successfully enhanced application performance metrics by 40% globally using edge-rendering pipelines, optimized data fetching matrices, custom state machine loops, and predictive asset preloading strategies.",
        skills: ["React 19", "TypeScript", "Next.js", "GraphQL", "Web Performance Optimization"]
    },
    {
        id: 2,
        role: "Lead Full Stack Software Engineer",
        company: "Innovate Interactive Web Studio",
        duration: "2022 — 2024",
        description: "Architected end-to-end features, transactional processing routines, and data schemas for international e-commerce platforms handling millions of active sessions. Engineered secure, highly available Node.js microservices frameworks alongside resilient, distributed auto-scaling cloud databases and real-time monitoring clusters.",
        skills: ["Node.js", "MongoDB", "AWS Cloud Infrastructure", "Docker", "Microservices"]
    },
    {
        id: 3,
        role: "Junior Web Developer & Open Source Contributor",
        company: "State University Systems & Labs",
        duration: "2018 — 2022",
        description: "Specialized in foundational Software Engineering patterns, low-level compilers, and distributed system algorithms. Graduated Summa Cum Laude with honors while designing, testing, and shipping modular open-source developer toolings, local script automations, and responsive utility applications for research labs.",
        skills: ["Algorithms & Data Structures", "Java", "SQL Database Tuning", "Git Ecosystem"]
    }
];

export default function EditorialTimeline() {
    const sectionRef = useRef(null);

    // Tracks unified scroll mechanics for the whole component block
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    /* 
      SLIGHTLY RELAXED TIMING MAPS:
      - Widened the interaction windows slightly (e.g., pushing from 0.38 to 0.42/0.46) 
        to make the repulsion and handoff transition noticeably smoother and slower on scroll.
    */
    const y1 = useTransform(scrollYProgress, [0, 0.36, 0.46], [0, 0, -500]);
    const y2 = useTransform(scrollYProgress, [0, 0.36, 0.42, 0.70, 0.80], [800, 380, 0, 0, -500]);
    const y3 = useTransform(scrollYProgress, [0, 0.36, 0.70, 0.76, 1], [800, 800, 380, 0, 0]);

    // Alpha fade maps synced perfectly to match the relaxed speed
    const opacity1 = useTransform(scrollYProgress, [0, 0.36, 0.46], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0, 0.15, 0.36, 0.70, 0.80], [0, 0.5, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0, 0.45, 0.70, 1], [0, 0.5, 1, 1]);

    const motions = [
        { y: y1, opacity: opacity1 },
        { y: y2, opacity: opacity2 },
        { y: y3, opacity: opacity3 }
    ];

    return (
        <div ref={sectionRef} className="relative h-[300vh] bg-neutral-950">

            {/* Sticky Window Frame Layer */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
                <div className="max-w-5xl w-full mx-auto relative pt-12">

                    {/* Header Title Mask Container */}
                    <div className="bg-transparent pb-10 border-b border-neutral-800">
                        <p className="text-xs uppercase tracking-widest font-mono text-indigo-400 mb-3">02 / History</p>
                        <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white font-serif">
                            Selected <span className="italic font-normal text-neutral-400">Chapters</span>
                        </h2>
                    </div>

                    {/* Timeline Execution Box Track */}
                    <div className="relative border-l border-neutral-800 pl-8 md:pl-16 ml-2 mt-16 h-[480px]">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                style={{
                                    y: motions[index].y,
                                    opacity: motions[index].opacity,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%"
                                }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-transparent py-4 group will-change-transform"
                            >
                                {/* Visual Track Guide Indicator Point */}
                                <div className="absolute -left-[37px] md:-left-[69px] top-6 w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 transition-all duration-300 group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:scale-125" />

                                <div className="lg:col-span-3">
                                    <span className="text-sm font-mono text-neutral-500 group-hover:text-indigo-400 transition-colors duration-300">
                                        {item.duration}
                                    </span>
                                </div>

                                <div className="lg:col-span-9">
                                    <h3 className="text-2xl md:text-3xl font-normal text-neutral-200 tracking-tight mb-2">
                                        {item.role}
                                    </h3>
                                    <p className="text-neutral-500 text-sm font-medium tracking-wide uppercase mb-6">
                                        {item.company}
                                    </p>
                                    <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mb-8">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="text-xs font-mono bg-neutral-900/60 text-neutral-400 px-3 py-1.5 rounded-full border border-neutral-800">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
