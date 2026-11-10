import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

# Inline SVG icons for each item
ICONS = {
    'apple': '<svg viewBox="0 0 64 64"><path d="M32 18c-6-6-20-4-20 12 0 14 10 26 20 22 10 4 20-8 20-22 0-16-14-18-20-12z" fill="#e53935"/><path d="M32 18c0-6 2-10 6-12" stroke="#5d4037" stroke-width="3" fill="none"/><path d="M34 12c4-6 12-6 14-4-2 4-8 8-14 4z" fill="#43a047"/></svg>',
    'pear': '<svg viewBox="0 0 64 64"><path d="M32 14c-6 0-8 8-8 14 0 6-10 10-10 20 0 8 8 12 18 12s18-4 18-12c0-10-10-14-10-20 0-6-2-14-8-14z" fill="#c0ca33"/><path d="M32 14c0-4 1-7 3-9" stroke="#5d4037" stroke-width="3" fill="none"/><path d="M34 9c4-4 10-4 12-2-2 3-7 5-12 2z" fill="#43a047"/></svg>',
    'banana': '<svg viewBox="0 0 64 64"><path d="M12 16c4 22 16 36 40 36 4 0 6-4 2-6-18-2-28-14-34-32-2-4-8-4-8 2z" fill="#fdd835" stroke="#f9a825" stroke-width="2"/><path d="M11 15l2-7 5 2-2 6z" fill="#6d4c41"/></svg>',
    'carrots': '<svg viewBox="0 0 64 64"><path d="M46 20L14 56c-3 2-6-1-4-4L40 16z" fill="#fb8c00"/><path d="M22 44l5 3M28 36l5 3M34 28l4 3" stroke="#e65100" stroke-width="2"/><path d="M42 16c-2-6 0-12 4-14 0 5 1 8 3 11 3-3 8-4 12-2-3 3-6 6-11 8z" fill="#43a047"/></svg>',
    'onions': '<svg viewBox="0 0 64 64"><path d="M32 8c0 10-20 16-20 32 0 10 10 16 20 16s20-6 20-16C52 24 32 18 32 8z" fill="#ab47bc"/><path d="M32 14c-4 10-10 18-10 28M32 14c4 10 10 18 10 28" stroke="#ce93d8" stroke-width="2" fill="none"/><path d="M28 56l-2 5M32 56v6M36 56l2 5" stroke="#8d6e63" stroke-width="2"/></svg>',
    'garlic': '<svg viewBox="0 0 64 64"><path d="M32 6c0 10-22 18-22 34 0 10 10 16 22 16s22-6 22-16C54 24 32 16 32 6z" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="2"/><path d="M32 12c-6 12-10 22-8 42M32 12c6 12 10 22 8 42" stroke="#bdbdbd" stroke-width="2" fill="none"/><path d="M28 56l-2 5M32 56v6M36 56l2 5" stroke="#a1887f" stroke-width="2"/></svg>',
    'cabbage': '<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="24" fill="#7cb342"/><circle cx="32" cy="34" r="16" fill="#9ccc65"/><circle cx="32" cy="34" r="8" fill="#c5e1a5"/><path d="M32 10v48M10 30c10 4 34 4 44 0" stroke="#558b2f" stroke-width="2" fill="none"/></svg>',
    'potatoes': '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="34" rx="24" ry="18" transform="rotate(-15 32 34)" fill="#a1887f"/><circle cx="22" cy="30" r="2" fill="#6d4c41"/><circle cx="36" cy="26" r="2" fill="#6d4c41"/><circle cx="42" cy="38" r="2" fill="#6d4c41"/><circle cx="28" cy="42" r="2" fill="#6d4c41"/></svg>',
}

ITEMS = {
    'apple': {'name': 'Apple', 'desc': 'A crisp, juicy fruit grown worldwide and enjoyed fresh, baked or pressed into juice and cider.',
              'chars': [('Family', 'Rosaceae'), ('Origin', 'Central Asia'), ('Color', 'Red, green, yellow'), ('Taste', 'Sweet to tart'), ('Calories', '52 kcal / 100 g'), ('Key nutrients', 'Fiber, Vitamin C'), ('Season', 'Late summer to autumn')]},
    'pear': {'name': 'Pear', 'desc': 'A sweet, buttery fruit with a distinctive shape, delicious fresh or poached.',
             'chars': [('Family', 'Rosaceae'), ('Origin', 'Europe and Asia'), ('Color', 'Green, yellow, red'), ('Taste', 'Sweet, juicy, buttery'), ('Calories', '57 kcal / 100 g'), ('Key nutrients', 'Fiber, Vitamin C, Vitamin K'), ('Season', 'Autumn')]},
    'banana': {'name': 'Banana', 'desc': 'An energy-rich tropical fruit with soft creamy flesh and an easy-to-peel skin.',
               'chars': [('Family', 'Musaceae'), ('Origin', 'Southeast Asia'), ('Color', 'Yellow'), ('Taste', 'Sweet, creamy'), ('Calories', '89 kcal / 100 g'), ('Key nutrients', 'Potassium, Vitamin B6, Vitamin C'), ('Season', 'Year-round')]},
    'carrots': {'name': 'Carrots', 'desc': 'A crunchy root vegetable famous for its bright orange color and beta-carotene content.',
                'chars': [('Family', 'Apiaceae'), ('Origin', 'Persia'), ('Color', 'Orange, purple, yellow'), ('Taste', 'Sweet, earthy'), ('Calories', '41 kcal / 100 g'), ('Key nutrients', 'Beta-carotene, Vitamin K, Fiber'), ('Season', 'Year-round, peak in autumn')]},
    'onions': {'name': 'Onions', 'desc': 'A layered bulb vegetable that forms the flavor base of countless dishes.',
               'chars': [('Family', 'Amaryllidaceae'), ('Origin', 'Central Asia'), ('Color', 'Yellow, red, white'), ('Taste', 'Pungent raw, sweet when cooked'), ('Calories', '40 kcal / 100 g'), ('Key nutrients', 'Vitamin C, Vitamin B6, Quercetin'), ('Season', 'Late summer')]},
    'garlic': {'name': 'Garlic', 'desc': 'An aromatic bulb made of cloves, prized for its strong flavor and health benefits.',
               'chars': [('Family', 'Amaryllidaceae'), ('Origin', 'Central Asia'), ('Color', 'White, purple-tinged'), ('Taste', 'Pungent, spicy'), ('Calories', '149 kcal / 100 g'), ('Key nutrients', 'Manganese, Vitamin B6, Allicin'), ('Season', 'Summer')]},
    'cabbage': {'name': 'Cabbage', 'desc': 'A leafy head vegetable used in salads, soups, slaws and fermented foods like sauerkraut.',
                'chars': [('Family', 'Brassicaceae'), ('Origin', 'Europe'), ('Color', 'Green, red, white'), ('Taste', 'Mild, slightly peppery'), ('Calories', '25 kcal / 100 g'), ('Key nutrients', 'Vitamin K, Vitamin C, Fiber'), ('Season', 'Autumn to winter')]},
    'potatoes': {'name': 'Potatoes', 'desc': 'A versatile starchy tuber and one of the most important food crops in the world.',
                 'chars': [('Family', 'Solanaceae'), ('Origin', 'Andes, South America'), ('Color', 'Brown, yellow, red'), ('Taste', 'Mild, starchy'), ('Calories', '77 kcal / 100 g'), ('Key nutrients', 'Potassium, Vitamin C, Vitamin B6'), ('Season', 'Autumn')]},
}

GROUPS = [('Fruit', ['apple', 'pear', 'banana']),
          ('Vegetables', ['carrots', 'onions', 'garlic', 'cabbage', 'potatoes'])]

CSS = '''
*{box-sizing:border-box}body{margin:0;font-family:Segoe UI,Arial,sans-serif;min-height:100vh;display:grid;grid-template-columns:240px 1fr;grid-template-rows:auto 1fr auto;grid-template-areas:"header header" "nav main" "footer footer";background:#f4f7f2;color:#263238}
header{grid-area:header;background:#2e7d32;color:#fff;padding:16px 24px;display:flex;align-items:center;gap:12px}header a{color:#fff;text-decoration:none}header h1{margin:0;font-size:1.6rem}
nav{grid-area:nav;background:#fff;border-right:1px solid #ddd;padding:16px}nav h3{margin:16px 0 8px;text-transform:uppercase;font-size:.85rem;color:#2e7d32;letter-spacing:1px}
nav ul{list-style:none;margin:0;padding:0}nav a{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;color:#263238;text-decoration:none}nav a:hover{background:#e8f5e9}nav a.active{background:#c8e6c9;font-weight:600}
.ico{width:24px;height:24px;display:inline-block}.ico svg,.big svg,.card svg{width:100%;height:100%}
main{grid-area:main;padding:32px}footer{grid-area:footer;background:#263238;color:#cfd8dc;text-align:center;padding:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px}.card{background:#fff;border-radius:10px;padding:16px;text-align:center;text-decoration:none;color:#263238;box-shadow:0 1px 4px rgba(0,0,0,.1)}.card:hover{box-shadow:0 4px 12px rgba(0,0,0,.15)}.card .ico{width:72px;height:72px}
.item{display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap}.big{width:180px;height:180px;background:#fff;border-radius:16px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
table{border-collapse:collapse;background:#fff;min-width:320px;box-shadow:0 1px 4px rgba(0,0,0,.1)}td,th{padding:10px 14px;border-bottom:1px solid #eee;text-align:left}th{background:#e8f5e9;width:40%}
@media(max-width:700px){body{grid-template-columns:1fr;grid-template-areas:"header" "nav" "main" "footer"}nav{border-right:none;border-bottom:1px solid #ddd}}
'''


def layout(title, content, active=''):
    nav = ''
    for group, slugs in GROUPS:
        links = ''.join(
            '<li><a href="/item/%s" class="%s"><span class="ico">%s</span>%s</a></li>'
            % (s, 'active' if s == active else '', ICONS[s], ITEMS[s]['name']) for s in slugs)
        nav += '<h3>%s</h3><ul>%s</ul>' % (group, links)
    return ('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            '<title>%s | Fresh Market</title><style>%s</style></head><body>'
            '<header><a href="/"><h1>Fresh Market</h1></a><span>Fruit &amp; Vegetables guide</span></header>'
            '<nav>%s</nav><main>%s</main>'
            '<footer>&copy; 2024 Fresh Market &middot; All about fruit and vegetables</footer></body></html>'
            % (title, CSS, nav, content))


def home_page():
    content = '<h2>Welcome!</h2><p>Choose a fruit or vegetable from the menu to see its characteristics.</p>'
    for group, slugs in GROUPS:
        cards = ''.join('<a class="card" href="/item/%s"><span class="ico">%s</span><div>%s</div></a>'
                        % (s, ICONS[s], ITEMS[s]['name']) for s in slugs)
        content += '<h3>%s</h3><div class="grid">%s</div>' % (group, cards)
    return layout('Home', content)


def item_page(slug):
    it = ITEMS[slug]
    rows = ''.join('<tr><th>%s</th><td>%s</td></tr>' % (k, v) for k, v in it['chars'])
    content = ('<h2>%s</h2><div class="item"><div class="big">%s</div><div><p>%s</p>'
               '<table><tbody>%s</tbody></table></div></div>' % (it['name'], ICONS[slug], it['desc'], rows))
    return layout(it['name'], content, slug)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path.rstrip('/') or '/'
        status = 200
        if path == '/':
            body = home_page()
        elif path.startswith('/item/') and path[6:] in ITEMS:
            body = item_page(path[6:])
        else:
            status = 404
            body = layout('Not found', '<h2>404 - Page not found</h2><p><a href="/">Back to home</a></p>')
        data = body.encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print('Listening on http://0.0.0.0:%d' % port)
    ThreadingHTTPServer(('0.0.0.0', port), Handler).serve_forever()
