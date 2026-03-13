import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function CaseStudy() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary mb-4">Project not found</h1>
          <Link to="/" className="text-text-secondary hover:text-text-primary underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { key: 'overview', title: 'Overview', content: project.overview },
    { key: 'problem', title: 'Problem', content: project.problem },
    { key: 'process', title: 'Process', content: project.process },
    { key: 'solution', title: 'Solution', content: project.solution },
    { key: 'results', title: 'Results', content: project.results },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-8 transition-colors"
          >
            ← Back to Work
          </Link>
          <p className="text-text-muted text-sm uppercase tracking-widest mb-4">{project.tagline}</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-6">
            {project.title}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">{project.description}</p>
        </motion.div>

        <div className={`aspect-video rounded-2xl bg-gradient-to-br ${project.gradient} mb-24 flex items-center justify-center`}>
          <span className="text-text-muted text-5xl font-light tracking-tight opacity-60">
            {project.title.split(' ')[0]}
          </span>
        </div>

        <div className="space-y-20">
          {sections.map(({ key, title, content }, i) => (
            <motion.section
              key={key}
              custom={i}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="border-b border-[rgba(255,255,255,0.08)] pb-16"
            >
              <h2 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">
                {title}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">{content}</p>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-16 border-t border-[rgba(255,255,255,0.08)]"
        >
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-text-primary font-medium hover:opacity-80 transition-opacity"
          >
            View all projects
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
