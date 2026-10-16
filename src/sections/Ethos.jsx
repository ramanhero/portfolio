import BracketButton from '../components/BracketButton';

export default function Ethos() {
  return (
    <section
      id="ethos"
      className="section-content relative bg-bg-light rounded-t-[32px] md:rounded-t-[40px] -mt-8"
    >
      {/* Vision block */}
      <div className="px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-7xl mx-auto">
          {/* Left: Label + Heading */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted-light mb-3 sm:mb-4">
              My Ethos
            </p>
            <h2 className="font-heading text-[clamp(1.75rem,5.5vw,3.5rem)] font-bold text-[#1A1A1A] leading-[1.05] uppercase">
              RAPID EXECUTION.<br />SEAMLESS SCALE.
            </h2>
          </div>

          {/* Right: Body + CTA */}
          <div className="flex flex-col justify-end">
            <p className="font-heading text-base md:text-lg text-[#1A1A1A] leading-relaxed mb-6 md:mb-8">
              I'm a full-stack engineer who builds modern businesses and pushes them further. With clean code, scalable architecture, and the infrastructure modern businesses demand.
            </p>
            <div className="inline-block">
              <BracketButton dark href="https://github.com/ramanhero">View GitHub</BracketButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
