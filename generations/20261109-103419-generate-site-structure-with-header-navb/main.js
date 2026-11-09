const http = require('http');

// Site data: groups (no icons) and items (with icons)
const CATEGORIES = [
  { slug: 'fruit', title: 'Fruit', items: [
    { slug: 'apple', name: 'Apple', icon: '🍎', desc: 'Crisp and sweet, apples are rich in fiber and vitamin C.' },
    { slug: 'banana', name: 'Banana', icon: '🍌', desc: 'Bananas are a great source of potassium and quick energy.' },
    { slug: 'pear', name: 'Pear', icon: '🍐', desc: 'Juicy pears are full of fiber and antioxidants.' },
  ] },
  { slug: 'vegetables', title: 'Vegetables', items: [
    { slug: 'carrots', name: 'Carrots', icon: '🥕', desc: 'Carrots are packed with beta-carotene, good for your eyes.' },
    { slug: 'onions', name: 'Onions', icon: '🧅', desc: 'Onions add flavor to almost any dish and contain vitamin C.' },
    { slug: 'garlic', name: 'Garlic', icon: '🧄', desc: 'Garlic is aromatic and has been used as medicine for centuries.' },
  ] },
];

const CSS = `
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Arial,sans-serif;display:flex;flex-direction:column;min-height:100vh;color:#222}
header{background:#2e7d32;color:#fff;padding:1rem 1.5rem}
header a{color:#fff;text-decoration:none}header h1{margin:0;font-size:1.5rem}
.wrap{display:flex;flex:1}
nav{width:220px;background:#f1f8e9;border-right:1px solid #ddd;padding:1rem}
nav ul{list-style:none;margin:0;padding:0}
nav ul ul{padding-left:1rem;margin:.25rem 0 .75rem}
nav a{display:block;padding:.35rem .5rem;border-radius:4px;color:#333;text-decoration:none}
nav a:hover{background:#dcedc8}
nav a.active{background:#2e7d32;color:#fff}
nav a.group{font-weight:bold;text-transform:uppercase;font-size:.85rem}
main{flex:1;padding:1.5rem 2rem}
footer{background:#263238;color:#ccc;text-align:center;padding:.75rem}
.icon{margin-right:.4rem}
.big{font-size:5rem}
.cards{display:flex;flex-wrap:wrap;gap:1rem}
.card{border:1px solid #ddd;border-radius:8px;padding:1rem;width:160px;text-align:center;text-decoration:none;color:#222}
.card:hover{background:#f1f8e9}
.card span{font-size:2.5rem;display:block}
`;

function navHtml(path) {
  let out = '<ul>';
  for (const c of CATEGORIES) {
    const href = `/${c.slug}`;
    out += `<li><a class="group${path === href ? ' active' : ''}" href="${href}">${c.title}</a><ul>`;
    for (const i of c.items) {
      const ihref = `${href}/${i.slug}`;
      const cls = path === ihref ? ' class="active"' : '';
      out += `<li><a${cls} href="${ihref}"><span class="icon">${i.icon}</span>${i.name}</a></li>`;
    }
    out += '</ul></li>';
  }
  return out + '</ul>';
}

function layout(title, body, path) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} - Fresh Market</title><style>${CSS}</style></head>
<body>
<header><h1><a href="/">🥗 Fresh Market</a></h1></header>
<div class="wrap">
<nav>${navHtml(path)}</nav>
<main>${body}</main>
</div>
<footer>&copy; ${new Date().getFullYear()} Fresh Market. All rights reserved.</footer>
</body></html>`;
}

const cards = (cat) => '<div class="cards">' + cat.items.map(i =>
  `<a class="card" href="/${cat.slug}/${i.slug}"><span>${i.icon}</span>${i.name}</a>`).join('') + '</div>';

function render(rawPath) {
  const path = rawPath.replace(/\/+$/, '') || '/';
  if (path === '/') {
    let body = '<h2>Welcome</h2><p>Choose a fruit or vegetable from the menu on the left.</p>';
    for (const c of CATEGORIES) body += `<h3><a href="/${c.slug}">${c.title}</a></h3>` + cards(c);
    return [200, layout('Home', body, path)];
  }
  const parts = path.replace(/^\/+/, '').split('/');
  const cat = CATEGORIES.find(c => c.slug === parts[0]);
  if (cat && parts.length === 1) {
    const body = `<h2>${cat.title}</h2><p>All items in ${cat.title.toLowerCase()}:</p>` + cards(cat);
    return [200, layout(cat.title, body, path)];
  }
  if (cat && parts.length === 2) {
    const item = cat.items.find(i => i.slug === parts[1]);
    if (item) {
      const body = `<div class="big">${item.icon}</div><h2>${item.name}</h2><p>${item.desc}</p>` +
        `<p><a href="/${cat.slug}">&larr; Back to ${cat.title}</a></p>`;
      return [200, layout(item.name, body, path)];
    }
  }
  return [404, layout('Not Found', "<h2>404 - Page not found</h2><p><a href='/'>Go home</a></p>", path)];
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const [status, html] = render(pathname);
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(html) });
  res.end(req.method === 'HEAD' ? undefined : html);
});

const PORT = parseInt(process.env.PORT || '8000', 10);
server.listen(PORT, '0.0.0.0', () => console.log(`Listening on 0.0.0.0:${PORT}`));
