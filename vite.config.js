import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        // 백엔드 라우트가 /api/signup이면 rewrite 불필요
        // rewrite: (path) => path.replace(/^\/api/, '')  // 백엔드가 /signup이면 주석 해제
      }
    }
  }
})
