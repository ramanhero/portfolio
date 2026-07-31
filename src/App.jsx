import { useState, useCallback } from 'react';
import { CursorProvider } from './context/CursorContext';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';

import Navbar from './components/Navbar';
import Preloader from './sections/Preloader';
import Hero from './sections/Hero';
import Ethos from './sections/Ethos';
import AboutMe from './sections/AboutMe';
import Projects from './sections/Projects';
import SplitScreen from './sections/SplitScreen';
import Partners from './sections/Partners';
import Footer from './sections/Footer';
import Timeline from './sections/Timeline';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <CursorProvider>
      <SmoothScroll>
        {/* Custom Cursor (z-9999) */}
        <CustomCursor />

        {/* Preloader Overlay (z-100) */}
        {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Global Navbar (z-50) */}
        <Navbar />



        {/* DOM Content Layer (z-10) */}
        <main>
          <Hero />
          <Ethos />
          {/* <Timeline /> */}
          <AboutMe />
          <Projects />
          <SplitScreen />
          <Partners />
          <Footer />
        </main>
      </SmoothScroll>
    </CursorProvider>
  );
}
