import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: '*', // Allows all origins, you can specify specific origins like 'https://example.com'
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specifies allowed methods
      
      credentials: true, // If you want to allow cookies or authorization headers
    }
  }
})
