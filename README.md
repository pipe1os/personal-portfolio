# Personal Portfolio

[![Live site](https://img.shields.io/badge/live-pipeos.dev-111111?style=for-the-badge&logo=vercel&logoColor=white)](https://pipeos.dev)
![Astro](https://img.shields.io/badge/Astro-6.2-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

<a href="./README_es.md">Leer en español -></a>

This is my personal portfolio. It presents my background, skills, projects, education, and contact links in a compact bilingual site.

It started from the [Magic UI Design portfolio template](https://github.com/magicuidesign/portfolio), which was built with Next.js, and I refactored it into an Astro + React site. I kept the interactive React pieces where they make sense, added a Spanish/English language switcher, and moved the page structure, metadata, static assets, and production build around Astro.

## Live Site

Production is available at [pipeos.vercel.app](https://pipeos.vercel.app).

## What This Project Shows

- A migration from a Next.js template to an Astro static portfolio.
- A bilingual experience with a custom language switcher that persists the selected language.
- React islands for the parts that need client-side behavior, including animation, toasts, and project cards.
- Centralized portfolio content in `src/data/resume.tsx`, with Spanish and English copy kept close to the data it describes.
- A small, readable codebase using TypeScript, Tailwind CSS v4, Motion, Radix/shadcn primitives, and Vercel deployment.

## Tech Stack

- Astro 6
- React 19
- TypeScript
- Tailwind CSS
- Motion and Magic UI components
- Radix/shadcn-style UI primitives
- Vercel

## Project Structure

```text
src/pages/index.astro        Main route; renders the portfolio React island
src/layouts/Layout.astro     Global metadata, page shell, styles, and persistent islands
src/components/HomePage.tsx  Main portfolio experience and language state
src/components/section/      Projects, contact, and footer sections
src/components/ui/           Reusable UI primitives and SVG icons
src/data/resume.tsx          Portfolio content, projects, skills, links, and translations
src/styles/global.css        Tailwind v4 source, tokens, typography, and global styling
public/                      Static images, CV files, and icons
```

## Running Locally

This project uses `pnpm`. Node.js must satisfy `>=22.12.0`.

```bash
pnpm install
pnpm run dev
```

Before a production build, run Astro's check command:

```bash
pnpm astro check
pnpm run build
pnpm run preview
```

## Template Credit

The original starting point was [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio). This version is my own refactor and personal adaptation: Next.js was replaced with Astro + React, the content was rewritten for my profile, and the project structure was adjusted for a static portfolio deployed on Vercel.
