// Shared header, footer, contact details and lead form. Edit contact info here once.
function escH(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
const URBA = {
  phone: '+51 974 979 393',
  whatsapp: '51974979393',            // digits only, with country code
  salesEmail: 'contacto@urba.pe',
  email: 'contacto@urba.pe',
  address: 'Santiago de Surco, Lima, Perú',
  company: 'Consorcio Mecano S.A.C.',
  ruc: '',                            // TODO RUC
  instagram: '', facebook: '', linkedin: ''
};

const NAV = [
  ['/proyectos.html', 'Proyectos'],
  ['/nosotros.html', 'Nosotros'],
  ['/entregados.html', 'Entregados'],
  ['/contacto.html', 'Contacto']
];

function waLink(text){
  return `https://wa.me/${URBA.whatsapp}?text=${encodeURIComponent(text || 'Hola, quisiera más información.')}`;
}

(function renderChrome(){
  const here = location.pathname;
  const header = document.querySelector('[data-site-header]');
  if (header) {
    if (header.hasAttribute('data-over')) header.classList.add('over');
    header.innerHTML = `
      <div class="wrap top">
        <a class="brand" href="/" aria-label="Urba Inmobiliaria, inicio"><span class="logo-ur" aria-hidden="true"></span></a>
        <nav id="nav">
          ${NAV.map(([h, t]) => `<a href="${h}"${here === h || (h === '/proyectos.html' && here === '/proyecto.html') ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
          <a class="nav-wa" data-wa>WhatsApp ${URBA.phone}</a>
        </nav>
        <button class="menu-btn" aria-expanded="false" aria-controls="nav"><span></span><span></span><span class="sr">Menú</span></button>
      </div>`;
    const btn = header.querySelector('.menu-btn');
    btn.addEventListener('click', () => { const o = header.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
    const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    const social = [['Instagram', URBA.instagram], ['Facebook', URBA.facebook], ['LinkedIn', URBA.linkedin]].filter(s => s[1])
      .map(([n, u]) => `<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join('');
    footer.innerHTML = `
      <div class="wrap foot">
        <div class="foot-brand"><span class="logo-foot" role="img" aria-label="Urba. Creamos espacios, construimos comunidad"></span></div>
        <div><h4>Contacto</h4>
          <p><a data-wa>WhatsApp ${URBA.phone}</a><br><a href="mailto:${URBA.salesEmail}">${URBA.salesEmail}</a><br>${URBA.address}</p>
          <p><strong>¿Tienes un terreno?</strong><br><a href="mailto:${URBA.email}">${URBA.email}</a></p></div>
        <div><h4>Información de interés</h4>
          <p><a href="/privacidad.html">Política de privacidad</a><br><a href="/libro-de-reclamaciones.html">Libro de reclamaciones</a></p>
          ${social ? `<p class="social">${social}</p>` : ''}</div>
      </div>
      <div class="wrap foot-legal"><span>© ${new Date().getFullYear()} Urba Inmobiliaria · ${URBA.company}${URBA.ruc ? ' · RUC ' + URBA.ruc : ''}</span></div>`;
  }
  const wa = document.createElement('a');
  wa.className = 'wa-float'; wa.setAttribute('data-wa', ''); wa.setAttribute('aria-label', 'Escríbenos por WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7 1.2 3.1 1.3 3.3 2.3 3.5 5.6 4.9c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5-.3-.2-.6-.3z"/></svg>';
  document.body.appendChild(wa);
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
})();

// Lead form: sends a prefilled WhatsApp message (no server needed). project = name to preselect.
function mountLeadForm(el, project){
  const names = (typeof PROJECTS !== 'undefined' ? PROJECTS.filter(p => p.stage !== 'entregado') : []).map(p => p.name);
  el.innerHTML = `
    <form class="lead-form" novalidate>
      <div class="row"><label>Nombre y apellido<input name="nombre" required autocomplete="name"></label>
      <label>Celular<input name="celular" type="tel" required autocomplete="tel"></label></div>
      <label>Correo<input name="correo" type="email" autocomplete="email"></label>
      <label>Proyecto de interés<select name="proyecto"><option value="">Quiero conocer varios</option>${names.map(n => `<option${n === project ? ' selected' : ''}>${escH(n)}</option>`).join('')}</select></label>
      <label>¿Cómo te enteraste de nosotros?<select name="origen"><option value="">Selecciona</option><option>Google</option><option>Instagram</option><option>Facebook</option><option>Por un conocido</option><option>Cerco de obra</option><option>Valla publicitaria</option></select></label>
      <label class="check"><input type="checkbox" name="ok" required> Acepto la <a href="/privacidad.html" target="_blank">política de privacidad</a></label>
      <p class="form-error" hidden>Completa tu nombre, celular y acepta la política de privacidad.</p>
      <button class="btn" type="submit">Quiero más información</button>
    </form>`;
  const f = el.querySelector('form');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    if (!d.get('nombre') || !d.get('celular') || !d.get('ok')) { f.querySelector('.form-error').hidden = false; return; }
    const text = [`Hola, soy ${d.get('nombre')}.`, d.get('proyecto') ? `Me interesa ${d.get('proyecto')}.` : 'Quisiera información sobre sus proyectos.',
      `Celular: ${d.get('celular')}`, d.get('correo') ? `Correo: ${d.get('correo')}` : '', d.get('origen') ? `Me enteré por: ${d.get('origen')}` : ''].filter(Boolean).join('\n');
    window.open(waLink(text), '_blank', 'noopener');
  });
}

// Home contact: one question at a time, ends in a prefilled WhatsApp message.
// The headline word cycles through the options until the visitor picks one.
function mountTalk(box, word, direct, preset){
  const OPTS = [['comprar un depa', 'Quiero comprar un departamento'], ['invertir', 'Quiero invertir en un proyecto'], ['vender mi terreno', 'Tengo un terreno y quiero conversar'], ['visitar un proyecto', 'Quiero visitar un proyecto'], ['saber más', 'Quisiera más información']];
  const names = (typeof PROJECTS !== 'undefined' ? PROJECTS.filter(p => p.stage !== 'entregado') : []).map(p => p.name);
  const st = { opt: null, proj: preset || '', name: '', tel: '' };
  const total = preset ? 2 : 3, num = (k) => (preset && k === 2 ? 2 : k + 1) + '/' + total;
  let cycle = 0, timer = null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const type = (txt) => { if (reduce) { word.textContent = txt; return; } let n = 0; word.textContent = ''; const it = setInterval(() => { word.textContent = txt.slice(0, ++n); if (n >= txt.length) clearInterval(it); }, 45); };
  const startCycle = () => { if (reduce) return; timer = setInterval(() => { cycle = (cycle + 1) % OPTS.length; type(OPTS[cycle][0]); }, 2600); };
  direct.innerHTML = `<a href="${waLink('')}" target="_blank" rel="noopener">WhatsApp ${escH(URBA.phone)}</a><a href="mailto:${escH(URBA.salesEmail)}">${escH(URBA.salesEmail)}</a>`;
  const steps = [
    () => `<p class="talk-q"><span>${num(0)}</span>¿Qué estás buscando?</p><div class="chips">${OPTS.map((o, i) => `<button type="button" data-i="${i}"${st.opt === i ? ' aria-pressed="true"' : ''}>${escH(o[0][0].toUpperCase() + o[0].slice(1))}</button>`).join('')}</div>`,
    () => `<p class="talk-q"><span>${num(1)}</span>${st.opt === 2 ? '¿Dónde está tu terreno?' : '¿Algún proyecto en mente?'}</p>` + (st.opt === 2
      ? `<input class="talk-in" name="proj" placeholder="Distrito o dirección" value="${escH(st.proj)}">`
      : `<div class="chips">${names.concat(['Todavía no sé']).map(n => `<button type="button" data-p="${escH(n)}"${st.proj === n ? ' aria-pressed="true"' : ''}>${escH(n)}</button>`).join('')}</div>`) + `<div class="talk-nav"><button type="button" class="talk-back">← Atrás</button>${st.opt === 2 ? '<button type="button" class="btn-pill talk-next">Siguiente →</button>' : ''}</div>`,
    () => `<p class="talk-q"><span>${num(2)}</span>¿Cómo te llamamos?</p><input class="talk-in" name="name" placeholder="Nombre y apellido" autocomplete="name" value="${escH(st.name)}"><input class="talk-in" name="tel" type="tel" placeholder="Celular" autocomplete="tel" value="${escH(st.tel)}"><label class="talk-ok"><input type="checkbox" name="ok"> Acepto la <a href="/privacidad.html" target="_blank">política de privacidad</a></label><p class="talk-err" hidden>Completa tu nombre, celular y acepta la política.</p><div class="talk-nav"><button type="button" class="talk-back">← Atrás</button><button type="button" class="btn-pill talk-send">Enviar por WhatsApp ↗</button></div>`
  ];
  let step = 0;
  const render = () => { box.innerHTML = `<div class="talk-step">${steps[step]()}</div>`; const f = box.querySelector('input.talk-in'); if (f && step) f.focus({ preventScroll: true }); };
  box.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.i) { st.opt = +b.dataset.i; clearInterval(timer); type(OPTS[st.opt][0]); step = preset && st.opt !== 2 ? 2 : 1; }
    else if (b.dataset.p) { st.proj = b.dataset.p === 'Todavía no sé' ? '' : b.dataset.p; step = 2; }
    else if (b.classList.contains('talk-back')) { step = preset && step === 2 && st.opt !== 2 ? 0 : Math.max(0, step - 1); }
    else if (b.classList.contains('talk-next')) { st.proj = box.querySelector('[name=proj]').value.trim(); step = 2; }
    else if (b.classList.contains('talk-send')) {
      st.name = box.querySelector('[name=name]').value.trim(); st.tel = box.querySelector('[name=tel]').value.trim();
      if (!st.name || !st.tel || !box.querySelector('[name=ok]').checked) { box.querySelector('.talk-err').hidden = false; return; }
      const o = OPTS[st.opt]; const text = [`Hola, soy ${st.name}.`, o[1] + (st.proj ? (st.opt === 2 ? ` (ubicado en ${st.proj}).` : `: ${st.proj}.`) : '.'), `Celular: ${st.tel}`].join('\n');
      window.open(waLink(text), '_blank', 'noopener'); return;
    } else return;
    render();
  });
  box.addEventListener('input', e => { if (e.target.name === 'name') st.name = e.target.value; if (e.target.name === 'tel') st.tel = e.target.value; });
  render(); startCycle();
}

// Site icon: the brand's web icons rotate (Manual de Marca, "Íconos web: un sistema cíclico").
// Each visit shows the Ur module in a different colour pair, never the same one twice in a row.
// (b and a modules also exist in /img/brand/icons/.)
(function rotateIcon(){
  const ICONS = ["/img/brand/icons/ur-grafito-sobre-celeste.svg", "/img/brand/icons/ur-grafito-sobre-naranja.svg", "/img/brand/icons/ur-grafito-sobre-amarillo.svg", "/img/brand/icons/ur-celeste-sobre-grafito.svg", "/img/brand/icons/ur-naranja-sobre-grafito.svg", "/img/brand/icons/ur-amarillo-sobre-grafito.svg", "/img/brand/icons/ur-celeste-sobre-naranja.svg", "/img/brand/icons/ur-naranja-sobre-celeste.svg"];
  let last = -1; try { last = +localStorage.getItem('urba-icon'); } catch (e) {}
  let i; do { i = Math.floor(Math.random() * ICONS.length); } while (ICONS.length > 1 && i === last);
  try { localStorage.setItem('urba-icon', i); } catch (e) {}
  document.querySelectorAll('link[rel~="icon"]').forEach(l => l.remove());
  const link = document.createElement('link'); link.rel = 'icon'; link.type = 'image/svg+xml'; link.href = ICONS[i];
  document.head.appendChild(link);
  // Header: grafito ribbon, the Ur takes the accent colour. On a project page the
  // ribbon takes the project's colour instead and the Ur goes to its contrasting ink.
  const INK = { celeste: 'naranja', naranja: 'celeste', amarillo: 'grafito' };
  const isProject = document.body.classList.contains('page-project');
  window.urbaInk = accent => { const c = isProject ? (INK[accent] || 'grafito') : accent; document.querySelectorAll('.logo-ur').forEach(el => el.style.background = 'var(--' + c + ')'); };
  urbaInk((document.body.className.match(/theme-(\w+)/) || [, 'celeste'])[1]);
})();
