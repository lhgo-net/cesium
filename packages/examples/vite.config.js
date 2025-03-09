import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    // https:true,
    cors: true,
    proxy: {
      '/apiIP': {
        target: 'https://www.ip.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiIP/, ''),
      },
      '/weather': {
        target: 'http://localhost:7000/weather',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, ''),
      },
      '/geoserver': {
        target: 'http://8.134.217.110/geoserver',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geoserver/, ''),
      },
      '/api': {
        target: 'https://weather.cma.cn/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
