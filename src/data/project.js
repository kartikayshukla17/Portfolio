const project = [
  {
    title: "Notarize Doctor",
    tagline: "Catch Electron Mac signing failures before CI does.",
    description:
      "CLI plus a dashboard. It scans an Electron repo for macOS signing, notarization, and auto-update mistakes so the build dies on your machine instead of in CI.",
    tech: ["TypeScript", "Node.js", "Electron", "Next.js"],
    code: "https://github.com/kartikayshukla17/notarize-doctor",
    demo: "",
    status: "Shipping",
  },
  {
    title: "OffClock",
    tagline: "One link so your household knows when you're off the clock.",
    description:
      "A status page your household can open with no Slack account. Working, in a meeting, or done. There's a shutdown ritual so the day actually ends.",
    tech: ["Next.js", "Prisma", "Firebase", "Stripe"],
    code: "https://github.com/kartikayshukla17/offclock",
    demo: "",
    status: "Shipping",
  },
  {
    title: "CruxIO",
    tagline: "Crash investigation on top of Firebase Crashlytics.",
    description:
      "Ties crashes to GitHub commits, flags regressions, and ranks what to fix first. iOS, Android, Flutter, and React Native.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "Claude AI", "Firebase"],
    code: "",
    demo: "https://cruxio.io/",
    image: "/projects/cruxio.webp",
  },
  {
    title: "B2B Marketplace",
    tagline: "Buyers, sellers, and an admin in one marketplace.",
    description:
      "People list services or products and take orders. JWT auth, rate limits, server-side pagination, and a full order lifecycle.",
    tech: ["Next.js 15", "TypeScript", "Express", "MongoDB", "Prisma"],
    code: "https://github.com/kartikayshukla17/Marketplace-assignment",
    demo: "https://marketplace-assignment-bsc1.vercel.app/",
  },
  {
    title: "FirmCommand",
    tagline: "Task manager for small law firms.",
    description:
      "Leads and associates share work inside an org. Tasks, notifications, and hard data isolation so one firm never sees another.",
    tech: ["React", "Socket.io", "Node.js", "Express", "MongoDB", "JWT"],
    code: "https://github.com/kartikayshukla17/FirmCommand",
    demo: "https://firmcommand-frontend.onrender.com/",
    image: "/projects/firmcommand.webp",
  },
  {
    title: "HealthCare+",
    tagline: "Patients, doctors, appointments, and a RAG chatbot.",
    description:
      "Book a slot, see what's open, log water intake, and ask a Gemini RAG bot medical questions. React, Node, MongoDB, Redis, Docker.",
    tech: ["React", "RAG (Gemini)", "Node.js", "MongoDB", "Redis", "Docker"],
    code: "https://github.com/kartikayshukla17/HeathCare-",
    demo: "",
  },
  {
    title: "VisionaryAI",
    tagline: "Text to image, with credits and Razorpay.",
    description:
      "MERN app that sends prompts to Clipdrop. You get a credit wallet if you want to keep generating.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Razorpay"],
    code: "https://github.com/kartikayshukla17/Visionary_AI",
    demo: "https://visionary-ai-amber.vercel.app/",
    image: "/projects/visionaryai.webp",
  },
];

export default project;
