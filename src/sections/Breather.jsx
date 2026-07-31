import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Breather() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.breather-image', {
        scale: 0,
        opacity: 0
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(containerRef.current, {
        backgroundColor: '#181818',
        duration: 0.8,
        ease: 'power2.out',
      });

      tl.addLabel('reveal', '-=0.5');

      const words = containerRef.current.querySelectorAll('.breather-word-inner');
      const images = containerRef.current.querySelectorAll('.breather-image');

      words.forEach((el, i) => {
        tl.to(el, {
          y: '0%',
          duration: 0.9,
          ease: 'power4.out',
        }, `reveal+=${i * 0.04}`);
      });

      images.forEach((el, i) => {
        tl.to(el, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        }, `reveal+=${i * 0.06}`);
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
        onEnterBack: () => tl.play(),
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="breather"
      className="section-content relative w-full min-h-screen flex items-center justify-center px-4 md:px-12 py-24 select-none overflow-hidden"
      style={{ backgroundColor: '#E5E5E0' }}
    >
      <div
        ref={textContainerRef}
        className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center text-center gap-y-4 md:gap-y-6"
      >
        {/* LINE 1 */}
        <div className="flex flex-wrap items-center justify-center gap-x-[0.8em] leading-[1.1]">
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              Designed
            </span>
          </span>

          <span className="inline-flex items-center overflow-hidden py-[0.1em]">
            <span className="inline-block">
              <img
                src="/images/cylinder.png"
                alt="Futuristic Cylinder"
                className="breather-image h-[4.2em] w-[6.6em] object-cover rounded-[6px] mx-[0.15em] shadow-lg shadow-black/30"
                style={{ verticalAlign: 'middle', opacity: 0, transform: 'scale(0)' }}
              />
            </span>
          </span>

          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              AI-Driven
            </span>
          </span>

          <span className="inline-flex items-center overflow-hidden py-[0.1em]">
            <span className="inline-block">
              <img
                src="/images/bottles.png"
                alt="Aesthetic Bottles"
                className="breather-image h-[4.2em] w-[6.6em] object-cover rounded-[6px] mx-[0.15em] shadow-lg shadow-black/30"
                style={{ verticalAlign: 'middle', opacity: 0, transform: 'scale(0)' }}
              />
            </span>
          </span>
        </div>

        {/* LINE 2 */}
        <div className="flex flex-wrap items-center justify-center gap-x-[0.8em] leading-[1.1]">
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              ADAPTIVE
            </span>
          </span>
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              TESTING
            </span>
          </span>
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              ENGINES
            </span>
          </span>
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              ,
            </span>
          </span>
        </div>

        {/* LINE 3 */}
        <div className="flex flex-wrap items-center justify-center gap-x-[0.8em] leading-[1.1]">
          <span className="inline-flex items-center overflow-hidden py-[0.1em]">
            <span className="inline-block">
              <img
                src="/images/ui-green.png"
                alt="Green UI component"
                className="breather-image h-[4.2em] w-[6.6em] object-cover rounded-[6px] mx-[0.15em] shadow-lg shadow-black/30"
                style={{ verticalAlign: 'middle', opacity: 0, transform: 'scale(0)' }}
              />
            </span>
          </span>

          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              TELEMETRIES
            </span>
          </span>

          <span className="inline-flex items-center overflow-hidden py-[0.1em]">
            <span className="inline-block">
              <img
                src="/images/ui-grey.png"
                alt="Grey UI Card"
                className="breather-image h-[4.2em] w-[6.6em] object-cover rounded-[6px] mx-[0.15em] shadow-lg shadow-black/30"
                style={{ verticalAlign: 'middle', opacity: 0, transform: 'scale(0)' }}
              />
            </span>
          </span>

          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              TRACKER,
            </span>
          </span>
        </div>

        {/* LINE 4 */}
        <div className="flex flex-wrap items-center justify-center gap-x-[0.8em] leading-[1.1]">
          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              ADVANCED
            </span>
          </span>

          <span className="inline-flex items-center overflow-hidden py-[0.1em]">
            <span className="inline-block">
              <img
                src="/images/architecture.png"
                alt="Brutalist Architecture"
                className="breather-image h-[4.2em] w-[6.6em] object-cover rounded-[6px] mx-[0.15em] shadow-lg shadow-black/30"
                style={{ verticalAlign: 'middle', opacity: 0, transform: 'scale(0)' }}
              />
            </span>
          </span>

          <span className="inline-flex overflow-hidden py-[0.1em]">
            <span className="breather-word-inner inline-block transform translate-y-full font-heading font-bold text-white text-[clamp(1.6rem,4.5vw,4.5rem)] tracking-[-0.02em] uppercase">
              APPLICATIONS.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}