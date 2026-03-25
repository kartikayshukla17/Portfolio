import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { memo, useState, useEffect, useCallback } from "react";

const HireMeButton = () => (
  <div className="hidden sm:block">
    <LiquidMetalButton
      label="Hire Me"
      width={100}
      innerBackground="hsl(var(--accent))"
      textColor="hsl(var(--accent-foreground))"
      onClick={() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    />
  </div>
);

const navLinks = [
  { name: "About", href: "#about", section: "about" },
  { name: "Skills", href: "#skills", section: "skills" },
  { name: "Journey", href: "#journey", section: "journey" },
  { name: "Projects", href: "#projects", section: "projects" },
  { name: "Contact", href: "#contact", section: "contact" },
];

const Header = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 20), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-primary/10 bg-background/30 backdrop-blur-xl" : "border-transparent bg-transparent py-1"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
            <span className="material-symbols-outlined font-bold">terminal</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Kartikay.<span className="text-accent">dev</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === link.section
                  ? "text-foreground border-b-2 border-accent pb-0.5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
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
            <span
              className="flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform duration-500"
              style={{ transform: `rotate(${theme === 'light' ? 0 : 360}deg)` }}
            >
              <span className="material-symbols-outlined text-[22px]">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </span>
          </Button>
          <HireMeButton />

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
        <div className="md:hidden border-t border-primary/10 bg-background-light dark:bg-background-dark px-6 py-4 shadow-xl animate-[fadeSlideDown_0.2s_ease-out]">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium transition-colors duration-300 ${
                  activeSection === link.section
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 text-center rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground hover:opacity-85 transition-opacity duration-300 sm:hidden"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
});

export default Header;
