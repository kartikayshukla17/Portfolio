import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = memo(({ project }) => (
  <div
    data-project-card
    className="group flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-sm transition-all duration-500 relative"
  >
    <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 relative z-10">
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="px-3 py-1 bg-muted/50 text-foreground text-xs font-semibold rounded-full border border-border">
            {t}
          </span>
        ))}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold font-display mb-1.5 group-hover:text-foreground transition-colors duration-300 text-foreground">{project.title}</h3>
      <p className="text-muted-foreground font-body text-xs sm:text-sm font-medium mb-3">{project.tagline}</p>
      <p className="text-slate-600 dark:text-slate-400 font-body text-xs sm:text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-accent/10 text-accent hover:bg-accent/20 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-accent/20 hover:border-accent/40">
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            <span>Live App</span>
          </a>
        ) : (
          <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800/30 text-slate-400 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold cursor-not-allowed border border-border">
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            <span>Offline</span>
          </div>
        )}
        {project.code ? (
          <a href={project.code} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 glass-panel hover:bg-white/10 text-foreground py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-border/50">
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>Source</span>
          </a>
        ) : (
          <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800/20 text-slate-500 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold cursor-not-allowed border border-border/30">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Private</span>
          </div>
        )}
      </div>
    </div>
  </div>
));

const Projects = memo(({ projects }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-projects-header]", {
        opacity: 0, y: 24, duration: 0.8, ease: EASE,
        scrollTrigger: { trigger: "[data-projects-header]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
      gsap.from("[data-project-card]", {
        opacity: 0, y: 24, duration: 0.7, ease: EASE, stagger: 0.12,
        immediateRender: false,
        scrollTrigger: { trigger: "[data-projects-grid]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden"
      id="projects"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <div data-projects-header className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="text-accent font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">04. Archive</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-3">
            Featured <span className="text-muted-foreground font-normal italic">Projects.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body max-w-xl mx-auto text-sm">
            Code built to hold. Interfaces built to be remembered.
          </p>
        </div>

        <div data-projects-grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 sm:gap-12">
          {projects.map((project, index) => {
            const remainder = projects.length % 3;
            const lastRowStart = projects.length - remainder;
            const inLastRow = remainder !== 0 && index >= lastRowStart;
            const posInLastRow = index - lastRowStart;
            const colStart = inLastRow
              ? remainder === 1
                ? "md:col-start-3"
                : posInLastRow === 0 ? "md:col-start-2" : "md:col-start-4"
              : "";
            return (
              <div key={project.title} className={`md:col-span-2 ${colStart} h-full`}>
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Projects;
