import os
import html
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

# Navigation structure: (label, href, children)
NAV = [
    ('Fruit', '/fruit', [
        ('Apple', '/fruit/apple'),
        ('Banane', '/fruit/banane'),
        ('Pear', '/fruit/pear'),
    ]),
    ('Vegetable', '/vegetable', []),
]

# Page content: path -> (title, paragraph)
PAGES = {
    '/': ('Home', 'Welcome! Use the navigation bar to explore fruits and vegetables.'),
    '/fruit': ('Fruit', 'Fruits are sweet, seed-bearing parts of plants. Pick one from the menu: Apple, Banane or Pear.'),
    '/fruit/apple': ('Apple', 'Apples are crunchy fruits that come in many varieties, such as Gala, Fuji and Granny Smith.'),
    '/fruit/banane': ('Banane', 'Bananes are long, curved fruits with soft, sweet flesh and a yellow peel.'),
    '/fruit/pear': ('Pear', 'Pears are juicy fruits with a sweet taste and a characteristic bell shape.'),
    '/vegetable': ('Vegetable', 'Vegetables are edible plant parts like leaves, roots and stems: carrots, spinach, broccoli and more.'),
}

CSS = '''
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
'''


def cls(active):
    return ' class="active"' if active else ''


def nav_html(current):
    items = []
    for label, href, children in NAV:
        active = current == href or current.startswith(href + '/')
        arrow = ' &#9662;' if children else ''
        sub = ''
        if children:
            subs = ''.join(
                f'<li><a href="{h}"{cls(current == h)}>{html.escape(l)}</a></li>'
                for l, h in children
            )
            sub = f'<ul class="submenu">{subs}</ul>'
        items.append(f'<li><a href="{href}"{cls(active)}>{html.escape(label)}{arrow}</a>{sub}</li>')
    return '<nav><ul>' + ''.join(items) + '</ul></nav>'


def render(current, title, text):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} - Fruit &amp; Vegetable Site</title>
<style>{CSS}</style>
</head>
<body>
<header><h1><a href="/">Fruit &amp; Vegetable Site</a></h1></header>
{nav_html(current)}
<main>
<h2>{html.escape(title)}</h2>
<p>{html.escape(text)}</p>
</main>
<footer>&copy; {date.today().year} Fruit &amp; Vegetable Site. All rights reserved.</footer>
</body>
</html>'''


class Handler(BaseHTTPRequestHandler):
    def _respond(self, send_body=True):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        path = path.rstrip('/') or '/'
        if path in PAGES:
            status = 200
            title, text = PAGES[path]
        else:
            status = 404
            title, text = 'Page not found', 'Sorry, the page you requested does not exist.'
        body = render(path, title, text).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        if send_body:
            self.wfile.write(body)

    def do_GET(self):
        self._respond(True)

    def do_HEAD(self):
        self._respond(False)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    server = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    print(f'Serving on http://0.0.0.0:{port}')
    server.serve_forever()
