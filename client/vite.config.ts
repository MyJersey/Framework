import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://localhost:3000',
      '/categories': 'http://localhost:3000',
      '/cart': 'http://localhost:3000',
    },
  },
})
