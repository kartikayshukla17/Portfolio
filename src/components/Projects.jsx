import React from "react";
import { motion } from "framer-motion";

const Projects = ({ projects }) => {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 border-y border-border/50 bg-background dark:bg-card/20 overflow-hidden"
      id="projects"
    >
      <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-secondary/10 blur-[100px] sm:blur-[150px] -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="text-primary font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">04. Archive</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-foreground mb-3">
            Featured <span className="text-secondary font-black italic">Deployments.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body max-w-xl mx-auto text-sm">
            Exploring the intersection of high-performance engineering and futuristic interface design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group flex flex-col glass-panel aura-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/25">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display mb-1.5 group-hover:text-secondary transition-colors text-foreground">{project.title}</h3>
                <p className="text-primary/80 font-body text-xs sm:text-sm font-medium mb-3">{project.tagline}</p>
                <p className="text-slate-600 dark:text-slate-400 font-body text-xs sm:text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border border-primary/20">
                      <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                      <span>Live App</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800/30 text-slate-400 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold cursor-not-allowed border border-border">
                      <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                      <span>Offline</span>
                    </div>
                  )}
                  {project.code ? (
                    <a href={project.code} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 glass-panel hover:bg-white/10 text-foreground py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border border-border/50">
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      <span>Source</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800/20 text-slate-500 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold cursor-not-allowed border border-border/30">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span>Private</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
