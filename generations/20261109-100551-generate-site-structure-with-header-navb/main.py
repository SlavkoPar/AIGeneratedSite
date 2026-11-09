import os
from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# Site content: category -> items
SITE = {
    "fruit": {
        "title": "Fruit",
        "intro": "Sweet, juicy and full of vitamins.",
        "items": {
            "apple": ("Apple", "Crisp and refreshing, apples come in thousands of varieties."),
            "banana": ("Banana", "A potassium-rich snack that comes in its own wrapper."),
            "pear": ("Pear", "Soft, sweet and buttery when perfectly ripe."),
        },
    },
    "vegetables": {
        "title": "Vegetables",
        "intro": "Wholesome, savory and good for you.",
        "items": {
            "carrots": ("Carrots", "Crunchy root vegetables packed with beta-carotene."),
            "onions": ("Onions", "The flavorful foundation of countless dishes."),
            "garlic": ("Garlic", "Pungent, aromatic and loved by cooks worldwide."),
        },
    },
}

CSS = """
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
"""


def nav_html(current):
    parts = ['<nav><ul>', '<li><a href="/"%s>Home</a></li>' % (' class="active"' if current == "/" else "")]
    for cat_slug, cat in SITE.items():
        href = "/" + cat_slug
        active = ' class="active"' if current.startswith(href) else ""
        parts.append('<li><a href="%s"%s>%s &#9662;</a><ul>' % (href, active, escape(cat["title"])))
        for item_slug, (name, _) in cat["items"].items():
            ihref = "%s/%s" % (href, item_slug)
            ia = ' class="active"' if current == ihref else ""
            parts.append('<li><a href="%s"%s>%s</a></li>' % (ihref, ia, escape(name)))
        parts.append("</ul></li>")
    parts.append("</ul></nav>")
    return "".join(parts)


def layout(title, body, current):
    return """<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>%s | Fresh Market</title><style>%s</style></head>
<body><header><h1><a href="/">Fresh Market</a></h1><p>Fruit &amp; Vegetables Guide</p></header>
%s<main>%s</main>
<footer>&copy; Fresh Market &middot; All rights reserved</footer></body></html>""" % (
        escape(title), CSS, nav_html(current), body)


def render(path):
    path = path.split("?")[0].rstrip("/") or "/"
    if path == "/":
        cards = "".join('<div class="card"><h3><a href="/%s">%s</a></h3><p>%s</p></div>' % (s, escape(c["title"]), escape(c["intro"])) for s, c in SITE.items())
        return 200, layout("Home", "<h2>Welcome</h2><p>Explore our fruit and vegetables.</p><div class='cards'>%s</div>" % cards, "/")
    parts = path.strip("/").split("/")
    cat = SITE.get(parts[0])
    if cat and len(parts) == 1:
        cards = "".join('<div class="card"><h3><a href="/%s/%s">%s</a></h3><p>%s</p></div>' % (parts[0], s, escape(n), escape(d)) for s, (n, d) in cat["items"].items())
        body = '<p class="crumbs"><a href="/">Home</a> / %s</p><h2>%s</h2><p>%s</p><div class="cards">%s</div>' % (escape(cat["title"]), escape(cat["title"]), escape(cat["intro"]), cards)
        return 200, layout(cat["title"], body, path)
    if cat and len(parts) == 2 and parts[1] in cat["items"]:
        name, desc = cat["items"][parts[1]]
        body = '<p class="crumbs"><a href="/">Home</a> / <a href="/%s">%s</a> / %s</p><h2>%s</h2><p>%s</p>' % (parts[0], escape(cat["title"]), escape(name), escape(name), escape(desc))
        return 200, layout(name, body, path)
    return 404, layout("Not Found", "<h2>404 - Page not found</h2><p><a href='/'>Go home</a></p>", path)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        status, html = render(self.path)
        data = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print("Listening on 0.0.0.0:%d" % port)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
