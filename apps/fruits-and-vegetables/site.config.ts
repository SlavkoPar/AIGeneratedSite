// Single source of truth for where the site is served. Used by vite.config.ts and
// scripts/postbuild.mjs. GitHub Pages project sites live under /<repository-name>/
// (case-sensitive). Override with VITE_BASE, e.g. VITE_BASE=/AIGeneratedSite/sites/fruits-and-vegetables/
export const origin = 'https://slavkopar.github.io'
export const base: string = process.env.VITE_BASE ?? '/AIGeneratedSite/'
