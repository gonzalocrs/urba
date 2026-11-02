// All projects live here. Photos go in /img/proyectos/<slug>/.
// stage: 'en-venta' | 'proximamente' | 'lanzamiento' | 'preventa' | 'en-construccion' | 'pronta-entrega' | 'entrega-inmediata' | 'entregado'
const STAGES = {
  'lanzamiento': 'Lanzamiento',
  'preventa': 'Preventa',
  'en-construccion': 'En construcción',
  'pronta-entrega': 'Pronta entrega',
  'entrega-inmediata': 'Entrega inmediata',
  'en-venta': 'En venta',
  'en-desarrollo': 'En desarrollo',
  'proximamente': 'Próximamente',
  'entregado': 'Entregado'
};

const PROJECTS = [
  {
    slug: 'horizontes-del-valle',
    featured: true,                 // shown in the home hero
    color: 'amarillo',
    name: 'Horizontes del Valle',
    district: 'Urubamba',
    stage: 'en-desarrollo',
    kicker: 'Lotes · Valle Sagrado',
    bedrooms: [],
    areas: 'De 202 a 367 m²',
    address: 'Calle Chahuar, vía a Palcaraqui, Urubamba, Cusco',
    intro: 'Lotes con ingreso independiente al costado de la Iglesia Señor de Torrechayoc, a 7 cuadras de la Plaza de Armas de Urubamba.',
    hero: '/img/proyectos/horizontes-del-valle/valle-nevado.jpg', heroMobile: '/img/proyectos/horizontes-del-valle/valle-nevado.jpg',
    pageHero: '/img/proyectos/horizontes-del-valle/valle-norte.jpg',
    cover: '/img/proyectos/horizontes-del-valle/valle-nevado-2.jpg',
    logo: '/img/proyectos/horizontes-del-valle/logo-hdv-blanco.png',
    ficha: [['ubicacion', 'Ubicación', 'Urubamba, Cusco'], ['uso', 'Tipo', 'Lotes'], ['areas', 'Áreas', '202 a 367 m²'], ['pisos', 'Lotes', '13']],
    // Lots from the plan dated 06/12/2023. status: 'disponible' | 'separado' | 'vendido' (empty = not shown). price in US$, 0 = Consultar
    lots: [
      { code: '1', area: 332.42 }, { code: '2', area: 367.00 }, { code: '3', area: 203.53 }, { code: '5', area: 204.08 },
      { code: '6', area: 295.60 }, { code: '7', area: 204.08 }, { code: '8', area: 203.78 }, { code: '9', area: 204.08 },
      { code: '10', area: 206.05 }, { code: '11', area: 204.67 }, { code: '12', area: 289.84 }, { code: '13', area: 202.06 },
      { code: '14', area: 291.62 }
    ],
    lotMap: {                         // built by tools/lots_plan.py from the real CAD geometry of the lotización PDF (PDF points)
      img: '/img/proyectos/horizontes-del-valle/lotes.svg', viewBox: '164 233 967 420',
      polys: {
        '1': '452.9,275.7 462.0,432.7 533.3,447.8 533.3,273.8',
        '2': '533.3,273.8 533.3,449.3 606.5,474.6 606.8,272.2',
        '3': '606.7,376.5 679.9,374.8 680.4,270.4 606.8,272.1',
        '5': '679.9,374.8 753.6,373.0 754.1,268.6 680.4,270.4',
        '7': '754.1,268.6 753.6,373.0 827.3,371.4 827.8,267.0',
        '9': '827.8,267.0 827.3,371.4 901.0,369.7 901.4,265.3',
        '11': '901.4,265.3 901.0,369.7 975.1,367.9 975.1,263.5',
        '13': '975.1,263.5 975.1,367.9 1048.4,366.2 1048.4,263.5',
        '14': '1121.2,263.5 1049.0,263.5 1048.4,415.4 1121.2,413.7',
        '6': '778.4,524.5 778.6,421.6 655.7,421.6 655.7,494.1 701.8,511.5',
        '8': '852.1,520.5 852.2,420.0 778.6,421.6 778.4,524.5 828.8,526.8',
        '10': '938.2,497.8 938.2,417.7 852.2,420.0 852.1,520.5',
        '12': '1121.2,413.7 938.2,417.9 938.2,497.8 1032.0,473.0 1032.8,468.4 1121.2,461.6'
      }
    },
    nearby: { 'Cerca de': ['Plaza de Armas de Urubamba, a 7 cuadras', 'Tiendas y servicios', 'Bancos y cajas municipales', 'Av. principal de Urubamba'] },
    video: '/media/horizontes-del-valle.mp4', videoPoster: '/media/horizontes-del-valle.jpg',
    spaces: [],
    gallery: [
      { title: 'El valle', imgs: ['/img/proyectos/horizontes-del-valle/valle-nevado.jpg', '/img/proyectos/horizontes-del-valle/valle-cerros.jpg', '/img/proyectos/horizontes-del-valle/valle-norte.jpg', '/img/proyectos/horizontes-del-valle/rio-urubamba.jpg', '/img/proyectos/horizontes-del-valle/valle-nevado-2.jpg'] },
      { title: 'El terreno', imgs: ['/img/proyectos/horizontes-del-valle/terreno.jpg', '/img/proyectos/horizontes-del-valle/terreno-cenital.jpg', '/img/proyectos/horizontes-del-valle/terreno-entorno.jpg', '/img/proyectos/horizontes-del-valle/terreno-entorno-2.jpg', '/img/proyectos/horizontes-del-valle/terreno-entorno-3.jpg'] },
      { title: 'Urubamba', imgs: ['/img/proyectos/horizontes-del-valle/urubamba.jpg', '/img/proyectos/horizontes-del-valle/rio-curva.jpg', '/img/proyectos/horizontes-del-valle/urubamba-rio.jpg', '/img/proyectos/horizontes-del-valle/urubamba-centro.jpg', '/img/proyectos/horizontes-del-valle/urubamba-vista.jpg'] }
    ],
    brochure: '', plans: '',
    mapQuery: 'Iglesia Señor de Torrechayoc, Urubamba, Cusco'
  },
  {
    slug: 'sierra-hotel',
    color: 'celeste',
    name: 'Sierra Hotel',
    district: 'Cusco',
    stage: 'entregado',
    headline: 'Sierra Hotel, Cusco',
    kicker: 'Hotel · 2024',
    bedrooms: [],
    areas: '',
    floors: '',
    address: 'Cusco, Perú',
    intro: 'Transformamos una estructura existente en un hotel, rediseñando por completo su distribución interior y su fachada. La materialidad conecta el edificio con el carácter arquitectónico de Cusco: una base de texturas rústicas, un cuerpo que reinterpreta la misma paleta cálida con una composición contemporánea y un remate de materiales naturales y vidrio de piso a techo que enmarca las montañas.',
    hero: '/img/proyectos/sierra-hotel/fachada.jpg', heroMobile: '/img/proyectos/sierra-hotel/fachada.jpg',
    cover: '/img/proyectos/sierra-hotel/cover.jpg',
    pageHero: '/img/proyectos/sierra-hotel/foto-4.jpg',   // project page hero: different from the home hero so the click feels like arriving somewhere new
    ficha: [['ubicacion', 'Ubicación', 'Cusco, Perú'], ['uso', 'Uso', 'Hotel'], ['entrega', 'Entrega', '2024']],
    planImgs: [{ title: 'Plantas: primer piso, típica y azotea', img: '/img/proyectos/sierra-hotel/floor-plans.svg' }, { title: 'Elevación principal', img: '/img/proyectos/sierra-hotel/elevation.svg' }],
    spaces: [
      { title: 'Fachada', text: 'Base, cuerpo y remate: tres partes que leen la ciudad. La base toma las texturas rústicas de Cusco y el cuerpo reinterpreta su paleta cálida con una composición sobria.', img: '/img/proyectos/sierra-hotel/fachada.jpg' },
      { title: 'Materialidad', text: 'Listones cálidos, carpinterías oscuras y volúmenes limpios. Una arquitectura contemporánea que pertenece a su lugar.', img: '/img/proyectos/sierra-hotel/foto-4-crop.jpg' },
      { title: 'Interiores', text: 'Cada espacio fue rediseñado pensando en la experiencia del huésped, con acabados nobles y luz natural.', img: '/img/proyectos/sierra-hotel/foto-1.jpg' }
    ],
    gallery: [                              // renders reel: three columns, each image a story bar
      { title: 'Fachada', imgs: ['/img/proyectos/sierra-hotel/fachada.jpg', '/img/proyectos/sierra-hotel/foto-4.jpg'] }, // each group = one column; up to 5 images, empty slots show a placeholder
      { title: 'Materialidad', imgs: ['/img/proyectos/sierra-hotel/foto-4-crop.jpg', '/img/proyectos/sierra-hotel/axonometria.jpg'] },
      { title: 'Interiores', imgs: ['/img/proyectos/sierra-hotel/foto-1.jpg', '/img/proyectos/sierra-hotel/foto-3.jpg'] }
    ],
    brochure: '', plans: '',
    mapQuery: 'Cusco, Perú'
  },
  {
    slug: 'edificio-murano',
    color: 'amarillo',
    name: 'Edificio Murano',
    district: 'Magisterio, Cusco',
    stage: 'entregado',
    headline: '',
    kicker: 'Vivienda · 2023',
    bedrooms: [1, 3],
    areas: '65 a 148 m²', floors: '8 pisos + semisótano',
    address: 'Parque Amauta 206, Urb. Magisterial 1ra Etapa, San Sebastián, Cusco',
    intro: '',
    hero: '/img/proyectos/edificio-murano/fachada.jpg', heroMobile: '/img/proyectos/edificio-murano/fachada.jpg', cover: '/img/proyectos/edificio-murano/fachada.jpg',
    pageHero: '/img/proyectos/edificio-murano/foto-sala-cocina.jpg',   // real photo of the delivered flat, differs from the home hero
    ficha: [['ubicacion', 'Ubicación', 'Magisterio, Cusco'], ['uso', 'Uso', 'Vivienda'], ['dorm', 'Departamentos', '1 y 3 dorm.'], ['entrega', 'Entrega', '2023']],
    planImgs: [
      { title: 'Semisótano', img: '/img/proyectos/edificio-murano/planos/semisotano.svg?v=3' },
      { title: 'Primer nivel', img: '/img/proyectos/edificio-murano/planos/nivel-1.svg?v=3' },
      { title: 'Segundo nivel', img: '/img/proyectos/edificio-murano/planos/nivel-2.svg?v=3' },
      { title: 'Típico 3 al 8', img: '/img/proyectos/edificio-murano/planos/tipico-3-8.svg?v=3' }
    ],
    units: [                                // typologies from the 2021 sheets; delivered, so no price shown
      { code: '301 al 801', type: 'Flat', floorLabel: 'Pisos 3 al 8', beds: 3, baths: 3, area: 148, price: 0, plan: '/img/proyectos/edificio-murano/planos/unidad-x01.svg?v=3' },
      { code: '102 al 802', type: 'Flat', floorLabel: 'Pisos 1 al 8', beds: 1, baths: 1, area: 65, price: 0, plan: '/img/proyectos/edificio-murano/planos/unidad-x02.svg?v=3' }
    ],
    spaces: [
      { title: 'Fachada', text: '', img: '/img/proyectos/edificio-murano/fachada.jpg' },
      { title: 'Sala y cocina', text: '', img: '/img/proyectos/edificio-murano/foto-sala-cocina.jpg' },
      { title: 'Cocina', text: '', img: '/img/proyectos/edificio-murano/foto-cocina.jpg' }
    ],
    gallery: [
      { title: 'Áreas sociales', imgs: ['/img/proyectos/edificio-murano/fachada.jpg', '/img/proyectos/edificio-murano/sala.jpg', '/img/proyectos/edificio-murano/comedor-cocina.jpg', '/img/proyectos/edificio-murano/sala-estar.jpg', '/img/proyectos/edificio-murano/estudio.jpg'] },
      { title: 'Obra entregada', imgs: ['/img/proyectos/edificio-murano/foto-sala-cocina.jpg', '/img/proyectos/edificio-murano/foto-cocina.jpg'] },
      { title: 'Dormitorios y baños', imgs: ['/img/proyectos/edificio-murano/dormitorio-principal.jpg', '/img/proyectos/edificio-murano/dormitorio-secundario.jpg', '/img/proyectos/edificio-murano/bano-principal.jpg', '/img/proyectos/edificio-murano/bano-visita.jpg'] }
    ],
    brochure: '', plans: '', mapQuery: 'Parque Amauta 206, San Sebastián, Cusco'
  },
  { slug: 'residencial-alta-vista', name: 'Residencial Alta Vista', district: 'Cusco', stage: 'entregado', page: false, cover: '/img/proyectos/residencial-alta-vista/cover.jpg' },
  { slug: 'residencial-las-margaritas', name: 'Residencial Las Margaritas', district: 'Cusco', stage: 'entregado', page: false, cover: '/img/proyectos/residencial-las-margaritas/cover.jpg' },
  { slug: 'condominio-el-pino', name: 'Condominio El Pino', district: 'Cusco', stage: 'entregado', page: false, cover: '/img/proyectos/condominio-el-pino/cover.jpg' },
  { slug: 'residencial-villasol', name: 'Residencial Villasol', district: 'Cusco', stage: 'entregado', page: false, cover: '/img/proyectos/residencial-villasol/cover.jpg' }
];

const projectColor = (p, i) => p.color || ['celeste', 'naranja', 'amarillo'][(i || 0) % 3];

const forSale = () => PROJECTS.filter(p => p.stage !== 'entregado');
const delivered = () => PROJECTS.filter(p => p.stage === 'entregado');

function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function bedroomsText(b){ if (!b || !b.length) return ''; return (b.length === 1 ? b[0] : b.slice(0,-1).join(', ') + ' y ' + b[b.length-1]) + ' dorm.'; }
function projectUrl(p){ return '/proyecto.html?p=' + encodeURIComponent(p.slug); }

function projectCard(p){
  const img = p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.name)}" loading="lazy">` : '';
  const line = [p.areas, bedroomsText(p.bedrooms)].filter(Boolean).join(' · ') || p.kicker || '';
  if (p.page === false) return `<div class="card card-static">
    <div class="ph">${img}<span class="tag">${esc(STAGES[p.stage] || '')}</span></div>
    <div class="card-body"><div><h3>${esc(p.name)}</h3><p class="card-district">${esc(p.district)}</p></div></div></div>`;
  return `<a class="card" href="${projectUrl(p)}">
    <div class="ph">${img}<span class="tag">${esc(STAGES[p.stage] || '')}</span></div>
    <div class="card-body">
      <div><h3>${esc(p.name)}</h3><p class="card-district">${esc(p.district)}</p></div>
      <div class="card-meta">${line ? `<p>${esc(line)}</p>` : ''}<span class="more">Más info</span></div>
    </div></a>`;
}

// One big card per project (home feature panel). nav = list of projects to switch between, i = this one's index
function featureCard(p, i, nav){
  const intro = (p.intro || '').split(/(?<=\.)\s/)[0];
  const stage = p.stage === 'entregado' ? 'Obra entregada' : (STAGES[p.stage] || '');
  return `<article class="feature${i ? '' : ' on'}" data-k="${i || 0}" id="p-${esc(p.slug)}">
    <a class="feature-img" href="${projectUrl(p)}"><img src="${esc(p.featureImg || p.cover || p.hero)}" alt="${esc(p.name)}" loading="lazy"></a>
    <div class="feature-body">
      <p class="eyebrow">${esc(stage)} · ${esc(p.district)}</p>
      <h3 class="title">${esc(p.name)}</h3>
      ${intro ? `<p>${esc(intro)}</p>` : ''}
      <dl class="feature-keys">${(p.ficha || []).filter(f => f[0] !== 'ubicacion').slice(0, 3).map(f => `<div><dt>${esc(f[1])}</dt><dd>${esc(f[2])}</dd></div>`).join('')}</dl>
      <div class="hero-actions left"><a class="btn-pill btn-pill-dark" href="${projectUrl(p)}">${p.lots ? 'Ver lotes' : 'Ver proyecto'}</a><a class="btn-pill btn-pill-line" data-wa="Hola, quisiera información sobre ${esc(p.name)}.">WhatsApp</a></div>
      ${nav && nav.length > 1 ? `<nav class="feature-nav" aria-label="Proyectos">${nav.map((q, j) => `<button type="button" data-k="${j}"${j === i ? ' aria-current="true"' : ''}>${esc(q.name)}</button>`).join('')}</nav>` : ''}
    </div></article>`;
}

// Rotating feature panel: crossfades between projects, click a name to jump
function mountFeatures(c, list, start){
  c.className = 'features rot'; c.closest('section').classList.add('is-feature');
  c.innerHTML = list.map((p, i) => featureCard(p, i, list)).join('');
  c.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  const slides = [...c.querySelectorAll('.feature')]; if (slides.length < 2) return;
  let k = 0, t; const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go = (n) => { k = (n + slides.length) % slides.length; slides.forEach((s, j) => s.classList.toggle('on', j === k)); };
  const play = () => { clearTimeout(t); if (!still) t = setTimeout(() => { go(k + 1); play(); }, 6000); };
  c.addEventListener('click', e => { const b = e.target.closest('.feature-nav button'); if (b) { go(+b.dataset.k); play(); } });
  c.addEventListener('mouseenter', () => clearTimeout(t)); c.addEventListener('mouseleave', play);
  go(start || 0); play();
}

// Filter bar (district / bedrooms / stage) used on home, listing and project pages
function mountFilters(form, grid, source, empty){
  const items = source();
  form.hidden = items.length < 4;   // filters only earn their place with a real catalogue
  const districts = [...new Set(items.map(p => p.district))].sort();
  const beds = [...new Set(items.flatMap(p => p.bedrooms || []))].sort();
  const stages = Object.keys(STAGES).filter(s => items.some(p => p.stage === s));
  const opt = (v, t) => `<option value="${esc(v)}">${esc(t)}</option>`;
  form.innerHTML = `
    <label><span>Distrito</span><select name="d">${opt('', 'Todos')}${districts.map(d => opt(d, d)).join('')}</select></label>
    <label><span>Dormitorios</span><select name="b">${opt('', 'Todos')}${beds.map(b => opt(b, b + (b == 1 ? ' dormitorio' : ' dormitorios'))).join('')}</select></label>
    <label><span>Etapa</span><select name="s">${opt('', 'Todas')}${stages.map(s => opt(s, STAGES[s])).join('')}</select></label>`;
  const q = new URLSearchParams(location.search);
  ['d','b','s'].forEach(k => { if (q.get(k)) form.elements[k].value = q.get(k); });
  const render = () => {
    const d = form.elements.d.value, b = form.elements.b.value, s = form.elements.s.value;
    const list = items.filter(p => (!d || p.district === d) && (!b || (p.bedrooms || []).includes(+b)) && (!s || p.stage === s));
    grid.innerHTML = list.map(projectCard).join('');
    if (empty) empty.hidden = list.length > 0;
  };
  form.addEventListener('change', render);
  render();
}
