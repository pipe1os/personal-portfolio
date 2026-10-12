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

## Design

The new identity is a Swiss typographic poster set on black.

- **Visible grid.** A 12-column grid (8 on tablet, 4 on phone) lays out every section and is drawn faintly behind the page. Empty columns stay visible instead of being filled.
- **Type.** [Mona Sans](https://github.com/github/mona-sans) as a variable font, using its width axis for the display name, plus Monaspace Neon for dates, repos, coordinates, and other data. Both are self-hosted, so they work under the site's CSP.
- **One spot color.** Vermilion `#ff4f1f` appears only on things that are live or clickable (merged PRs, active projects, hovered rows) and on the contact section.
- **No chips or cards.** Tags are slash-separated lists, contributions are an index table, and project details sit in a definition list next to each screenshot.

## Motion

- The name is set letter by letter. Each letter widens into place on load, swells under the cursor on desktop, and condenses as you scroll past it (CSS scroll-driven animation).
- Grid columns draw in on load. Headings and rows rise from a baseline mask, and images wipe in.
- Rows that link somewhere fill with vermilion from left to right on hover or keyboard focus.
- The sticky header turns into a wordmark plus a section counter ("03 / 06") once you leave the hero, and shows the local time in Concepción.
- Switching language uses the View Transitions API.
- The hero figures count up once on load.
- `prefers-reduced-motion` turns all of this off and leaves the content static and readable.

## Performance

The redesign dropped Motion, react-markdown, Sonner, Radix, and the Magic UI components in favor of CSS animations, a few small hooks, and IntersectionObserver. Gzipped JS + CSS went from about 203 KB to about 104 KB.

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
