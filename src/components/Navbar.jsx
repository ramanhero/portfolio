import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import BracketButton from './BracketButton';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'ABOUT ME', href: '#aboutme' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CASE STUDIES', href: '#caseStudies' },
  { label: 'CONTACT', href: '#partners' },
];

// Height (px) of the fixed navbar, used to offset the scroll target so a
// section's top edge doesn't end up hidden underneath the nav bar.
const NAV_OFFSET = 90;

export default function Navbar() {
  const { setCursorHover, setCursorDefault } = useCursor();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly animates the page to a section instead of letting the browser
  // jump there instantly. preventDefault stops the native anchor jump, then
  // we scroll to the target's position using the browser's own native
  // smooth-scroll (no extra GSAP plugin required, so nothing can silently
  // fail to load).
  const handleNavClick = (e, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const targetY =
      target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-nav pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${scrolled ? 'py-4 px-4 flex justify-center' : 'py-5 px-6 md:px-12 flex justify-center'
        }`}
    >
      <div
        className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${scrolled
          ? 'w-[750px] max-w-[95vw] bg-[#1b1b1b] rounded-[100px] px-8 py-3 shadow-xl'
          : 'w-full max-w-none bg-transparent rounded-none px-0 py-0'
          }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex-shrink-0 flex items-center h-10"
          onMouseEnter={setCursorHover}
          onMouseLeave={setCursorDefault}
        >
          {scrolled ? (
            /* Compact R icon */
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="transition-all duration-500 text-white">
              <path d="M 32.5 67.5 V 22.5 H 62.5 A 15 15 0 0 1 62.5 52.5 H 47.5 L 67.5 77.5" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            /* Full text logo */
            <div className="leading-tight transition-all duration-500">
              <span className="font-mono text-base tracking-[0.15em] text-white block">RAMAN</span>
              <span className="font-mono text-sm tracking-[0.15em] text-text-off-white block">SAHU</span>
            </div>
          )}
        </a>

        {/* Nav Links */}
        <div className={`hidden md:flex items-center transition-all duration-700 ${scrolled ? 'gap-6' : 'gap-8'}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-text={link.label}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link-glitch font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${link.label === 'CONTACT'
                ? 'text-text-off-white hover:text-white'
                : 'text-text-off-white hover:text-white'
                }`}
              onMouseEnter={setCursorHover}
              onMouseLeave={setCursorDefault}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 ml-auto"
          onMouseEnter={setCursorHover}
          onMouseLeave={setCursorDefault}
        >
          <span className="w-5 h-[1px] bg-white" />
          <span className="w-5 h-[1px] bg-white" />
        </button>
      </div>
    </nav>
  );
}