import React from "react";
import { motion } from "framer-motion";

const Projects = ({ projects }) => {
  return (
    <section className="py-12 lg:py-20 px-4 max-w-md md:max-w-7xl mx-auto bg-slate-50 dark:bg-slate-900/20" id="projects">
      <div>
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl hidden md:block">rocket</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary md:hidden">rocket</span>
                Featured Projects
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg leading-relaxed">
              Exploring the intersection of high-performance engineering and futuristic interface design. Here are some of my recent technical experiments.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-8 flex flex-col flex-1 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110"></div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-primary text-sm font-medium mb-4 italic">{project.tagline}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-primary text-background-dark py-3 rounded-lg text-sm font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-400 py-3 rounded-lg text-sm font-bold cursor-not-allowed">
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                      <span>Live Demo</span>
                    </div>
                  )}
                  {project.code ? (
                    <a href={project.code} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-primary/10 text-slate-800 dark:text-slate-100 py-3 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all border border-transparent dark:border-primary/20">
                      <span className="material-symbols-outlined text-[18px]">code</span>
                      <span>Source</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800/50 text-slate-400 py-3 rounded-lg text-sm font-bold cursor-not-allowed border border-transparent dark:border-slate-800">
                      <span className="material-symbols-outlined text-[18px]">code</span>
                      <span>Source</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
