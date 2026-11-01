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

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(document.body);
  const ink = css.getPropertyValue('--grafito').trim() || '#282829';

  document.querySelectorAll('canvas[data-step]').forEach((cv, idx) => {
    const segs = STEPS[cv.dataset.step](); const ctx = cv.getContext('2d');
    const maxY = Math.max(...segs.flatMap(g => [g.a[1], g.b[1]])), span = Math.max(4.2, maxY * 1.25 + 1.6);
    let visibleAt = null, raf = null;
    const accent = () => getComputedStyle(cv).getPropertyValue('--accent').trim() || '#3ec2cf';
    const size = () => { const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return r; };
    let box = size();
    const draw = (t) => {
      const w = box.width, h = box.height, s = Math.min(w, h) / span;
      const ang = (reduce ? 0.6 : 0.6 + t / 9000) + idx * 0.35, tilt = -0.5;
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      const P = ([x, y, z]) => { y -= maxY / 2; const X = x * ca - z * sa, Z = x * sa + z * ca; const Y = y * ct - Z * st, Z2 = y * st + Z * ct; const k = 1 / (1 + Z2 * 0.06); return [w / 2 + X * s * k, h / 2 - Y * s * k]; };
      const prog = reduce ? 1 : Math.min(1, visibleAt === null ? 0 : (t - visibleAt) / 1800);
      const shown = Math.floor(segs.length * prog), part = segs.length * prog - shown;
      ctx.clearRect(0, 0, w, h); ctx.lineCap = 'round';
      const acc = accent();
      segs.forEach((g, i) => {
        if (i > shown) return; const f = i === shown ? part : 1; if (f <= 0) return;
        const a = P(g.a), b = P(g.b);
        ctx.strokeStyle = g.accent ? acc : ink; ctx.globalAlpha = g.faint ? 0.22 : 1; ctx.lineWidth = g.accent ? 1.6 : 1.1;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f); ctx.stroke();
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
