import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Work() {
  const { t } = useTranslation();
  return (
    <section id="work" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 sm:mb-20"
      >
        <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">{t('work.selectedWork')}</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-text-primary">
          {t('work.projects')}
        </h2>
      </motion.div>
      <div id="projects" className="space-y-12 sm:space-y-16 md:space-y-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
