import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import skills from "./data/skills.js";
import project from "./data/project.js";
import { useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-background font-body text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300 min-h-screen flex flex-col relative overflow-hidden">
      <CustomCursor />
      <Header />
      <motion.main
        className="z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Skill skills={skills} />
        <Timeline />
        <Projects projects={project} />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  );
};

export default App;
