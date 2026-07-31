import { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';
import BracketButton from '../components/BracketButton';

const companies = [
  { name: 'Alpha Deal', tagline: 'Private asset analysis, reimagined.', logo: '●●\n ●●\n●', url: 'https://www.alphadeal.ai/' },
  { name: 'Edda', tagline: 'A better, social-first, audio book streaming platform.', logo: '❖❖\n❖', url: 'https://joinedda.com/' },
  { name: 'Novyra', tagline: 'Precision matching for clinical oncology trials.', logo: '✦', url: 'https://novyra.ai/' },
  { name: 'StrataHub', tagline: 'AI-readiness hub that transforms fragmented, raw enterprise data into structured form.', logo: '◆◆\n◆◆', url: 'https://stratahub.com/' },
  { name: 'Remix Labs', tagline: 'Advanced time series modeling for tomorrow\'s data flows.', logo: '▲▽\n▽▲', url: 'https://remixlabs.ai/' },
  { name: 'Aeroguard', tagline: 'American-made drone accessories for frontline rescue and law enforcement.', logo: '◈', url: '#' },
];

export default function Portfolio() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const { setCursorDrag, setCursorDefault } = useCursor();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - track.offsetLeft;
      scrollLeft.current = track.scrollLeft;
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
    };
    const onUp = () => { isDragging.current = false; };

    track.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      track.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <section
      id="portfolio"
      className="section-content bg-bg-light py-20 md:py-32"
      onMouseEnter={setCursorDrag}
      onMouseLeave={setCursorDefault}
    >
      {/* Header */}
      <div className="text-center px-6 mb-12 md:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted-light mb-4">
          Our Portfolio
        </p>
        <h2 className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#1A1A1A] uppercase mb-6">
          Our companies don't just enter markets. They define them.
        </h2>
        <BracketButton dark>Explore our portfolio</BracketButton>
      </div>

      {/* Draggable carousel */}
      <div
        ref={trackRef}
        className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-6"
        style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {companies.map((company, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] bg-white rounded-card p-8 md:p-10 flex flex-col justify-between select-none"
            style={{ aspectRatio: '3/4', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
          >
            {/* Top brackets + name */}
            <div>
              <div className="flex justify-between mb-6">
                <span className="text-[#C8C8C8] text-lg">┌</span>
                <span className="text-[#C8C8C8] text-lg">┐</span>
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold text-[#1A1A1A] uppercase text-center mb-8">
                {company.name}
              </h3>
            </div>

            {/* Center: abstract logo */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-4xl md:text-5xl text-[#1A1A1A] text-center whitespace-pre-line leading-tight opacity-80">
                {company.logo}
              </div>
            </div>

            {/* Bottom: tagline + WEBSITE button */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted text-center mb-6 leading-relaxed">
                {company.tagline}
              </p>
              <div className="flex justify-between mb-2">
                <span className="text-[#C8C8C8] text-lg">└</span>
                <span className="text-[#C8C8C8] text-lg">┘</span>
              </div>
              <div className="text-center">
                <BracketButton dark href={company.url}>Website</BracketButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-6">
        <span className="font-mono text-[11px] text-text-muted tracking-[0.15em]">/ 06</span>
      </div>
    </section>
  );
}
