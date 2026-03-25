import React from "react";
import { motion } from "framer-motion";
import { EASE, fadeUp, staggerContainer } from "../utils/motion";

const Projects = ({ projects }) => {
  return (
    <section
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden"
      id="projects"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="text-accent font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">04. Archive</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-3">
            Featured <span className="text-muted-foreground font-normal italic">Projects.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body max-w-xl mx-auto text-sm">
            Exploring the intersection of clean development and refined interface design.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0.12, 0.1)}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-sm transition-all duration-500 relative"
              variants={fadeUp}
            >
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-3 py-1 bg-muted/50 text-foreground text-xs font-semibold rounded-full border border-border">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display mb-1.5 group-hover:text-foreground transition-colors duration-300 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm font-medium mb-3">{project.tagline}</p>
                <p className="text-slate-600 dark:text-slate-400 font-body text-xs sm:text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-accent/10 text-accent hover:bg-accent/20 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-accent/20 hover:border-accent/40">
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      <span>Live App</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800/30 text-slate-400 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold cursor-not-allowed border border-border">
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      <span>Offline</span>
                    </div>
                  )}
                  {project.code ? (
                    <a href={project.code} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 glass-panel hover:bg-white/10 text-foreground py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-border/50">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
