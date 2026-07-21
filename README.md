# 🚀 ZEPLOY TECH — We Deploy Your Vision

<p align="center">
  <img src="assets/logo.png" alt="Zeploy Tech Logo" width="160" />
</p>

<p align="center">
  <a href="https://www.zeploy.tech/"><img src="https://img.shields.io/badge/Live_Demo-Online-00FF66?style=for-the-badge&logo=vercel&logoColor=black" alt="Live Demo" /></a>
  <a href="https://wa.me/923033236878"><img src="https://img.shields.io/badge/Contact-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/TanStack_Start-Beta-FF4154?style=for-the-badge&logo=react&logoColor=white" alt="TanStack Start" />
  <img src="https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-Latest-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## 🌌 Overview

**Zeploy Tech** is an elite software engineering and AI studio dedicated to building high-performance, scalable web applications, mobile apps, AI-driven solutions, and cloud architectures. 

This repository houses the source code for the official Zeploy Tech website. The application features a cutting-edge design system, hardware-accelerated 3D interactions, ultra-fast performance, and a full-stack architecture powered by **TanStack Start** and **React 19**.

---

## ✨ Core Features

### 🎨 Premium Dark-Tech UI & Aesthetics
* **Visual Excellence**: Built with a sleek, premium SaaS-inspired dark theme using curated colors (rich deep slate and charcoal backdrops with vibrant teal/emerald gradients).
* **Glassmorphism**: Soft-blended cards, interactive blur backdrops, and clean bento-grid structures.
* **Micro-interactions**: Tasteful hover states, custom button animations, and smooth dynamic layouts.

### 🌌 Immersive 3D Experience
* **React Three Fiber & Drei**: Interactive, low-latency 3D hero background scene (`HeroScene.tsx`) rendering responsive particles that react to user inputs.
* **Smart Fallbacks**: CPU-friendly and responsive 2D fallback design for mobile devices and low-spec browsers to keep scrolling fluid.

### ⚡ Cutting-Edge Web Engine
* **React 19 & TanStack Start**: Server-Side Rendering (SSR) out of the box with instant hydration, full-stack route handlers, and React Query integration for efficient state synchronization.
* **Vite-Powered Pipeline**: Quick HMR (Hot Module Replacement) and fast build processes.
* **Tailwind CSS v4**: Utilizes the modern, blazing-fast CSS framework featuring compiler-native CSS variables and streamlined layout styles.

### 📈 Optimized Analytics & Performance
* **Total Blocking Time (TBT) Optimization**: Implements deferred, interactive script loading. Scripts like Google Analytics 4 (GA4) and Microsoft Clarity initialize only upon user interaction (mouse moves, touch, clicks), boosting initial Lighthouse performance scores.
* **SEO Mastery**: Optimized XML sitemaps, structured HTML5 markup, meta tags, and complete responsive grid layouts.

### 💬 Seamless Communications
* **Custom Inquiry / WhatsApp System**: Clients can configure forms or launch instant chat queries (`https://wa.me/923033236878`) directly mapping to lead generation pipelines.

---

## 📂 Project Architecture

```bash
zeploy-web/
├── public/                 # Static assets, logos, sitemaps, and robots configuration
│   ├── projects/           # Screenshots of curated projects
│   ├── logo.webp           # Optimized web logo format
│   ├── robots.txt          # Search engine indexing rules
│   └── sitemap.xml         # Auto-generated XML sitemap
├── src/                    # Core source codebase
│   ├── assets/             # Raw image assets (team portraits, banner, logo)
│   ├── components/         # Reusable UI & custom feature components
│   │   ├── ui/             # Radix & shadcn primitives (accordion, dialog, tabs, etc.)
│   │   └── zeploy/         # Custom Zeploy components (Analytics, BackgroundScenes, HeroScene)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Client & server helpers, and configurations
│   ├── routes/             # TanStack Router folder-based routing structure
│   │   ├── __root.tsx      # Root component, global layout, navigation, and toast system
│   │   ├── index.tsx       # Landing page (combining all core sections)
│   │   └── notes.$slug.tsx # Blog/notes page template
│   ├── router.tsx          # TanStack Router instance setup
│   ├── server.ts           # TanStack Start server configuration
│   ├── start.ts            # Entrypoint for bootstrapping the TanStack Start app
│   └── styles.css          # Global Tailwind CSS directives and custom animations
├── package.json            # Project dependencies and script configurations
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build pipeline with TanStack Router plugin
```

---

## 🚀 Getting Started

### Prerequisites
* **Bun** (Recommended) or **Node.js** (v18+)
* **Git** installed on your machine

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/syedasjadabbas/zeploy-web.git
   cd zeploy-web
   ```

2. **Install dependencies:**

   Using **Bun** (Recommended):
   ```bash
   bun install
   ```
   
   Using **NPM**:
   ```bash
   npm install
   ```

3. **Start the local development server:**

   Using **Bun**:
   ```bash
   bun dev
   ```

   Using **NPM**:
   ```bash
   npm run dev
   ```

   *The development server will boot up, typically at [http://localhost:3000](http://localhost:3000).*

### 🛠️ Production Build

To generate an optimized production bundle:

Using **Bun**:
```bash
bun run build
```

Using **NPM**:
```bash
npm run build
```

You can preview the production build locally:
```bash
npm run preview
```

---

## 👥 The Team

* **Syed Asjad Abbas** — *Founder & CEO*
* **Rana Asad Ur Rehman** — *Co-Founder*
* **Ahsan Niazi** — *Senior Partner*
* **Syed Hassan Ali** — *Senior Partner*

---

## 🌐 Contact & Social Connect

* **Email:** [zeploytech@gmail.com](mailto:zeploytech@gmail.com)
* **LinkedIn:** [Zeploy Tech on LinkedIn](https://www.linkedin.com/company/zeploy-tech/)
* **Instagram:** [@zeploy.tech](https://www.instagram.com/zeploy.tech/)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<p align="center">Made with ⚡ and ❤️ by the Zeploy Tech Team</p>
