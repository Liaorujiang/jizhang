import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare({
    bindings: {
      DB: {
        type: 'd1',
        id: 'c9554ace-2302-4205-9423-d788c9215309'
      }
    }
  })
});