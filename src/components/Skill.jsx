import React from "react";
import { motion } from "framer-motion";

const Skill = ({ skills }) => {
  return (
    <section className="py-16 px-6 lg:px-12 border-y border-slate-200 dark:border-primary/10 bg-slate-50 dark:bg-slate-900/30 overflow-hidden" id="skills">
      <div className="mx-auto max-w-7xl">
        <motion.h4
          className="text-sm font-bold uppercase tracking-[0.2em] text-center mb-10 text-primary/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ecosystem Skills
        </motion.h4>

        {/* We flatten the skills array to show as ecosystem badges to match the requested design */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {skills.flatMap((s) => s.items).map((skill, index) => (
            <motion.div
              key={skill}
              className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-primary/10 shadow-sm hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className="material-symbols-outlined text-primary group-hover:animate-spin">
                {/* Randomly select an icon based on length just for visual variety if desired, 
                    or stick to terminal/code/data_object */}
                {skill.length % 3 === 0 ? 'data_object' : skill.length % 2 === 0 ? 'code' : 'layers'}
              </span>
              <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
