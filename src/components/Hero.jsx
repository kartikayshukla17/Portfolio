import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { EASE } from "../utils/motion";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

const CharMask = ({ text, dataAttr }) =>
  text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
      <span className="inline-block" {...{ [dataAttr]: "" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

const TypeWriter = ({ children }) =>
  String(children)
    .split("")
    .map((char, i) => (
      <span key={i} data-hero-type-char>{char}</span>
    ));

const HERO_LEDE =
  "At Verchool. OffClock, Notarize Doctor, and CruxIO are mine. The rest is in the archive.";

const Hero = () => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.from("[data-hero-word]", { y: "110%", duration: 0.7, stagger: 0.1 }, 0.1);
      tl.from("[data-hero-crafted-char]", { y: "110%", duration: 0.6, stagger: 0.03 }, 0.35);
      tl.from("[data-hero-type-char]", { opacity: 0, duration: 0.001, stagger: { each: 0.01, ease: "none" } }, 0.75);
      tl.from("[data-hero-cta]", { opacity: 0, y: 12, duration: 0.5 }, 2.1);
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-x-clip bg-transparent px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-20 lg:px-12 lg:pt-40 lg:pb-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start text-left">
        <p className="mb-5 font-body text-sm text-muted-foreground">
          Kartikay Shukla — available
        </p>

        <h1 className="mb-6 max-w-4xl font-display font-bold tracking-[-0.02em] leading-[1.08] sm:mb-8">
          <span className="flex flex-wrap gap-x-[0.28em] text-[clamp(2.5rem,7vw,6rem)] text-foreground">
            {["I", "ship", "the"].map((word) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.12em]">
                <span className="inline-block" data-hero-word>{word}</span>
              </span>
            ))}
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6rem)] font-medium text-muted-foreground">
            <CharMask text="whole product." dataAttr="data-hero-crafted-char" />
          </span>
        </h1>

        <p className="mb-8 max-w-[40rem] font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
          {prefersReducedMotion ? HERO_LEDE : <TypeWriter>{HERO_LEDE}</TypeWriter>}
        </p>

        <div data-hero-cta className="flex w-full max-w-sm flex-col items-stretch gap-4 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-8">
          <LiquidMetalButton
            label="Start a project"
            width={180}
            innerBackground="hsl(var(--foreground))"
            textColor="hsl(var(--background))"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <a
            href="#projects"
            className="inline-flex min-h-11 cursor-pointer items-center font-body text-[15px] font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline sm:text-[16px]"
          >
            See the work
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
