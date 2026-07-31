import { useCursor } from '../context/CursorContext';

const sectors = [
  { title: 'Advanced Mobility', description: 'Autonomous aviation, smart transit, and sustainable transport reshaping movement.' },
  { title: 'Artificial Intelligence', description: 'Transforming industries through data, automation, and intelligence at scale.' },
  { title: 'Biotechnology & Genomics', description: 'Engineering breakthrough treatments and extending human potential through genetic innovation.' },
  { title: 'Blockchain & DeFi', description: 'Building transparent, secure digital economies that move faster than convention.' },
  { title: 'Next-Gen Finance', description: 'Alternative investments to democratized financial intelligence for everyone.' },
  { title: 'Next-Gen Consumer Tech', description: 'Hyper-personalized, cutting-edge technologies to enrich everyday lives.' },
  { title: 'Quantum Computing', description: 'New paradigms in computing power, asset analysis, and fintech.' },
  { title: 'Robotics', description: 'Augmenting human capability and automating the future of work.' },
  { title: 'Space', description: 'Opening new frontiers in connectivity, exploration, and orbital infrastructure.' },
];

function CameraBrackets() {
  return (
    <div className="absolute inset-0 pointer-events-none p-2 md:p-4 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute top-2 left-2 w-6 h-6 md:w-10 md:h-10 border-t-2 border-l-2 border-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute top-2 right-2 w-6 h-6 md:w-10 md:h-10 border-t-2 border-r-2 border-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute bottom-2 left-2 w-6 h-6 md:w-10 md:h-10 border-b-2 border-l-2 border-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="absolute bottom-2 right-2 w-6 h-6 md:w-10 md:h-10 border-b-2 border-r-2 border-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
    </div>
  );
}

export default function FocusList() {
  const { setCursorHover, setCursorDefault } = useCursor();

  return (
    <section id="focus" className="section-content bg-bg-light relative overflow-hidden">
      {/* Header */}
      <div className="text-center pt-32 md:pt-48 pb-16 md:pb-24 px-6 relative z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted-light mb-4">
          Our Focus
        </p>
        <h2 className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-bold text-[#1A1A1A] uppercase leading-tight mb-6">
          Exponential Technologies.<br />Trillion-Dollar Markets.
        </h2>
        <p className="font-heading text-base md:text-lg text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          AI, biotech, robotics, blockchain, NewSpace—these aren't incremental improvements.
          They're generational leaps that solve humanity's hardest challenges. They move faster than convention. So do we.
        </p>
      </div>

      {/* Sector List */}
      <div className="w-full mx-auto px-4 md:px-8 pb-32 md:pb-48 flex flex-col items-stretch relative z-10">
        {sectors.map((sector, i) => (
          <div
            key={i}
            className="group relative w-full border-t border-[#1A1A1A]/10 py-10 md:py-16 cursor-none"
            onMouseEnter={setCursorHover}
            onMouseLeave={setCursorDefault}
          >
            <CameraBrackets />
            
            <div className="relative z-10 px-6 md:px-12 flex flex-col justify-center">
              {/* Title: Roboto, 500, Black, No Wrap, Translates on Hover */}
              <h3 className="font-['Roboto'] font-medium text-[#1A1A1A] text-[clamp(2.5rem,7vw,7rem)] leading-none whitespace-nowrap overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-8">
                {sector.title}
              </h3>
              
              {/* Description: Hidden initially, black color, expands on hover */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                <div className="overflow-hidden">
                  <p className="font-mono pt-4 text-[12px] md:text-sm text-[#1A1A1A] uppercase tracking-wider transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] max-w-2xl">
                    {sector.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
