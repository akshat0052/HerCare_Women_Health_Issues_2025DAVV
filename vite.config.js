import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
    react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
