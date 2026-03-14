import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const { id, title, tagline, description, gradient } = project;
  const tTitle = t(`projects.${id}.title`, { defaultValue: title });
  const tTagline = t(`projects.${id}.tagline`, { defaultValue: tagline });
  const tDescription = t(`projects.${id}.description`, { defaultValue: description });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/project/${id}`} className="block">
        <div className="bg-background-secondary border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          <div className={`aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-text-muted text-2xl sm:text-3xl md:text-4xl font-light tracking-tight opacity-60">
              {tTitle.split(' ')[0]}
            </span>
          </div>
          <div className="p-5 sm:p-6 md:p-10">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-2">{tTagline}</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary mb-3 sm:mb-4 group-hover:text-white transition-colors">
              {tTitle}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{tDescription}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-text-primary group-hover:gap-3 transition-all">
              {t('caseStudy.viewProject')}
              <span className="text-lg">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
