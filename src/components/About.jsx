import React from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { EASE } from "../utils/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const About = () => {
  return (
    <section
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      id="about"
    >
      <motion.div
        className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <span className="text-accent font-display font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">01. Identity</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display text-foreground">
          The <span className="text-muted-foreground font-normal italic">Architect.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Column */}
        <motion.div
          className="md:col-span-7 flex flex-col gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15, duration: 0.7, ease: EASE } },
          }}
        >
          <motion.p variants={fadeUp} className="text-lg sm:text-2xl font-display font-bold text-foreground leading-snug">
            I focus on building complete digital products.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-loose">
            My approach revolves around building clean, robust applications that don't compromise on aesthetics.
            I bridge the divide between highly technical backend performance and fluid frontend interactions.
            Every detail is carefully considered to deliver a flawless experience.
          </motion.p>
        </motion.div>

        {/* Links Column */}
        <motion.div
          className="md:col-span-5 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.9, ease: EASE } },
          }}
        >
          <div className="glass-panel aura-border p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-5 sm:mb-6 text-foreground">Connect</h3>

            <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
              <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-all duration-500 group/link">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-5 h-5 text-foreground group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">GitHub</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-foreground transition-all text-base">arrow_forward</span>
              </a>

              <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-all duration-500 group/link">
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="w-5 h-5 text-foreground group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">LinkedIn</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-foreground transition-all text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
