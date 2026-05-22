import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// GitHub Pages project site: https://mohanthtulimilli.github.io/Portfolio-V1/
const DEPLOY_BASE = '/Portfolio-V1/'

// https://vite.dev/config/
export default defineConfig({
  base: DEPLOY_BASE,
  plugins: [
    react(),
    {
      name: 'html-video-preload-base',
      transformIndexHtml(html) {
        return html
          .replace(
            "var video = theme === 'light' ? '/light-theme.mp4' : '/Updated-4.mp4';",
            `var base = '${DEPLOY_BASE}'; var video = theme === 'light' ? base + 'light-theme.mp4' : base + 'Updated-4.mp4'; var poster = theme === 'light' ? base + 'hero-poster-light.jpg' : base + 'hero-poster-dark.jpg'; document.write('<link rel="preload" as="image" href="' + poster + '" fetchpriority="high">');`
          )
          .replace(
            /\s*if \(typeof fetch === 'function'\) \{\s*fetch\(video, \{ priority: 'high' \}\)\.catch\(function \(\) \{\}\);\s*\}\s*/,
            '\n'
          );
      },
    },
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
