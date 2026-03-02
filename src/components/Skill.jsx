import React from "react";
import { motion } from "framer-motion";

const Skill = ({ skills }) => {
  return (
    <section className="py-24 px-6 lg:px-12 border-y border-border/50 bg-background dark:bg-card/30 overflow-hidden relative" id="skills">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display font-bold text-sm tracking-widest uppercase mb-4 block">02. Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-foreground">
            Technology <span className="text-secondary font-black italic">Matrix.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-4xl">
          {skills.flatMap((s) => s.items).map((skill, index) => (
            <motion.div
              key={skill}
              className="group relative px-6 py-3 glass-panel aura-border rounded-full hover:border-primary/60 hover:bg-primary/5 transition-all cursor-crosshair overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.03
              }}
            >
              {/* Sweep effect on hover */}
              <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:animate-[sweep_1s_ease-in-out]"></div>

              <span className="text-sm md:text-base font-bold font-body text-slate-700 dark:text-slate-300 tracking-wide relative z-10 group-hover:text-primary transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
