const http = require('http');

// Inline SVG icons (viewBox 0 0 64 64)
const ICONS = {
  apple: '<path d="M32 18c-6-5-20-4-20 12 0 14 10 26 20 22 10 4 20-8 20-22 0-16-14-17-20-12z" fill="#e53935"/><path d="M32 18c0-5 2-9 5-11" stroke="#6d4c41" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M35 12c4-6 12-6 14-4-3 5-9 6-14 4z" fill="#43a047"/>',
  pear: '<path d="M32 14c-5 0-7 5-7 10 0 6-11 10-11 22 0 9 8 14 18 14s18-5 18-14c0-12-11-16-11-22 0-5-2-10-7-10z" fill="#c0ca33"/><path d="M32 14c0-4 1-7 3-9" stroke="#6d4c41" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 10c3-4 9-4 11-2-3 4-7 4-11 2z" fill="#43a047"/>',
  banana: '<path d="M10 14c4 22 18 38 44 36 2 0 2 3 0 4-28 6-46-12-48-38 0-3 3-4 4-2z" fill="#fdd835" stroke="#f9a825" stroke-width="2"/><path d="M8 12l-2-5 5 1z" fill="#6d4c41"/>',
  carrots: '<path d="M40 22L14 56c-2 2 0 4 2 3l34-25c4-4 2-12-4-14-2-1-4 0-6 2z" fill="#fb8c00"/><path d="M44 20c-2-8 0-14 4-16 0 6 0 10-2 14zM46 22c6-4 12-4 16-2-5 3-9 4-14 4zM45 21c2-6 8-10 13-10-3 5-7 8-12 10z" fill="#43a047"/>',
  onions: '<path d="M32 10c-2 8-20 16-20 32 0 10 9 16 20 16s20-6 20-16c0-16-18-24-20-32z" fill="#8e24aa"/><path d="M32 10V4M28 58l-3 4M32 58v4M36 58l3 4" stroke="#6d4c41" stroke-width="2"/><path d="M32 14c-4 10-10 18-10 28M32 14c4 10 10 18 10 28" stroke="#ce93d8" stroke-width="2" fill="none"/>',
  garlic: '<path d="M32 8c-2 10-22 16-22 32 0 10 10 18 22 18s22-8 22-18c0-16-20-22-22-32z" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="2"/><path d="M32 12c-4 12-8 24-6 44M32 12c4 12 8 24 6 44M22 30c-4 8-4 18 0 24M42 30c4 8 4 18 0 24" stroke="#bdbdbd" stroke-width="2" fill="none"/>',
};

const GROUPS = [
  { slug: 'fruit', name: 'Fruit', items: [
    { slug: 'apple', name: 'Apple', desc: 'A crisp, sweet pome fruit grown worldwide and enjoyed fresh, baked or juiced.',
      chars: { 'Family': 'Rosaceae', 'Color': 'Red, green, yellow', 'Calories (100 g)': '52 kcal', 'Main nutrients': 'Fiber, vitamin C, potassium', 'Season': 'Late summer - autumn', 'Origin': 'Central Asia', 'Taste': 'Sweet to tart, crunchy' } },
    { slug: 'pear', name: 'Pear', desc: 'A juicy fruit with a soft, buttery texture and a characteristic bell shape.',
      chars: { 'Family': 'Rosaceae', 'Color': 'Green, yellow, red-brown', 'Calories (100 g)': '57 kcal', 'Main nutrients': 'Fiber, vitamin C, copper', 'Season': 'Late summer - winter', 'Origin': 'Europe, Asia', 'Taste': 'Sweet, juicy, buttery' } },
    { slug: 'banana', name: 'Banana', desc: 'An elongated tropical fruit with soft, starchy flesh and an easy-to-peel skin.',
      chars: { 'Family': 'Musaceae', 'Color': 'Yellow', 'Calories (100 g)': '89 kcal', 'Main nutrients': 'Potassium, vitamin B6, carbohydrates', 'Season': 'All year', 'Origin': 'Southeast Asia', 'Taste': 'Sweet, creamy' } },
  ] },
  { slug: 'vegetables', name: 'Vegetables', items: [
    { slug: 'carrots', name: 'Carrots', desc: 'A crunchy root vegetable rich in beta-carotene, eaten raw or cooked.',
      chars: { 'Family': 'Apiaceae', 'Color': 'Orange, purple, yellow', 'Calories (100 g)': '41 kcal', 'Main nutrients': 'Vitamin A, vitamin K, fiber', 'Season': 'Summer - autumn', 'Origin': 'Persia', 'Taste': 'Sweet, earthy' } },
    { slug: 'onions', name: 'Onions', desc: 'A layered bulb vegetable used as a flavor base in cuisines around the world.',
      chars: { 'Family': 'Amaryllidaceae', 'Color': 'Yellow, red, white', 'Calories (100 g)': '40 kcal', 'Main nutrients': 'Vitamin C, vitamin B6, folate', 'Season': 'Summer - autumn', 'Origin': 'Central Asia', 'Taste': 'Pungent raw, sweet cooked' } },
    { slug: 'garlic', name: 'Garlic', desc: 'A strongly aromatic bulb made of cloves, prized for flavor and health benefits.',
      chars: { 'Family': 'Amaryllidaceae', 'Color': 'White, purple-tinged', 'Calories (100 g)': '149 kcal', 'Main nutrients': 'Manganese, vitamin B6, allicin', 'Season': 'Summer', 'Origin': 'Central Asia', 'Taste': 'Pungent, spicy' } },
  ] },
];

const CSS = `
*{box-sizing:border-box}body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;color:#263238;background:#f4f6f5;
min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;grid-template-columns:240px 1fr;grid-template-areas:'h h' 'n m' 'f f'}
header{grid-area:h;background:#2e7d32;color:#fff;padding:18px 28px;display:flex;align-items:center;gap:12px}
header a{color:#fff;text-decoration:none;font-size:1.5rem;font-weight:700}
nav{grid-area:n;background:#fff;border-right:1px solid #dde3e0;padding:16px}
nav h3{margin:18px 0 8px;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:#78909c}
nav ul{list-style:none;margin:0;padding:0}nav li a{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;color:#263238;text-decoration:none}
nav li a:hover{background:#e8f5e9}nav li a.active{background:#c8e6c9;font-weight:600}
main{grid-area:m;padding:32px}footer{grid-area:f;background:#263238;color:#cfd8dc;text-align:center;padding:14px;font-size:.9rem}
.card{background:#fff;border-radius:14px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,.06);max-width:760px}
.hero{display:flex;align-items:center;gap:24px}table{border-collapse:collapse;width:100%;margin-top:20px}
td{padding:10px;border-bottom:1px solid #eceff1}td:first-child{font-weight:600;width:40%;color:#546e7a}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px;margin-top:16px}
.tile{background:#fff;border-radius:12px;padding:16px;text-align:center;text-decoration:none;color:#263238;box-shadow:0 2px 6px rgba(0,0,0,.06)}
.tile:hover{transform:translateY(-2px)}
@media(max-width:700px){body{grid-template-columns:1fr;grid-template-areas:'h' 'n' 'm' 'f'}nav{border-right:none;border-bottom:1px solid #dde3e0}}
`;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const icon = (slug, size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${ICONS[slug]}</svg>`;

function findItem(groupSlug, itemSlug) {
  const g = GROUPS.find((x) => x.slug === groupSlug);
  const it = g && g.items.find((x) => x.slug === itemSlug);
  return it ? { g, it } : null;
}

function layout(title, body, active = '') {
  // Groups have no icons, only items do
  const nav = GROUPS.map((g) => `<h3>${esc(g.name)}</h3><ul>` + g.items.map((it) => {
    const href = `/${g.slug}/${it.slug}`;
    return `<li><a href="${href}"${href === active ? ' class="active"' : ''}>${icon(it.slug)}${esc(it.name)}</a></li>`;
  }).join('') + '</ul>').join('');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} - Fresh Market</title><style>${CSS}</style></head><body>
<header><a href="/">&#127807; Fresh Market</a></header>
<nav>${nav}</nav>
<main>${body}</main>
<footer>&copy; 2024 Fresh Market &middot; Fruits &amp; Vegetables Guide</footer>
</body></html>`;
}

function homePage() {
  let body = '<div class="card"><h1>Welcome to Fresh Market</h1><p>Choose a fruit or vegetable from the menu on the left to see its characteristics.</p></div>';
  for (const g of GROUPS) {
    body += `<h2>${esc(g.name)}</h2><div class="grid">` + g.items.map((it) =>
      `<a class="tile" href="/${g.slug}/${it.slug}">${icon(it.slug, 64)}<div>${esc(it.name)}</div></a>`).join('') + '</div>';
  }
  return layout('Home', body);
}

function itemPage(g, it) {
  const rows = Object.entries(it.chars).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('');
  const body = `<div class="card"><div class="hero">${icon(it.slug, 120)}<div><small>${esc(g.name)}</small>
<h1>${esc(it.name)}</h1><p>${esc(it.desc)}</p></div></div>
<h2>Characteristics</h2><table>${rows}</table></div>`;
  return layout(it.name, body, `/${g.slug}/${it.slug}`);
}

function send(res, code, content, type = 'text/html; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(content) });
  res.end(content);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method Not Allowed', 'text/plain');
  const path = (req.url.split('?')[0].replace(/\/+$/, '')) || '/';
  if (path === '/') return send(res, 200, homePage());
  if (path === '/healthz') return send(res, 200, 'ok', 'text/plain');
  const m = path.match(/^\/icons\/([a-z]+)\.svg$/);
  if (m && ICONS[m[1]]) return send(res, 200, icon(m[1], 64), 'image/svg+xml');
  const parts = path.slice(1).split('/');
  if (parts.length === 2) {
    const found = findItem(parts[0], parts[1]);
    if (found) return send(res, 200, itemPage(found.g, found.it));
  }
  send(res, 404, layout('Not found', '<div class="card"><h1>404</h1><p>Page not found. <a href="/">Go home</a></p></div>'));
});

const PORT = parseInt(process.env.PORT, 10) || 8000;
server.listen(PORT, '0.0.0.0', () => console.log(`Listening on http://0.0.0.0:${PORT}`));
