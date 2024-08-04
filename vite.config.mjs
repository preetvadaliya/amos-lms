import { join } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  plugins: [react()],
  root: join(__dirname, 'src', 'renderer'),
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
    outDir: join(__dirname, 'dist'),
    minify: true,
    manifest: false,
    emptyOutDir: true,
  }
});
