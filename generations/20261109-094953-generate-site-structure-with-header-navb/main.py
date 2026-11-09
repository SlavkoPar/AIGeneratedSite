#!/usr/bin/env python3
"""Generate a small static site with Header, NavBar (with dropdown) and Footer.
Run: python3 build_site.py  -> creates ./site/*.html and ./site/style.css
"""
import html
from datetime import date
from pathlib import Path

SITE_TITLE = "Fresh Market"
OUT_DIR = Path("site")

# Navigation tree: each entry gets its own page
NAV = [
    {"title": "Fruit", "slug": "fruit", "children": [
        {"title": "Apple", "slug": "apple"},
        {"title": "Banane", "slug": "banane"},
        {"title": "Pear", "slug": "pear"},
    ]},
    {"title": "Vegetable", "slug": "vegetable", "children": []},
]

CSS = """* { box-sizing: border-box; }
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
"""


def link(item, active):
    cls = ' class="active"' if item["slug"] == active else ""
    return f'<a href="{item["slug"]}.html"{cls}>{html.escape(item["title"])}</a>'


def header():
    return f'<header class="site-header"><h1><a href="index.html">{html.escape(SITE_TITLE)}</a></h1></header>'


def navbar(active):
    items = []
    for item in NAV:
        children = item.get("children", [])
        sub = ""
        if children:
            sub_items = "".join(f"<li>{link(c, active)}</li>" for c in children)
            sub = f'<ul class="submenu">{sub_items}</ul>'
        cls = ' class="has-submenu"' if children else ""
        items.append(f"<li{cls}>{link(item, active)}{sub}</li>")
    return f'<nav class="navbar"><ul class="menu">{"".join(items)}</ul></nav>'


def footer():
    return f'<footer class="site-footer">&copy; {date.today().year} {html.escape(SITE_TITLE)}. All rights reserved.</footer>'


def page(title, active, content):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)} | {html.escape(SITE_TITLE)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  {header()}
  {navbar(active)}
  <main>
    <h2>{html.escape(title)}</h2>
    {content}
  </main>
  {footer()}
</body>
</html>
"""


def build():
    OUT_DIR.mkdir(exist_ok=True)
    (OUT_DIR / "style.css").write_text(CSS, encoding="utf-8")

    pages = {"index": page("Home", "index", "<p>Welcome! Use the navigation bar to explore.</p>")}

    for item in NAV:
        children = item.get("children", [])
        if children:
            lst = "".join(f"<li>{link(c, None)}</li>" for c in children)
            content = f"<p>Choose a {item['title'].lower()}:</p><ul>{lst}</ul>"
        else:
            content = f"<p>This is the {html.escape(item['title'])} page.</p>"
        pages[item["slug"]] = page(item["title"], item["slug"], content)

        for child in children:
            content = (f"<p>This is the {html.escape(child['title'])} page.</p>"
                       f"<p>Back to {link(item, None)}</p>")
            pages[child["slug"]] = page(child["title"], child["slug"], content)

    for slug, markup in pages.items():
        (OUT_DIR / f"{slug}.html").write_text(markup, encoding="utf-8")
        print(f"Created {OUT_DIR / (slug + '.html')}")


if __name__ == "__main__":
    build()
