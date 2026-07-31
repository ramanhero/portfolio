import { useState } from 'react';
import BracketButton from '../components/BracketButton';
import { useCursor } from '../context/CursorContext';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ramanhero', icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramansahu/', icon: LinkedInIcon },
  { label: 'LeetCode', href: 'https://leetcode.com/u/raman1357/', icon: LeetCodeIcon },
  { label: 'WhatsApp', href: 'https://wa.me/7609015102', icon: WhatsAppIcon },
];

export default function Footer() {
  const { setCursorHover, setCursorDefault } = useCursor();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer id="footer" className="section-content relative bg-bg-dark flex flex-col justify-end overflow-hidden pt-32">
      <div className="flex justify-end pb-12 w-full">
        {/* Right: Orange CTA Card with rounded corners */}
        <div className="w-full md:w-[65%] lg:w-[50%] bg-accent-orange p-10 md:p-14 lg:p-20 flex flex-col justify-between min-h-[95vh] rounded-tl-[40px] rounded-bl-[40px] text-[#1A1A1A]">

          {/* TOP SECTION */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
            {/* Top Left: Text & Button */}
            <div className="flex-1 max-w-[420px]">
              <h2 className="font-heading text-4xl w-full whitespace-nowrap font-medium text-[#1A1A1A] uppercase leading-[1.05] mb-6">
                Ready to Build.
              </h2>
              <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-loose mb-12 text-[#1A1A1A]">
                I am currently transitioning into full-time SDE-1 roles. If you
                want to discuss system architecture, specific module
                implementation, or potential engineering opportunities, let's
                talk.
              </p>
              <div className="inline-block">
                <BracketButton dark onClick={() => setIsContactOpen(true)}>
                  Contact Us
                </BracketButton>
              </div>
            </div>

            {/* Top Right: User Logo */}
            <div className="flex-shrink-0 mt-8 xl:mt-0 xl:self-end pr-0 xl:pr-12">
              <svg width="220" height="220" viewBox="0 0 100 100" fill="none" className="text-[#1A1A1A]">
                <path d="M 32.5 67.5 V 22.5 H 62.5 A 15 15 0 0 1 62.5 52.5 H 47.5 L 67.5 77.5" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-auto pt-24 flex justify-center md:justify-start">
            <div className="flex items-center gap-8">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center justify-center w-14 h-14 rounded-full border border-[#1A1A1A]/30 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-accent-orange hover:border-[#1A1A1A] transition-colors duration-300"
                  onMouseEnter={setCursorHover}
                  onMouseLeave={setCursorDefault}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fine print bar */}
      <div className="w-full pt-4 pb-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 border-t border-white/5">
        <p className="font-mono text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest whitespace-nowrap">
          Site by Raman Sahu
        </p>
        <span className="hidden md:inline text-white/20">·</span>
        <p className="font-mono text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest whitespace-nowrap">
          Engineered with React, Tailwind &amp; Vite
        </p>
        <span className="hidden md:inline text-white/20">·</span>
        <p className="font-mono text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest whitespace-nowrap">
          © 2026 All Rights Reserved
        </p>
      </div>

      {/* Contact pop-over modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onCursorEnter={setCursorHover}
        onCursorLeave={setCursorDefault}
      />
    </footer>
  );
}

function ContactModal({ isOpen, onClose, onCursorEnter, onCursorLeave }) {
  // Kept mounted briefly during close so the fade-out can play instead of
  // the modal just disappearing instantly. isOpen still drives the actual
  // opacity/scale transition.
  const [shouldRender, setShouldRender] = useState(isOpen);

  if (isOpen && !shouldRender) setShouldRender(true);

  const handleTransitionEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[420px] bg-accent-orange text-[#1A1A1A] rounded-[24px] p-10 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <button
          onClick={onClose}
          onMouseEnter={onCursorEnter}
          onMouseLeave={onCursorLeave}
          className="absolute top-6 right-6 font-mono text-[11px] uppercase tracking-widest hover:opacity-60 transition-opacity"
          aria-label="Close"
        >
          Close
        </button>

        <h3 className="font-heading text-2xl uppercase font-medium mb-6">
          Let's Talk
        </h3>

        <div className="flex flex-col gap-3">
          <a
            href="mailto:sahuraman1357@gmail.com"
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="font-mono text-[12px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            sahuraman1357@gmail.com
          </a>
          <a
            href="https://wa.me/7609015102"
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="font-mono text-[12px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            +91 7609015102
          </a>
          <a
            href="https://www.linkedin.com/in/ramansahu/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="font-mono text-[12px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ramanhero"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onCursorEnter}
            onMouseLeave={onCursorLeave}
            className="font-mono text-[12px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Icon components ---------------- */

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.44-2.7 5.42-5.27 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function LeetCodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}