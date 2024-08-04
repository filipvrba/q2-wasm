import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // https://0hwjowy5ztxmfwuj8woqzznrotustofnbb316mk1mygk2x8y7u.vercel.app
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});