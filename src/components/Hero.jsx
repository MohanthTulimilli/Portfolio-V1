import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Tiny dark poster (1x1) so the video area isn’t empty while loading
const HERO_VIDEO_POSTER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"><rect fill="%23000" width="1" height="1"/></svg>');

function scrollOneStep() {
  const start = window.scrollY;
  const end = start + window.innerHeight;
  const duration = 650; // faster, snappier scroll
  const startTime = performance.now();

  function step(currentTime) {
    const t = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 2); // easeOutQuad – quick then gentle stop
    window.scrollTo(0, start + (end - start) * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Hero() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    setVideoSrc('/Updated-4.mp4');
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Layer 1: Full-screen background video – loads after mount, metadata-only preload */}
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-125 contrast-110"
          src={videoSrc}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          fetchPriority="low"
          aria-hidden
        />
      )}

      {/* Layer 2: Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        aria-hidden
      />

      {/* Layer 3: Hero text content and buttons */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4"
        >
          {t('hero.hello')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.05] mb-4 sm:mb-6"
        >
          {t('hero.imMohanth')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-6 sm:mb-8 max-w-2xl"
        >
          {t('hero.role')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-base sm:text-lg max-w-xl mb-8 sm:mb-12 leading-relaxed px-1"
        >
          {t('hero.tagline')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-background font-medium rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:bg-white active:text-background transition-all duration-300 text-sm sm:text-base"
          >
            {t('hero.viewWork')}
          </Link>
          <a
            href="/resume.pdf"
            download="Mohanth_Resume.pdf"
            className="hero-btn-outline inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-[rgba(255,255,255,0.3)] text-white font-medium rounded-full transition-all duration-300 text-sm sm:text-base hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:bg-white active:text-black active:border-white focus:outline-none focus:bg-transparent focus:text-white focus:border-[rgba(255,255,255,0.3)]"
          >
            {t('hero.downloadResume')}
          </a>
          <Link
            to="/contact"
            className="hero-btn-outline inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-[rgba(255,255,255,0.3)] text-white font-medium rounded-full transition-all duration-300 text-sm sm:text-base hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:bg-white active:text-black active:border-white focus:outline-none focus:bg-transparent focus:text-white focus:border-[rgba(255,255,255,0.3)]"
          >
            {t('hero.contact')}
          </Link>
        </motion.div>
      </div>

      {/* Down arrow: one step down */}
      <motion.button
        type="button"
        onClick={(e) => {
          scrollOneStep();
          e.currentTarget.blur();
        }}
        className="hero-btn-arrow absolute bottom-6 sm:bottom-8 left-0 right-0 mx-auto z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/30 text-white/90 transition-all duration-300 focus:outline-none focus:bg-transparent focus:text-white focus:border-white/30 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:bg-white active:text-black active:border-white"
        aria-label={t('hero.scrollDown')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  );
}
