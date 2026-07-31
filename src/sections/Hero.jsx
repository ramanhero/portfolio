import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BracketButton from '../components/BracketButton';
import heroBg from '../assets/Gemini_Generated_Image_hvmgw1hvmgw1hvmg.png';
import resume from '../assets/Raman_resume.pdf';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal on load (delayed for preloader)
      const tl = gsap.timeline({ delay: 3.2 });

      tl.to('.hero-line', {
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15,
      });

      tl.to(bottomBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

      // Scroll parallax + fade
      gsap.to(leftRef.current, {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });

      gsap.to(rightRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-content relative h-screen flex flex-col justify-between px-6 md:px-12 pt-24 pb-8 overflow-hidden bg-cover bg-[position:center]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${heroBg})`,
      }}
    >
      {/* Main heading area */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Left heading */}
        <div ref={leftRef} className="mb-4">
          <div className="text-reveal">
            <h1 className="hero-line font-heading text-[clamp(2rem,6vw,7rem)] font-extrabold leading-[0.92] tracking-tight text-white translate-y-full">
              BUILDING PLATFORMS
            </h1>
          </div>
          <div className="text-reveal">
            <h1 className="hero-line font-heading text-[clamp(2rem,6vw,7rem)] font-extrabold leading-[0.92] tracking-tight text-white translate-y-full">
              THAT
            </h1>
          </div>
        </div>

        {/* Right heading */}
        <div ref={rightRef} className="self-end text-right">
          <div className="text-reveal">
            <span className="hero-line font-heading text-[clamp(2rem,6vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white translate-y-full inline-block">
              PUSH THE
            </span>
          </div>
          <div className="text-reveal">
            <span className="hero-line font-heading text-[clamp(2rem,6vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white translate-y-full inline-block">
              LIMITS FURTHER
            </span>
          </div>
        </div>
      </div>

      {/* Thin separator */}
      <div className="w-full h-[1px] bg-white/15 mb-6" />

      {/* Fixed Bottom Bar */}
      <div
        ref={bottomBarRef}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 opacity-0 translate-y-4 mb-4 md:mb-8"
      >
        {/* Bracket CTA */}
        <BracketButton href={resume} target="_blank" rel="noopener noreferrer">View Resume</BracketButton>

        {/* Description */}
        <p className="font-mono text-[12px] md:text-[12px] tracking-[0.1em] text-text-off-white leading-relaxed max-w-lg text-justify drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">

          B.Tech(AI) Student with proven expertise in Full-Stack Java Development. Adept at developing end-to-end robust web applications using React, Spring Boot, MySQL and System Architecture. Driven by hands-on project development.
        </p>

        {/* R Logo */}
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="opacity-40 hidden md:block flex-shrink-0 text-white">
          <path d="M 32.5 67.5 V 22.5 H 62.5 A 15 15 0 0 1 62.5 52.5 H 47.5 L 67.5 77.5" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
