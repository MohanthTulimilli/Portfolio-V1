import { motion } from 'framer-motion';

const links = [
  { label: 'Email', href: 'mailto:mohanthtulimilli.11t@gmail.com', value: 'mohanthtulimilli.11t@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mohanth', value: 'LinkedIn' },
  { label: 'GitHub', href: 'https://github.com/mohanth', value: 'GitHub' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Get in touch</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-6">
          Let's work together
        </h2>
        <p className="text-text-secondary text-lg mb-12">
          Have a project in mind or want to chat? I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
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
        <motion.a
          href="mailto:mohanthtulimilli.11t@gmail.com"
          className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-white text-background font-medium rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Contact
        </motion.a>
      </motion.div>
    </section>
  );
}
