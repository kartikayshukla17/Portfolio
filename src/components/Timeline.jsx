import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const timelineItems = [
  {
    year: "2025",
    title: "Full Stack Developer",
    description:
      "Building scalable web applications, mastering modern frameworks like React, Next.js, and Node.js to create seamless digital experiences.",
  },
  {
    year: "2022",
    title: "iOS Developer",
    description:
      "Started the journey with mobile app development, creating intuitive iOS applications using Swift and SwiftUI.",
  },
];

const Timeline = () => {
  return (
    <section className="py-20 bg-muted/50" id="timeline">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Journey</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My evolution from mobile development to full-stack engineering.
        </p>

        <div className="max-w-3xl mx-auto space-y-8">
          {timelineItems.map((item, index) => (
            <div
              className="relative pl-8 md:pl-0"
              key={item.year}
            >
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

              <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 group`}>
                <div className="hidden md:block w-1/2" />

                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1.5 z-10" />

                <div className="md:w-1/2">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <span className="text-sm font-bold text-primary mb-1 block">{item.year}</span>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
