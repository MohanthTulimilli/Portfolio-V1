import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { path: '/work', labelKey: 'nav.work' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
          className="flex items-center gap-2 text-text-primary font-medium text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <img
            src="/Logo-new.jpg"
            alt="Mohanth"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-none object-contain flex-shrink-0"
          />
          Mohanth
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-8 lg:gap-10">
            {navLinks.map(({ path, labelKey }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`group relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors ${
                      isActive ? 'text-text-primary' : ''
                    }`}
                  >
                    {t(labelKey)}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher />
        </div>

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
              {navLinks.map(({ path, labelKey }) => {
                const isActive = location.pathname === path;
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors min-h-[48px] touch-manipulation w-full ${
                        isActive ? 'text-text-primary bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3 mt-2 border-t border-[rgba(255,255,255,0.08)]">
                <LanguageSwitcher inline />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
