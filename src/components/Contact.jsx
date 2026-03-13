import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Email', href: 'mailto:mohanthtulimilli.11t@gmail.com', value: 'mohanthtulimilli.11t@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mohanth', value: 'LinkedIn' },
  { label: 'GitHub', href: 'https://github.com/mohanth', value: 'GitHub' },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreyqzpy';

export default function Contact() {
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

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
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
          <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Get in touch</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4 sm:mb-6">
            Let's work together
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Have a project in mind or want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap text-center mb-10 sm:mb-14">
          {links.map(({ label, href, value }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="text-text-muted text-sm block mb-1">{label}</span>
              <span className="font-medium">{value}</span>
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
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-background border border-[rgba(255,255,255,0.08)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-[rgba(255,255,255,0.08)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
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
            {status === 'loading' && 'Sending...'}
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
            {status === 'idle' && 'Send'}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
