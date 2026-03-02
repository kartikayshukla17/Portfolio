import { useTheme } from "../hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#timeline" }, // Section 03
    { name: "Projects", href: "#projects" }, // Section 04
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-primary/20 bg-background/80 backdrop-blur-md" : "border-transparent bg-transparent py-1"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-background-dark">
            <span className="material-symbols-outlined font-bold">terminal</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Kartikay.<span className="text-primary">dev</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <motion.span
              initial={false}
              animate={{ rotate: theme === 'light' ? 0 : 360 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-slate-600 dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-[22px]">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </motion.span>
          </Button>
          <a
            href="https://github.com/kartikayshukla17"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/kartikay-shukla-27357a243/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg text-slate-600 dark:text-slate-400 hover:text-secondary hover:bg-secondary/10 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:brightness-110 transition-all neon-glow hidden sm:inline-block"
          >
            Hire Me
          </a>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-primary/10 bg-background-light dark:bg-background-dark px-6 py-4 shadow-xl"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 text-center rounded-lg bg-primary px-6 py-3 font-bold text-background-dark hover:brightness-110 transition-all sm:hidden"
            >
              Hire Me
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
