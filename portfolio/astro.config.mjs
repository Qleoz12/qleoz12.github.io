import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://qleoz12.github.io',
  base: '/portfolio/',
  outDir: path.resolve(__dirname, '../docs/portfolio'),
  integrations: [tailwind()],
  build: {
    format: 'directory',
  },
});
