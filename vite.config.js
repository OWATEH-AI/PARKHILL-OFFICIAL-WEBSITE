import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Increase inline threshold so small assets get inlined
    assetsInlineLimit: 4096,
    // Minify with esbuild (fastest)
    minify: 'esbuild',
    // Enable CSS minification
    cssMinify: true,
    // Chunk strategy: keep everything in one bundle for a single-page site
    rollupOptions: {
      output: {
        // Cache-bust filenames with content hash
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  // Pre-bundle large dependencies for faster dev loads
  optimizeDeps: {
    include: [],
  },
});
