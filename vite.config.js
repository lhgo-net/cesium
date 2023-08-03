import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import less from '@vitejs/plugin-less'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
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
    include: ['cesium'],
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium'),
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/GISFile': 'http://150.158.144.23',
    }
  }
})
