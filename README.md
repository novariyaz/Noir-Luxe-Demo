# 🍫 Noir Luxe - Premium Artisan Chocolate (Demo Website)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla JS](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<div align="center">
  <img src="./assets/collection.png" alt="Noir Luxe Preview" width="100%" style="border-radius: 10px; margin-bottom: 2rem;"/>
</div>

<br />

> **Note:** This is a **demo website build** created to showcase modern web development techniques, responsive design, and performance optimization. It is not an actual ecommerce store.

## 🌟 Overview

**Noir Luxe** is an ultra-premium landing page for a fictional artisan chocolate brand. The project demonstrates a clean, luxurious UI/UX with a focus on immersive aesthetics, smooth animations, and high performance without relying on heavy frontend frameworks.

## 📖 Table of Contents
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
- [Performance Optimizations](#-performance-optimizations)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)

## ✨ Key Features

- **Premium UI/UX:** Dark mode aesthetics with glassmorphism effects and curated typographic scale.
- **Scroll Sequence Hero:** A scroll-controlled image sequence hero section that unwraps a chocolate truffle as the user scrolls down.
- **Responsive Design:** Fluid layouts and a mobile-optimized hamburger navigation menu ensuring a seamless experience across all device sizes.
- **Theming:** Integrated Light/Dark mode toggle that persists user preference effortlessly.
- **Form Integration:** A "Request Access" waitlist form pre-wired for backend services (e.g., Formspree).
- **SEO Ready:** Complete OpenGraph tags, semantic HTML5 structure, and meta descriptions optimized for search engines.

## 🛠️ Tech Stack

- **Core:** Semantic HTML5, CSS3, Vanilla JavaScript
- **Styling:** Custom Vanilla CSS utilizing CSS Variables (`root`), Grid, Flexbox, and complex micro-animations. No external CSS libraries like Tailwind were used to maintain absolute control.
- **Tooling:** [Vite](https://vitejs.dev/) for blazing fast development, Hot Module Replacement (HMR), and optimized production bundles.

## 🎨 Design System

Our design system is built to evoke a sense of high-end luxury, blending modern typography with timeless colors.

| Asset Type | Details |
| --- | --- |
| **Primary Font** | `Playfair Display` (Headings) - conveys elegance and tradition. |
| **Secondary Font** | `Lato` (Body text) - provides modern legibility. |
| **Primary Color** | Deep espresso / soft black (`#0A0908`) |
| **Accent Color** | Subtle gold (`#D4AF37`) |
| **Text Color** | Soft off-white text (`#F4F4F9`) |

## 🚀 Performance Optimizations

To ensure the landing page feels as premium as the product it showcases, we implemented several key performance strategies:

1. **Batch Conversion to WebP:** All hero sequence assets and showcase images have been compressed and converted to `.webp` format, dramatically reducing payload size.
2. **Resource Preloading:** Critical fonts and assets are explicitly preloaded or preconnected in the `<head>` of the HTML document.
3. **Lazy-loading:** Images below the fold are properly deferred to prioritize initial page load time.
4. **Vite Build Process:** The build process minimizes CSS, minifies JS, and optimally chunks assets for fastest possible delivery.

## 💻 Getting Started

To run this project locally, you need [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/novariyaz/Noir-Luxe-Demo.git
cd Noir-Luxe-Demo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
*The site will be available locally at `http://localhost:5173`.*

### 4. Build for production
```bash
npm run build
```
*The optimized static assets will be generated in the `dist/` folder, ready for deployment to Vercel, Netlify, or GitHub Pages.*

## 📁 Project Structure

```
noir-luxe/
├── public/                 # Static assets that bypass Vite's asset handling
│   └── heroanimations/     # Sequential frame images for scroll animation
├── assets/                 # Processed imagery for content sections
├── styles.css              # Main stylesheet containing all custom CSS & variables
├── main.js                 # Vanilla JS for DOM interactions, themes, and scroll sequence
├── index.html              # Entry point HTML document
├── package.json            # Node project configuration
└── vite.config.js          # Vite configuration settings
```

## 📜 License

This project is released under the MIT License. It is intended for demonstration and portfolio purposes. Feel free to use the code structure, scroll sequence logic, and animations as inspiration for your own projects!

---
*Created with passion by the developer community. Enjoy the code and the chocolate!* 🍫
