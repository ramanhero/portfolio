import BracketButton from '../components/BracketButton';

export default function Partners() {
  return (
    <section id="partners" className="section-content bg-bg-dark py-16 sm:py-24 md:py-48 px-5 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: CTA copy */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-4 sm:mb-6">
            Let's Talk
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,5.5vw,3.5rem)] font-bold text-white leading-[1.05] uppercase mb-4 sm:mb-6">
            Ready to Build Something Extraordinary?
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mb-4 sm:mb-6" />
          <p className="font-mono text-[11px] text-text-off-white leading-relaxed max-w-sm uppercase tracking-wide mb-6 sm:mb-8">
            Whether you need a robust application, a complete system overhaul, or wanna recruit a person who can do all of these. Let's make it happen.
          </p>
          <div className="inline-block">
            <BracketButton href="mailto:sahuraman1357@gmail.com" target="_blank" rel="noopener noreferrer">Start a Conversation</BracketButton>
          </div>
        </div>

        {/* Right: particle cloud visible behind (the global canvas handles this) */}
        <div className="hidden md:block h-[400px]">
          {/* WebGL terrain particles are visible through this transparent space */}
        </div>
      </div>
    </section>
  );
}
