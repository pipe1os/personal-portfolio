# Personal Portfolio

[![Live site](https://img.shields.io/badge/live-pipeos.dev-111111?style=for-the-badge&logo=vercel&logoColor=white)](https://pipeos.dev)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

<a href="./README_es.md">Leer en español -></a>

This is my personal portfolio: who I am, what I have shipped, the open-source pull requests I have landed, and how to reach me, in Spanish and English.

## Where It Came From

The project started from the [Magic UI Design portfolio template](https://github.com/magicuidesign/portfolio), a Next.js app. I first migrated it to Astro + React and added the Spanish/English switcher. Then I redesigned the whole thing from scratch: none of the template's look, components, or animations remain. What carried over is the content model and the bilingual setup.

## Tech Stack

- Astro 7
- React 19 (a single island for the page)
- TypeScript
- Tailwind CSS 4
- Mona Sans and Monaspace Neon via Fontsource
- Lucide icons
- Vercel

## Project Structure

```text
src/pages/index.astro                Main route; renders the portfolio React island
src/pages/404.astro                  Not-found page in the same visual language
src/layouts/Layout.astro             Metadata, font preload, favicon, and the background grid
src/components/HomePage.tsx          Page composition, language state, scroll reveals
src/components/display-name.tsx      Letter-by-letter display type (entrance, cursor lens, scroll squeeze)
src/components/site-header.tsx       Sticky header: wordmark, local clock, section counter, ES/EN
src/components/section/              Section frame, projects, open-source contributions, contact
src/components/ui/svgs/              Brand and PR-status icons
src/data/resume.tsx                  Content, projects, contributions, and ES/EN copy
src/styles/global.css                Tokens, grid, type, and motion
public/                              Images, favicon, and icons
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

## Credit

The original starting point was [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio). Thanks to its authors for the base I learned from. The current design, components, and motion are my own.
