import React from "react";
import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2025",
    title: "Full Stack Developer",
    company: "",
    description: "Building scalable web applications, mastering modern frameworks like React, Next.js, and Node.js to create seamless digital experiences.",
    icon: "code"
  },
  {
    year: "2022",
    title: "iOS Developer",
    company: "",
    description: "Started the journey with mobile app development, creating intuitive iOS applications using Swift and SwiftUI.",
    icon: "terminal"
  }
];

const Timeline = () => {
  return (
    <section className="py-12 lg:py-20 px-4 max-w-md md:max-w-5xl mx-auto bg-background-light dark:bg-background-dark" id="journey">
      <div>
        <motion.div
          className="mb-8 md:mb-16 md:text-center flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="material-symbols-outlined text-primary text-2xl hidden md:block">timeline</span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight lg:text-5xl font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary md:hidden">show_chart</span>
            The Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Central Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 md:-translate-x-1/2 timeline-line opacity-30"></div>

          <div className="space-y-16 md:space-y-24">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group pl-12 md:pl-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Content Block */}
                <div className={`flex w-full md:w-[45%] flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                  <span className="text-primary font-bold mb-2 tracking-widest text-sm">{item.year}</span>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 font-medium mb-4">{item.company}</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-primary/10 hover:border-primary/40 transition-colors shadow-sm">
                    {item.description}
                  </p>
                </div>

                {/* Center Icon */}
                <div className="absolute left-4 md:left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background-light dark:border-background-dark bg-primary text-background-dark shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                </div>

                {/* Empty Space for layout */}
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
