import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background dark:bg-black/50 py-12 px-6 lg:px-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <motion.div
        className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-base font-bold">terminal</span>
          </div>
          <span className="text-lg font-display font-bold tracking-tight text-foreground">
            Kartikay<span className="text-primary">.dev</span>
          </span>
        </div>

        <p className="text-sm font-body text-slate-500 dark:text-slate-400 order-3 md:order-none text-center">
          © {new Date().getFullYear()} Kartikay Shukla. Engineered with <span className="text-primary hover:animate-pulse inline-block">♥</span> and precision.
        </p>

        <div className="flex gap-6 font-body text-sm">
          <a href="#" className="font-medium text-slate-500 hover:text-primary transition-colors">Coordinates</a>
          <a href="#" className="font-medium text-slate-500 hover:text-secondary transition-colors">Protocols</a>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
