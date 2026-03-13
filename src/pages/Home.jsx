import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      const t = setTimeout(scroll, 100);
      return () => clearTimeout(t);
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
