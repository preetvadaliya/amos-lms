import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        '@renderer': resolve(join(__dirname, 'src', 'renderer', 'src'))
      }
    },
    server: {
      port: 1822,
      open: true
    },
    build: {
      outDir: join(__dirname, 'dist', 'desktop'),
      minify: true,
      manifest: false
    }
  }
});
