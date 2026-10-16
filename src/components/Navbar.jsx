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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    setMobileMenuOpen(false);

    const targetY =
      target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-nav pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          scrolled ? 'py-3 sm:py-4 px-3 sm:px-4 flex justify-center' : 'py-4 sm:py-5 px-5 sm:px-8 md:px-12 flex justify-center'
        }`}
      >
        <div
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            scrolled
              ? 'w-[750px] max-w-[95vw] bg-[#1b1b1b]/95 backdrop-blur-md rounded-[100px] px-5 sm:px-8 py-2.5 sm:py-3 shadow-2xl border border-white/10'
              : 'w-full max-w-none bg-transparent rounded-none px-0 py-0'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex-shrink-0 flex items-center h-10"
            onMouseEnter={setCursorHover}
            onMouseLeave={setCursorDefault}
            onClick={() => setMobileMenuOpen(false)}
          >
            {scrolled ? (
              /* Compact R icon */
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" className="transition-all duration-500 text-white sm:w-8 sm:h-8">
                <path d="M 32.5 67.5 V 22.5 H 62.5 A 15 15 0 0 1 62.5 52.5 H 47.5 L 67.5 77.5" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              /* Full text logo */
              <div className="leading-tight transition-all duration-500">
                <span className="font-mono text-sm sm:text-base tracking-[0.15em] text-white block">RAMAN</span>
                <span className="font-mono text-xs sm:text-sm tracking-[0.15em] text-text-off-white block">SAHU</span>
              </div>
            )}
          </a>

          {/* Nav Links (Desktop) */}
          <div className={`hidden md:flex items-center transition-all duration-700 ${scrolled ? 'gap-6' : 'gap-8'}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-text={link.label}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link-glitch font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 text-text-off-white hover:text-white"
                onMouseEnter={setCursorHover}
                onMouseLeave={setCursorDefault}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 ml-auto focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onMouseEnter={setCursorHover}
            onMouseLeave={setCursorDefault}
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : 'mb-1.5'
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-between px-8 pt-28 pb-12 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-teal mb-2">
            Navigation
          </p>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-heading text-3xl font-bold uppercase tracking-tight text-white hover:text-accent-teal transition-colors py-2 border-b border-white/10 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-text-muted font-normal">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Raman Sahu
            </span>
            <span className="font-mono text-xs text-white/50">
              Full-Stack Developer
            </span>
          </div>
        </div>
      </div>
    </>
  );
}