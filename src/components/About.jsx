import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-20 bg-muted/30" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Full stack engineer with a passion for clean code, clear
            explanations, and practical learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/10">
              <CardContent className="p-8">
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="text-xl font-bold mb-4">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a full stack developer specialising in React, Next.js,
                  Node.js, and modern JavaScript tooling. I love turning complex
                  ideas into simple, usable interfaces.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/10">
              <CardContent className="p-8">
                <div className="text-4xl mb-6">⚡</div>
                <h3 className="text-xl font-bold mb-4">What I Do</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">▹</span>
                    <span className="text-muted-foreground">Design & build full-stack web apps (MERN / Next.js)</span>
                  </li>

                  <li className="flex items-start">
                    <span className="mr-3 text-primary">▹</span>
                    <span className="text-muted-foreground">Career planning & technical interview prep</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
