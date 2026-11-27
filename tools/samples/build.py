"""Builds public/samples/index.html, the home page that links the seven sample sites, and its thumbnails.

The full-size phone exports from Paper live in tools/samples/exports, outside the published site."""

import html
import subprocess
from pathlib import Path

EXPORTS = Path(__file__).parent / "exports"
SITE = Path(__file__).resolve().parents[2] / "public" / "samples"

GROUPS = [
    ("Auto repair", [
        ("auto-1", "Redbud Auto Works", "Laid out like a repair manual, with an exploded brake drawing and numbered callouts."),
        ("auto-2", "Hollan's Garage", "A carbon-copy repair order, filled in by hand and stamped in red."),
        ("auto-3", "Tolliver Tire & Wrecker", "A flyer on the feed-store corkboard. Tear off a tab to book a time."),
    ]),
    ("Nail salons", [
        ("salon-1", "Ten Tips Nail Studio", "A press-on nail card, with ten drawn tips in the plastic window."),
        ("salon-2", "Little Lacquer", "A salon swatch fan. Pick a shade and the booking starts."),
    ]),
    ("Farms", [
        ("farm-1", "Half Moon Hollow Farm", "A planting almanac, with the real moon phases for December."),
        ("farm-2", "Sundog Farm Collective", "A 1960s show poster for a weekly vegetable box."),
    ]),
]

SAMPLES = [s for _, group in GROUPS for s in group]
FOOTNOTE = "Every business, person, price and phone number on these pages is made up."


def size(path):
    out = subprocess.run(["magick", "identify", "-format", "%w %h", str(path)],
                         capture_output=True, text=True, check=True).stdout
    return tuple(int(n) for n in out.split())


def thumb(slug):
    """Crops the phone design's first viewport (390x844 at 2x) into a small WebP for the index."""
    src = EXPORTS / f"{slug}-phone.webp"
    out = SITE / "img" / f"{slug}-thumb.webp"
    subprocess.run(["magick", str(src), "-crop", "780x1594+0+94", "+repage", "-resize", "520x",
                    "-quality", "82", str(out)], check=True)
    w, h = size(out)
    return w, h


def page(title, body, description):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="preload" href="archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="bar"><a class="wordmark" href="/">SouthEast <b>EdgeRunners</b></a></header>
{body}
<footer class="site-foot">
  <p>{FOOTNOTE}</p>
  <p>Designed by <a href="/">SouthEast EdgeRunners</a>.</p>
</footer>
</body>
</html>
"""


def index():
    sections = []
    for label, group in GROUPS:
        items = []
        for slug, name, line in group:
            w, h = thumb(slug)
            items.append(f"""    <li>
      <a class="sample" href="{slug}/">
        <span class="thumb"><img src="img/{slug}-thumb.webp" alt="" width="{w // 2}" height="{h // 2}" decoding="async"></span>
        <span class="sample-name">{html.escape(name)}</span>
        <span class="sample-line">{html.escape(line)}</span>
      </a>
    </li>""")
        sections.append(f"""  <section class="group" aria-labelledby="g-{label[:4].lower()}">
    <h2 id="g-{label[:4].lower()}">{label}</h2>
    <ul class="samples">
{chr(10).join(items)}
    </ul>
  </section>""")
    body = f"""<main class="wrap">
  <header class="intro">
    <h1>Sample sites</h1>
    <p class="lead">Seven landing pages for made-up local businesses, each in its own style. Every one is built for phones first and works on a desktop too. Pick one to open the live page.</p>
  </header>
{chr(10).join(sections)}
</main>"""
    return page("Sample sites · SouthEast EdgeRunners", body,
                "Sample landing pages by SouthEast EdgeRunners for made-up local businesses.")


def main():
    missing = [s for s, _, _ in SAMPLES if not (EXPORTS / f"{s}-phone.webp").exists()]
    assert not missing, f"missing phone exports: {missing}"
    (SITE / "index.html").write_text(index())
    print(f"built index.html for {len(SAMPLES)} samples")


if __name__ == "__main__":
    main()
