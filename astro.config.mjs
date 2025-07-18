// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  // output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  session: {
    driver: "redis",
  },
  integrations: [react(), db()],
  adapter: netlify(),
});
