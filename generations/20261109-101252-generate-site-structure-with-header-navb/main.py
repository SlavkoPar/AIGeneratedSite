#!/usr/bin/env python3
"""Simple site with Header, left NavBar, Footer and a page for each link.
Runs as an HTTP server on 0.0.0.0:$PORT (default 8000). Standard library only."""
import os
from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from datetime import date

SITE_NAME = "Fresh Produce"

# Site structure: categories with child pages
SITE = [
    {
        "slug": "fruit", "title": "Fruit",
        "desc": "Fruit is the sweet, seed-bearing part of a flowering plant. Pick one from the menu.",
        "children": [
            {"slug": "apple", "title": "Apple", "desc": "Apples are crisp, juicy fruits that grow on trees and come in many varieties such as Gala, Fuji and Granny Smith."},
            {"slug": "banana", "title": "Banana", "desc": "Bananas are soft, sweet tropical fruits rich in potassium, perfect as a quick snack."},
            {"slug": "pear", "title": "Pear", "desc": "Pears are mild, buttery fruits that ripen from the inside out and pair well with cheese."},
        ],
    },
    {
        "slug": "vegetables", "title": "Vegetables",
        "desc": "Vegetables are edible parts of plants such as roots, bulbs and leaves. Pick one from the menu.",
        "children": [
            {"slug": "carrots", "title": "Carrots", "desc": "Carrots are crunchy root vegetables packed with beta-carotene, great raw or cooked."},
            {"slug": "onions", "title": "Onions", "desc": "Onions are pungent bulbs that form the flavor base of countless dishes worldwide."},
            {"slug": "garlic", "title": "Garlic", "desc": "Garlic is an aromatic bulb with a strong flavor, used in cooking and traditional medicine."},
        ],
    },
]

CSS = """
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
"""


def build_pages():
    """Return dict: path -> (title, breadcrumbs list, body html)."""
    pages = {}
    home_links = "".join(
        f'<li><a href="/{c["slug"]}">{escape(c["title"])}</a></li>' for c in SITE)
    pages["/"] = ("Home", [], f"<h2>Welcome to {SITE_NAME}</h2><p>Browse our categories using the menu on the left.</p><ul>{home_links}</ul>")
    for cat in SITE:
        cpath = f"/{cat['slug']}"
        items = "".join(
            f'<li><a href="{cpath}/{ch["slug"]}">{escape(ch["title"])}</a></li>' for ch in cat["children"])
        pages[cpath] = (cat["title"], [("/", "Home")],
                        f"<h2>{escape(cat['title'])}</h2><p>{escape(cat['desc'])}</p><ul>{items}</ul>")
        for ch in cat["children"]:
            pages[f"{cpath}/{ch['slug']}"] = (
                ch["title"], [("/", "Home"), (cpath, cat["title"])],
                f"<h2>{escape(ch['title'])}</h2><p>{escape(ch['desc'])}</p>")
    return pages


PAGES = build_pages()


def nav_html(current):
    def link(href, text):
        cls = ' class="active"' if href == current else ""
        return f'<a href="{href}"{cls}>{escape(text)}</a>'
    parts = ["<ul>", f"<li>{link('/', 'Home')}</li>"]
    for cat in SITE:
        cpath = f"/{cat['slug']}"
        parts.append(f'<li class="cat">{link(cpath, cat["title"])}<ul>')
        for ch in cat["children"]:
            parts.append(f"<li>{link(cpath + '/' + ch['slug'], ch['title'])}</li>")
        parts.append("</ul></li>")
    parts.append("</ul>")
    return "".join(parts)


def render(path, title, crumbs, body):
    crumb_html = ""
    if crumbs:
        crumb_html = '<div class="crumbs">' + " &rsaquo; ".join(
            f'<a href="{h}">{escape(t)}</a>' for h, t in crumbs) + f" &rsaquo; {escape(title)}</div>"
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} | {SITE_NAME}</title><style>{CSS}</style></head>
<body>
<header><h1><a href="/">{SITE_NAME}</a></h1></header>
<nav>{nav_html(path)}</nav>
<main>{crumb_html}{body}</main>
<footer>&copy; {date.today().year} {SITE_NAME}. All rights reserved.</footer>
</body></html>"""


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if len(path) > 1:
            path = path.rstrip("/")
        page = PAGES.get(path.lower())
        if page:
            status, html = 200, render(path.lower(), *page)
        else:
            status = 404
            html = render(path, "Not Found", [("/", "Home")],
                          "<h2>404 - Page not found</h2><p>Use the menu to find your way.</p>")
        data = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Serving on http://0.0.0.0:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
