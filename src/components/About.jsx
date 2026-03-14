import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

const skills = ['Java', 'Python', 'Django', 'Spring Boot', 'MySQL', 'AWS', 'Docker', 'Kubernetes'];

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-[280px_1fr] gap-10 sm:gap-16 items-start"
      >
        <div className="md:sticky md:top-32">
          <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">{t('about.about')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
            Mohanth
          </h2>
        </div>
        <div className="space-y-8 sm:space-y-10">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-background-secondary border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-3xl sm:text-4xl text-text-muted font-light">
            M
          </div>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            {t('about.bio')}
          </p>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">{t('about.openTo')}</h3>
            <p className="text-text-secondary leading-relaxed">
              <Trans i18nKey="about.openToText" components={{ 1: <span className="text-text-primary font-medium" />, 3: <span className="text-text-primary font-medium" />, 5: <span className="text-text-primary font-medium" /> }} />
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">{t('about.skills')}</h3>
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {skills.map((skill, i) => (
                <li
                  key={skill}
                  className="px-4 py-2 rounded-full bg-background-secondary border border-[rgba(255,255,255,0.08)] text-text-secondary text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">{t('about.experience')}</h3>
            <p className="text-text-secondary leading-relaxed">
              {t('about.experienceText')}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">{t('about.education')}</h3>
            <p className="text-text-primary font-medium">{t('about.btech')}</p>
            <p className="text-text-secondary">{t('about.klu')}</p>
            <p className="text-text-muted text-sm mt-1">{t('about.cgpa')}</p>
            <p className="text-text-primary font-medium mt-4">{t('about.intermediate')}</p>
            <p className="text-text-secondary">{t('about.sriChaitanya')}</p>
            <p className="text-text-muted text-sm mt-1">{t('about.mathsPhysicsChemistry')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">{t('about.certifications')}</h3>
            <p className="text-text-primary font-medium">{t('about.awsCert')}</p>
            <a
              href="https://cp.certmetrics.com/amazon/en/public/verify/credential/fba03497dc9a4b4ebc345ded0b7a78d8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted text-sm hover:text-text-primary underline underline-offset-2 transition-colors block mt-1"
            >
              {t('about.verifyCredential')}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
