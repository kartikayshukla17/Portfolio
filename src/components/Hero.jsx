import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../utils/motion";
import AetherFlow from "./ui/aether-flow";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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
          <LiquidMetalButton
            label="Start a project"
            width={160}
            innerBackground="hsl(var(--foreground))"
            textColor="hsl(var(--background))"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
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
