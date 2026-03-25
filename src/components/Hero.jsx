import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../utils/motion";
import AetherFlow from "./ui/aether-flow";
import { useTheme } from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

// Decorative star-dot SVG that fills the button background
const StarBackground = () => (
  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#star-hero-clip)">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M56.1 3.96C56.4645 3.96 56.76 4.25519 56.76 4.62C56.76 4.98481 56.4645 5.28 56.1 5.28C55.9131 5.28 55.7443 5.20201 55.624 5.07762C55.5632 5.01446 55.5147 4.93904 55.4829 4.8559C55.4552 4.78243 55.44 4.70315 55.44 4.62C55.44 4.5549 55.4494 4.49174 55.4668 4.43244C55.4906 4.35188 55.5292 4.27775 55.5795 4.21329C55.7004 4.05926 55.8885 3.96 56.1 3.96ZM40.26 17.16C40.6245 17.16 40.92 17.4552 40.92 17.82C40.92 18.1848 40.6245 18.48 40.26 18.48C39.8955 18.48 39.6 18.1848 39.6 17.82C39.6 17.4552 39.8955 17.16 40.26 17.16ZM74.58 5.28C74.7701 5.28 74.9413 5.36057 75.0618 5.48882C75.2226 5.76662 75.24 5.85106 75.24 5.94C75.24 6.1585 75.1336 6.3525 74.9699 6.47238C74.8555 6.54393 74.7908 6.56584 74.7247 6.58775C74.6538 6.6 74.58 6.6C74.2156 6.6 73.92 6.30481 73.92 5.94C73.92 5.87684 73.929 5.8156 73.9455 5.7576C74.0657 5.50688 74.1595 5.41471 74.2728 5.35541C74.3647 5.30707 74.4691 5.28 74.58 5.28ZM21.66 33.52C22.0245 33.52 22.32 33.8152 22.32 34.18C22.32 34.5448 22.0245 34.84 21.66 34.84C21.2955 34.84 21 34.5448 21 34.18C21 33.8152 21.2955 33.52 21.66 33.52ZM8.16 32.86C8.16 32.4952 7.8645 32.2 7.5 32.2C7.1355 32.2 6.84 32.4952 6.84 32.86C6.84 33.2248 7.1355 33.52 7.5 33.52C7.8645 33.52 8.16 33.2248 8.16 32.86ZM7.5 23.68C7.8645 23.68 8.16 23.9752 8.16 24.34C8.16 24.7048 7.8645 25 7.5 25C7.1355 25 6.84 24.7048 6.84 24.34C6.84 23.9752 7.1355 23.68 7.5 23.68ZM19.32 18.48C19.32 18.1152 19.0245 17.82 18.66 17.82C18.2955 17.82 18 18.1152 18 18.48C18 18.8448 18.2955 19.14 18.66 19.14C19.0245 19.14 19.32 18.8448 19.32 18.48ZM5.66 11.84C6.0245 11.84 6.32001 12.1352 6.32001 12.5C6.32001 12.8648 6.0245 13.16 5.66 13.16C5.2955 13.16 5 12.8648 5 12.5C5 12.1352 5.2955 11.84 5.66 11.84ZM35.16 35.5C35.16 35.1352 34.8645 34.84 34.5 34.84C34.1355 34.84 33.84 35.1352 33.84 35.5C33.84 35.8648 34.1355 36.16 34.5 36.16C34.8645 36.16 35.16 35.8648 35.16 35.5ZM53.5 36.18C53.8645 36.18 54.16 36.4752 54.16 36.84C54.16 37.2048 53.8645 37.5 53.5 37.5C53.1355 37.5 52.84 37.2048 52.84 36.84C52.84 36.4752 53.1355 36.18 53.5 36.18ZM48.5 28.66C48.5 28.2952 48.2045 28 47.84 28C47.4755 28 47.18 28.2952 47.18 28.66C47.18 29.0248 47.4755 29.32 47.84 29.32C48.2045 29.32 48.5 29.0248 48.5 28.66ZM60.34 27.34C60.7045 27.34 61 27.6352 61 28C61 28.3648 60.7045 28.66 60.34 28.66C59.9755 28.66 59.68 28.3648 59.68 28C59.68 27.6352 59.9755 27.34 60.34 27.34ZM56.284 16.5C56.284 16.1352 55.9885 15.84 55.624 15.84C55.2595 15.84 54.964 16.1352 54.964 16.5C54.964 16.8648 55.2595 17.16 55.624 17.16C55.9885 17.16 56.284 16.8648 56.284 16.5ZM46.2 7.26C46.2 6.89519 45.9045 6.6 45.54 6.6C45.1755 6.6 44.88 7.26 44.88 7.26C44.88 7.62481 45.1755 7.92 45.54 7.92C45.9045 7.92 46.2 7.62481 46.2 7.26ZM33 9.34C33 8.9752 32.7045 8.68 32.34 8.68C31.9755 8.68 31.68 8.9752 31.68 9.34C31.68 9.7048 31.9755 10 32.34 10C32.7045 10 33 9.7048 33 9.34ZM16 4.8559C16.3645 4.8559 16.66 5.1511 16.66 5.5159C16.66 5.8807 16.3645 6.1759 16 6.1759C15.6355 6.1759 15.34 5.8807 15.34 5.5159C15.34 5.1511 15.6355 4.8559 16 4.8559ZM69.66 21.16C69.66 20.7952 69.3645 20.5 69 20.5C68.6355 20.5 68.34 20.7952 68.34 21.16C68.34 21.5248 68.6355 21.82 69 21.82C69.3645 21.82 69.66 21.5248 69.66 21.16ZM80.52 15.18C80.52 14.8152 80.2245 14.52 79.86 14.52C79.4956 14.52 79.2 14.8152 79.2 15.18C79.2 15.5448 79.4956 15.84 79.86 15.84C80.2245 15.84 80.52 15.5448 80.52 15.18ZM91.32 10C91.32 9.6352 91.0245 9.34 90.66 9.34C90.2955 9.34 90 9.6352 90 10C90 10.3648 90.2955 10.66 90.66 10.66C91.0245 10.66 91.32 10.3648 91.32 10Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </g>
    <defs>
      <clipPath id="star-hero-clip">
        <rect width="100" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Each character in its own overflow-hidden clip — slides up from y:110%
const CharMask = ({ text, charClassName = "", dataAttr }) =>
  text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
      <span
        className={`inline-block${charClassName ? ` ${charClassName}` : ""}`}
        {...{ [dataAttr]: "" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

// Each character as a plain inline span — opacity reveal creates typewriter feel.
// No overflow-hidden so text wraps naturally across lines.
const TypeWriter = ({ children }) =>
  String(children)
    .split("")
    .map((char, i) => (
      <span key={i} data-hero-type-char>{char}</span>
    ));

const Hero = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const ctaLightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline — absolute positions (seconds) preserve original delays
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      tl.from("[data-hero-status]",        { opacity: 0, y: 16, duration: 0.7 }, 0.1);
      // Word mask: "Digital Experiences," slides up word-by-word
      tl.from("[data-hero-word]",          { y: "110%", duration: 0.8, stagger: 0.11 }, 0.35);
      // Char mask: "Crafted." reveals char-by-char with a skew for drama
      tl.from("[data-hero-crafted-char]",  { y: "110%", skewX: -4, duration: 0.75, stagger: 0.04 }, 0.62);
      // Typewriter: chars appear one-by-one at a fixed interval — linear stagger = consistent typing pace
      tl.from("[data-hero-type-char]",     { opacity: 0, duration: 0.001, stagger: { each: 0.01, ease: "none" } }, 1.05);
      tl.from("[data-hero-cta]",           { opacity: 0, y: 16, duration: 0.7 }, 2.5);

      // Parallax: content slides up + fades out as section exits viewport (scrub = smooth)
      gsap.to(contentRef.current, {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Perimeter light orb — travels clockwise around the CTA pill border
      const btn = ctaBtnRef.current;
      const light = ctaLightRef.current;
      if (btn && light) {
        const lw = 130;
        const w = btn.offsetWidth;
        const h = btn.offsetHeight;
        const perimeter = 2 * (w + h);
        const dur = 3;
        gsap.set(light, { x: -lw / 2, y: -lw / 2 });
        const perimTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
        perimTl
          .to(light, { x: w - lw / 2, duration: (w / perimeter) * dur })
          .to(light, { y: h - lw / 2, duration: (h / perimeter) * dur })
          .to(light, { x: -lw / 2,    duration: (w / perimeter) * dur })
          .to(light, { y: -lw / 2,    duration: (h / perimeter) * dur });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-transparent pt-40 pb-48"
      id="home"
    >
      {/* Shader fills the section; IntersectionObserver inside pauses it when offscreen */}
      <AetherFlow />

      <div
        ref={contentRef}
        className="flex w-full max-w-3xl mx-auto flex-col z-10 text-center items-center pointer-events-none px-4 sm:px-8"
      >
        {/* Status dot */}
        <div data-hero-status className="mb-6 inline-flex w-fit items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Kartikay Shukla &mdash; Available
          </span>
        </div>

        {/* Headline — word mask reveal
            Each word sits inside an overflow-hidden span (the clip mask).
            The inner span slides up from y:110% → y:0 — GPU composited, zero layout reflow.
            pb-[0.12em] gives descenders (g, y) room so they don't clip. */}
        <h1 className="mb-6 sm:mb-8 font-display font-bold tracking-[-0.03em] leading-[1.1]">
          <span className="flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.5rem,7vw,6rem)] text-foreground">
            {["Digital", "Experiences,"].map((word) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.12em]">
                <span className="inline-block" data-hero-word>{word}</span>
              </span>
            ))}
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6rem)] text-muted-foreground italic font-normal">
            <CharMask text="Crafted." dataAttr="data-hero-crafted-char" />
          </span>
        </h1>

        {/* Paragraph — typewriter: each char fades in sequentially */}
        <p className="mb-8 max-w-xl font-body text-base sm:text-lg text-muted-foreground leading-relaxed pointer-events-auto">
          <TypeWriter>I write code that scales and craft interfaces that stick. Full-stack — from architecture decisions to the pixel that makes an interaction feel inevitable.</TypeWriter>
        </p>

        {/* CTA buttons */}
        <div data-hero-cta className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pointer-events-auto">
          <a
            ref={ctaBtnRef}
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-foreground px-10 py-4 font-body font-medium text-[15px] sm:text-[16px] text-background transition-opacity duration-300 hover:opacity-85"
          >
            {/* Traveling glow orb */}
            <div
              ref={ctaLightRef}
              className="pointer-events-none absolute"
              style={{
                width: 130,
                height: 130,
                background: theme === "dark"
                  ? "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at center, #ffffff 0%, transparent 70%)",
                mixBlendMode: theme === "dark" ? "multiply" : "overlay",
              }}
              aria-hidden
            />
            {/* Star dot pattern */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
              <StarBackground />
            </div>
            <span className="relative z-10">Start a project</span>
          </a>
          <a
            href="#journey"
            className="inline-flex items-center font-body font-medium text-[15px] sm:text-[16px] text-muted-foreground hover:text-foreground transition-colors duration-300 hover:underline underline-offset-4"
          >
            See the work
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
