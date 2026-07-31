import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.val)),
      onComplete: () => {
        // Fade out overlay
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => onComplete?.(),
        });
      },
    });

    // Logo reveal via clip-path
    gsap.fromTo(
      logoRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.out', delay: 0.3 }
    );
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-overlay bg-bg-dark flex items-center justify-center"
    >
      {/* R Logo */}
      <div ref={logoRef} className="text-center" style={{ clipPath: 'inset(100% 0 0 0)' }}>
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" className="text-white">
          <path d="M 32.5 67.5 V 22.5 H 62.5 A 15 15 0 0 1 62.5 52.5 H 47.5 L 67.5 77.5" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute bottom-8 right-10 font-mono text-[11px] text-text-muted tracking-[0.15em]"
      >
        {String(count).padStart(3, '0')}%
      </div>
    </div>
  );
}
