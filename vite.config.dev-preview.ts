import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Temporary config for previewing in the sandbox only — the mounted node_modules/.vite
// cache dir has restricted permissions here, so this points the cache somewhere writable.
// Not meant to be committed; delete after the preview session.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  cacheDir: '/tmp/astratta-website-vite-cache',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
