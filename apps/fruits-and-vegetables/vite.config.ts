import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { base } from './site.config'

export default defineConfig({
  plugins: [react()],
  base, // '/AIGeneratedSite/' - the repository name, case-sensitive
})
