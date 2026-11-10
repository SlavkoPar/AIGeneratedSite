# Fruits & Vegetables

Vite + React + TypeScript guide with a page for each fruit and vegetable (data in `src/data.ts`).

- `npm install && npm run dev` to work on it locally (served at `/AIGeneratedSite/`).
- `npm run build` type-checks, builds `dist/`, then generates one real `index.html` per route
  (`dist/fruit/apple/index.html`, ...), plus `404.html` and `sitemap.xml`.
- `npm run deploy` builds and publishes `dist/` to the `gh-pages` branch with the
  [gh-pages](https://www.npmjs.com/package/gh-pages) package.
- The base path lives in `site.config.ts` (default `/AIGeneratedSite/`, the repository name,
  case-sensitive). Override with `VITE_BASE` to serve from a subfolder.

GitHub Pages must be set to deploy from the `gh-pages` branch (repo Settings -> Pages).
