'use strict';
const http = require('http');

// Navigation structure
const NAV = [
  { label: 'Fruit', href: '/fruit', children: [
    { label: 'Apple', href: '/fruit/apple' },
    { label: 'Banane', href: '/fruit/banane' },
    { label: 'Pear', href: '/fruit/pear' },
  ] },
  { label: 'Vegetable', href: '/vegetable', children: [] },
];

// Page content
const PAGES = {
  '/': ['Home', 'Welcome! Use the navigation bar to explore fruits and vegetables.'],
  '/fruit': ['Fruit', 'Fruits are sweet, seed-bearing parts of plants. Pick one from the menu: Apple, Banane or Pear.'],
  '/fruit/apple': ['Apple', 'Apples are crunchy fruits that come in many varieties, such as Gala, Fuji and Granny Smith.'],
  '/fruit/banane': ['Banane', 'Bananes are long, curved fruits with soft, sweet flesh and a yellow peel.'],
  '/fruit/pear': ['Pear', 'Pears are juicy fruits with a sweet taste and a characteristic bell shape.'],
  '/vegetable': ['Vegetable', 'Vegetables are edible plant parts like leaves, roots and stems: carrots, spinach, broccoli and more.'],
};

const CSS = `
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Arial,sans-serif;display:flex;flex-direction:column;min-height:100vh;background:#fafafa;color:#222}
header{background:#2e7d32;color:#fff;padding:1.2rem 2rem}
header a{color:#fff;text-decoration:none}
header h1{margin:0;font-size:1.6rem}
nav{background:#388e3c}
nav ul{list-style:none;margin:0;padding:0}
nav>ul{display:flex;padding:0 1rem}
nav li{position:relative}
nav a{display:block;padding:.8rem 1.2rem;color:#fff;text-decoration:none}
nav a:hover,nav a.active{background:#1b5e20}
.submenu{display:none;position:absolute;top:100%;left:0;background:#43a047;min-width:170px;z-index:10;box-shadow:0 4px 8px rgba(0,0,0,.2)}
nav li:hover>.submenu,nav li:focus-within>.submenu{display:block}
main{flex:1;padding:2rem;max-width:900px;width:100%;margin:0 auto}
footer{background:#263238;color:#cfd8dc;text-align:center;padding:1rem}
`;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cls = (active) => (active ? ' class="active"' : '');

function navHtml(current) {
  const items = NAV.map(({ label, href, children }) => {
    const active = current === href || current.startsWith(href + '/');
    const arrow = children.length ? ' &#9662;' : '';
    const sub = children.length
      ? '<ul class="submenu">' + children.map((c) => `<li><a href="${c.href}"${cls(current === c.href)}>${esc(c.label)}</a></li>`).join('') + '</ul>'
      : '';
    return `<li><a href="${href}"${cls(active)}>${esc(label)}${arrow}</a>${sub}</li>`;
  });
  return '<nav><ul>' + items.join('') + '</ul></nav>';
}

function render(current, title, text) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - Fruit &amp; Vegetable Site</title>
<style>${CSS}</style>
</head>
<body>
<header><h1><a href="/">Fruit &amp; Vegetable Site</a></h1></header>
${navHtml(current)}
<main>
<h2>${esc(title)}</h2>
<p>${esc(text)}</p>
</main>
<footer>&copy; ${new Date().getFullYear()} Fruit &amp; Vegetable Site. All rights reserved.</footer>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  let path = req.url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  let status = 200;
  let title, text;
  if (Object.prototype.hasOwnProperty.call(PAGES, path)) {
    [title, text] = PAGES[path];
  } else {
    status = 404;
    title = 'Page not found';
    text = 'Sorry, the page you requested does not exist.';
  }
  const body = Buffer.from(render(path, title, text), 'utf8');
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': body.length });
  res.end(req.method === 'HEAD' ? undefined : body);
});

const PORT = parseInt(process.env.PORT, 10) || 8000;
server.listen(PORT, '0.0.0.0', () => console.log(`Serving on http://0.0.0.0:${PORT}`));
