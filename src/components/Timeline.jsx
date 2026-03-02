import React from "react";
import { motion } from "framer-motion";

const Timeline = () => {
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
      className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 overflow-hidden bg-background-light dark:bg-background-dark"
      id="journey"
    >
      <div className="absolute top-1/4 left-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-primary/10 blur-[80px] sm:blur-[120px] -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-secondary font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">03. Evolution</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-foreground">
            The <span className="text-primary font-black italic">Journey.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line — left on mobile, centered on desktop */}
          <div className="absolute left-5 sm:left-6 md:left-1/2 h-full w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group pl-14 sm:pl-16 md:pl-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Content */}
                <div className={`flex w-full md:w-[45%] flex-col ${index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-secondary font-display font-bold mb-1.5 tracking-widest text-xs sm:text-sm">{item.year}</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-1">{item.title}</h3>
                  <p className="text-primary/80 font-medium mb-3 text-xs sm:text-sm uppercase tracking-wide">{item.company}</p>

                  <div className="glass-panel aura-border p-4 sm:p-6 rounded-2xl">
                    <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-5 sm:left-6 md:left-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-[0_0_15px_rgba(162,119,255,0.5)] group-hover:scale-110 group-hover:bg-secondary transition-all duration-300">
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
