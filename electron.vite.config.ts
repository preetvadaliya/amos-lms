import { join } from 'node:path';
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
        '@renderer': join('src', 'renderer', 'src')
      }
    },
    server: {
      port: 1822,
      open: true
    },
    build: {
      minify: true,
      manifest: false
    }
  }
});
