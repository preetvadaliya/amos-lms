import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  plugins: [react()],
  root: resolve('src', 'renderer'),
  resolve: {
    alias: {
      '@renderer': resolve('src', 'renderer', 'src')
    }
  },
  server: {
    port: 2202,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: true,
    manifest: false
  }
});
