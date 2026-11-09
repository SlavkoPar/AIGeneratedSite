const http = require('http');

// Site content: category -> items
const SITE = {
  fruit: {
    title: 'Fruit',
    intro: 'Sweet, juicy and full of vitamins.',
    items: {
      apple: ['Apple', 'Crisp and refreshing, apples come in thousands of varieties.'],
      banana: ['Banana', 'A potassium-rich snack that comes in its own wrapper.'],
      pear: ['Pear', 'Soft, sweet and buttery when perfectly ripe.'],
    },
  },
  vegetables: {
    title: 'Vegetables',
    intro: 'Wholesome, savory and good for you.',
    items: {
      carrots: ['Carrots', 'Crunchy root vegetables packed with beta-carotene.'],
      onions: ['Onions', 'The flavorful foundation of countless dishes.'],
      garlic: ['Garlic', 'Pungent, aromatic and loved by cooks worldwide.'],
    },
  },
};

const CSS = `
*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;display:flex;flex-direction:column;min-height:100vh;background:#f7f7f2;color:#222}
header{background:#2e7d32;color:#fff;padding:1.2rem 2rem}header a{color:#fff;text-decoration:none}header h1{margin:0}
nav{background:#1b5e20}nav ul{list-style:none;margin:0;padding:0}nav>ul{display:flex;padding:0 2rem}
nav li{position:relative}nav a{display:block;padding:.8rem 1.2rem;color:#fff;text-decoration:none}
nav a:hover,nav a.active{background:#388e3c}
nav li ul{display:none;position:absolute;top:100%;left:0;background:#2e7d32;min-width:160px;box-shadow:0 4px 8px rgba(0,0,0,.2);z-index:10}
nav li:hover>ul,nav li:focus-within>ul{display:block}
main{flex:1;padding:2rem;max-width:900px;width:100%;margin:0 auto}
.cards{display:flex;gap:1rem;flex-wrap:wrap}.card{background:#fff;border-radius:8px;padding:1rem 1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.1);flex:1 1 200px}
.crumbs{font-size:.9rem;color:#666}.crumbs a{color:#2e7d32}
footer{background:#222;color:#ccc;text-align:center;padding:1rem}
`;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const act = (cond) => (cond ? ' class="active"' : '');

function navHtml(current) {
  let html = `<nav><ul><li><a href="/"${act(current === '/')}>Home</a></li>`;
  for (const [slug, cat] of Object.entries(SITE)) {
    const href = `/${slug}`;
    html += `<li><a href="${href}"${act(current.startsWith(href))}>${esc(cat.title)} &#9662;</a><ul>`;
    for (const [itemSlug, [name]] of Object.entries(cat.items)) {
      const ihref = `${href}/${itemSlug}`;
      html += `<li><a href="${ihref}"${act(current === ihref)}>${esc(name)}</a></li>`;
    }
    html += '</ul></li>';
  }
  return html + '</ul></nav>';
}

function layout(title, body, current) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Fresh Market</title><style>${CSS}</style></head>
<body><header><h1><a href="/">Fresh Market</a></h1><p>Fruit &amp; Vegetables Guide</p></header>
${navHtml(current)}<main>${body}</main>
<footer>&copy; Fresh Market &middot; All rights reserved</footer></body></html>`;
}

function render(rawPath) {
  const path = rawPath.split('?')[0].replace(/\/+$/, '') || '/';
  if (path === '/') {
    const cards = Object.entries(SITE).map(([s, c]) => `<div class="card"><h3><a href="/${s}">${esc(c.title)}</a></h3><p>${esc(c.intro)}</p></div>`).join('');
    return [200, layout('Home', `<h2>Welcome</h2><p>Explore our fruit and vegetables.</p><div class="cards">${cards}</div>`, '/')];
  }
  const parts = path.replace(/^\/+/, '').split('/');
  const cat = Object.prototype.hasOwnProperty.call(SITE, parts[0]) ? SITE[parts[0]] : null;
  if (cat && parts.length === 1) {
    const cards = Object.entries(cat.items).map(([s, [n, d]]) => `<div class="card"><h3><a href="/${parts[0]}/${s}">${esc(n)}</a></h3><p>${esc(d)}</p></div>`).join('');
    const body = `<p class="crumbs"><a href="/">Home</a> / ${esc(cat.title)}</p><h2>${esc(cat.title)}</h2><p>${esc(cat.intro)}</p><div class="cards">${cards}</div>`;
    return [200, layout(cat.title, body, path)];
  }
  if (cat && parts.length === 2 && Object.prototype.hasOwnProperty.call(cat.items, parts[1])) {
    const [name, desc] = cat.items[parts[1]];
    const body = `<p class="crumbs"><a href="/">Home</a> / <a href="/${parts[0]}">${esc(cat.title)}</a> / ${esc(name)}</p><h2>${esc(name)}</h2><p>${esc(desc)}</p>`;
    return [200, layout(name, body, path)];
  }
  return [404, layout('Not Found', '<h2>404 - Page not found</h2><p><a href="/">Go home</a></p>', path)];
}

const server = http.createServer((req, res) => {
  const [status, html] = render(req.url || '/');
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(html) });
  res.end(req.method === 'HEAD' ? undefined : html);
});

const PORT = parseInt(process.env.PORT, 10) || 8000;
server.listen(PORT, '0.0.0.0', () => console.log(`Listening on 0.0.0.0:${PORT}`));
