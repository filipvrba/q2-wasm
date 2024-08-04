import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://0hwjowy5ztxmfwuj8woqzznrotustofnbb316mk1mygk2x8y7u.vercel.app', // nebo jiný port, kde běží Vercel serverless funkce
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});