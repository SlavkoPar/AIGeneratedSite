// GitHub Pages serves plain files, so give every route its own real HTML page:
// dist/fruit/apple/index.html, dist/vegetables/index.html, ... Each is a copy of the
// built index.html with its own <title>/description, which then boots the React router.
// Also writes 404.html (SPA fallback for unknown URLs) and sitemap.xml.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fruits, items, routeFor, vegetables } from '../src/data.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const origin = 'https://slavkopar.github.io'
const base = '/AIGeneratedSite/sites/fruits-and-vegetables/'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(path, title, description) {
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(description)}$2`)
  const file = join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

const pages = [
  ['fruits', 'Fruits · Fruits & Vegetables', `Browse ${fruits.length} common fruits.`],
  ['vegetables', 'Vegetables · Fruits & Vegetables', `Browse ${vegetables.length} common vegetables.`],
  ...items.map((i) => [routeFor(i), `${i.name} · Fruits & Vegetables`, `${i.name}: ${i.description}`]),
]
for (const [path, title, description] of pages) page(path, title, description)

writeFileSync(join(dist, '404.html'), template)

const urls = ['', ...pages.map(([p]) => `${p}/`)]
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${origin}${base}${u}</loc></url>`).join('\n') +
    `\n</urlset>\n`,
)

console.log(`Generated ${pages.length} static pages + 404.html + sitemap.xml`)
