import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { Button } from "@/components/ui/button";
import { memo, useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";

// Decorative star-dot SVG that fills the button background
const StarBackground = () => (
  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#star-hm-clip)">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M56.1 3.96C56.4645 3.96 56.76 4.25519 56.76 4.62C56.76 4.98481 56.4645 5.28 56.1 5.28C55.9131 5.28 55.7443 5.20201 55.624 5.07762C55.5632 5.01446 55.5147 4.93904 55.4829 4.8559C55.4552 4.78243 55.44 4.70315 55.44 4.62C55.44 4.5549 55.4494 4.49174 55.4668 4.43244C55.4906 4.35188 55.5292 4.27775 55.5795 4.21329C55.7004 4.05926 55.8885 3.96 56.1 3.96ZM40.26 17.16C40.6245 17.16 40.92 17.4552 40.92 17.82C40.92 18.1848 40.6245 18.48 40.26 18.48C39.8955 18.48 39.6 18.1848 39.6 17.82C39.6 17.4552 39.8955 17.16 40.26 17.16ZM74.58 5.28C74.7701 5.28 74.9413 5.36057 75.0618 5.48882C75.2226 5.76662 75.24 5.85106 75.24 5.94C75.24 6.1585 75.1336 6.3525 74.9699 6.47238C74.8555 6.54393 74.7908 6.56584C74.7247 6.58775 74.6538 6.6 74.58 6.6C74.2156 6.6 73.92 6.30481 73.92 5.94C73.92 5.87684 73.929 5.8156 73.9455 5.7576C74.0657 5.50688 74.1595 5.41471 74.2728 5.35541C74.3647 5.30707 74.4691 5.28 74.58 5.28ZM21.66 33.52C22.0245 33.52 22.32 33.8152 22.32 34.18C22.32 34.5448 22.0245 34.84 21.66 34.84C21.2955 34.84 21 34.5448 21 34.18C21 33.8152 21.2955 33.52 21.66 33.52ZM8.16 32.86C8.16 32.4952 7.8645 32.2 7.5 32.2C7.1355 32.2 6.84 32.4952 6.84 32.86C6.84 33.2248 7.1355 33.52 7.5 33.52C7.8645 33.52 8.16 33.2248 8.16 32.86ZM7.5 23.68C7.8645 23.68 8.16 23.9752 8.16 24.34C8.16 24.7048 7.8645 25 7.5 25C7.1355 25 6.84 24.7048 6.84 24.34C6.84 23.9752 7.1355 23.68 7.5 23.68ZM19.32 18.48C19.32 18.1152 19.0245 17.82 18.66 17.82C18.2955 17.82 18 18.1152 18 18.48C18 18.8448 18.2955 19.14 18.66 19.14C19.0245 19.14 19.32 18.8448 19.32 18.48ZM5.66 11.84C6.0245 11.84 6.32001 12.1352 6.32001 12.5C6.32001 12.8648 6.0245 13.16 5.66 13.16C5.2955 13.16 5 12.8648 5 12.5C5 12.1352 5.2955 11.84 5.66 11.84ZM35.16 35.5C35.16 35.1352 34.8645 34.84 34.5 34.84C34.1355 34.84 33.84 35.1352 33.84 35.5C33.84 35.8648 34.1355 36.16 34.5 36.16C34.8645 36.16 35.16 35.8648 35.16 35.5ZM53.5 36.18C53.8645 36.18 54.16 36.4752 54.16 36.84C54.16 37.2048 53.8645 37.5 53.5 37.5C53.1355 37.5 52.84 37.2048 52.84 36.84C52.84 36.4752 53.1355 36.18 53.5 36.18ZM48.5 28.66C48.5 28.2952 48.2045 28 47.84 28C47.4755 28 47.18 28.2952 47.18 28.66C47.18 29.0248 47.4755 29.32 47.84 29.32C48.2045 29.32 48.5 29.0248 48.5 28.66ZM60.34 27.34C60.7045 27.34 61 27.6352 61 28C61 28.3648 60.7045 28.66 60.34 28.66C59.9755 28.66 59.68 28.3648 59.68 28C59.68 27.6352 59.9755 27.34 60.34 27.34ZM56.284 16.5C56.284 16.1352 55.9885 15.84 55.624 15.84C55.2595 15.84 54.964 16.1352 54.964 16.5C54.964 16.8648 55.2595 17.16 55.624 17.16C55.9885 17.16 56.284 16.8648 56.284 16.5ZM46.2 7.26C46.2 6.89519 45.9045 6.6 45.54 6.6C45.1755 6.6 44.88 7.26 44.88 7.26C44.88 7.62481 45.1755 7.92 45.54 7.92C45.9045 7.92 46.2 7.62481 46.2 7.26ZM33 9.34C33 8.9752 32.7045 8.68 32.34 8.68C31.9755 8.68 31.68 8.9752 31.68 9.34C31.68 9.7048 31.9755 10 32.34 10C32.7045 10 33 9.7048 33 9.34ZM16 4.8559C16.3645 4.8559 16.66 5.1511 16.66 5.5159C16.66 5.8807 16.3645 6.1759 16 6.1759C15.6355 6.1759 15.34 5.8807 15.34 5.5159C15.34 5.1511 15.6355 4.8559 16 4.8559ZM69.66 21.16C69.66 20.7952 69.3645 20.5 69 20.5C68.6355 20.5 68.34 20.7952 68.34 21.16C68.34 21.5248 68.6355 21.82 69 21.82C69.3645 21.82 69.66 21.5248 69.66 21.16ZM80.52 15.18C80.52 14.8152 80.2245 14.52 79.86 14.52C79.4956 14.52 79.2 14.8152 79.2 15.18C79.2 15.5448 79.4956 15.84 79.86 15.84C80.2245 15.84 80.52 15.5448 80.52 15.18ZM91.32 10C91.32 9.6352 91.0245 9.34 90.66 9.34C90.2955 9.34 90 9.6352 90 10C90 10.3648 90.2955 10.66 90.66 10.66C91.0245 10.66 91.32 10.3648 91.32 10Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </g>
    <defs>
      <clipPath id="star-hm-clip">
        <rect width="100" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// "Hire Me" button with a GSAP-driven light orb that travels around the pill perimeter
const HireMeButton = () => {
  const btnRef = useRef(null);
  const lightRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const btn = btnRef.current;
    const light = lightRef.current;
    if (!btn || !light) return;

    const lw = 110;
    const w = btn.offsetWidth;
    const h = btn.offsetHeight;
    const perimeter = 2 * (w + h);
    const dur = 3;

    // Start orb centered on the top-left corner
    gsap.set(light, { x: -lw / 2, y: -lw / 2 });

    // Animate proportionally along each side so speed stays constant
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(light, { x: w - lw / 2, duration: (w / perimeter) * dur })  // → right
      .to(light, { y: h - lw / 2, duration: (h / perimeter) * dur })  // ↓ down
      .to(light, { x: -lw / 2,    duration: (w / perimeter) * dur })  // ← left
      .to(light, { y: -lw / 2,    duration: (h / perimeter) * dur }); // ↑ up

    return () => tl.kill();
  }, []);

  const lightColor = theme === "dark" ? "#ffffff" : "#ffffff";

  return (
    <a
      ref={btnRef}
      href="#contact"
      className="relative overflow-hidden rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground hover:opacity-85 transition-opacity duration-300 hidden sm:inline-flex items-center justify-center"
    >
      {/* Traveling glow orb — blends as overlay so it highlights, not washes out */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute"
        style={{
          width: 110,
          height: 110,
          background: `radial-gradient(ellipse at center, ${lightColor} 0%, transparent 70%)`,
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />
      {/* Star dot pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
        <StarBackground />
      </div>
      <span className="relative z-10">Hire Me</span>
    </a>
  );
};

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
