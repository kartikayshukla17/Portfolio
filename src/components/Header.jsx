import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { Button } from "@/components/ui/button";
import { memo, useState, useEffect, useCallback, useRef } from "react";

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
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 20), []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop?.();

    const first = menuRef.current?.querySelector("a, button");
    first?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start?.();
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b pt-[env(safe-area-inset-top)] transition-colors duration-200 ${
        scrolled
          ? "border-border bg-background/90"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4 lg:px-12">
        <a href="#home" className="inline-flex min-h-11 items-center rounded-sm font-display text-xl font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Kartikay<span className="text-accent">.dev</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={activeSection === link.section ? "page" : undefined}
              className={`inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-200 ${
                activeSection === link.section
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="h-11 w-11 rounded-full transition-colors duration-200 hover:bg-muted"
          >
            <span
              className="flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform duration-500"
              style={{ transform: `rotate(${theme === "light" ? 0 : 360}deg)` }}
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                {theme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </span>
          </Button>
          <a
            href="#contact"
            className="hidden min-h-11 cursor-pointer items-center text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent sm:inline-flex"
          >
            Hire me
          </a>

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden h-11 w-11 rounded-full transition-colors duration-200 hover:bg-muted"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 bottom-0 z-50 max-h-[min(88dvh,640px)] overflow-y-auto rounded-t-3xl border-t border-primary/10 bg-background-light dark:bg-background px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-[min(22rem,86vw)] md:rounded-none md:rounded-l-3xl md:border-l md:border-t-0"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border md:hidden" aria-hidden="true" />
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={activeSection === link.section ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors duration-300 ${
                    activeSection === link.section
                      ? "bg-accent/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-bold text-accent-foreground hover:opacity-85 transition-opacity duration-300 sm:hidden"
              >
                Hire Me
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
