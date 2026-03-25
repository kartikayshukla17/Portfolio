import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { EASE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

// Each character in its own overflow-hidden clip — animates up from y:110%
const CharMask = ({ text, charClassName = "" }) =>
  text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
      <span
        className={`inline-block${charClassName ? ` ${charClassName}` : ""}`}
        data-about-char
      >
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

// Each word in its own overflow-hidden clip — animates up from y:110%
const WordMask = ({ children }) =>
  String(children)
    .split(" ")
    .map((word, i, arr) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
        <span className="inline-block" data-about-word>
          {word}
        </span>
        {i < arr.length - 1 && "\u00A0"}
      </span>
    ));

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chars slide up from clip, staggered left→right
      gsap.from("[data-about-char]", {
        y: "110%",
        duration: 0.75,
        ease: EASE,
        stagger: 0.025,
        scrollTrigger: {
          trigger: "[data-about-header]",
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Label fades in just before chars start
      gsap.from("[data-about-label]", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: EASE,
        scrollTrigger: {
          trigger: "[data-about-header]",
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Words slide up from clip on scroll
      gsap.from("[data-about-word]", {
        y: "110%",
        duration: 0.65,
        ease: EASE,
        stagger: 0.045,
        scrollTrigger: {
          trigger: "[data-about-text]",
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Body paragraph — opacity + x slide (denser text, word-split would be too noisy)
      gsap.from("[data-about-body]", {
        opacity: 0,
        x: -24,
        duration: 0.7,
        ease: EASE,
        delay: 0.3,
        scrollTrigger: {
          trigger: "[data-about-text]",
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-about-links]", {
        opacity: 0, scale: 0.95, duration: 0.9, ease: EASE, delay: 0.2,
        scrollTrigger: { trigger: "[data-about-links]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      id="about"
    >
      <div
        data-about-header
        className="mb-12 sm:mb-16 md:mb-20 flex flex-col items-center text-center"
      >
        <span data-about-label className="text-accent font-display font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">01. Identity</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display text-foreground">
          <span className="inline-flex flex-wrap justify-center">
            <CharMask text={"The "} />
            <CharMask
              text="Architect."
              charClassName="text-muted-foreground font-normal italic"
            />
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Column */}
        <div data-about-text className="md:col-span-7 flex flex-col gap-5">
          <p className="text-lg sm:text-2xl font-display font-bold text-foreground leading-snug">
            <WordMask>I focus on building complete digital products.</WordMask>
          </p>
          <p data-about-body className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-loose">
            My approach is built on a simple duality: systems that hold under real load, and interfaces that earn repeat visits.
            I don't treat performance and aesthetics as trade-offs — the architecture informs the feel, and the feel drives the architecture.
            That tension is where the best products live.
          </p>
        </div>

        {/* Links Column */}
        <div data-about-links className="md:col-span-5 relative">
          <div className="glass-panel aura-border p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-5 sm:mb-6 text-foreground">Connect</h3>

            <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
              <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-all duration-500 group/link">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-5 h-5 text-foreground group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">GitHub</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-foreground transition-all text-base">arrow_forward</span>
              </a>

              <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-all duration-500 group/link">
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="w-5 h-5 text-foreground group-hover/link:scale-110 transition-transform" />
                  <span className="font-body font-medium text-sm sm:text-base text-foreground">LinkedIn</span>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover/link:translate-x-1 group-hover/link:text-foreground transition-all text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
