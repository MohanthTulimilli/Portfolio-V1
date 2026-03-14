import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <p className="text-text-muted text-6xl sm:text-8xl font-light mb-4">404</p>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3">
          Page not found
        </h1>
        <p className="text-text-secondary text-base mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-background font-medium rounded-full hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
