'use strict';
const http = require('http');

// Site data: categories and their items (emoji used as icons)
const CATEGORIES = [
  {
    slug: 'fruit', name: 'Fruit', icon: '\u{1F353}', desc: 'Sweet, juicy and full of vitamins.',
    items: [
      { slug: 'apple', name: 'Apple', icon: '\u{1F34E}', desc: 'Apples are crisp, sweet-to-tart fruits grown on trees all over the world.',
        facts: ['There are over 7,500 apple varieties.', 'Apples float because they are about 25% air.', 'Rich in fiber and vitamin C.'] },
      { slug: 'banana', name: 'Banana', icon: '\u{1F34C}', desc: 'Bananas are soft, sweet fruits that come in their own handy peel.',
        facts: ['Bananas are botanically berries.', 'A great source of potassium.', 'They grow in clusters called hands.'] },
      { slug: 'pear', name: 'Pear', icon: '\u{1F350}', desc: 'Pears are mild, buttery fruits with a distinctive bell shape.',
        facts: ['Pears ripen from the inside out.', 'They are related to apples and quinces.', 'High in dietary fiber.'] },
    ],
  },
  {
    slug: 'vegetables', name: 'Vegetables', icon: '\u{1F966}', desc: 'Healthy, savory and the base of countless dishes.',
    items: [
      { slug: 'carrots', name: 'Carrots', icon: '\u{1F955}', desc: 'Carrots are crunchy root vegetables, usually orange, packed with beta-carotene.',
        facts: ['The first carrots were purple and yellow.', 'Great for eye health thanks to vitamin A.', 'Can be eaten raw or cooked.'] },
      { slug: 'onions', name: 'Onions', icon: '\u{1F9C5}', desc: 'Onions are pungent bulbs that add depth of flavor to almost any savory dish.',
        facts: ['Cutting onions releases a gas that makes you cry.', 'Cultivated for over 5,000 years.', 'Come in yellow, red and white varieties.'] },
      { slug: 'garlic', name: 'Garlic', icon: '\u{1F9C4}', desc: 'Garlic is an aromatic bulb made of cloves, loved for its strong flavor.',
        facts: ['A close relative of onions.', 'One bulb typically has 10-20 cloves.', 'Used as medicine in ancient times.'] },
    ],
  },
];

const CSS = `
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;background:#f5f7f2;color:#2d3a2e;
 display:grid;grid-template-rows:auto 1fr auto;grid-template-columns:240px 1fr;
 grid-template-areas:'header header' 'nav main' 'footer footer';min-height:100vh}
header{grid-area:header;background:#3c8d40;color:#fff;padding:16px 24px;display:flex;align-items:center;gap:12px}
header a{color:#fff;text-decoration:none;font-size:1.5rem;font-weight:700}
nav{grid-area:nav;background:#fff;border-right:1px solid #dde5d9;padding:16px}
nav ul{list-style:none;margin:0;padding:0}
nav ul ul{margin:4px 0 12px 14px}
nav a{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;color:#2d3a2e;text-decoration:none}
nav a:hover{background:#eef5ea}
nav a.active{background:#3c8d40;color:#fff}
nav .cat>a{font-weight:700}
.icon{font-size:1.25rem;width:1.5rem;text-align:center}
main{grid-area:main;padding:32px}
footer{grid-area:footer;background:#2d3a2e;color:#cfd8cc;text-align:center;padding:14px}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
.card{background:#fff;border:1px solid #dde5d9;border-radius:10px;padding:20px;text-align:center;text-decoration:none;color:inherit;transition:transform .15s}
.card:hover{transform:translateY(-3px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
.card .big{font-size:3rem}
.hero{font-size:5rem}
@media(max-width:700px){body{grid-template-columns:1fr;grid-template-areas:'header' 'nav' 'main' 'footer'}nav{border-right:none;border-bottom:1px solid #dde5d9}}
`;

const act = (path, href) => (path === href ? ' class="active"' : '');

function navHtml(path) {
  let out = `<ul><li><a href="/"${act(path, '/')}><span class="icon">\u{1F3E0}</span>Home</a></li>`;
  for (const c of CATEGORIES) {
    const href = `/${c.slug}`;
    out += `<li class="cat"><a href="${href}"${act(path, href)}><span class="icon">${c.icon}</span>${c.name}</a><ul>`;
    for (const i of c.items) {
      const ihref = `${href}/${i.slug}`;
      out += `<li><a href="${ihref}"${act(path, ihref)}><span class="icon">${i.icon}</span>${i.name}</a></li>`;
    }
    out += '</ul></li>';
  }
  return out + '</ul>';
}

function layout(title, content, path) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} - Fresh Market</title><style>${CSS}</style></head>
<body>
<header><a href="/">\u{1F33F} Fresh Market</a></header>
<nav>${navHtml(path)}</nav>
<main>${content}</main>
<footer>&copy; 2024 Fresh Market &middot; Fruits &amp; Vegetables</footer>
</body></html>`;
}

const card = (href, icon, name, desc) =>
  `<a class="card" href="${href}"><div class="big">${icon}</div><h3>${name}</h3><p>${desc}</p></a>`;

function render(path) {
  if (path === '/') {
    const cards = CATEGORIES.map(c => card(`/${c.slug}`, c.icon, c.name, c.desc)).join('');
    return [200, layout('Home', `<h1>Welcome to Fresh Market</h1><p>Pick a category from the menu on the left.</p><div class="cards">${cards}</div>`, path)];
  }
  const parts = path.split('/').filter(Boolean);
  const cat = CATEGORIES.find(c => c.slug === parts[0]);
  if (cat && parts.length === 1) {
    const cards = cat.items.map(i => card(`/${cat.slug}/${i.slug}`, i.icon, i.name, i.desc)).join('');
    return [200, layout(cat.name, `<h1>${cat.icon} ${cat.name}</h1><p>${cat.desc}</p><div class="cards">${cards}</div>`, path)];
  }
  if (cat && parts.length === 2) {
    const item = cat.items.find(i => i.slug === parts[1]);
    if (item) {
      const facts = item.facts.map(f => `<li>${f}</li>`).join('');
      const content = `<div class="hero">${item.icon}</div><h1>${item.name}</h1><p>${item.desc}</p>` +
        `<h2>Fun facts</h2><ul>${facts}</ul><p><a href="/${cat.slug}">&larr; Back to ${cat.name}</a></p>`;
      return [200, layout(item.name, content, path)];
    }
  }
  return [404, layout('Not found', `<h1>404 - Page not found</h1><p><a href="/">Go home</a></p>`, path)];
}

const server = http.createServer((req, res) => {
  const path = (req.url.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase();
  const [status, html] = render(path);
  const body = Buffer.from(html, 'utf8');
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': body.length });
  res.end(req.method === 'HEAD' ? undefined : body);
});

const PORT = parseInt(process.env.PORT || '8000', 10);
server.listen(PORT, '0.0.0.0', () => console.log(`Serving on http://0.0.0.0:${PORT}`));
