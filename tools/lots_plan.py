#!/usr/bin/env python3
"""Horizontes del Valle lot plan, rebuilt from the real CAD geometry of the lotización PDF.

Lot outlines are polygonized from the boundary linework (style s|0.0|None|0.72), so every
lot is the exact drawn shape (areas match the sheet at 1 pt = 0.163 m). Draws an
architect-style site plan: lots, street, perimeter dimensions, labels, graphic scale.
Prints the lotMap JSON (viewBox + polys, PDF points) for projects.js.

usage: pip install pymupdf shapely; lots_plan.py PLANO_LOTIZACION.pdf out.svg
"""
import sys, json, math
import pymupdf as fitz
from shapely.geometry import LineString, Point
from shapely.ops import polygonize, unary_union
sys.path.insert(0, __file__.rsplit('/', 1)[0]); import clean_plan as cp

AREAS = {'1': 332.42, '2': 367.00, '3': 203.53, '5': 204.08, '6': 295.6, '7': 204.08, '8': 203.78, '9': 204.08,
         '10': 206.05, '11': 204.67, '12': 289.84, '13': 202.06, '14': 291.62}
STYLE, Y0, Y1 = 's|0.0|None|0.72', 150, 640       # boundary linework, minus title block and scale bar

def segments(page):
    out = []
    for d in page.get_drawings():
        if cp.key(d) != STYLE: continue
        for it in d['items']:
            if it[0] == 'l': pts = [it[1], it[2]]
            elif it[0] == 'c': pts = [it[1], it[4]]
            elif it[0] == 're': r = it[1]; pts = [fitz.Point(r.x0, r.y0), fitz.Point(r.x1, r.y0), fitz.Point(r.x1, r.y1), fitz.Point(r.x0, r.y1), fitz.Point(r.x0, r.y0)]
            elif it[0] == 'qu': q = it[1]; pts = [q.ul, q.ur, q.lr, q.ll, q.ul]
            else: continue
            for a, b in zip(pts, pts[1:]):
                if Y0 < min(a.y, b.y) and max(a.y, b.y) < Y1: out.append(((a.x, a.y), (b.x, b.y)))
    return out

def extend(a, b, e=2.0):   # close the small gaps the draftsman left at corners
    L = math.dist(a, b) or 1; dx, dy = (b[0] - a[0]) / L * e, (b[1] - a[1]) / L * e
    return LineString([(a[0] - dx, a[1] - dy), (b[0] + dx, b[1] + dy)])

def main():
    pdf, out = sys.argv[1:3]
    page = fitz.open(pdf)[0]
    segs = segments(page)
    polys = list(polygonize(unary_union([extend(a, b) for a, b in segs])))
    spans = [s for b in page.get_text('dict')['blocks'] for l in b.get('lines', []) for s in l['spans']]
    lots = {}
    for s in spans:
        t = s['text'].strip()
        if t.startswith('Lote '):
            x0, y0, x1, y1 = s['bbox']; pt = Point((x0 + x1) / 2, y1 + 6)
            lots[t[5:]] = next(q for q in polys if q.contains(pt) and q.area < 50000).simplify(0.6)
    k = math.sqrt(sum(AREAS[c] / lots[c].area for c in lots) / len(lots))       # metres per point
    allb = unary_union(list(lots.values())).bounds
    rb = [min(a[0] for a, b in segs), min(min(a[1], b[1]) for a, b in segs), max(max(a[0], b[0]) for a, b in segs), max(max(a[1], b[1]) for a, b in segs)]

    g = []
    # street / context linework (everything that is not a lot edge)
    lot_edges = unary_union([q.exterior for q in lots.values()]).buffer(1.2)
    road = [f'M{a[0]:.1f} {a[1]:.1f}L{b[0]:.1f} {b[1]:.1f}' for a, b in segs if not lot_edges.contains(LineString([a, b]))]
    g.append(f'<path class="road" d="{"".join(road)}"/>')
    # lots
    for c, q in lots.items():
        pts = ' '.join(f'{x:.1f},{y:.1f}' for x, y in list(q.exterior.coords)[:-1])
        g.append(f'<polygon class="lot" points="{pts}"/>')
    # perimeter dimensions: length of each edge over ~6 m, set inside the lot along the edge
    done = []   # shared boundaries are dimensioned once
    for c, q in lots.items():
        cx, cy = q.centroid.x, q.centroid.y
        co = list(q.exterior.coords)
        for a, b in zip(co, co[1:]):
            L = math.dist(a, b) * k
            if L < 6: continue
            mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
            if any(math.dist((mx, my), m) < 4 for m in done): continue
            done.append((mx, my))
            ang = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
            if ang > 90: ang -= 180
            if ang < -90: ang += 180
            nx, ny = -(b[1] - a[1]), b[0] - a[0]; n = math.hypot(nx, ny); nx, ny = nx / n, ny / n
            if (cx - mx) * nx + (cy - my) * ny < 0: nx, ny = -nx, -ny
            off = 5.2
            g.append(f'<text class="d" transform="translate({mx + nx * off:.1f} {my + ny * off:.1f}) rotate({ang:.1f})" dy="2">{L:.2f}</text>')
    # lot names and areas
    for c, q in lots.items():
        p = q.representative_point() if not q.contains(q.centroid) else q.centroid
        g.append(f'<text class="n" x="{p.x:.1f}" y="{p.y - 1:.1f}">{int(c):02d}</text><text class="a" x="{p.x:.1f}" y="{p.y + 9:.1f}">{AREAS[c]:.2f} m²</text>')
    # context names, from the sheet
    for s in spans:
        t = s['text'].strip()
        if t == 'COLEGIO GENERAL OLLANTA':
            g.append(f'<text class="c" x="{s["bbox"][0]:.1f}" y="{s["bbox"][3] - 4:.1f}">{t}</text>')
        if t.startswith('CALLE CHAHUAR'):
            ang = math.degrees(math.atan2(.39725, .91771))
            g.append(f'<text class="c st" transform="translate({s["origin"][0]:.1f} {s["origin"][1]:.1f}) rotate({ang:.1f})">CALLE CHAHUAR · VÍA A PALCARAQUI</text>')
    lx = rb[0] - 8   # plaza and church sit just left of where the linework starts
    for y, lines in ((300, ('PLAZA', 'TORRECHAYOC')), (452, ('IGLESIA SEÑOR', 'DE TORRECHAYOC'))):
        g.append(''.join(f'<text class="c" x="{lx:.1f}" y="{y + i * 11}" style="text-anchor:end">{t}</text>' for i, t in enumerate(lines)))
    # graphic scale 0-5-10-20 m
    sx, sy = rb[0] + 6, rb[3] + 22; u = 1 / k
    bar = ''.join(f'<rect x="{sx + a * u:.1f}" y="{sy:.1f}" width="{(b - a) * u:.1f}" height="3" class="{"sb" if i % 2 == 0 else "sw"}"/>' for i, (a, b) in enumerate([(0, 5), (5, 10), (10, 20)]))
    bar += ''.join(f'<text class="s" x="{sx + m * u:.1f}" y="{sy + 12:.1f}">{m}</text>' for m in (0, 5, 10, 20))
    bar += f'<text class="s" x="{sx + 20 * u + 6:.1f}" y="{sy + 4:.1f}" style="text-anchor:start">m</text>'
    g.append(bar)

    x0, y0 = rb[0] - 105, rb[1] - 30; x1, y1 = rb[2] + 10, sy + 20
    vb = f'{x0:.0f} {y0:.0f} {x1 - x0:.0f} {y1 - y0:.0f}'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{(x1 - x0) * 2:.0f}" height="{(y1 - y0) * 2:.0f}">
<style>
.lot{{fill:#f1f0ec;stroke:#282829;stroke-width:1.1;stroke-linejoin:round}}
.road{{fill:none;stroke:#282829;stroke-width:.9;stroke-linecap:round}}
text{{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;fill:#282829;text-anchor:middle}}
.n{{font-size:12px;font-weight:700;letter-spacing:.02em}}
.a{{font-size:6.6px;fill:#5c5c5e}}
.d{{font-size:5px;fill:#8a8a8c}}
.c{{font-size:8px;letter-spacing:.14em;fill:#8a8a8c;text-anchor:start}}
.st{{font-size:7.5px}}
.s{{font-size:6px;fill:#5c5c5e}}.sb{{fill:#282829}}.sw{{fill:#fff;stroke:#282829;stroke-width:.6}}
</style>
{chr(10).join(g)}
</svg>'''
    open(out, 'w').write(svg)
    print(json.dumps({'viewBox': vb, 'scale_m_per_pt': round(k, 4),
                      'polys': {c: ' '.join(f'{x:.1f},{y:.1f}' for x, y in list(q.exterior.coords)[:-1]) for c, q in lots.items()}}, indent=1))

if __name__ == '__main__': main()
