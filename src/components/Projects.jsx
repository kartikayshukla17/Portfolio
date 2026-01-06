import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = ({ projects }) => {
  return (
    <section className="py-20 bg-background" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selected work that showcases my passion for building robust and scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <CardDescription className="text-sm font-medium text-foreground/80">
                    {project.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4 pt-4 border-t border-border/50">
                  {project.demo && (
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                  {project.code && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/20 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                      asChild
                    >
                      <a href={project.code} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Source
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
