import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const LIVE_API = 'https://gupta-namkin-backend.vercel.app';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBase = String(
    env.VITE_API_URL || (mode === 'development' ? 'http://localhost:5000' : LIVE_API),
  ).replace(/\/$/, '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': apiBase,
      },
    },
  };
});
