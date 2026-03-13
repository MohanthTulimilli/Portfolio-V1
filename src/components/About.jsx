import { motion } from 'framer-motion';

const skills = ['C', 'Java', 'Python', 'Django', 'Spring Boot', 'MySQL', 'AWS'];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-[280px_1fr] gap-10 sm:gap-16 items-start"
      >
        <div className="md:sticky md:top-32">
          <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">About</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
            Mohanth
          </h2>
        </div>
        <div className="space-y-8 sm:space-y-10">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-background-secondary border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-3xl sm:text-4xl text-text-muted font-light">
            M
          </div>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            I'm an AI Engineer with a passion for building scalable systems and clean user experiences. I focus on AI/ML solutions, backend development, and turning complex requirements into simple, maintainable solutions.
          </p>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">Skills</h3>
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
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">Experience</h3>
            <p className="text-text-secondary leading-relaxed">
              Building full-stack applications with Django, Spring Boot, and modern front-end tools. Experience with AWS for deployment and infrastructure. Focus on clean code, APIs, and database design.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">Education</h3>
            <p className="text-text-primary font-medium">B.Tech in Computer Science</p>
            <p className="text-text-secondary">Koneru Lakshmaiah University</p>
            <p className="text-text-muted text-sm mt-1">CGPA: 8.96 · 2023 – 2027</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-4">Certifications</h3>
            <p className="text-text-secondary">AWS Cloud Practitioner (CLF-C02)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
