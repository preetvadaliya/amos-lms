import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  plugins: [react()],
  root: resolve(join(__dirname, 'src', 'renderer')),
  resolve: {
    alias: {
      '@renderer': resolve(join(__dirname, 'src', 'renderer', 'src'))
    }
  },
  server: {
    port: 2202,
    open: true
  },
  build: {
    outDir: join(__dirname, 'dist', 'web'),
    minify: true,
    manifest: false
  }
});
