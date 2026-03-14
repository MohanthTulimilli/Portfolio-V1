import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [choice, setChoice] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setChoice(stored);
    }
    setMounted(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setChoice('accepted');
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setChoice('rejected');
  }

  if (!mounted || choice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 bottom-0 z-50 w-full"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
      >
        <div className="w-full border-t border-[rgba(255,255,255,0.12)] bg-black px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-3xl">
            {t('cookie.message')}
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleReject}
              className="px-4 py-2.5 rounded-full text-sm font-medium border border-[rgba(255,255,255,0.25)] text-text-secondary hover:text-text-primary hover:border-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('cookie.reject')}
            >
              {t('cookie.reject')}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-background hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('cookie.accept')}
            >
              {t('cookie.accept')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
