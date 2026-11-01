// "Cómo trabajamos": one wireframe per step, rotating slowly and drawing itself in
// when it scrolls into view. Each step adds a layer: plot → massing → structure → building.
// The layer that is new in each step is drawn in the page accent.
(function () {
  const W = 2.0, D = 1.4, FL = 0.32, N = 6, H = FL * N;       // footprint, floor height, floors
  const seg = (a, b, accent) => ({ a, b, accent: !!accent });
  const rect = (y, w, d, accent, x0 = 0, z0 = 0) => {
    const p = [[-w / 2 + x0, y, -d / 2 + z0], [w / 2 + x0, y, -d / 2 + z0], [w / 2 + x0, y, d / 2 + z0], [-w / 2 + x0, y, d / 2 + z0]];
    return p.map((q, i) => seg(q, p[(i + 1) % 4], accent));
  };
  const plot = (accent) => {
    const out = rect(0, 3.2, 2.4, accent);
    for (let i = 1; i < 8; i++) out.push(seg([-1.6 + i * 0.4, 0, -1.2], [-1.6 + i * 0.4, 0, 1.2], false));
    for (let i = 1; i < 6; i++) out.push(seg([-1.6, 0, -1.2 + i * 0.4], [1.6, 0, -1.2 + i * 0.4], false));
    return out.map(s => (s.accent ? s : Object.assign(s, { faint: true })));
  };
  const corners = [[-W / 2, -D / 2], [W / 2, -D / 2], [W / 2, D / 2], [-W / 2, D / 2]];
  const verticals = (pts, h, accent) => pts.map(([x, z]) => seg([x, 0, z], [x, h, z], accent));
  const floors = (accent, from = 1) => { let o = []; for (let f = from; f <= N; f++) o = o.concat(rect(f * FL, W, D, accent)); return o; };

  const STEPS = {
    terreno: () => plot(false).concat(corners.map(([x, z]) => seg([x, 0, z], [x, 0.28, z], true)), rect(0, W, D, true)),
    diseno: () => plot(false).concat(rect(0, W, D), verticals(corners, H, true), floors(true)),
    construccion: () => {
      const cols = []; for (let i = 0; i <= 3; i++) for (let j = 0; j <= 2; j++) cols.push([-W / 2 + i * W / 3, -D / 2 + j * D / 2]);
      const crane = [seg([1.35, 0, -0.9], [1.35, H + 0.7, -0.9], true), seg([-0.6, H + 0.7, -0.9], [1.9, H + 0.7, -0.9], true),
        seg([1.35, H + 1.0, -0.9], [-0.6, H + 0.7, -0.9], true), seg([1.35, H + 1.0, -0.9], [1.9, H + 0.7, -0.9], true),
        seg([0.1, H + 0.7, -0.9], [0.1, H * 0.62, -0.9], true)];
      return plot(false).concat(rect(0, W, D), verticals(cols, H * 0.75), floors(false).slice(0, 4 * 4), crane);
    },
    entrega: () => {
      const win = []; const nx = 6, nz = 4;
      for (let f = 0; f < N; f++) {
        const y0 = f * FL + 0.07, y1 = (f + 1) * FL - 0.07;
        for (let i = 0; i < nx; i++) { const x = -W / 2 + (i + 0.5) * W / nx; win.push(seg([x, y0, D / 2], [x, y1, D / 2], true), seg([x, y0, -D / 2], [x, y1, -D / 2], true)); }
        for (let k = 0; k < nz; k++) { const z = -D / 2 + (k + 0.5) * D / nz; win.push(seg([W / 2, y0, z], [W / 2, y1, z], true), seg([-W / 2, y0, z], [-W / 2, y1, z], true)); }
      }
      return plot(false).concat(rect(0, W, D), verticals(corners, H), floors(false), win);
    }
  };

  // Grain texture used for the dry-brush look on the darkest strokes.
  const grain = (color, density) => {
    const c = document.createElement('canvas'); c.width = c.height = 96; const g = c.getContext('2d');
    const img = g.createImageData(96, 96), [r, gg, b] = color.match(/\w\w/g).map(h => parseInt(h, 16));
    for (let i = 0; i < img.data.length; i += 4) { const on = Math.random() < density; img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = on ? 140 + Math.random() * 115 : 0; }
    g.putImageData(img, 0, 0); return c;
  };
  const rnd = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(document.body);
  const INK = '#282829';

  document.querySelectorAll('canvas[data-step]').forEach((cv, idx) => {
    const segs = STEPS[cv.dataset.step](); const ctx = cv.getContext('2d');
    const maxY = Math.max(...segs.flatMap(g => [g.a[1], g.b[1]])), span = Math.max(4.2, maxY * 1.25 + 1.6);
    let visibleAt = null, raf = null;
    const ACC = getComputedStyle(cv).getPropertyValue('--accent').trim() || '#3ec2cf';
    const dryPat = ctx.createPattern(grain('1c1c1d', 0.72), 'repeat');
    // pick which edges get a brush stroke: long, non-grid edges, about half of them (stable per edge)
    const brushed = []; let brushCount = 0;
    const lens = segs.map(g => Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1], g.b[2] - g.a[2]));
    const cand = segs.map((g, i) => i).filter(i => !segs[i].faint && lens[i] >= 0.5 && rnd(i * 3.7 + idx) < (segs[i].accent ? 0.75 : 0.5));
    const keep = new Set(cand.sort((x, y) => (lens[y] + (segs[y].accent ? 0.6 : 0)) - (lens[x] + (segs[x].accent ? 0.6 : 0))).slice(0, 11));
    segs.forEach((g, i) => {
      if (!keep.has(i)) return;
      const r = rnd(i * 9.1 + idx * 2);
      brushed[i] = { order: brushCount++, w: 0.1 + r * 0.12, tone: g.accent ? 0.95 : 0.4 + rnd(i * 4.3) * 0.5,
        s0: 0.04 + rnd(i * 2.2) * 0.1, s1: 0.86 + rnd(i * 6.6) * 0.1, dry: !g.accent && r > 0.86 };
    });
    brushCount = Math.max(brushCount, 1);
    const size = () => { const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return r; };
    let box = size();
    const draw = (t) => {
      const w = box.width, h = box.height, s = Math.min(w, h) / span;
      const ang = (reduce ? 0.6 : 0.6 + t / 9000) + idx * 0.35, tilt = -0.5;
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      const P = ([x, y, z]) => { y -= maxY / 2; const X = x * ca - z * sa, Z = x * sa + z * ca; const Y = y * ct - Z * st, Z2 = y * st + Z * ct; const k = 1 / (1 + Z2 * 0.06); return [w / 2 + X * s * k, h / 2 - Y * s * k]; };
      const prog = reduce ? 1 : Math.min(1, visibleAt === null ? 0 : (t - visibleAt) / 1800);
      const shown = Math.floor(segs.length * prog), part = segs.length * prog - shown;
      ctx.clearRect(0, 0, w, h); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const pts = segs.map(g => [P(g.a), P(g.b)]);
      // 1) pencil: every edge as a thin graphite line
      segs.forEach((g, i) => {
        if (i > shown) return; const f = i === shown ? part : 1; if (f <= 0) return;
        const [a, b] = pts[i];
        ctx.globalAlpha = g.faint ? 0.18 : 0.75; ctx.strokeStyle = INK; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f); ctx.stroke();
      });
      // 2) ink brush: wide bristle strokes painted along a selection of edges, after the pencil
      ctx.lineCap = 'butt';
      const bp = reduce ? 1 : Math.min(1, visibleAt === null ? 0 : Math.max(0, (t - visibleAt - 900) / 2600));
      const cx = w / 2, cy = h / 2;
      segs.forEach((g, i) => {
        if (g.faint || !brushed[i]) return;
        const order = brushed[i].order, f = Math.max(0, Math.min(1, bp * brushCount - order));
        if (f <= 0) return;
        const [a, b] = pts[i]; const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
        if (len < 6) return;
        const ux = dx / len, uy = dy / len; let nx = -uy, ny = ux;
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; if ((cx - mx) * nx + (cy - my) * ny < 0) { nx = -nx; ny = -ny; }   // offset towards the inside
        const B = brushed[i], width = s * B.w, off = width * 0.6 + 2;
        const t0 = B.s0, t1 = B.s0 + (B.s1 - B.s0) * f;
        const bristles = 16;
        // body: one soft wash the full width of the brush
        ctx.strokeStyle = g.accent ? ACC : INK; ctx.globalAlpha = B.tone * 0.32; ctx.lineWidth = width;
        ctx.beginPath(); ctx.moveTo(a[0] + dx * (t0 + 0.02) + nx * off, a[1] + dy * (t0 + 0.02) + ny * off); ctx.lineTo(a[0] + dx * (t1 - 0.02) + nx * off, a[1] + dy * (t1 - 0.02) + ny * off); ctx.stroke();
        for (let k = 0; k < bristles; k++) {
          const q = k / (bristles - 1) - 0.5, o = off + q * width;
          const r1 = rnd(i * 13 + k), r2 = rnd(i * 31 + k * 7);
          const st = t0 + r1 * 0.04, en = t1 - r2 * 0.06 * (1 - Math.abs(q));
          if (en <= st) continue;
          ctx.strokeStyle = g.accent ? ACC : INK;
          ctx.globalAlpha = B.tone * (0.12 + 0.3 * rnd(i * 5 + k * 3) + Math.abs(q) * 0.45);
          ctx.lineWidth = width / bristles * 1.6;
          ctx.beginPath();
          ctx.moveTo(a[0] + dx * st + nx * o, a[1] + dy * st + ny * o);
          ctx.lineTo(a[0] + dx * en + nx * (o + q * 1.5), a[1] + dy * en + ny * (o + q * 1.5));
          ctx.stroke();
        }
        if (B.dry) { // dry-brush grain on the darkest strokes
          ctx.globalAlpha = 0.9; ctx.fillStyle = dryPat;
          ctx.beginPath();
          const p1 = [a[0] + dx * t0 + nx * (off - width / 2), a[1] + dy * t0 + ny * (off - width / 2)], p2 = [a[0] + dx * t1 + nx * (off - width / 2), a[1] + dy * t1 + ny * (off - width / 2)];
          ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p2[0] + nx * width, p2[1] + ny * width); ctx.lineTo(p1[0] + nx * width, p1[1] + ny * width); ctx.closePath(); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };
    const loop = (t) => { draw(t); raf = reduce ? null : requestAnimationFrame(loop); };
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { if (visibleAt === null) visibleAt = performance.now() + idx * 250; if (!raf) raf = requestAnimationFrame(loop); }
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    }), { threshold: 0.2 }).observe(cv);
    addEventListener('resize', () => { box = size(); draw(performance.now()); });
    draw(0);
  });
})();
