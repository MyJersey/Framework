import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Vite reverse proxy to 3000
    // During development, forward API requests to the Express server.
    // This avoids CORS errors: the browser sees everything on port 5173,
    // but Vite silently forwards /products, /categories, /cart to port 3000.
    proxy: {
      '/products':    'http://localhost:3000',
      '/categories':  'http://localhost:3000',
      // '^/cart/' matches /cart/guest, /cart/guest/1, etc.
      // but NOT /cart alone, which is a React route and must reach index.html
      '^/cart/': 'http://localhost:3000',
    },
  },
})
