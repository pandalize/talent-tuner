import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'code'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    fs: {
      allow: ['..']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // PHP built-in server
        changeOrigin: true
      }
    }
  },
  build: {
    // Core Web Vitals最適化
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['./src/utils/diagnosisLoader.ts', './src/utils/seoUtils.ts']
        }
      }
    },
    // 圧縮最適化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // チャンクサイズ警告の閾値を調整
    chunkSizeWarningLimit: 1000
  },
  // プリロード最適化
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})
