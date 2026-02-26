import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20" id="home">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row items-center justify-between gap-12 w-full mt-[-80px]">
        {/* Left Text */}
        <motion.div
          className="flex w-full flex-col lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Available for new projects</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Building Digital<br />
            <span className="text-primary neon-text">Experiences</span><br />
            That Matter.
          </h1>

          <p className="mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-400">
            Full-stack developer specializing in building high-performance web applications with modern tech stacks. Focused on clean code and exceptional user interfaces.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-primary px-8 py-3.5 font-bold text-background-dark transition-all hover:brightness-110 neon-glow">
              Start a Project
            </button>
            <button className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-3.5 font-bold text-white transition-all hover:bg-slate-700">
              View Portfolio
            </button>
          </div>
        </motion.div>

        {/* Right Code Block Box */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-700/50 bg-[#0f172a] shadow-2xl neon-border rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="flex items-center gap-2 border-b border-slate-700/50 bg-[#1e293b]/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-2 text-xs font-medium text-slate-400 font-mono">Portfolio.tsx</span>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-slate-300">
              <div className="text-teal-400">const <span className="text-slate-100">Developer</span> <span className="text-pink-400">=</span> <span className="text-yellow-300">{`{`}</span></div>
              <div className="pl-6">name: <span className="text-green-400">'Kartikay'</span>,</div>
              <div className="pl-6">role: <span className="text-green-400">'Full Stack Engineer'</span>,</div>
              <div className="pl-6">skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Node'</span>],</div>
              <div className="pl-6">passionate: <span className="text-blue-400">true</span>,</div>
              <div className="pl-6">status: <span className="text-green-400">'Building the future'</span></div>
              <div className="text-yellow-300">{`}`};</div>
              <br />
              <div className="text-purple-400">function <span className="text-blue-300">createImpact</span><span className="text-yellow-300">()</span> <span className="text-yellow-300">{`{`}</span></div>
              <div className="pl-6 text-slate-500 italic">// Transform ideas into reality</div>
              <div className="pl-6"><span className="text-purple-400">return</span> Developer.skills.map(skill =&gt; <span className="text-purple-300">{`{`}</span></div>
              <div className="pl-12">Deploy(skill)</div>
              <div className="pl-6"><span className="text-purple-300">{`}`}</span>);</div>
              <div className="text-yellow-300">{`}`}</div>
            </div>
          </div>
        </motion.div >
      </div >
    </section >
  );
};

export default Hero;
