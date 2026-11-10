const http = require('http');

// Inline SVG icons (viewBox 0 0 64 64)
const ICONS = {
  apple: '<circle cx="32" cy="38" r="20" fill="#e53935"/><rect x="30" y="8" width="4" height="14" rx="2" fill="#6d4c41"/><ellipse cx="42" cy="14" rx="8" ry="4" fill="#43a047" transform="rotate(-30 42 14)"/>',
  pear: '<path d="M32 10c-6 0-8 8-8 14 0 6-10 10-10 22 0 10 8 14 18 14s18-4 18-14c0-12-10-16-10-22 0-6-2-14-8-14z" fill="#c0ca33"/><rect x="31" y="2" width="3" height="10" fill="#6d4c41"/>',
  banana: '<path d="M10 18c4 26 22 38 46 30-2 6-14 12-26 10C16 54 6 36 10 18z" fill="#fdd835" stroke="#f9a825" stroke-width="2"/><rect x="8" y="12" width="5" height="8" rx="1" fill="#6d4c41"/>',
  carrots: '<path d="M20 24 L44 24 L32 62 Z" fill="#fb8c00"/><path d="M32 24 L24 4 M32 24 L32 2 M32 24 L40 4" stroke="#43a047" stroke-width="4" fill="none"/>',
  onions: '<path d="M32 6c4 10 22 18 22 34a22 20 0 0 1-44 0C10 24 28 16 32 6z" fill="#ab47bc"/><path d="M32 6C26 24 26 44 32 60M32 6C38 24 38 44 32 60" stroke="#7b1fa2" stroke-width="2" fill="none"/>',
  garlic: '<path d="M32 6c4 10 22 18 22 34a22 20 0 0 1-44 0C10 24 28 16 32 6z" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="2"/><path d="M32 14C24 28 24 46 32 60M32 14C40 28 40 46 32 60" stroke="#bdbdbd" stroke-width="2" fill="none"/>',
  cabbage: '<circle cx="32" cy="34" r="24" fill="#66bb6a"/><circle cx="32" cy="34" r="16" fill="#81c784"/><circle cx="32" cy="34" r="8" fill="#a5d6a7"/>',
};

const ITEMS = {
  apple: { name: 'Apple', desc: 'A crisp, sweet pome fruit grown worldwide.', chars: { Color: 'Red, green or yellow', Taste: 'Sweet to tart', 'Calories (100g)': '52 kcal', 'Main vitamins': 'C, K', Season: 'Late summer - autumn', Origin: 'Central Asia' } },
  pear: { name: 'Pear', desc: 'A juicy fruit with a characteristic teardrop shape.', chars: { Color: 'Green, yellow or red', Taste: 'Sweet, buttery', 'Calories (100g)': '57 kcal', 'Main vitamins': 'C, K', Season: 'Autumn', Origin: 'Europe & Asia' } },
  banana: { name: 'Banana', desc: 'An elongated tropical fruit rich in potassium.', chars: { Color: 'Yellow', Taste: 'Sweet, creamy', 'Calories (100g)': '89 kcal', 'Main vitamins': 'B6, C', Season: 'All year', Origin: 'Southeast Asia' } },
  carrots: { name: 'Carrots', desc: 'A crunchy root vegetable full of beta-carotene.', chars: { Color: 'Orange', Taste: 'Sweet, earthy', 'Calories (100g)': '41 kcal', 'Main vitamins': 'A, K', Season: 'Summer - autumn', Origin: 'Persia' } },
  onions: { name: 'Onions', desc: 'A pungent bulb used in cuisines everywhere.', chars: { Color: 'Yellow, red or white', Taste: 'Pungent, sweet when cooked', 'Calories (100g)': '40 kcal', 'Main vitamins': 'C, B6', Season: 'Summer - autumn', Origin: 'Central Asia' } },
  garlic: { name: 'Garlic', desc: 'An aromatic bulb made of several cloves.', chars: { Color: 'White', Taste: 'Strong, spicy', 'Calories (100g)': '149 kcal', 'Main vitamins': 'B6, C', Season: 'Summer', Origin: 'Central Asia' } },
  cabbage: { name: 'Cabbage', desc: 'A leafy vegetable forming a dense head.', chars: { Color: 'Green or purple', Taste: 'Mild, slightly peppery', 'Calories (100g)': '25 kcal', 'Main vitamins': 'C, K', Season: 'Autumn - winter', Origin: 'Europe' } },
};

const GROUPS = [
  ['Fruit', ['apple', 'pear', 'banana']],
  ['Vegetables', ['carrots', 'onions', 'garlic', 'cabbage']],
];

const CSS = `
*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;display:flex;flex-direction:column;min-height:100vh;background:#f7f7f2}
header{background:#2e7d32;color:#fff;padding:16px 24px}header a{color:#fff;text-decoration:none}header h1{margin:0;font-size:1.6em}
.wrap{display:flex;flex:1}nav{width:220px;background:#fff;border-right:1px solid #ddd;padding:16px}
nav h3{margin:16px 0 8px;color:#2e7d32;text-transform:uppercase;font-size:.9em}nav ul{list-style:none;margin:0;padding:0}
nav a{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;color:#333;text-decoration:none}
nav a:hover{background:#e8f5e9}nav a.active{background:#c8e6c9;font-weight:bold}
main{flex:1;padding:24px}footer{background:#333;color:#ccc;text-align:center;padding:12px}
.card{background:#fff;border-radius:10px;padding:24px;box-shadow:0 2px 6px rgba(0,0,0,.1);max-width:640px}
.title{display:flex;align-items:center;gap:16px}table{border-collapse:collapse;width:100%;margin-top:16px}
td{border-bottom:1px solid #eee;padding:8px}td:first-child{font-weight:bold;width:40%}
`;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const icon = (slug, size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${ICONS[slug]}</svg>`;

function layout(title, content, active) {
  let nav = '';
  for (const [group, slugs] of GROUPS) {
    nav += `<h3>${group}</h3><ul>`;
    for (const s of slugs) {
      const cls = s === active ? ' class="active"' : '';
      nav += `<li><a href="/item/${s}"${cls}>${icon(s, 22)}${ITEMS[s].name}</a></li>`;
    }
    nav += '</ul>';
  }
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} - Fresh Market</title><style>${CSS}</style></head><body>
<header><h1><a href="/">Fresh Market</a></h1></header>
<div class="wrap"><nav>${nav}</nav><main>${content}</main></div>
<footer>&copy; 2024 Fresh Market. All rights reserved.</footer></body></html>`;
}

function homePage() {
  return layout('Home', '<div class="card"><h2>Welcome!</h2><p>Choose a fruit or vegetable from the menu on the left to see its characteristics.</p></div>');
}

function itemPage(slug) {
  const it = ITEMS[slug];
  const rows = Object.entries(it.chars).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('');
  const content = `<div class="card"><div class="title">${icon(slug, 96)}<h2>${it.name}</h2></div><p>${esc(it.desc)}</p><table>${rows}</table></div>`;
  return layout(it.name, content, slug);
}

const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0].replace(/\/+$/, '') || '/';
  let status = 200;
  let body;
  const slug = path.startsWith('/item/') ? path.slice(6) : null;
  if (path === '/') body = homePage();
  else if (slug && Object.prototype.hasOwnProperty.call(ITEMS, slug)) body = itemPage(slug);
  else {
    status = 404;
    body = layout('Not found', '<div class="card"><h2>404</h2><p>Page not found.</p></div>');
  }
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
});

const PORT = parseInt(process.env.PORT, 10) || 8000;
server.listen(PORT, '0.0.0.0', () => console.log(`Listening on 0.0.0.0:${PORT}`));
