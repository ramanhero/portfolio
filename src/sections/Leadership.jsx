import BracketButton from '../components/BracketButton';

const leaders = [
  {
    name: 'Igor Tulchinsky',
    role: 'Founder',
    bio: 'Chairman of the Office of the CIO and Head of Research of WorldQuant—a global quantitative asset management firm with $7B+ AUM operating across 27 offices worldwide.',
    linkedin: 'https://www.linkedin.com/in/igortulchinsky/',
  },
  {
    name: 'Amir Husain',
    role: 'Chairman',
    bio: 'AI and defense pioneer who led SparkCognition to unicorn status, served as CEO of Boeing joint venture SkyGrid, and was named Austin\'s 40 Under 40.',
    linkedin: 'https://www.linkedin.com/in/amirhusain/',
  },
  {
    name: 'Steven Lau',
    role: 'CEO',
    bio: 'Investor in 150+ startups across fintech, biotech, robotics, and AI, including notable companies like Dataminr, IonQ, FigureAI, and Verge Genomics.',
    linkedin: 'https://www.linkedin.com/in/steven-lau-54a25552/',
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="section-content bg-bg-dark py-0 overflow-hidden">
      {/* Marquee Banner */}
      <div className="overflow-hidden py-6 border-b border-white/10">
        <div className="flex whitespace-nowrap marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mx-12">
              Our Leadership Team
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="text-center px-6 md:px-12 pt-20 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-off-white leading-relaxed max-w-lg mx-auto mb-8">
          A global network of advisors, operators and investors. The people who built what's now,
          helping you build what's next.
        </p>
        <BracketButton>Meet the Team</BracketButton>
      </div>

      {/* Statement */}
      <div className="text-center px-6 pt-16 md:pt-24">
        <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white/70 uppercase leading-tight">
          We spot trends before<br />they're trends.
        </h2>
      </div>

      {/* Team photos — eye strip */}
      <div className="flex justify-center gap-2 md:gap-4 px-6 py-12 md:py-16">
        {leaders.map((leader, i) => (
          <div
            key={i}
            className="relative w-[30vw] md:w-[28vw] h-[100px] md:h-[140px] bg-[#1A1A1A] overflow-hidden group"
          >
            {/* Placeholder image - grayscale eye region */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
              <div className="w-12 h-6 md:w-16 md:h-8 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/30 group-hover:bg-white/60 transition-all duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom statement */}
      <div className="text-center px-6 pb-16 md:pb-24">
        <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white/70 uppercase leading-tight">
          Transform them into<br />companies that matter.
        </h2>
      </div>

      {/* Leader cards */}
      <div className="px-6 md:px-12 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">
                {leader.role}
              </p>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {leader.name}
              </h3>
              <p className="font-mono text-[10px] text-text-off-white leading-relaxed mb-4 uppercase tracking-wide">
                {leader.bio}
              </p>
              <BracketButton href={leader.linkedin}>
                Connect with {leader.name.split(' ')[0]}
              </BracketButton>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <span className="font-mono text-[11px] text-text-muted tracking-[0.15em]">/ 03</span>
        </div>
      </div>
    </section>
  );
}
