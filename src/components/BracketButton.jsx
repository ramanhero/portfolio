import { useCursor } from '../context/CursorContext';

export default function BracketButton({ children, href, onClick, className = '', dark = false }) {
  const { setCursorHover, setCursorDefault } = useCursor();

  const borderColor = dark ? 'border-[#1A1A1A]' : 'border-white';
  const textColor = dark ? 'text-[#1A1A1A]' : 'text-white';

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <Tag
      {...linkProps}
      className={`bracket-btn ${textColor} ${className}`}
      onMouseEnter={setCursorHover}
      onMouseLeave={setCursorDefault}
    >
      <span className={`corner corner--tl ${borderColor}`} />
      <span className={`corner corner--tr ${borderColor}`} />
      <span className={`corner corner--bl ${borderColor}`} />
      <span className={`corner corner--br ${borderColor}`} />
      <span className="btn-text relative z-10">{children}</span>
      <span className={`btn-text-glitch ${textColor}`} aria-hidden="true">{children}</span>
    </Tag>
  );
}
