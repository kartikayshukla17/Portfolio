import React from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      id="about"
    >
      {/* Decorative side lines — desktop only */}
      <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent hidden lg:block" />

      <motion.div
        className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <span className="text-secondary font-display font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">01. Identity</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
          The <span className="text-primary aura-text-glow font-black">Architect.</span>
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
            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
          }}
        >
          <motion.p variants={fadeUp} className="text-lg sm:text-xl md:text-2xl font-body font-light text-slate-800 dark:text-slate-300 leading-relaxed">
            I don&apos;t just write code; I <span className="text-primary font-medium">sculpt digital ecosystems</span>.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-loose">
            My engineering philosophy revolves around building scalable, robust architectures that don&apos;t compromise on aesthetics.
            I bridge the divide between highly technical backend performance and fluid, immersive frontend interactions.
            Every pixel and every database query is obsessively optimized to deliver an experience that feels inevitable.
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
            visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.8, type: "spring" } },
          }}
        >
          <div className="glass-panel aura-border p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-5 sm:mb-6 text-foreground">Neural Links</h3>

            <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
              <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-colors group/link">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-5 h-5 text-primary group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">GitHub Archive</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-primary transition-all text-base">arrow_forward</span>
              </a>

              <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-secondary/50 transition-colors group/link">
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="w-5 h-5 text-secondary group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">LinkedIn Network</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-secondary transition-all text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
