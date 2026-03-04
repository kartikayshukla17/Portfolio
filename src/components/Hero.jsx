import React from "react";
import { motion } from "framer-motion";
import NetworkBackground from "./ui/NetworkBackground";
import { useTheme } from "../hooks/useTheme";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-background-light dark:bg-[#0e0e12] pt-20 pb-16"
      id="home"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <NetworkBackground theme={theme} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-center w-full min-h-[70vh] px-4 sm:px-8 z-10 pointer-events-none">

        {/* Copy */}
        <motion.div
          className="flex w-full flex-col z-10 text-left items-start pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status dot */}
          <motion.div variants={itemVariants} className="mb-6 inline-flex w-fit items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-secondary/80">
              Kartikay Shukla &mdash; Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 sm:mb-5 font-display font-extrabold tracking-tight leading-[1.05]"
          >
            <span className="block text-[clamp(2.5rem,8vw,7rem)] text-foreground dark:text-white">Precision</span>
            <span className="block text-[clamp(2.5rem,8vw,7rem)] text-foreground dark:text-white">Engineering,</span>
            <span className="block text-[clamp(2.5rem,8vw,7rem)] text-primary dark:text-[#7c5cfc] italic">Felt.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 sm:mb-10 max-w-[420px] text-[14px] sm:text-[15px] text-slate-600 dark:text-[#888] font-body leading-[1.6] sm:leading-[1.7]"
          >
            Full-stack developer who treats interfaces as materials. I work where engineering discipline meets genuine visual craft — building things that behave as well as they look.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 pointer-events-auto">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center rounded-lg bg-primary dark:bg-[#7c5cfc] px-6 sm:px-7 py-3 sm:py-3.5 font-display font-semibold text-[14px] sm:text-[15px] text-white overflow-hidden transition-all hover:brightness-110 dark:hover:bg-[#9070ff] hover:-translate-y-[1px]"
            >
              <span className="relative z-10">Start a project</span>
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-1.5 font-body text-[14px] sm:text-[15px] text-slate-600 dark:text-[#ccc] hover:text-foreground dark:hover:text-white transition-colors"
            >
              See the work
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </motion.div>
        </motion.div>



      </div>
    </section>
  );
};

export default Hero;
