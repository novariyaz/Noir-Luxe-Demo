import { defineConfig } from 'vite';

export default defineConfig({
  // Preserves relative pathing in the final dist/index.html 
  // so it deploys securely on sub-directories or bare domains
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  publicDir: 'public'
});
