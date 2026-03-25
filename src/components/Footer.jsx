import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-transparent py-12 px-6 lg:px-12 overflow-hidden relative">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-base font-bold">terminal</span>
          </div>
          <span className="text-lg font-display font-bold tracking-tight text-foreground">
            Kartikay<span className="text-accent">.dev</span>
          </span>
        </div>

        <p className="text-sm font-body text-slate-500 dark:text-slate-400 order-3 md:order-none text-center">
          &copy; {new Date().getFullYear()} Kartikay Shukla. Engineered with <span className="text-accent inline-block">&#9829;</span> and precision.
        </p>

        <div className="flex gap-6 font-body text-sm">
          <a href="#about" className="font-medium text-slate-500 hover:text-foreground transition-colors duration-300">About</a>
          <a href="#contact" className="font-medium text-slate-500 hover:text-foreground transition-colors duration-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
