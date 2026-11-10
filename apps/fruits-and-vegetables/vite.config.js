import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Built output is served by GitHub Pages from a subfolder of the repo,
// so assets and routes must use this absolute base path.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/AIGeneratedSite/sites/fruits-and-vegetables/' : '/',
  build: { outDir: 'dist' },
}))
