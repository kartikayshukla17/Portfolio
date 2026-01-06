# Kartikay.dev | Full Stack Developer Portfolio

A modern, high-performance personal portfolio website designed to showcase my journey, skills, and featured projects. Built with a focus on premium aesthetics, interactivity, and clean code.

![Portfolio Banner](public/og-image.png)

## ✨ Key Features

- **Modern Design System**: Built with **Shadcn UI** components and **Tailwind CSS** for a consistent, professional look.
- **Dynamic Animations**: Smooth entrance, scroll, and interaction animations powered by **Framer Motion**.
- **Dark/Light Mode**: Robust theme switching with system preference detection using a custom `useTheme` hook.
- **Responsive Layout**: Mobile-first architecture ensuring perfect rendering on all devices.
- **Glassmorphism**: Subtle blur and transparency effects in the header and cards.
- **Performance Optimized**: Fast loading times with optimized assets and code splitting (Vite).

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Button, Card)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`

## 🚀 Getting Started

Follow these steps to run the portfolio locally:

### 1. Clone the Repository
```bash
git clone https://github.com/kartikayshukla17/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

## 📂 Project Structure

```bash
src/
├── components/         # React components
│   ├── ui/             # Reusable Shadcn UI components (Button, Card, etc.)
│   ├── Header.jsx      # Navigation and Theme Toggle
│   ├── Hero.jsx        # Landing section with animations
│   ├── About.jsx       # Biography section
│   ├── Skill.jsx       # Tech stack grid
│   ├── Projects.jsx    # Featured projects showcase
│   ├── Timeline.jsx    # Career journey
│   └── Contact.jsx     # Contact form and social links
├── data/               # Static content data
│   ├── project.js      # Project details
│   └── skills.js       # Skills list
├── hooks/
│   └── useTheme.js     # Theme management logic
├── lib/
│   └── utils.js        # Class merging utility
├── index.css           # Global styles & Tailwind config
└── main.jsx            # Application entry point
```

## 📬 Contact

- **Email**: [kartikayshukla17@gmail.com](mailto:kartikayshukla17@gmail.com)
- **LinkedIn**: [Kartikay Shukla](https://www.linkedin.com/in/kartikay-shukla-27357a243/)
- **GitHub**: [kartikayshukla17](https://github.com/kartikayshukla17)

---

© 2026 Kartikay Shukla. All rights reserved.
