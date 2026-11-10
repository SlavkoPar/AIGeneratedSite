#!/usr/bin/env python3
"""Fresh Market site: header, left navbar with groups, footer, and item pages with icons."""
import os
from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

# Inline SVG icons (viewBox 0 0 64 64), one per item (groups have no icon)
ICONS = {
    "apple": '<path d="M32 18c-6-6-20-4-20 12 0 14 10 26 20 22 10 4 20-8 20-22 0-16-14-18-20-12z" fill="#e53935"/><path d="M32 18c0-6 2-10 6-12" stroke="#5d4037" stroke-width="3" fill="none"/><path d="M34 12c4-6 12-6 14-4-4 6-10 6-14 4z" fill="#43a047"/>',
    "pear": '<path d="M32 14c-6 0-8 8-8 14-6 4-10 10-10 16 0 10 8 16 18 16s18-6 18-16c0-6-4-12-10-16 0-6-2-14-8-14z" fill="#c0ca33"/><path d="M32 14c0-4 1-8 4-10" stroke="#5d4037" stroke-width="3" fill="none"/><path d="M35 9c4-4 10-4 12-2-4 4-8 4-12 2z" fill="#43a047"/>',
    "banana": '<path d="M10 20c4 22 24 34 44 26 2-1 2-4 0-4-18 4-32-6-38-24-1-3-6-2-6 2z" fill="#fdd835" stroke="#f9a825" stroke-width="2"/><path d="M9 19l-2-7 6 2z" fill="#6d4c41"/>',
    "carrots": '<polygon points="20,22 44,22 32,60" fill="#fb8c00"/><path d="M24 32h6M27 42h5M29 50h4" stroke="#e65100" stroke-width="2"/><path d="M31 22c-4-8-10-12-14-12 2 6 6 10 14 12zM31 22c0-8 2-14 6-18 2 6 0 12-6 18zM33 22c4-6 10-8 14-8-2 6-8 8-14 8z" fill="#43a047"/>',
    "onions": '<path d="M32 8c2 8 20 16 20 32 0 10-9 16-20 16s-20-6-20-16c0-16 18-24 20-32z" fill="#ab47bc"/><path d="M32 12c-4 10-10 18-10 28M32 12c4 10 10 18 10 28" stroke="#7b1fa2" stroke-width="2" fill="none"/><path d="M28 56l-2 4M32 56v5M36 56l2 4" stroke="#8d6e63" stroke-width="2"/>',
    "garlic": '<path d="M32 8c2 10 22 16 22 32 0 10-10 16-22 16S10 50 10 40c0-16 20-22 22-32z" fill="#f5f0e1" stroke="#bcaaa4" stroke-width="2"/><path d="M32 16v40M32 18c-8 8-12 16-12 36M32 18c8 8 12 16 12 36" stroke="#bcaaa4" stroke-width="2" fill="none"/>',
    "cabbage": '<circle cx="32" cy="34" r="24" fill="#66bb6a"/><circle cx="32" cy="34" r="16" fill="#a5d6a7"/><circle cx="32" cy="34" r="8" fill="#c8e6c9"/><path d="M32 10v48M12 24l20 10 20-10" stroke="#2e7d32" stroke-width="2" fill="none"/>',
}

ITEMS = [
    {"slug": "apple", "name": "Apple", "group": "Fruit",
     "desc": "A crisp, juicy pome fruit enjoyed fresh, baked or pressed into juice.",
     "chars": [("Color", "Red, green, yellow"), ("Taste", "Sweet to tart"), ("Calories", "52 kcal / 100 g"), ("Season", "Late summer - autumn"), ("Origin", "Central Asia"), ("Key nutrients", "Fiber, vitamin C")]},
    {"slug": "pear", "name": "Pear", "group": "Fruit",
     "desc": "A soft, buttery fruit with a distinctive bell shape.",
     "chars": [("Color", "Green, yellow, red"), ("Taste", "Sweet and juicy"), ("Calories", "57 kcal / 100 g"), ("Season", "Autumn"), ("Origin", "Europe and Asia"), ("Key nutrients", "Fiber, vitamin C, copper")]},
    {"slug": "banana", "name": "Banana", "group": "Fruit",
     "desc": "An energy-rich tropical fruit with an easy-to-peel skin.",
     "chars": [("Color", "Yellow"), ("Taste", "Sweet and creamy"), ("Calories", "89 kcal / 100 g"), ("Season", "Year-round"), ("Origin", "Southeast Asia"), ("Key nutrients", "Potassium, vitamin B6")]},
    {"slug": "carrots", "name": "Carrots", "group": "Vegetables",
     "desc": "Crunchy root vegetables famous for their beta-carotene.",
     "chars": [("Color", "Orange (also purple, white)"), ("Taste", "Sweet and earthy"), ("Calories", "41 kcal / 100 g"), ("Season", "Year-round"), ("Origin", "Persia"), ("Key nutrients", "Vitamin A, vitamin K")]},
    {"slug": "onions", "name": "Onions", "group": "Vegetables",
     "desc": "Layered bulbs that form the flavor base of countless dishes.",
     "chars": [("Color", "White, yellow, red"), ("Taste", "Pungent, sweet when cooked"), ("Calories", "40 kcal / 100 g"), ("Season", "Late summer - autumn"), ("Origin", "Central Asia"), ("Key nutrients", "Vitamin C, vitamin B6")]},
    {"slug": "garlic", "name": "Garlic", "group": "Vegetables",
     "desc": "Aromatic bulb made of cloves, prized for its bold flavor.",
     "chars": [("Color", "White, purple-tinged"), ("Taste", "Pungent and spicy"), ("Calories", "149 kcal / 100 g"), ("Season", "Summer"), ("Origin", "Central Asia"), ("Key nutrients", "Manganese, vitamin B6, allicin")]},
    {"slug": "cabbage", "name": "Cabbage", "group": "Vegetables",
     "desc": "A dense, leafy head used in salads, soups and sauerkraut.",
     "chars": [("Color", "Green, red"), ("Taste", "Mild and slightly peppery"), ("Calories", "25 kcal / 100 g"), ("Season", "Autumn - winter"), ("Origin", "Europe"), ("Key nutrients", "Vitamin K, vitamin C")]},
]
BY_SLUG = {i["slug"]: i for i in ITEMS}
GROUPS = ["Fruit", "Vegetables"]

CSS = """*{box-sizing:border-box}body{margin:0;font-family:system-ui,Segoe UI,sans-serif;display:grid;grid-template-columns:240px 1fr;grid-template-rows:auto 1fr auto;grid-template-areas:'header header' 'nav main' 'footer footer';min-height:100vh;background:#f6f8f5;color:#263238}
header{grid-area:header;background:#2e7d32;color:#fff;padding:16px 24px}header a{color:#fff;text-decoration:none;font-size:1.5rem;font-weight:700}
nav{grid-area:nav;background:#fff;border-right:1px solid #dde3da;padding:16px}
nav h3{margin:16px 8px 8px;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:#78909c}
nav ul{list-style:none;margin:0;padding:0}
nav a{display:flex;align-items:center;gap:10px;padding:8px;border-radius:8px;color:#263238;text-decoration:none}
nav a:hover{background:#e8f5e9}nav a.active{background:#c8e6c9;font-weight:600}
main{grid-area:main;padding:32px}
footer{grid-area:footer;background:#263238;color:#cfd8dc;text-align:center;padding:16px;font-size:.9rem}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
.card{background:#fff;border-radius:12px;padding:16px;text-align:center;text-decoration:none;color:inherit;box-shadow:0 1px 3px rgba(0,0,0,.08)}.card:hover{box-shadow:0 4px 12px rgba(0,0,0,.15)}
.detail{display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;background:#fff;padding:24px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
table{border-collapse:collapse}td,th{padding:8px 16px;border-bottom:1px solid #eceff1;text-align:left}th{color:#546e7a;font-weight:600}
@media(max-width:700px){body{grid-template-columns:1fr;grid-template-areas:'header' 'nav' 'main' 'footer'}nav{border-right:none;border-bottom:1px solid #dde3da}}"""


def icon(slug, size=24):
    return '<svg width="%d" height="%d" viewBox="0 0 64 64" aria-hidden="true">%s</svg>' % (size, size, ICONS[slug])


def navbar(active):
    out = []
    for g in GROUPS:
        links = "".join(
            '<li><a href="/item/%s"%s>%s<span>%s</span></a></li>' % (
                i["slug"], ' class="active"' if i["slug"] == active else "", icon(i["slug"]), escape(i["name"]))
            for i in ITEMS if i["group"] == g)
        out.append("<h3>%s</h3><ul>%s</ul>" % (escape(g), links))
    return "".join(out)


def layout(title, body, active=None):
    return ("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\">"
            "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
            "<title>" + escape(title) + " | Fresh Market</title><style>" + CSS + "</style></head><body>"
            "<header><a href=\"/\">&#127807; Fresh Market</a></header>"
            "<nav>" + navbar(active) + "</nav>"
            "<main>" + body + "</main>"
            "<footer>&copy; Fresh Market &middot; Fruit &amp; Vegetables guide</footer>"
            "</body></html>")


def home_page():
    parts = ["<h1>Welcome to Fresh Market</h1><p>Pick a fruit or vegetable from the menu to see its characteristics.</p>"]
    for g in GROUPS:
        cards = "".join('<a class="card" href="/item/%s">%s<div>%s</div></a>' % (i["slug"], icon(i["slug"], 64), escape(i["name"]))
                        for i in ITEMS if i["group"] == g)
        parts.append('<h2>%s</h2><div class="cards">%s</div>' % (escape(g), cards))
    return layout("Home", "".join(parts))


def item_page(item):
    rows = "".join("<tr><th>%s</th><td>%s</td></tr>" % (escape(k), escape(v)) for k, v in item["chars"])
    rows = "<tr><th>Group</th><td>%s</td></tr>" % escape(item["group"]) + rows
    body = ('<h1>%s</h1><div class="detail"><div>%s</div><div><p>%s</p><table>%s</table></div></div>'
            '<p><a href="/">&larr; Back to home</a></p>') % (escape(item["name"]), icon(item["slug"], 160), escape(item["desc"]), rows)
    return layout(item["name"], body, item["slug"])


class Handler(BaseHTTPRequestHandler):
    def send_html(self, status, html):
        data = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = urlparse(self.path).path.rstrip("/")
        if path == "":
            return self.send_html(200, home_page())
        if path.startswith("/item/"):
            item = BY_SLUG.get(path[len("/item/"):].lower())
            if item:
                return self.send_html(200, item_page(item))
        self.send_html(404, layout("Not found", "<h1>404 - Page not found</h1><p><a href=\"/\">Go home</a></p>"))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    print("Listening on http://0.0.0.0:%d" % port)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
