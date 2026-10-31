// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Retired browser-testing pages: send old links and search results to the homepage.
const retiredPages = [
  '/alternatives',
  '/blog',
  '/blog/evidence-first-ci-testing-pull-request-previews',
  '/for/claude-code',
  '/for/cursor',
  '/for/nextjs',
  '/guides/claude-code-playwright-pr-checks',
  '/software-factory',
  '/use-cases/authenticated-testing',
  '/use-cases/pull-request-testing',
  '/vs/claude-code-playwright',
  '/vs/manual-qa',
  '/vs/playwright',
];

export default defineConfig({
  site: 'https://kery.dev',
  adapter: vercel(),
  output: 'static',
  redirects: Object.fromEntries(retiredPages.map((path) => [path, { status: 301, destination: '/' }])),
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
