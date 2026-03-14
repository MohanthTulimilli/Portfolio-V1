import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const pathToSectionId = {
  '/work': 'work',
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact',
};

export default function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathToSectionId[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [pathname]);

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
