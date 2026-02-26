import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-primary/10 bg-background-light dark:bg-background-dark py-12 px-6 lg:px-12 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex items-center gap-3 opacity-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background-dark">
            <span className="material-symbols-outlined text-sm font-bold">terminal</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">DevPortfolio</span>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 order-3 md:order-none text-center">
          © 2026 Kartikay Shukla. All rights reserved. Built with <span className="text-primary">♥</span> and Coffee.
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-xs font-medium text-slate-500 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs font-medium text-slate-500 hover:text-primary transition-colors">Terms of Service</a>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
