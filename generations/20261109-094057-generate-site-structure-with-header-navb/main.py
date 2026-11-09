#!/usr/bin/env python3
"""Generate a simple static site skeleton (index.html) with Header, NavBar and Footer."""
import html
from datetime import date
from pathlib import Path

SITE_TITLE = "My Website"
TAGLINE = "Welcome to our site"
NAV_LINKS = [
    ("Home", "#home"),
    ("About", "#about"),
    ("Services", "#services"),
    ("Contact", "#contact"),
]

CSS = """
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
""".strip()


def render_header(title: str, tagline: str) -> str:
    return (
        '<header class="site-header">\n'
        f'    <h1>{html.escape(title)}</h1>\n'
        f'    <p>{html.escape(tagline)}</p>\n'
        '  </header>'
    )


def render_navbar(links) -> str:
    items = "\n".join(
        f'      <li><a href="{html.escape(href)}">{html.escape(label)}</a></li>'
        for label, href in links
    )
    return f'<nav class="navbar">\n    <ul>\n{items}\n    </ul>\n  </nav>'


def render_footer(title: str) -> str:
    year = date.today().year
    return (
        '<footer class="site-footer">\n'
        f'    <p>&copy; {year} {html.escape(title)}. All rights reserved.</p>\n'
        '  </footer>'
    )


def render_page() -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(SITE_TITLE)}</title>
  <style>
{CSS}
  </style>
</head>
<body>
  {render_header(SITE_TITLE, TAGLINE)}
  {render_navbar(NAV_LINKS)}
  <main id="home">
    <h2>Main Content</h2>
    <p>Your page content goes here.</p>
  </main>
  {render_footer(SITE_TITLE)}
</body>
</html>
"""


def main() -> None:
    out = Path("index.html")
    out.write_text(render_page(), encoding="utf-8")
    print(f"Site generated: {out.resolve()}")


if __name__ == "__main__":
    main()
