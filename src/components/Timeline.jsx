import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "../utils/motion";

const Timeline = () => {
  const sectionRef = useRef(null);

  // Track scroll through the section.
  // 0 = section top hits 80% down viewport (just entering from bottom)
  // 1 = section bottom hits 50% down viewport (fully in view, user reading)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });

  // Line draws downward as you scroll through the section
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineItems = [
    {
      year: "2025",
      title: "Full Stack Developer",
      company: "Present",
      description: "Building scalable web applications, mastering modern frameworks like React, Next.js, and Node.js to create seamless digital experiences.",
      icon: "code",
    },
    {
      year: "2022",
      title: "iOS Developer",
      company: "Origins",
      description: "Started the journey with mobile app development, creating intuitive iOS applications using Swift and SwiftUI.",
      icon: "terminal",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 overflow-hidden bg-transparent"
      id="journey"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-accent font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">03. Evolution</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground">
            The <span className="text-muted-foreground font-normal italic">Journey.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line — scaleY draws from top as you scroll */}
          <motion.div
            className="absolute left-5 sm:left-6 md:left-1/2 h-full w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-accent/40 via-border to-transparent"
            style={{ scaleY: lineScaleY, transformOrigin: "top center" }}
          />

          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group pl-14 sm:pl-16 md:pl-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              >
                {/* Content */}
                <div className={`flex w-full md:w-[45%] flex-col ${index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-accent font-display font-bold mb-1.5 tracking-widest text-xs sm:text-sm">{item.year}</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3 text-xs sm:text-sm uppercase tracking-wide">{item.company}</p>

                  <div className="glass-panel aura-border p-4 sm:p-6 rounded-2xl">
                    <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-5 sm:left-6 md:left-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-accent text-accent-foreground shadow-[0_0_15px_hsl(38_90%_55%/0.4)] transition-all duration-300">
                  <span className="material-symbols-outlined text-base sm:text-lg">{item.icon}</span>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
