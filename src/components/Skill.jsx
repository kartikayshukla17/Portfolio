import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skill = ({ skills }) => {
  const getIcon = (category) => {
    switch (category) {
      case "Frontend":
        return "🎨";
      case "Backend":
        return "⚙️";
      case "Tools & Practices":
        return "🛠️";
      default:
        return "💻";
    }
  };

  return (
    <section className="py-20 bg-muted/50" id="skills">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A snapshot of the technologies and tools I use regularly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="text-2xl bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    {getIcon(group.category)}
                  </div>
                  <CardTitle className="text-lg">{group.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 hover:bg-primary/5 transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
