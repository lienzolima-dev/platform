// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  output: "server",
  security: {
    checkOrigin: true,
  },
  adapter: node({
    mode: "standalone",
  }),
});
