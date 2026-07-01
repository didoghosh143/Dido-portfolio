<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<br />

<h1 align="center">✨ AI Agent Engineer Portfolio</h1>

<p align="center">
  A state-of-the-art, high-performance personal portfolio engineered with <b>Next.js 15 (App Router)</b>, <b>TypeScript</b>, and fully GPU-accelerated <b>Framer Motion</b> physics.
</p>

## 🚀 Technical Highlights

- **Next.js 15 App Router:** Cutting-edge React architecture ensuring blazing fast load times and optimal SEO.
- **Framer Motion Engine:** Complex, physics-based micro-interactions, layout transitions, and dynamic SVG animations utilizing `viewport={{ once: true }}` for lag-free mobile rendering.
- **Lenis Smooth Scroll:** Buttery smooth scroll physics hijacking native scroll events with custom exponential easing interpolation (`lerp: 0.08`, `syncTouch: true`).
- **Dynamic Theming System:** Intelligent Light/Dark mode with dynamic ambient CSS glow effects and `glassmorphism` backdrops.
- **Zero-JS GPU Backgrounds:** Procedural dot-grid ambient drifting backgrounds rendered entirely on the GPU (`transform-gpu`) for zero main-thread blocking.

## 🛠️ Tech Stack

| Domain | Technologies |
| --- | --- |
| **Framework** | Next.js 15, React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Vanilla CSS (Variables) |
| **Animation** | Framer Motion, react-type-animation |
| **Physics** | Lenis Scroll |
| **Assets** | Lucide React, React Icons |

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js and `pnpm` installed.

### Installation

1. Clone the repository
```bash
git clone https://github.com/didoghosh143/Dido-portfolio.git
cd Dido-portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. Run the development server
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Mobile Optimization
- **`overflow-x-hidden` strict boundaries** prevent rogue responsive layout shifts.
- **`syncTouch` scroll routing** natively captures and smoothes mobile touch events.
- **`touchMultiplier` amplification** allows for long, elegant swipes across the interface.
- Heavy backdrop filters are dynamically dropped for `pointer: coarse` devices to preserve GPU memory on mobile.

<br />
<p align="center">
  <i>Engineered by Deep Ghosh — Building intelligent systems at the intersection of code and AI.</i>
</p>
