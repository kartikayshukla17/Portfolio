import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skills from "./data/skills.js";
import project from "./data/project.js";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomCursor from "./components/ui/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const About = lazy(() => import("./components/About"));
const Skill = lazy(() => import("./components/Skill"));
const Timeline = lazy(() => import("./components/Timeline"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
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
    <div className="bg-background-light dark:bg-background font-body text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300 min-h-screen flex flex-col relative overflow-clip">
      <CustomCursor />
      <Header />
      <main className="z-10 relative">
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
  );
};

export default App;
