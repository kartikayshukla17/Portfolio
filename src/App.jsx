import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skills from "./data/skills.js";
import project from "./data/project.js";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StampField from "./components/ui/stamp-field";

gsap.registerPlugin(ScrollTrigger);

const About = lazy(() => import("./components/About"));
const Skill = lazy(() => import("./components/Skill"));
const Timeline = lazy(() => import("./components/Timeline"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = window.__lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Drive Lenis from GSAP's ticker — both systems share the exact same
    // frame, so ScrollTrigger always reads the post-Lenis scroll position.
    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // Recalculate all trigger positions after lazy components have mounted + painted
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshId);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <StampField />
      <div className="page-grain" aria-hidden="true" />
      <div className="relative z-10 flex min-h-dvh flex-col overflow-clip font-body text-slate-900 antialiased transition-colors duration-300 dark:text-slate-100">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative z-10">
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Skill skills={skills} />
            <Timeline />
            <Projects projects={project} />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default App;
