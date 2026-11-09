'use strict';
// Simple site with Header, left NavBar, Footer and a page for each link.
// Runs on 0.0.0.0:$PORT (default 8000). Node.js built-ins only.
const http = require('http');

const SITE_NAME = 'Fresh Produce';

const SITE = [
  {
    slug: 'fruit', title: 'Fruit',
    desc: 'Fruit is the sweet, seed-bearing part of a flowering plant. Pick one from the menu.',
    children: [
      { slug: 'apple', title: 'Apple', desc: 'Apples are crisp, juicy fruits that grow on trees and come in many varieties such as Gala, Fuji and Granny Smith.' },
      { slug: 'banana', title: 'Banana', desc: 'Bananas are soft, sweet tropical fruits rich in potassium, perfect as a quick snack.' },
      { slug: 'pear', title: 'Pear', desc: 'Pears are mild, buttery fruits that ripen from the inside out and pair well with cheese.' },
    ],
  },
  {
    slug: 'vegetables', title: 'Vegetables',
    desc: 'Vegetables are edible parts of plants such as roots, bulbs and leaves. Pick one from the menu.',
    children: [
      { slug: 'carrots', title: 'Carrots', desc: 'Carrots are crunchy root vegetables packed with beta-carotene, great raw or cooked.' },
      { slug: 'onions', title: 'Onions', desc: 'Onions are pungent bulbs that form the flavor base of countless dishes worldwide.' },
      { slug: 'garlic', title: 'Garlic', desc: 'Garlic is an aromatic bulb with a strong flavor, used in cooking and traditional medicine.' },
    ],
  },
];

const CSS = `
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Arial,sans-serif;min-height:100vh;display:grid;
 grid-template-rows:auto 1fr auto;grid-template-columns:220px 1fr;
 grid-template-areas:"header header" "nav main" "footer footer"}
header{grid-area:header;background:#2e7d32;color:#fff;padding:1rem 1.5rem}
header a{color:#fff;text-decoration:none}
header h1{margin:0;font-size:1.6rem}
nav{grid-area:nav;background:#f1f8e9;padding:1rem;border-right:1px solid #ddd}
nav ul{list-style:none;margin:0;padding:0}
nav ul ul{padding-left:1rem}
nav a{display:block;padding:.35rem .5rem;color:#1b5e20;text-decoration:none;border-radius:4px}
nav a:hover{background:#dcedc8}
nav a.active{background:#2e7d32;color:#fff}
nav .cat>a{font-weight:bold;margin-top:.5rem}
main{grid-area:main;padding:1.5rem 2rem}
.crumbs{font-size:.9rem;color:#666}
.crumbs a{color:#2e7d32}
footer{grid-area:footer;background:#333;color:#ccc;text-align:center;padding:.75rem}
@media(max-width:600px){body{grid-template-columns:1fr;grid-template-areas:"header" "nav" "main" "footer"}nav{border-right:none}}
`;

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Build map: path -> { title, crumbs, body }
function buildPages() {
  const pages = new Map();
  const homeLinks = SITE.map((c) => `<li><a href="/${c.slug}">${escape(c.title)}</a></li>`).join('');
  pages.set('/', { title: 'Home', crumbs: [], body: `<h2>Welcome to ${SITE_NAME}</h2><p>Browse our categories using the menu on the left.</p><ul>${homeLinks}</ul>` });
  for (const cat of SITE) {
    const cpath = `/${cat.slug}`;
    const items = cat.children.map((ch) => `<li><a href="${cpath}/${ch.slug}">${escape(ch.title)}</a></li>`).join('');
    pages.set(cpath, { title: cat.title, crumbs: [['/', 'Home']], body: `<h2>${escape(cat.title)}</h2><p>${escape(cat.desc)}</p><ul>${items}</ul>` });
    for (const ch of cat.children) {
      pages.set(`${cpath}/${ch.slug}`, { title: ch.title, crumbs: [['/', 'Home'], [cpath, cat.title]], body: `<h2>${escape(ch.title)}</h2><p>${escape(ch.desc)}</p>` });
    }
  }
  return pages;
}

const PAGES = buildPages();

function navHtml(current) {
  const link = (href, text) => `<a href="${href}"${href === current ? ' class="active"' : ''}>${escape(text)}</a>`;
  let out = `<ul><li>${link('/', 'Home')}</li>`;
  for (const cat of SITE) {
    const cpath = `/${cat.slug}`;
    out += `<li class="cat">${link(cpath, cat.title)}<ul>`;
    for (const ch of cat.children) out += `<li>${link(`${cpath}/${ch.slug}`, ch.title)}</li>`;
    out += '</ul></li>';
  }
  return out + '</ul>';
}

function render(path, { title, crumbs, body }) {
  const crumbHtml = crumbs.length
    ? `<div class="crumbs">${crumbs.map(([h, t]) => `<a href="${h}">${escape(t)}</a>`).join(' &rsaquo; ')} &rsaquo; ${escape(title)}</div>`
    : '';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)} | ${SITE_NAME}</title><style>${CSS}</style></head>
<body>
<header><h1><a href="/">${SITE_NAME}</a></h1></header>
<nav>${navHtml(path)}</nav>
<main>${crumbHtml}${body}</main>
<footer>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</footer>
</body></html>`;
}

const server = http.createServer((req, res) => {
  let path = req.url.split('?')[0].split('#')[0].toLowerCase();
  if (path.length > 1) path = path.replace(/\/+$/, '') || '/';
  const page = PAGES.get(path);
  let status = 200;
  let html;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  if (page) {
    html = render(path, page);
  } else {
    status = 404;
    html = render(path, { title: 'Not Found', crumbs: [['/', 'Home']], body: '<h2>404 - Page not found</h2><p>Use the menu to find your way.</p>' });
  }
  const data = Buffer.from(html, 'utf8');
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': data.length });
  res.end(req.method === 'HEAD' ? undefined : data);
});

const PORT = parseInt(process.env.PORT, 10) || 8000;
server.listen(PORT, '0.0.0.0', () => console.log(`Serving on http://0.0.0.0:${PORT}`));
