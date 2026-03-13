# Hemant Hedaoo – Parallax Portfolio

A responsive, single-page parallax portfolio website built with vanilla HTML, CSS, and JavaScript. It features smooth scroll snapping, animated skill cards, a project modal gallery, a timeline-based experience section, and a contact form.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Customisation Guide](#customisation-guide)
5. [Deployment](#deployment)

---

## Prerequisites

Make sure the following are installed on your machine before you begin:

| Tool | Minimum Version | Download |
|------|----------------|---------|
| [Node.js](https://nodejs.org/) | 18 LTS or later | https://nodejs.org/ |
| npm (bundled with Node.js) | 9 or later | – |
| A modern web browser | Latest Chrome / Firefox / Edge / Safari | – |

> **Tip:** Run `node -v` and `npm -v` in your terminal to verify the installed versions.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hailkira29/hailkira29.github.io.git
cd hailkira29.github.io
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). Open it in your browser to preview the site with hot module replacement.

### 4. Build for production

```bash
npm run build
```

The optimised output is written to the `dist/` folder.

### 5. Preview the production build locally

```bash
npm run preview
```

---

## Project Structure

```
hailkira29.github.io/
├── assets/           # Images used by the site (hero, profile, project screenshots)
│   ├── hero.webp
│   ├── profile.jpg
│   ├── profile.webp
│   ├── project1.webp
│   ├── project2.webp
│   └── project3.webp
├── index.html        # Main HTML document – all sections live here
├── styles.css        # All styles (theme variables, layout, animations, responsive)
├── scripts.js        # Vanilla JS for scroll effects, modals, dot-nav, and Rellax init
├── vite.config.js    # Vite build configuration
├── package.json      # npm scripts and dev dependencies
└── README.md         # This file
```

---

## Customisation Guide

All personalisation is done by editing **`index.html`**, **`styles.css`**, and **`scripts.js`**. No build step is needed to see changes when using `npm run dev`.

### Update personal information

Open `index.html` and update the following areas:

| What to change | Where to find it |
|----------------|-----------------|
| Name and job title | `<h1 class="hero-title">` and `<h2 class="hero-subtitle">` inside `#hero` |
| About Me text and skill list | `<section id="about">` |
| Skill cards (name, level) | `<section id="skills">` – set `--level` (0–100) and the `<span>` label |
| Projects (title, description, links) | `<section id="projects">` thumbnails and the `<div class="modal">` elements |
| Experience timeline entries | `<section id="experience">` timeline items |
| Contact form and social links | `<section id="contact">` |
| Google Maps embed location | Replace the `src` URL inside the `<iframe>` in `#contact` |

### Replace images

Place your own images in the `assets/` folder and update the corresponding `src` / `srcset` attributes in `index.html`:

```html
<!-- Profile photo (About section) -->
<source srcset="assets/profile.webp" type="image/webp" />
<img src="assets/profile.jpg" alt="Your name" loading="lazy" />
```

For the **hero background image**, open `styles.css`, locate the `.hero` selector, and update the `background` property:

```css
/* styles.css – Hero section */
.hero {
  background: url('assets/your-hero-image.webp') center/cover fixed no-repeat;
}
```

> Provide both `.webp` and a fallback format (`.jpg` / `.png`) for best browser compatibility.

### Change the colour theme

Edit the CSS custom properties at the top of `styles.css`:

```css
:root {
  --clr-primary:   #1a1a2e;  /* Page background */
  --clr-accent:    #e94560;  /* Highlight / buttons */
  --clr-secondary: #0f3460;  /* Card / header backgrounds */
  --clr-text:      #dddddd;  /* Body text */
  --radius:        0.75rem;  /* Border radius for cards */
}
```

### Add or remove sections

1. Copy an existing `<section>` block in `index.html`.
2. Add a matching dot button to `.dot-nav` and a nav link to `.nav-links`.
3. Style the new section in `styles.css`.

---

## Deployment

### GitHub Pages (recommended)

This repository is configured to publish from the `main` branch. Push your changes and GitHub Pages will automatically serve the site at:

```
https://<your-github-username>.github.io/
```

If you use the Vite build step for a larger project, configure the output directory in GitHub Pages settings to `dist/` or use a GitHub Actions workflow to build and deploy automatically.

### Netlify

The contact form already uses [Netlify Forms](https://docs.netlify.com/forms/setup/) (`<form name="contact" netlify>`). To deploy:

1. Drag and drop the project folder (or connect your GitHub repo) in the [Netlify dashboard](https://app.netlify.com/).
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. Netlify will handle form submissions automatically—no server required.

### Other static hosts

Any static hosting provider (Vercel, Cloudflare Pages, AWS S3 + CloudFront, etc.) works. Run `npm run build`, then upload or deploy the contents of the `dist/` folder.
