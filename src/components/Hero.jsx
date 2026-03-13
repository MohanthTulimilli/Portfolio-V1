import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Layer 1: Full-screen background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-125 contrast-110"
        src="/Updated-4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Layer 2: Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        aria-hidden
      />

      {/* Layer 3: Hero text content and buttons */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6 pt-24 pb-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-muted text-sm uppercase tracking-widest mb-4"
        >
          Hello
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.05] mb-6"
        >
          I'm Mohanth
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl"
        >
          AI-ML Engineer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-lg max-w-xl mb-12 leading-relaxed"
        >
          I build scalable applications, AI-powered systems, and cloud solutions with a focus on clean architecture and user experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/#work"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-background font-medium rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300"
          >
            View Work
          </Link>
          <a
            href="/resume.pdf"
            download="Mohanth_Resume.pdf"
            className="inline-flex items-center justify-center px-8 py-4 border border-[rgba(255,255,255,0.3)] text-white font-medium rounded-full hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            Download Resume
          </a>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-[rgba(255,255,255,0.3)] text-white font-medium rounded-full hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
