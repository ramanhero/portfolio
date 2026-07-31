import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState('default');

  const setCursorDefault = useCallback(() => setCursorState('default'), []);
  const setCursorHover = useCallback(() => setCursorState('hover'), []);
  const setCursorDrag = useCallback(() => setCursorState('drag'), []);

  return (
    <CursorContext.Provider value={{ cursorState, setCursorDefault, setCursorHover, setCursorDrag }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within CursorProvider');
  return context;
}
