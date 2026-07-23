import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Baseline moderne : moins de transpilation, bundle plus compact.
    target: 'es2020',
    rollupOptions: {
      output: {
        // React change rarement : isolé dans un fragment stable, il reste
        // en cache d'un déploiement à l'autre pendant que le code du site
        // évolue.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
