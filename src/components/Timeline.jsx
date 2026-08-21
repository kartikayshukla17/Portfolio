import { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: "2026",
    title: "Full Stack Developer",
    company: "Verchool Platforms",
    description:
      "Joined a product team. I write the web app, both sides, and I ship it.",
    icon: "code",
  },
  {
    year: "2025",
    title: "Full Stack Developer",
    company: "Independent",
    description:
      "Freelance before Verchool. React, Next.js, Node. Paid work and the messy parts of getting something live.",
    icon: "layers",
  },
  {
    year: "2022",
    title: "iOS Developer",
    company: "Origins",
    description: "Where I started: iOS apps in Swift and SwiftUI. Trying to make something that felt obvious in the hand.",
    icon: "terminal",
  },
];

const Timeline = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        },
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
        <div className="mb-12 text-left sm:mb-16 lg:mb-20">
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            The <span className="font-normal text-muted-foreground">path.</span>
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

          <div data-timeline-items className="space-y-10 sm:space-y-14 md:space-y-20">
            {timelineItems.map((item, index) => (
              <div
                key={`${item.year}-${item.title}`}
                data-timeline-item
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group pl-14 sm:pl-16 md:pl-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`flex w-full md:w-[45%] flex-col ${index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-accent font-display font-bold mb-1.5 tracking-widest text-xs sm:text-sm">{item.year}</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3 text-xs sm:text-sm uppercase tracking-wide">{item.company}</p>

                  <p className="max-w-md font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>

                {/* Node */}
                <div className="absolute left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-accent text-accent-foreground sm:left-6 sm:h-12 sm:w-12 md:left-1/2">
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
