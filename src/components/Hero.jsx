import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden" id="home">
      <div className="container md:flex items-center gap-12 px-4">
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2 inline-block mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Digital Experiences</span>
            <br />
            That Matter.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
            I'm <span className="font-semibold text-foreground">Kartikay Shukla</span>, a full-stack engineer
            transforming ideas into scalable, high-performance web applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button size="lg" className="rounded-full px-8 text-base" asChild>
              <a href="#projects">View Work</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>


        </motion.div>

        <motion.div
          className="flex-1 mt-12 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative z-10 bg-card border border-border rounded-xl shadow-2xl p-6 md:p-8 max-w-md mx-auto rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-muted-foreground ml-auto">developer.js</div>
            </div>

            <div className="font-mono text-sm space-y-2 text-foreground">
              <div><span className="text-purple-500">const</span> <span className="text-blue-500">developer</span> = <span className="text-yellow-500">{`{`}</span></div>
              <div className="pl-4">name: <span className="text-green-500">'Kartikay'</span>,</div>
              <div className="pl-4">skills: [<span className="text-green-500">'React'</span>, <span className="text-green-500">'Node'</span>],</div>
              <div className="pl-4">passion: <span className="text-red-500">true</span></div>
              <div><span className="text-yellow-500">{`}`}</span>;</div>
            </div>

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
              ⚛️
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
              🟢
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
