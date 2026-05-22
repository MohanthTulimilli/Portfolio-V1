import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Custom domain (mohanth.dev) serves from site root — not /Portfolio-V1/
const DEPLOY_BASE = '/'

// https://vite.dev/config/
export default defineConfig({
  base: DEPLOY_BASE,
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
