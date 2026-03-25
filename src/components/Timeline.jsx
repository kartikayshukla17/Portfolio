import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: "2025",
    title: "Full Stack Developer",
    company: "Present",
    description: "Architecting full-stack products where scalable backend systems meet interfaces users actually remember. React, Next.js, Node.js — chosen for what they enable, not what they signal.",
    icon: "code",
  },
  {
    year: "2022",
    title: "iOS Developer",
    company: "Origins",
    description: "Started the journey with mobile app development, creating intuitive iOS applications using Swift and SwiftUI.",
    icon: "terminal",
  },
];

const Timeline = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-timeline-header]", {
        opacity: 0, y: 20, duration: 0.7, ease: EASE,
        scrollTrigger: { trigger: "[data-timeline-header]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });

      // Glow orb travels down the track as user scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 95%",
        end: "bottom 65%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const h = trackRef.current ? trackRef.current.offsetHeight : 0;
          gsap.set(fillRef.current, { height: p * h });
          gsap.set(orbRef.current, { top: p * h });
        },
      });

      gsap.from("[data-timeline-item]", {
        opacity: 0, y: 30, duration: 0.8, ease: EASE, stagger: 0.15,
        scrollTrigger: { trigger: "[data-timeline-items]", start: "top 85%", once: true, invalidateOnRefresh: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 overflow-hidden bg-transparent"
      id="journey"
    >
      <div className="mx-auto max-w-5xl">
        <div data-timeline-header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-accent font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">03. Evolution</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground">
            The <span className="text-muted-foreground font-normal italic">Journey.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Track (always visible, dim) */}
          <div
            ref={trackRef}
            className="absolute left-5 sm:left-6 md:left-1/2 h-full w-0.5 md:-translate-x-1/2 bg-border/25 rounded-full"
          />
          {/* Fill — grows from top as user scrolls */}
          <div
            ref={fillRef}
            className="absolute left-5 sm:left-6 md:left-1/2 w-0.5 md:-translate-x-1/2 bg-accent rounded-full"
            style={{ height: 0, top: 0 }}
          />
          {/* Traveling glow orb */}
          <div
            ref={orbRef}
            className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent -translate-y-1/2"
            style={{
              top: 0,
              boxShadow: "0 0 8px 3px hsl(38 90% 55% / 0.8), 0 0 20px 8px hsl(38 90% 55% / 0.35)",
            }}
          />

          <div data-timeline-items className="space-y-10 sm:space-y-14 md:space-y-20">
            {timelineItems.map((item, index) => (
              <div
                key={item.year}
                data-timeline-item
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group pl-14 sm:pl-16 md:pl-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`flex w-full md:w-[45%] flex-col ${index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-accent font-display font-bold mb-1.5 tracking-widest text-xs sm:text-sm">{item.year}</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3 text-xs sm:text-sm uppercase tracking-wide">{item.company}</p>

                  <div className="glass-panel aura-border p-4 sm:p-6 rounded-2xl">
                    <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-5 sm:left-6 md:left-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-accent text-accent-foreground shadow-[0_0_15px_hsl(38_90%_55%/0.4)] transition-all duration-300">
                  <span className="material-symbols-outlined text-base sm:text-lg">{item.icon}</span>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Timeline);
