#!/usr/bin/env node
// Generate a simple static site skeleton (index.html) with Header, NavBar and Footer.
const fs = require('fs');
const path = require('path');

const SITE_TITLE = 'My Website';
const TAGLINE = 'Welcome to our site';
const NAV_LINKS = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Contact', '#contact'],
];

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; min-height: 100vh; }
.site-header { background: #1e293b; color: #fff; padding: 1.5rem 2rem; }
.site-header p { opacity: .8; margin-top: .25rem; }
.navbar { background: #334155; }
.navbar ul { list-style: none; display: flex; gap: 1rem; padding: 0 2rem; }
.navbar a { display: block; color: #e2e8f0; text-decoration: none; padding: .75rem .5rem; }
.navbar a:hover { background: #475569; }
main { flex: 1; padding: 2rem; }
.site-footer { background: #1e293b; color: #cbd5e1; text-align: center; padding: 1rem; }
`.trim();

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const renderHeader = (title, tagline) => `<header class="site-header">
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(tagline)}</p>
  </header>`;

const renderNavbar = (links) => {
  const items = links
    .map(([label, href]) => `      <li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`)
    .join('\n');
  return `<nav class="navbar">\n    <ul>\n${items}\n    </ul>\n  </nav>`;
};

const renderFooter = (title) => `<footer class="site-footer">
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(title)}. All rights reserved.</p>
  </footer>`;

const renderPage = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(SITE_TITLE)}</title>
  <style>
${CSS}
  </style>
</head>
<body>
  ${renderHeader(SITE_TITLE, TAGLINE)}
  ${renderNavbar(NAV_LINKS)}
  <main id="home">
    <h2>Main Content</h2>
    <p>Your page content goes here.</p>
  </main>
  ${renderFooter(SITE_TITLE)}
</body>
</html>
`;

function main() {
  const out = path.resolve('index.html');
  fs.writeFileSync(out, renderPage(), 'utf8');
  console.log(`Site generated: ${out}`);
}

main();
