#!/usr/bin/env node
// Generate a small static site with Header, NavBar (with dropdown) and Footer.
// Run: node build-site.js  -> creates ./site/*.html and ./site/style.css
const fs = require('fs');
const path = require('path');

const SITE_TITLE = 'Fresh Market';
const OUT_DIR = path.join(__dirname, 'site');

// Navigation tree: each entry gets its own page
const NAV = [
  {
    title: 'Fruit', slug: 'fruit', children: [
      { title: 'Apple', slug: 'apple' },
      { title: 'Banane', slug: 'banane' },
      { title: 'Pear', slug: 'pear' },
    ],
  },
  { title: 'Vegetable', slug: 'vegetable', children: [] },
];

const CSS = `* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; display: flex; flex-direction: column; min-height: 100vh; }
.site-header { background: #2e7d32; color: #fff; padding: 1rem 2rem; }
.site-header a { color: inherit; text-decoration: none; }
.navbar { background: #388e3c; }
.menu, .submenu { list-style: none; margin: 0; padding: 0; }
.menu { display: flex; }
.menu > li { position: relative; }
.navbar a { display: block; padding: .75rem 1.25rem; color: #fff; text-decoration: none; }
.navbar a:hover, .navbar a.active { background: #1b5e20; }
.submenu { display: none; position: absolute; top: 100%; left: 0; min-width: 160px; background: #43a047; z-index: 10; }
.has-submenu:hover > .submenu, .has-submenu:focus-within > .submenu { display: block; }
main { flex: 1; padding: 2rem; }
.site-footer { background: #222; color: #ccc; text-align: center; padding: 1rem; }
`;

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const link = (item, active) => {
  const cls = item.slug === active ? ' class="active"' : '';
  return `<a href="${item.slug}.html"${cls}>${escape(item.title)}</a>`;
};

const header = () =>
  `<header class="site-header"><h1><a href="index.html">${escape(SITE_TITLE)}</a></h1></header>`;

const navbar = (active) => {
  const items = NAV.map((item) => {
    const children = item.children || [];
    const sub = children.length
      ? `<ul class="submenu">${children.map((c) => `<li>${link(c, active)}</li>`).join('')}</ul>`
      : '';
    const cls = children.length ? ' class="has-submenu"' : '';
    return `<li${cls}>${link(item, active)}${sub}</li>`;
  });
  return `<nav class="navbar"><ul class="menu">${items.join('')}</ul></nav>`;
};

const footer = () =>
  `<footer class="site-footer">&copy; ${new Date().getFullYear()} ${escape(SITE_TITLE)}. All rights reserved.</footer>`;

const page = (title, active, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(title)} | ${escape(SITE_TITLE)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${header()}
  ${navbar(active)}
  <main>
    <h2>${escape(title)}</h2>
    ${content}
  </main>
  ${footer()}
</body>
</html>
`;

function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'style.css'), CSS, 'utf8');

  const pages = {
    index: page('Home', 'index', '<p>Welcome! Use the navigation bar to explore.</p>'),
  };

  for (const item of NAV) {
    const children = item.children || [];
    const content = children.length
      ? `<p>Choose a ${item.title.toLowerCase()}:</p><ul>${children.map((c) => `<li>${link(c, null)}</li>`).join('')}</ul>`
      : `<p>This is the ${escape(item.title)} page.</p>`;
    pages[item.slug] = page(item.title, item.slug, content);

    for (const child of children) {
      const childContent = `<p>This is the ${escape(child.title)} page.</p><p>Back to ${link(item, null)}</p>`;
      pages[child.slug] = page(child.title, child.slug, childContent);
    }
  }

  for (const [slug, markup] of Object.entries(pages)) {
    const file = path.join(OUT_DIR, `${slug}.html`);
    fs.writeFileSync(file, markup, 'utf8');
    console.log(`Created ${file}`);
  }
}

build();
