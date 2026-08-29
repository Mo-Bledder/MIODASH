import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    // Logo wordt als data-URI ingebouwd zodat de build ook als los bestand werkt.
    assetsInlineLimit: 400 * 1024,
  },
});
