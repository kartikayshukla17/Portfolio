import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "../utils/motion";
import ShaderCanvas from "./ui/ShaderCanvas";

// Word-mask reveal — only GPU-composited properties (transform + opacity)
// overflow-hidden on each word wrapper acts as the clip mask
const wordReveal = (delay) => ({
  initial: { y: "110%" },
  animate: { y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const Hero = () => {
  const sectionRef = useRef(null);

  // Track how far the section has scrolled out of the viewport.
  // scrollYProgress: 0 = section top at viewport top, 1 = section bottom at viewport top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress → visual values (MotionValues: no re-renders, GPU only)
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-transparent pt-40 pb-48"
      id="home"
    >
      {/* Shader fills the section; IntersectionObserver inside pauses it when offscreen */}
      <ShaderCanvas />

      <motion.div
        style={{ y, opacity }}
        className="flex w-full max-w-3xl mx-auto flex-col z-10 text-center items-center pointer-events-none px-4 sm:px-8"
      >

        {/* Status dot */}
        <motion.div
          className="mb-6 inline-flex w-fit items-center gap-2.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Kartikay Shukla &mdash; Available
          </span>
        </motion.div>

        {/* Headline — word mask reveal */}
        {/*
          Each word sits inside an overflow-hidden span (the mask).
          The inner motion.span slides up from y:110% → y:0.
          Only transform is animated → GPU composited, zero layout reflow.
          pb-[0.12em] gives descenders (g, y) room so they don't clip.
        */}
        <h1 className="mb-6 sm:mb-8 font-display font-bold tracking-[-0.03em] leading-[1.1]">

          {/* Line 1: "Digital Experiences," — two words stagger in */}
          <span className="flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.5rem,7vw,6rem)] text-foreground">
            {[["Digital", 0.35], ["Experiences,", 0.46]].map(([word, delay]) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.12em]">
                <motion.span className="inline-block" {...wordReveal(delay)}>
                  {word}
                </motion.span>
              </span>
            ))}
          </span>

          {/* Line 2: "Crafted." — punches in with a slight skew for personality */}
          <span className="block text-[clamp(2.5rem,7vw,6rem)] text-muted-foreground italic font-normal overflow-hidden pb-[0.12em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", skewX: -6 }}
              animate={{ y: 0, skewX: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            >
              Crafted.
            </motion.span>
          </span>
        </h1>

        {/* Paragraph */}
        <motion.p
          className="mb-8 max-w-xl font-body text-base sm:text-lg text-muted-foreground leading-relaxed pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.92 }}
        >
          Full-stack developer focused on clean interfaces. I work where solid fundamentals meet visual craft — building things that behave as comfortably as they look.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pointer-events-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.08 }}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-10 py-4 font-body font-medium text-[15px] sm:text-[16px] text-background transition-opacity duration-300 hover:opacity-85"
          >
            <span className="relative z-10">Start a project</span>
          </a>
          <a
            href="#journey"
            className="inline-flex items-center font-body font-medium text-[15px] sm:text-[16px] text-muted-foreground hover:text-foreground transition-colors duration-300 hover:underline underline-offset-4"
          >
            See the work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
