import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { hash: 'work', label: 'Work' },
  { hash: 'about', label: 'About' },
  { hash: 'projects', label: 'Projects' },
  { hash: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  function handleNavClick(e, hash) {
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
      return;
    }
    e.preventDefault();
    window.history.pushState(null, '', `/#${hash}`);
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-text-primary font-medium text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          Mohanth
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map(({ hash, label }) => {
            const isActive = location.pathname === '/' && location.hash === `#${hash}`;
            return (
              <li key={hash}>
                <a
                  href={`/#${hash}`}
                  onClick={(e) => handleNavClick(e, hash)}
                  className={`group relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors ${
                    isActive ? 'text-text-primary' : ''
                  }`}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-current rounded opacity-100 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-background/95 backdrop-blur-md"
          >
            <ul className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map(({ hash, label }) => {
                const isActive = location.pathname === '/' && location.hash === `#${hash}`;
                return (
                  <li key={hash}>
                    <a
                      href={`/#${hash}`}
                      onClick={(e) => handleNavClick(e, hash)}
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                        isActive ? 'text-text-primary bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
