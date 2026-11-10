# Fruits & Vegetables

Vite + React guide with a page for each fruit and vegetable (data in `src/data.js`).

- `npm install && npm run dev` to work on it locally.
- `npm run build` writes `dist/` and then generates one real `index.html` per route
  (`dist/fruit/apple/index.html`, ...), plus `404.html` and `sitemap.xml`.
- The published build lives in `sites/fruits-and-vegetables/` and is served by GitHub Pages at
  https://slavkopar.github.io/AIGeneratedSite/sites/fruits-and-vegetables/
- To republish: build, then copy `dist/` over `sites/fruits-and-vegetables/`.
  The base path is set in `vite.config.js`.
