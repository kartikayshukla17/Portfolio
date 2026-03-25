import React from "react";
import { motion } from "framer-motion";
import { EASE } from "../utils/motion";

const Skill = ({ skills }) => {
  return (
    // overflow-hidden removed — it silently breaks position:sticky on descendants
    <section className="py-24 sm:py-32 lg:py-40 px-6 lg:px-12 bg-transparent relative" id="skills">
      <div className="mx-auto max-w-7xl relative z-10">

        {/*
          Sticky header — pins below the site nav (~80px) while chips scroll past.
          -mx-6 lg:-mx-12 + matching px bleeds the glass background edge-to-edge so
          chips disappear cleanly behind it rather than overlapping bare text.
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sticky top-[72px] z-20 text-center pb-8 pt-4 -mx-6 lg:-mx-12 px-6 lg:px-12 bg-background-light/90 dark:bg-background/90 backdrop-blur-sm"
        >
          <span className="text-accent font-display font-bold text-sm tracking-widest uppercase mb-4 block">02. Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
            Core <span className="text-muted-foreground font-normal italic">Technologies.</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-5 sm:gap-6 max-w-4xl mx-auto pt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {skills.flatMap((s) => s.items).map((skill) => (
            <div
              key={skill}
              className="group relative px-6 py-3 bg-background border border-border/50 rounded-lg hover:border-accent/30 hover:bg-muted/30 transition-all duration-500 overflow-hidden"
            >
              <span className="text-sm md:text-base font-body text-slate-700 dark:text-slate-300 tracking-wide relative z-10 group-hover:text-foreground transition-colors duration-300">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skill;
