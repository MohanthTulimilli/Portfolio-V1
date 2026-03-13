import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Work() {
  return (
    <section id="work" className="py-28 md:py-36 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Selected Work</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary">
          Projects
        </h2>
      </motion.div>
      <div id="projects" className="space-y-16 md:space-y-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
