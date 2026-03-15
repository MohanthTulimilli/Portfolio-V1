import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // SPA fallback: serve index.html for unknown paths (e.g. /work, /about) so React Router can handle them
    {
      name: 'copy-404',
      closeBundle() {
        const out = resolve(__dirname, 'dist')
        copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
      },
    },
  ],
})
