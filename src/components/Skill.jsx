import { memo, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const Skill = memo(({ skills }) => {
  const sectionRef = useRef(null);
  const flatSkills = useMemo(() => skills.flatMap((s) => s.items), [skills]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skills-header]", {
        opacity: 0, y: 20, duration: 0.7, ease: EASE,
        scrollTrigger: { trigger: "[data-skills-header]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
      gsap.from("[data-skill-chip]", {
        opacity: 0, y: 24, duration: 0.6, ease: EASE, stagger: 0.04,
        scrollTrigger: { trigger: "[data-skills-grid]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
      gsap.from("[data-skill-category]", {
        opacity: 0, y: 20, duration: 0.6, ease: EASE, stagger: 0.12,
        scrollTrigger: { trigger: "[data-skills-mobile]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 px-6 lg:px-12 bg-transparent relative" id="skills">
      <div className="mx-auto max-w-7xl relative z-10">

        <div
          data-skills-header
          className="sticky top-[72px] z-20 text-center pb-8 pt-4 -mx-6 lg:-mx-12 px-6 lg:px-12 bg-background-light/90 dark:bg-background/90 backdrop-blur-sm"
        >
          <span className="text-accent font-display font-bold text-sm tracking-widest uppercase mb-4 block">02. Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
            Core <span className="text-muted-foreground font-normal italic">Technologies.</span>
          </h2>
        </div>

        {/* ── Mobile: categorized layout ─────────────────────────── */}
        <div data-skills-mobile className="sm:hidden flex flex-col gap-8 pt-6">
          {skills.map((category) => (
            <div key={category.category} data-skill-category>
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-accent/70 mb-3 px-1">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((skill) => (
                  <div
                    key={skill}
                    data-skill-chip
                    className="px-4 py-2 bg-background border border-border/50 rounded-lg hover:border-accent/30 hover:bg-muted/30 transition-all duration-[400ms]"
                  >
                    <span className="text-sm font-body text-slate-700 dark:text-slate-300 tracking-wide">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop: flat chip cloud ──────────────────────────── */}
        <div
          data-skills-grid
          className="hidden sm:flex flex-wrap justify-center gap-5 sm:gap-6 max-w-4xl mx-auto pt-10"
        >
          {flatSkills.map((skill) => (
            <div
              key={skill}
              data-skill-chip
              className="group relative px-6 py-3 bg-background border border-border/50 rounded-lg hover:border-accent/30 hover:bg-muted/30 transition-all duration-[400ms] overflow-hidden"
            >
              <span className="text-sm md:text-base font-body text-slate-700 dark:text-slate-300 tracking-wide relative z-10 group-hover:text-foreground transition-colors duration-[400ms]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skill;
