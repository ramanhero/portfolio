import { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const { cursorState } = useCursor();
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    const animate = () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Determine if we should show on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <div ref={cursorRef} className={`custom-cursor ${cursorState}`}>
      {cursorState === 'drag' && (
        <span className="font-mono text-[9px] text-white uppercase tracking-wider">Drag</span>
      )}
    </div>
  );
}
