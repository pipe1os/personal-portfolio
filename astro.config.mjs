import { remarkCodeMeta } from "./src/lib/remark-code-meta.ts";

// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkCodeMeta],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
