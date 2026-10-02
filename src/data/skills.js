// Icons are self-hosted in public/skills/<icon>.svg. Items without `icon` render a monogram.
const skills = [
  {
    id: "frontend",
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "JavaScript (ES6+)", icon: "javascript", mono: "JS" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", mono: "{ }" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
      { name: "Firebase", icon: "firebase" },
      { name: "Hono", icon: "hono", mono: "Hn" },
      { name: "Nest.js", icon: "nestjs" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Practices",
    items: [
      { name: "Git & GitHub", icon: "github" },
      { name: "Electron", icon: "electron" },
      { name: "CI/CD basics", icon: "githubactions" },
      { name: "GSAP", icon: "gsap", mono: "GS" },
      { name: "Lenis", mono: "Ln" },
    ],
  },
];

export default skills;
