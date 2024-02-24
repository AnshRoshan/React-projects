import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/React-Projects/' : '/',
})
