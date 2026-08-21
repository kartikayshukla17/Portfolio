import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-x-clip border-t border-border bg-transparent px-5 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12 lg:px-12">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <a href="#home" className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-tight text-foreground opacity-70 transition-opacity duration-200 hover:opacity-100">
          Kartikay<span className="text-accent">.dev</span>
        </a>

        <p className="order-3 font-body text-sm text-slate-500 dark:text-slate-400 md:order-none">
          &copy; {new Date().getFullYear()} Kartikay Shukla
        </p>

        <div className="flex gap-2 font-body text-sm">
          <a href="#about" className="inline-flex min-h-11 cursor-pointer items-center px-3 font-medium text-slate-500 transition-colors duration-200 hover:text-foreground">About</a>
          <a href="#projects" className="inline-flex min-h-11 cursor-pointer items-center px-3 font-medium text-slate-500 transition-colors duration-200 hover:text-foreground">Projects</a>
          <a href="#contact" className="inline-flex min-h-11 cursor-pointer items-center px-3 font-medium text-slate-500 transition-colors duration-200 hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
