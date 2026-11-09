import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# Site data: categories and their items (emoji used as icons)
CATEGORIES = [
    {
        "slug": "fruit", "name": "Fruit", "icon": "\U0001F353",
        "desc": "Sweet, juicy and full of vitamins.",
        "items": [
            {"slug": "apple", "name": "Apple", "icon": "\U0001F34E",
             "desc": "Apples are crisp, sweet-to-tart fruits grown on trees all over the world.",
             "facts": ["There are over 7,500 apple varieties.", "Apples float because they are about 25% air.", "Rich in fiber and vitamin C."]},
            {"slug": "banana", "name": "Banana", "icon": "\U0001F34C",
             "desc": "Bananas are soft, sweet fruits that come in their own handy peel.",
             "facts": ["Bananas are botanically berries.", "A great source of potassium.", "They grow in clusters called hands."]},
            {"slug": "pear", "name": "Pear", "icon": "\U0001F350",
             "desc": "Pears are mild, buttery fruits with a distinctive bell shape.",
             "facts": ["Pears ripen from the inside out.", "They are related to apples and quinces.", "High in dietary fiber."]},
        ],
    },
    {
        "slug": "vegetables", "name": "Vegetables", "icon": "\U0001F966",
        "desc": "Healthy, savory and the base of countless dishes.",
        "items": [
            {"slug": "carrots", "name": "Carrots", "icon": "\U0001F955",
             "desc": "Carrots are crunchy root vegetables, usually orange, packed with beta-carotene.",
             "facts": ["The first carrots were purple and yellow.", "Great for eye health thanks to vitamin A.", "Can be eaten raw or cooked."]},
            {"slug": "onions", "name": "Onions", "icon": "\U0001F9C5",
             "desc": "Onions are pungent bulbs that add depth of flavor to almost any savory dish.",
             "facts": ["Cutting onions releases a gas that makes you cry.", "Cultivated for over 5,000 years.", "Come in yellow, red and white varieties."]},
            {"slug": "garlic", "name": "Garlic", "icon": "\U0001F9C4",
             "desc": "Garlic is an aromatic bulb made of cloves, loved for its strong flavor.",
             "facts": ["A close relative of onions.", "One bulb typically has 10-20 cloves.", "Used as medicine in ancient times."]},
        ],
    },
]

CSS = """
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
"""


def nav_html(path):
    out = ["<ul>", '<li><a href="/"' + (' class="active"' if path == "/" else "") + '><span class="icon">\U0001F3E0</span>Home</a></li>']
    for c in CATEGORIES:
        href = "/" + c["slug"]
        active = ' class="active"' if path == href else ""
        out.append(f'<li class="cat"><a href="{href}"{active}><span class="icon">{c["icon"]}</span>{c["name"]}</a><ul>')
        for i in c["items"]:
            ihref = f'{href}/{i["slug"]}'
            iactive = ' class="active"' if path == ihref else ""
            out.append(f'<li><a href="{ihref}"{iactive}><span class="icon">{i["icon"]}</span>{i["name"]}</a></li>')
        out.append("</ul></li>")
    out.append("</ul>")
    return "".join(out)


def layout(title, content, path):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} - Fresh Market</title><style>{CSS}</style></head>
<body>
<header><a href="/">\U0001F33F Fresh Market</a></header>
<nav>{nav_html(path)}</nav>
<main>{content}</main>
<footer>&copy; 2024 Fresh Market &middot; Fruits &amp; Vegetables</footer>
</body></html>"""


def card(href, icon, name, desc):
    return f'<a class="card" href="{href}"><div class="big">{icon}</div><h3>{name}</h3><p>{desc}</p></a>'


def render(path):
    """Return (status, html) for the given path."""
    if path == "/":
        cards = "".join(card("/" + c["slug"], c["icon"], c["name"], c["desc"]) for c in CATEGORIES)
        return 200, layout("Home", f"<h1>Welcome to Fresh Market</h1><p>Pick a category from the menu on the left.</p><div class='cards'>{cards}</div>", path)
    parts = [p for p in path.split("/") if p]
    cat = next((c for c in CATEGORIES if parts and c["slug"] == parts[0]), None)
    if cat and len(parts) == 1:
        cards = "".join(card(f'/{cat["slug"]}/{i["slug"]}', i["icon"], i["name"], i["desc"]) for i in cat["items"])
        return 200, layout(cat["name"], f'<h1>{cat["icon"]} {cat["name"]}</h1><p>{cat["desc"]}</p><div class="cards">{cards}</div>', path)
    if cat and len(parts) == 2:
        item = next((i for i in cat["items"] if i["slug"] == parts[1]), None)
        if item:
            facts = "".join(f"<li>{f}</li>" for f in item["facts"])
            content = (f'<div class="hero">{item["icon"]}</div><h1>{item["name"]}</h1><p>{item["desc"]}</p>'
                       f'<h2>Fun facts</h2><ul>{facts}</ul><p><a href="/{cat["slug"]}">&larr; Back to {cat["name"]}</a></p>')
            return 200, layout(item["name"], content, path)
    return 404, layout("Not found", "<h1>404 - Page not found</h1><p><a href='/'>Go home</a></p>", path)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?")[0].rstrip("/") or "/"
        status, html = render(path.lower())
        body = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Serving on http://0.0.0.0:{port}")
    server.serve_forever()
