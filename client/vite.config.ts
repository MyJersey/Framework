import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // During development, forward API requests to the Express server.
    // This avoids CORS errors: the browser sees everything on port 5173,
    // but Vite silently forwards /products, /categories, /cart to port 3000.
    proxy: {
      '/products':   'http://localhost:3000',
      '/categories': 'http://localhost:3000',
      '/cart':       'http://localhost:3000',
    },
  },
})
