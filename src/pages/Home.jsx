import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const { hash } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // On refresh or open with hash: land at top, clear hash (beat browser scroll restoration)
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      if (hash) {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.history.replaceState(null, '', window.location.pathname);
        window.scrollTo(0, 0);
        // Run again next frame in case browser restored scroll after first paint
        const id = requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          requestAnimationFrame(() => window.scrollTo(0, 0));
        });
        return () => cancelAnimationFrame(id);
      }
      return;
    }
    // User clicked nav link in-session: scroll to section
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
