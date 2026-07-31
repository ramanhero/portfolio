const pillars = [
  {
    title: 'Exponential Foresight',
    num: '01 / 04',
    description: 'We spot industry trends before they permeate the industry. Transform them into companies that matter. Some call it foresight. We call it pattern recognition at scale.',
    bg: 'bg-[#0A0A0A]',
    text: 'text-white',
    patternColor: '#ffffff',
  },
  {
    title: 'Full-stack Support',
    num: '02 / 04',
    description: 'Brand, marketing, performance, legal, ops, finance, funding, and development. Tech founders need tailored support—and a dedicated team from day one.',
    bg: 'bg-accent-teal',
    text: 'text-white',
    patternColor: '#ffffff',
  },
  {
    title: 'Financial Stability',
    num: '03 / 04',
    description: "Breakthrough thinking shouldn't compete with rent. That's why we pay salaries from the start. You focus on building. We handle everything else.",
    bg: 'bg-accent-orange',
    text: 'text-white',
    patternColor: '#ffffff',
  },
  {
    title: 'Intelligent Iteration',
    num: '04 / 04',
    description: "Know what you want to build? Start today. No drawn-out program or slow-moving curriculum. Just ruthless focus on product-market fit and market entry.",
    bg: 'bg-bg-light',
    text: 'text-[#1A1A1A]',
    patternColor: '#1A1A1A',
  },
];

function PillarPattern({ color, type }) {
  const svgPatterns = {
    0: ( // Dot grid / wave
      <svg className="w-full h-full opacity-20 pattern-drift" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 100 }).map((_, i) => {
          const x = (i % 10) * 20 + 10;
          const y = Math.floor(i / 10) * 20 + 10 + Math.sin(((i % 10) + Math.floor(i / 10)) * 0.5) * 6;
          return <circle key={i} cx={x} cy={y} r="1.5" fill={color} />;
        })}
      </svg>
    ),
    1: ( // Tunnel lines
      <svg className="w-full h-full opacity-20 pattern-drift" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx={20 + i * 12}
            ry={15 + i * 10}
            stroke={color}
            strokeWidth="0.5"
            transform={`rotate(${i * 5} 100 100)`}
          />
        ))}
      </svg>
    ),
    2: ( // Radial burst
      <svg className="w-full h-full opacity-20 pattern-drift" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos(angle) * 80}
              y2={100 + Math.sin(angle) * 80}
              stroke={color}
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          );
        })}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle key={`c${i}`} cx="100" cy="100" r={15 + i * 15} stroke={color} strokeWidth="0.3" />
        ))}
      </svg>
    ),
    3: ( // Sine waves
      <svg className="w-full h-full opacity-15 pattern-drift" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const points = Array.from({ length: 40 }).map((_, j) => {
            const x = (j / 39) * 200;
            const y = 100 + Math.sin((j / 39) * Math.PI * 3 + i * 0.5) * (20 + i * 5);
            return `${x},${y}`;
          }).join(' ');
          return <polyline key={i} points={points} stroke={color} strokeWidth="0.5" fill="none" />;
        })}
      </svg>
    ),
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {svgPatterns[type]}
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="pillars" className="section-content bg-bg-light">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className={`relative ${pillar.bg} ${pillar.text} flex flex-col justify-between p-6 md:p-8 min-h-[70vh] md:min-h-[75vh] overflow-hidden`}
            style={{ borderRadius: i === 0 ? '16px 0 0 0' : i === 3 ? '0 16px 0 0' : '0' }}
          >
            {/* Title */}
            <h3 className="font-heading text-[clamp(1.3rem,2.2vw,1.8rem)] font-bold uppercase leading-tight relative z-10">
              {pillar.title}
            </h3>

            {/* Pattern graphic */}
            <PillarPattern color={pillar.patternColor} type={i} />

            {/* Bottom: counter + description */}
            <div className="relative z-10">
              <p className="font-mono text-[11px] tracking-[0.15em] mb-4 opacity-60">
                {pillar.num}
              </p>
              <p className="font-mono text-[10px] md:text-[11px] leading-relaxed opacity-80 uppercase tracking-wide">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
