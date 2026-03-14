import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const linkConfig = [
  { labelKey: 'contact.emailLabel', href: 'mailto:mohanthtulimilli.11t@gmail.com', value: 'mohanthtulimilli.11t@gmail.com', icon: null },
  { labelKey: 'contact.linkedin', href: 'https://linkedin.com/in/mohanth', value: 'LinkedIn', icon: IconLinkedIn },
  { labelKey: 'contact.github', href: 'https://github.com/MohanthTulimilli', value: 'GitHub', icon: IconGitHub },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreyqzpy';
const THANK_YOU_API = '/api/send-thank-you';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submission failed (${res.status})`);
      }

      // Send thank-you email to the submitter (non-blocking)
      fetch(THANK_YOU_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      }).catch(() => {});

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || t('contact.formError'));
    }
  }

  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">{t('contact.getInTouch')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4 sm:mb-6">
            {t('contact.letsWorkTogether')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap text-center mb-10 sm:mb-14">
          {linkConfig.map(({ labelKey, href, value, icon: Icon }) => (
            <a
              key={labelKey}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex flex-col sm:flex-row items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {Icon && <Icon />}
              <span>
                <span className="text-text-muted text-sm block sm:inline sm:mr-1">{t(labelKey)}</span>
                <span className="font-medium">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-background-secondary p-5 sm:p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-2">
                {t('contact.name')}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('contact.placeholderName')}
                className="w-full px-4 py-3 rounded-lg bg-background border border-[rgba(255,255,255,0.08)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
                {t('contact.email')}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('contact.placeholderEmail')}
                className="w-full px-4 py-3 rounded-lg bg-background border border-[rgba(255,255,255,0.08)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
                {t('contact.message')}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact.placeholderMessage')}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-background border border-[rgba(255,255,255,0.08)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors resize-y min-h-[120px]"
              />
            </div>
          </div>
          {status === 'error' && (
            <p className="mt-6 text-sm text-red-400">{errorMessage}</p>
          )}
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`mt-6 sm:mt-8 w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8 py-3 sm:py-4 font-medium rounded-full text-sm sm:text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              status === 'success'
                ? 'bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.4)]'
                : 'bg-white text-background hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]'
            }`}
            whileHover={status === 'loading' || status === 'success' ? undefined : { scale: 1.02 }}
            whileTap={status === 'loading' || status === 'success' ? undefined : { scale: 0.98 }}
          >
            {status === 'loading' && t('contact.sending')}
            {status === 'success' && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ pathLength: { duration: 0.4, delay: 0.1 }, opacity: { duration: 0.2 } }}
                    style={{ fill: 'none' }}
                  />
                </svg>
              </motion.span>
            )}
            {status === 'idle' && t('contact.send')}
          </motion.button>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm text-text-secondary"
            >
              {t('contact.thanksMessage')}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
