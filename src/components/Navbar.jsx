import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-text-primary font-medium text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          Mohanth
        </Link>
        <ul className="flex items-center gap-10">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === '/' && to.includes('#') && typeof window !== 'undefined'
              ? false
              : location.hash === to.slice(1);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`group relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors ${
                    isActive ? 'text-text-primary' : ''
                  }`}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
