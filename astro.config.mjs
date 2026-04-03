// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kery.dev',
  adapter: vercel(),
  output: 'static',
  integrations: [sitemap()],
});