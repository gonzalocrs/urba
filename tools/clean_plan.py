#!/usr/bin/env python3
"""Turn an architect's PDF sheet into a clean web plan (SVG), Sierra style.

Reads the vector drawing inside a clip box, groups every path by its original
stroke/fill style, and re-emits only the groups we keep with house styles:
  cut      solid grafito (walls, columns)
  line     main thin lines (openings, outlines, stairs)
  glass    windows
  fixture  light grey (sanitary fixtures, kitchen)
Everything else (dimensions, text, furniture, hatches, title block) is dropped.

usage: clean_plan.py in.pdf out.svg x0 y0 x1 y1 [--debug] [--map rules.json]
  clip box in PDF points; --debug colours each style group and prints a legend.
"""
import sys, json, colorsys
import pymupdf as fitz

def key(d):
    g = lambda c: round(sum(c) / 3, 2) if c else None
    return f"{d['type']}|{g(d.get('color'))}|{g(d.get('fill'))}|{round(d.get('width') or 0, 2)}"

def path_d(items, ox, oy):
    out, last = [], None
    f = lambda p: f"{p.x - ox:.2f} {p.y - oy:.2f}"
    for it in items:
        op = it[0]
        if op == 'l':
            a, b = it[1], it[2]
            if last is None or abs(last.x - a.x) > .01 or abs(last.y - a.y) > .01: out.append('M' + f(a))
            out.append('L' + f(b)); last = b
        elif op == 'c':
            a, c1, c2, b = it[1:5]
            if last is None or abs(last.x - a.x) > .01 or abs(last.y - a.y) > .01: out.append('M' + f(a))
            out.append(f"C{f(c1)} {f(c2)} {f(b)}"); last = b
        elif op == 're':
            r = it[1]; out.append(f"M{f(r.tl)}H{r.x1 - ox:.2f}V{r.y1 - oy:.2f}H{r.x0 - ox:.2f}Z"); last = None
        elif op == 'qu':
            q = it[1]; out.append(f"M{f(q.ul)}L{f(q.ur)}L{f(q.lr)}L{f(q.ll)}Z"); last = None
    return ''.join(out)

STYLE = """path{fill:none;stroke:none;stroke-linecap:round;stroke-linejoin:round;fill-rule:evenodd;vector-effect:non-scaling-stroke}
.cut{fill:#282829}.cutline{stroke:#282829;stroke-width:1.1}
.line{stroke:#555;stroke-width:.7}.glass{stroke:#8a8a8a;stroke-width:.6}
.fixture{stroke:#bdbdbd;stroke-width:.6}.light{stroke:#d6d6d6;stroke-width:.5}.fixfill{fill:#ececea}"""

def main():
    a = sys.argv[1:]; debug = '--debug' in a; rules = {}
    if '--map' in a: rules = json.load(open(a[a.index('--map') + 1]))
    pdf, out = a[0], a[1]; x0, y0, x1, y1 = map(float, a[2:6])
    clip = fitz.Rect(x0, y0, x1, y1)
    pg = fitz.open(pdf)[0]
    groups, boxes = {}, {}
    for d in pg.get_drawings():
        if not d['rect'].intersects(clip) or d['rect'] not in clip + (-2, -2, 2, 2): continue
        if d['rect'].width > clip.width * .95 and d['rect'].height > clip.height * .95: continue  # sheet frame
        groups.setdefault(key(d), []).append(path_d(d['items'], x0, y0))
        boxes[key(d)] = boxes.get(key(d), fitz.Rect(d['rect'])) | d['rect']
    W, H = x1 - x0, y1 - y0; vx = vy = 0
    body = []
    if debug:
        ks = sorted(groups, key=lambda k: -len(groups[k]))
        for i, k in enumerate(ks):
            r, g, b = colorsys.hsv_to_rgb(i / max(1, len(ks)), .9, .8); col = f"rgb({int(r*255)},{int(g*255)},{int(b*255)})"
            fill = k.split('|')[0] in ('f', 'fs')
            body.append(f'<path d="{"".join(groups[k])}" style="{"fill" if fill else "stroke"}:{col};stroke-width:.6;fill:{col if fill else "none"}"/>')
            print(f"{i:2d} {col:18s} {len(groups[k]):5d}  {k}")
    else:
        by, bb = {}, fitz.Rect()
        for k, ds in groups.items():
            if k not in rules: print('unmapped (dropped):', k, len(ds), file=sys.stderr)
            c = rules.get(k, 'drop')
            if c != 'drop': by.setdefault(c, []).extend(ds); bb |= boxes[k]
        m = 6  # tight viewBox around what we kept
        vx, vy, W, H = bb.x0 - x0 - m, bb.y0 - y0 - m, bb.width + 2 * m, bb.height + 2 * m
        order = ['fixfill', 'light', 'fixture', 'glass', 'line', 'cutline', 'cut']
        for c in sorted(by, key=lambda c: order.index(c) if c in order else 0):
            body.append(f'<path class="{c}" d="{"".join(by[c])}"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx:.1f} {vy:.1f} {W:.1f} {H:.1f}" width="{W*2:.0f}" height="{H*2:.0f}"><style>{STYLE}</style>{"".join(body)}</svg>'
    open(out, 'w').write(svg)

if __name__ == '__main__': main()
