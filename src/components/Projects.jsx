import { memo, useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, EASE_GENTLE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

// ── Smooth 3D tilt on mouse move via GSAP quickTo ──────────────
const TiltCard = ({ children }) => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "rotateY", { duration: 0.55, ease: EASE_GENTLE });
    const yTo = gsap.quickTo(el, "rotateX", { duration: 0.55, ease: EASE_GENTLE });
    const sTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: EASE_GENTLE });

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      xTo(((e.clientX - left - width / 2) / width) * 10);
      yTo(-((e.clientY - top - height / 2) / height) * 10);
    };
    const onEnter = () => sTo(1.02);
    const onLeave = () => { xTo(0); yTo(0); sTo(1); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div style={{ perspective: "1200px" }}>
      <div ref={wrapRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
};

// ── Cover media: real screenshot, or a designed placeholder when no live demo exists ──
const ProjectCover = memo(({ project }) => {
  if (project.image) {
    return (
      <div data-card-reveal className="relative aspect-[16/10] overflow-hidden border-b border-border/50 bg-muted/30">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          width={1600}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      data-card-reveal
      className="relative aspect-[16/10] overflow-hidden border-b border-border/50"
      style={{
        backgroundImage:
          "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--card)) 60%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--pattern-fg) 1px, transparent 1px), linear-gradient(90deg, var(--pattern-fg) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <span className="absolute -bottom-4 left-4 font-display font-bold text-foreground/[0.06] text-[7rem] leading-none select-none">
        {project.title.charAt(0)}
      </span>
      <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-border/50 bg-card/80 px-3 py-1 text-[11px] font-medium text-muted-foreground">
        <span className="material-symbols-outlined text-[13px]">visibility_off</span>
        Preview unavailable
      </span>
    </div>
  );
});

// ── Shared card content ────────────────────────────────────────
const CardContent = memo(({ project }) => (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
    <ProjectCover project={project} />
    <div className="p-5 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5">
      <div data-card-reveal className="flex flex-wrap gap-2">
        {project.status && (
          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
            {project.status}
          </span>
        )}
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-3 py-1 bg-muted/50 text-foreground text-xs font-semibold rounded-full border border-border">
            {t}
          </span>
        ))}
      </div>

      <div data-card-reveal>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-1">{project.title}</h3>
        <p className="text-accent font-body text-sm font-medium">{project.tagline}</p>
      </div>

      <p data-card-reveal className="text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed">
        {project.description}
      </p>

      <div data-card-reveal className="flex flex-wrap gap-3 pt-1">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 bg-accent/10 text-accent hover:bg-accent/20 active:bg-accent/25 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 border border-accent/20 hover:border-accent/40">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_outward</span>
            Live App
          </a>
        ) : (
          <div className="inline-flex min-h-11 items-center gap-1.5 bg-muted/50 text-muted-foreground px-5 py-2.5 rounded-xl text-sm font-bold border border-border">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_outward</span>
            Offline
          </div>
        )}
        {project.code ? (
          <a href={project.code} target="_blank" rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 bg-muted/40 text-foreground px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 border border-border/50 hover:bg-muted">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">code</span>
            Source
          </a>
        ) : (
          <div className="inline-flex min-h-11 items-center gap-1.5 bg-muted/30 text-muted-foreground px-5 py-2.5 rounded-xl text-sm font-bold border border-border/30">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">lock</span>
            Private
          </div>
        )}
      </div>
    </div>
  </div>
));

// ── Main component ─────────────────────────────────────────────
const Projects = memo(({ projects }) => {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const cardAreaRef = useRef(null);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );

  // Track breakpoint — sticky archive + wheel-snap from 768px (same as GitHub main)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop: progress-driven ScrollTrigger (index via round to align with snap positions)
  useEffect(() => {
    if (!isDesktop) return;
    const n = projects.length;
    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
        setActive(idx);

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            height: `${((idx + 1) / n) * 100}%`,
            duration: 0.6,
            ease: EASE,
            overwrite: true,
          });
        }
      },
      invalidateOnRefresh: true,
    });
    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, [isDesktop, projects]);

  // Desktop: wheel-driven snap — intercept scroll inside the pinned section,
  // accumulate delta until a threshold is hit, then lenis.scrollTo the next project.
  useEffect(() => {
    if (!isDesktop) return;

    const section = outerRef.current;
    const n = projects.length;
    const THRESHOLD = 70;          // accumulated px before we snap
    const LOCK_MS = 850;           // cooldown between snaps
    let accumulated = 0;
    let locked = false;
    let decayTimer = null;

    // Derive current snap index from scroll position (no stale-closure issues)
    const currentIndex = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      return Math.round(progress * (n - 1));
    };

    const scrollToIndex = (i) => {
      const scrollRange = section.offsetHeight - window.innerHeight;
      const target = section.offsetTop + (i / (n - 1)) * scrollRange;
      const lenis = window.__lenis;
      if (lenis) {
        lenis.stop();          // kill any existing momentum
        lenis.start();
        lenis.scrollTo(target, {
          duration: 1.0,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect();
      // Only intercept while the sticky container is actually sticking
      const sticking = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!sticking) { accumulated = 0; return; }

      const cur = currentIndex();

      // At boundaries, let normal scroll through so user can leave the section
      if ((cur === 0 && e.deltaY < 0) || (cur === n - 1 && e.deltaY > 0)) {
        accumulated = 0;
        return;
      }

      e.preventDefault();
      if (locked) return;

      accumulated += e.deltaY;
      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => { accumulated = 0; }, 200);

      if (Math.abs(accumulated) >= THRESHOLD) {
        const dir = accumulated > 0 ? 1 : -1;
        const next = Math.max(0, Math.min(n - 1, cur + dir));
        accumulated = 0;

        if (next !== cur) {
          locked = true;
          scrollToIndex(next);
          setTimeout(() => { locked = false; accumulated = 0; }, LOCK_MS);
        }
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
      clearTimeout(decayTimer);
    };
  }, [isDesktop, projects]);

  // Desktop: staggered card transition when active project changes
  useEffect(() => {
    if (!isDesktop || prevActive.current === active || !cardAreaRef.current) return;
    const dir = active > prevActive.current ? 1 : -1;
    prevActive.current = active;

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    // Card container slides + fades in
    tl.fromTo(
      cardAreaRef.current,
      { opacity: 0, y: dir * 60, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    );

    // Stagger inner elements for a cascade reveal
    tl.fromTo(
      cardAreaRef.current.querySelectorAll("[data-card-reveal]"),
      { opacity: 0, y: dir * 18 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
      "-=0.35"
    );
  }, [active, isDesktop]);

  // Desktop: animate sliding highlight on nav items
  useEffect(() => {
    if (!isDesktop || !navRef.current) return;
    const items = navRef.current.querySelectorAll("[data-nav-item]");
    const activeItem = items[active];
    if (!activeItem) return;

    // Animate highlight bar position
    const highlight = navRef.current.querySelector("[data-nav-highlight]");
    if (highlight) {
      gsap.to(highlight, {
        y: activeItem.offsetTop,
        height: activeItem.offsetHeight,
        duration: 0.5,
        ease: EASE,
        overwrite: true,
      });
    }
  }, [active, isDesktop]);

  // Click list item → snap to that project via Lenis
  const scrollToProject = useCallback((i) => {
    const section = outerRef.current;
    if (!section) return;
    const scrollRange = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (i / (projects.length - 1)) * scrollRange;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [projects.length]);

  return (
    <section
      ref={outerRef}
      id="projects"
      style={{ height: isDesktop ? `${projects.length * 100}vh` : "auto" }}
      className="relative"
    >
      {/* ── Desktop: sticky two-panel layout ───────────────────────── */}
      <div ref={stickyRef} className="hidden md:flex md:flex-col sticky top-0 h-screen overflow-hidden">

        {/* Centered header */}
        <div className="shrink-0 px-10 pb-6 pt-10 text-left xl:px-14">
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Featured <span className="font-normal text-muted-foreground">projects.</span>
          </h2>
        </div>

        <div className="flex flex-1 overflow-hidden">

        {/* Left panel */}
        <div className="w-[38%] xl:w-1/3 flex flex-col justify-center px-10 xl:px-14 border-r border-border/20 relative shrink-0">

          {/* Progress bar — animated via GSAP */}
          <div className="absolute left-0 top-0 w-[2px] h-full bg-border/20">
            <div ref={progressRef} className="w-full bg-accent" style={{ height: "20%" }} />
          </div>

          {/* Numbered list with sliding highlight */}
          <nav ref={navRef} className="flex flex-col relative">
            {/* Floating highlight background */}
            <div
              data-nav-highlight
              className="absolute left-0 w-full bg-accent/8 rounded-xl pointer-events-none"
              style={{ height: 0, top: 0 }}
            />

            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                data-nav-item
                onClick={() => scrollToProject(i)}
                className={`text-left flex items-center gap-4 py-3 px-3 min-h-11 rounded-xl relative z-10 transition-colors duration-300 ${
                  i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold tabular-nums w-5 shrink-0 transition-colors duration-300 ${
                    i === active ? "text-accent" : "text-border/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display font-bold text-lg transition-colors duration-300 ${
                    i === active ? "text-foreground" : ""
                  }`}
                >
                  {p.title}
                </span>
                <span
                  className={`h-px flex-1 transition-colors duration-300 ${
                    i === active ? "bg-accent/50 scale-x-100" : "bg-border/20 scale-x-50"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
                <span
                  className={`material-symbols-outlined text-[14px] shrink-0 transition-opacity duration-200 ${
                    i === active ? "text-accent opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  arrow_forward
                </span>
              </button>
            ))}
          </nav>

          {/* Scroll hint */}
          <p data-scroll-hint className="text-xs text-muted-foreground/35 mt-10 flex items-center gap-2 pl-3">
            <span className="material-symbols-outlined text-[14px]">mouse</span>
            Scroll to explore
          </p>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-10 xl:p-14 relative">
          {/* Counter */}
          <div data-counter className="absolute top-8 right-10 font-mono text-xs text-muted-foreground/40 tabular-nums">
            <span className="text-foreground font-bold text-sm">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1">/</span>
            {String(projects.length).padStart(2, "0")}
          </div>

          <div ref={cardAreaRef} className="w-full max-w-lg">
            <TiltCard>
              <CardContent project={projects[active]} />
            </TiltCard>
          </div>
        </div>
        </div>
      </div>

      {/* ── Phone: stacked cards ───────────────────────────────────── */}
      <div className="md:hidden px-5 py-20 sm:px-8 pb-[max(5rem,env(safe-area-inset-bottom))]">
        <div className="mb-12 text-left">
          <h2 className="mb-3 font-display text-4xl font-bold text-foreground">
            Featured <span className="font-normal text-muted-foreground">projects.</span>
          </h2>
          <p className="max-w-xl font-body text-sm text-slate-500 dark:text-slate-400">
            Live apps, and a few still getting built.
          </p>
        </div>

        <div data-projects-grid className="flex flex-col gap-5">
          {projects.map((p) => (
            <div key={p.title} data-project-card>
              <CardContent project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
