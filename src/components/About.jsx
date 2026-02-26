import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-12 lg:py-20 px-4 max-w-md md:max-w-7xl mx-auto" id="about">
      <motion.div
        className="mb-8 md:mb-16 md:text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-2 font-display">
          About <span className="text-primary">Me</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 md:text-lg">Crafting digital experiences with neon precision.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
        {/* Who I Am Card */}
        <motion.div
          className="flex flex-col gap-4 rounded-xl bg-slate-200/50 dark:bg-primary/5 p-5 border border-primary/10 neon-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Who I Am</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-normal leading-relaxed">
                Passionate developer building the future of tech with speed and precision. I bridge the gap between complex logic and intuitive design.
              </p>
            </div>
          </div>

          <a href="#journey" className="hidden md:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-background-dark text-sm font-bold tracking-wide w-fit hover:brightness-110 transition-all mt-4">
            <span>Read More</span>
          </a>
        </motion.div>

        {/* What I Do Card */}
        <motion.div
          className="flex flex-col gap-4 rounded-xl bg-slate-200/50 dark:bg-primary/5 p-5 border border-primary/10 neon-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary">bolt</span>
                <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">What I Do</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-normal leading-relaxed">
                Specializing in high-performance web applications and scalable architecture. I focus on clean code and pixel-perfect implementation.
              </p>
            </div>
          </div>

          <a href="#projects" className="hidden md:flex items-center justify-center rounded-lg h-10 px-6 bg-primary/10 border border-primary text-primary text-sm font-bold tracking-wide w-fit hover:bg-primary hover:text-background-dark transition-all mt-4">
            <span>View Work</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-800 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-background-dark transition-all w-full md:w-auto">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 px-6 py-3 text-sm font-bold text-[#0A66C2] dark:text-[#4799E8] hover:bg-[#0A66C2] hover:text-white transition-all w-full md:w-auto">
          LinkedIn
        </a>
      </motion.div>
    </section>
  );
};

export default About;
