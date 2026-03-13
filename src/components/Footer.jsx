import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-[rgba(255,255,255,0.08)] py-12 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-muted text-sm">© {year} Mohanth</p>
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/mohanth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mohanth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            LinkedIn
          </a>
          <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
            Home
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
