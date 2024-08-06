import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  plugins: [react()],
  root: join(__dirname, 'src', 'renderer'),
  define: {
    'process.env': loadEnv('', __dirname)
  },
  resolve: {
    alias: {
      '@renderer': resolve(join('src', 'renderer', 'src'))
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
