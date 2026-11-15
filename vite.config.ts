import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves a project site from /<repo>/, so production builds are
// mounted there. Dev keeps the root so local URLs stay short.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hweat-penny/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/fancy-ui-react')) return 'vendor-ui'
          if (id.includes('node_modules/react')) return 'vendor-react'
        },
      },
    },
  },
}))
