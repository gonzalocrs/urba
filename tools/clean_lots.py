#!/usr/bin/env python3
"""Clean lot map for Horizontes del Valle from the lotización PDF.
Keeps only the boundary/street linework (style s|0.0|0.72), redraws labels in the
site's type, and prints the lot polygons (traced, in the same coordinates) as JSON
for projects.js lotMap.  usage: clean_lots.py plan.pdf out.svg"""
import sys, json, math
import pymupdf as fitz
sys.path.insert(0, __file__.rsplit('/', 1)[0]); import clean_plan as cp

# lot outlines traced over the 2000px-wide crop used before (crop origin 100,370 at 0.9 scale of a 2000px page)
TRACED = {
  '1': '735,103 884,99 884,425 750,396', '2': '884,99 1021,97 1021,473 884,425',
  '3': '1021,97 1158,94 1158,288 1021,291', '5': '1158,94 1296,91 1296,285 1158,288',
  '7': '1296,91 1433,88 1433,282 1296,285', '9': '1433,88 1571,85 1571,278 1433,282',
  '11': '1571,85 1708,82 1708,275 1571,278', '13': '1708,82 1845,80 1845,272 1708,275',
  '14': '1845,80 1980,80 1980,361 1845,363',
  '6': '1113,376 1341,376 1341,567 1198,544 1113,512', '8': '1341,376 1479,373 1479,560 1435,572 1341,567',
  '10': '1479,373 1640,370 1640,518 1479,560', '12': '1640,370 1980,361 1980,451 1815,465 1812,472 1640,518'}
AREAS = {'1': 332.42, '2': 367.00, '3': 203.53, '5': 204.08, '6': 295.6, '7': 204.08, '8': 203.78, '9': 204.08,
         '10': 206.05, '11': 204.67, '12': 289.84, '13': 202.06, '14': 291.62}

def main():
    pdf, out = sys.argv[1:3]
    pg = fitz.open(pdf)[0]; k = pg.rect.width / 2000
    to_pt = lambda x, y: ((100 + .9 * x) * k, (370 + .9 * y) * k)
    lines = [cp.path_d(d['items'], 0, 0) for d in pg.get_drawings() if cp.key(d) == 's|0.0|None|0.72' and d['rect'].y0 > 150 and d['rect'].y1 < 640]
    bb = fitz.Rect()
    for d in pg.get_drawings():
        if cp.key(d) == 's|0.0|None|0.72' and d['rect'].y0 > 150 and d['rect'].y1 < 640: bb |= d['rect']
    polys, labels, rows = {}, [], {}
    TOP = ('1','2','3','5','7','9','11','13','14')
    cen = lambda c: [to_pt(*map(float, p.split(','))) for p in TRACED[c].split()]
    rows['top'] = sum(p[1] for p in cen('3')) / 4; rows['bot'] = sum(p[1] for p in cen('8')) / 5
    for c, s in TRACED.items():
        pts = [to_pt(*map(float, p.split(','))) for p in s.split()]
        polys[c] = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
        cx = sum(p[0] for p in pts) / len(pts); cy = sum(p[1] for p in pts) / len(pts)
        cy = rows['top'] if c in TOP else min(rows['bot'], cy)   # one baseline per row
        if c == '12': cy -= 8   # its bottom edge slants up
        labels.append(f'<text x="{cx:.1f}" y="{cy - 3:.1f}" class="n">{c}</text><text x="{cx:.1f}" y="{cy + 10:.1f}" class="a">{AREAS[c]:.0f} m²</text>')
    ctx = [('COLEGIO GENERAL OLLANTA', 671, 233, 0), ('PLAZA TORRECHAYOC', 72, 354, 0),
           ('IGLESIA SEÑOR DE', 87, 467, 0), ('TORRECHAYOC', 99, 486, 0)]
    tx = ''.join(f'<text x="{x}" y="{y + 12}" class="c">{t}</text>' for t, x, y, r in ctx)
    ang = math.degrees(math.atan2(.39725, .91771))
    tx += f'<text transform="translate(510 470) rotate({ang:.1f})" class="c">CALLE CHAHUAR · VÍA A PALCARAQUI</text>'
    x0, y0 = 60, bb.y0 - 30; W, H = bb.x1 - x0 + 12, bb.y1 - y0 + 10
    vb = f'{x0:.0f} {y0:.0f} {W:.0f} {H:.0f}'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{W*2:.0f}" height="{H*2:.0f}">
<style>path{{fill:none;stroke:#282829;stroke-width:1;stroke-linejoin:round;vector-effect:non-scaling-stroke}}
text{{font-family:Helvetica,Arial,sans-serif;fill:#282829;text-anchor:middle}}
.n{{font-size:15px;font-weight:700}}.a{{font-size:9px;fill:#707072}}.c{{font-size:10px;letter-spacing:.08em;fill:#9a9a9a;text-anchor:start}}</style>
<path d="{''.join(lines)}"/>{''.join(labels)}{tx}</svg>'''
    open(out, 'w').write(svg)
    print(json.dumps({'viewBox': vb, 'polys': polys}, indent=1))

if __name__ == '__main__': main()
