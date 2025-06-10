import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(),solidPlugin()],
  server: {
    port: 3000,
    allowedHosts: [
      'devserver-preview--sljtradingcompany2025test.netlify.app'
      // you can add more hostnames here if needed
    ]
  },
  build: {
    target: 'esnext',
  },
});
