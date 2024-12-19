import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the port for dev server (npm run dev)
  },
  preview: {
    port: 3000, // Set the port for preview server (npm run preview)
    host: '0.0.0.0', // Allow external network access
  },
})
