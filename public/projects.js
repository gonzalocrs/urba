// All projects live here. Photos go in /img/proyectos/<slug>/.
// stage: 'lanzamiento' | 'preventa' | 'en-construccion' | 'pronta-entrega' | 'entrega-inmediata' | 'entregado'
const STAGES = {
  'lanzamiento': 'Lanzamiento',
  'preventa': 'Preventa',
  'en-construccion': 'En construcción',
  'pronta-entrega': 'Pronta entrega',
  'entrega-inmediata': 'Entrega inmediata',
  'entregado': 'Entregado'
};

const PROJECTS = [
  {
    slug: 'proyecto-1',
    color: 'naranja',                 // celeste | naranja | amarillo: slide, header and project page colour
    name: 'Proyecto 1',
    district: 'Santiago de Surco',
    stage: 'preventa',
    headline: 'Vive en Surco',               // big line on the home slider
    bedrooms: [2, 3],
    areas: 'De 80 a 140 m²',
    floors: '10 pisos',
    delivery: 'Diciembre 2027',            // por confirmar
    priceFrom: 'US$ 150,000',              // por confirmar
    address: 'Dirección por confirmar, Santiago de Surco',
    // Units / floor plans table (por completar). plan = image of the unit's floor plan
    units: [
      { code: '201', type: 'Flat', floor: 2, beds: 2, baths: 2, area: 80, price: 150000, plan: '' },
      { code: '202', type: 'Flat', floor: 2, beds: 3, baths: 2, area: 105, price: 195000, plan: '' },
      { code: '501', type: 'Flat', floor: 5, beds: 2, baths: 2, area: 82, price: 158000, plan: '' },
      { code: '1001', type: 'Penthouse', floor: 10, beds: 3, baths: 3, area: 140, price: 280000, plan: '' }
    ],
    // Nearby places shown next to the map (por completar)
    nearby: { 'Parques': ['Por completar'], 'Cafés y restaurantes': ['Por completar'], 'Colegios': ['Por completar'], 'Clínicas': ['Por completar'] },
    // Common-area renders (por completar)
    amenities: [{ title: 'Lobby', img: '' }, { title: 'Coworking', img: '' }, { title: 'Zona BBQ', img: '' }, { title: 'Gimnasio', img: '' }, { title: 'Sala de niños', img: '' }, { title: 'Terraza', img: '' }],
    intro: 'Descripción del proyecto: concepto, entorno y lo que lo hace especial (por completar).',
    hero: '', heroMobile: '',               // e.g. /img/proyectos/proyecto-1/hero.jpg
    cover: '',                              // card image
    spaces: [                               // alternating image + text blocks on the project page
      { title: 'Sala comedor', text: 'Texto sobre la sala comedor (por completar).', img: '' },
      { title: 'Cocina', text: 'Texto sobre la cocina (por completar).', img: '' },
      { title: 'Dormitorio principal', text: 'Texto sobre el dormitorio principal (por completar).', img: '' }
    ],
    brochure: '', plans: '',                // PDF links
    mapQuery: 'Santiago de Surco, Lima'
  },
  {
    slug: 'proyecto-2',
    color: 'amarillo',
    name: 'Proyecto 2',
    district: 'Miraflores',
    stage: 'en-construccion',
    headline: 'Departamentos en Miraflores',
    bedrooms: [1, 2, 3],
    areas: 'Desde 65 m²',
    floors: '12 pisos',
    address: 'Dirección por confirmar, Miraflores',
    intro: 'Descripción del proyecto (por completar).',
    hero: '', heroMobile: '', cover: '',
    spaces: [],
    brochure: '', plans: '',
    mapQuery: 'Miraflores, Lima'
  },
  {
    slug: 'proyecto-3',
    color: 'celeste',
    name: 'Proyecto 3',
    district: 'Barranco',
    stage: 'entrega-inmediata',
    headline: 'Entrega inmediata en Barranco',
    bedrooms: [3],
    areas: 'Desde 150 m²',
    floors: '8 pisos',
    address: 'Dirección por confirmar, Barranco',
    intro: 'Descripción del proyecto (por completar).',
    hero: '', heroMobile: '', cover: '',
    spaces: [],
    brochure: '', plans: '',
    mapQuery: 'Barranco, Lima'
  },
  {
    slug: 'sierra-hotel',
    featured: true,                 // shown in the home hero (photo, name, what it is)
    color: 'celeste',
    name: 'Sierra Hotel',
    district: 'Cusco',
    stage: 'entregado',
    headline: 'Sierra Hotel, Cusco',
    kicker: 'Hotel · 2023',
    bedrooms: [],
    areas: '',
    floors: '',
    address: 'Cusco, Perú',
    intro: 'Transformamos una estructura existente en un hotel, rediseñando por completo su distribución interior y su fachada. La materialidad conecta el edificio con el carácter arquitectónico de Cusco: una base de texturas rústicas, un cuerpo que reinterpreta la misma paleta cálida con una composición contemporánea y un remate de materiales naturales y vidrio de piso a techo que enmarca las montañas.',
    hero: '/img/proyectos/sierra-hotel/fachada.jpg', heroMobile: '/img/proyectos/sierra-hotel/fachada.jpg',
    cover: '/img/proyectos/sierra-hotel/cover.jpg',
    pageHero: '/img/proyectos/sierra-hotel/foto-4.jpg',   // project page hero: different from the home hero so the click feels like arriving somewhere new
    ficha: [['ubicacion', 'Ubicación', 'Cusco, Perú'], ['uso', 'Uso', 'Hotel'], ['entrega', 'Entrega', '2023']],
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
    district: 'San Sebastián, Cusco',
    stage: 'entregado',
    headline: '',
    kicker: 'Vivienda · 2021',
    bedrooms: [1, 3],
    areas: '65 a 148 m²', floors: '8 pisos + semisótano',
    address: 'Parque Amauta 206, Urb. Magisterial 1ra Etapa, San Sebastián, Cusco',
    intro: '',
    hero: '/img/proyectos/edificio-murano/fachada.jpg', heroMobile: '/img/proyectos/edificio-murano/fachada.jpg', cover: '/img/proyectos/edificio-murano/fachada.jpg',
    pageHero: '/img/proyectos/edificio-murano/foto-sala-cocina.jpg',   // real photo of the delivered flat, differs from the home hero
    ficha: [['ubicacion', 'Ubicación', 'San Sebastián, Cusco'], ['uso', 'Uso', 'Vivienda'], ['dorm', 'Departamentos', '1 y 3 dorm.'], ['entrega', 'Entrega', '2021']],
    planImgs: [
      { title: 'Semisótano', img: '/img/proyectos/edificio-murano/planos/semisotano.png' },
      { title: 'Primer nivel', img: '/img/proyectos/edificio-murano/planos/nivel-1.png' },
      { title: 'Segundo nivel', img: '/img/proyectos/edificio-murano/planos/nivel-2.png' },
      { title: 'Típico 3 al 8', img: '/img/proyectos/edificio-murano/planos/tipico-3-8.png' }
    ],
    units: [                                // typologies from the 2021 sheets; delivered, so no price shown
      { code: '301 al 801', type: 'Flat', floorLabel: 'Pisos 3 al 8', beds: 3, baths: 3, area: 148, price: 0, plan: '/img/proyectos/edificio-murano/planos/unidad-x01.png' },
      { code: '102 al 802', type: 'Flat', floorLabel: 'Pisos 1 al 8', beds: 1, baths: 1, area: 65, price: 0, plan: '/img/proyectos/edificio-murano/planos/unidad-x02.png' }
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
  }
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
  return `<a class="card" href="${projectUrl(p)}">
    <div class="ph">${img}<span class="tag">${esc(STAGES[p.stage] || '')}</span></div>
    <div class="card-body">
      <div><h3>${esc(p.name)}</h3><p class="card-district">${esc(p.district)}</p></div>
      <div class="card-meta">${line ? `<p>${esc(line)}</p>` : ''}<span class="more">Más info</span></div>
    </div></a>`;
}

// Filter bar (district / bedrooms / stage) used on home, listing and project pages
function mountFilters(form, grid, source, empty){
  const items = source();
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
