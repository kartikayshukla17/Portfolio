import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import AnimatedFavicon from "./ui/AnimatedFavicon";

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
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-12 pt-24 pb-16 bg-background-light dark:bg-background-dark"
      id="home"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-0 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/3 rounded-full bg-primary/10 blur-[120px] sm:blur-[180px]" />
        <div className="absolute top-1/4 right-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] translate-x-1/3 rounded-full bg-secondary/8 blur-[100px] sm:blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #a277ff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full">

        {/* Left: copy */}
        <motion.div
          className="flex w-full flex-col lg:w-[48%] z-10 text-center lg:text-left items-center lg:items-start"
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
            className="mb-5 font-display font-extrabold tracking-tight leading-[1.05]"
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">Precision</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">Engineering,</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary italic">Felt.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-md text-sm sm:text-base text-slate-500 dark:text-slate-400 font-body leading-[1.8]"
          >
            Full-stack developer who treats interfaces as materials. I work where engineering discipline meets genuine visual craft — building things that behave as well as they look.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center rounded-lg bg-primary px-6 sm:px-7 py-3 sm:py-3.5 font-display font-bold text-sm sm:text-base text-[#110f18] overflow-hidden transition-all hover:brightness-110 aura-glow"
            >
              <span className="relative z-10">Start a project</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm sm:text-base text-slate-500 dark:text-slate-400 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
            >
              See the work
              <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D canvas */}
        <motion.div
          className="w-full lg:w-[48%] h-[260px] sm:h-[360px] md:h-[460px] lg:h-[640px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#a277ff" />
            <pointLight position={[-5, -5, 5]} intensity={0.4} color="#f59e0b" />
            <Suspense fallback={null}>
              <AnimatedFavicon />
            </Suspense>
          </Canvas>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
