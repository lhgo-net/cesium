import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
// import less from '@vitejs/plugin-less'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: []
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // css:{
  //   preprocessorOptions:{
  //     less:{
  //       additionalData:() =>` @import "./src/style/global.less"`
  //     }
  //   }
  // },
  optimizeDeps: {
    include: ['cesium']
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium')
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/GISFile': 'http://150.158.144.23',
      '/sysu_noise': 'http://101.43.97.106:8080',
      '/api': {
        target: 'http://webkczg.com:8762',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/api/Tileset': {
        target: 'localhost:18098/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/\//, '')
      }
    }
  }
})
