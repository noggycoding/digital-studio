import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit (motion library is large)
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      output: {
        // Separate vendor chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap', 'motion', 'lenis'],
        },
      },
    },
  },
  // Remove console.log in production builds
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
