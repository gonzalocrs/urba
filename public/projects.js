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
    name: 'Proyecto 1',
    district: 'Santiago de Surco',
    stage: 'preventa',
    headline: 'Vive en Surco',               // big line on the home slider
    bedrooms: [2, 3],
    areas: 'De 80 a 140 m²',
    floors: '10 pisos',
    address: 'Dirección por confirmar, Santiago de Surco',
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
    slug: 'proyecto-entregado',
    name: 'Proyecto entregado',
    district: 'San Isidro',
    stage: 'entregado',
    headline: '',
    bedrooms: [2, 3],
    areas: '',
    floors: '',
    address: 'San Isidro',
    intro: 'Obra entregada (por completar).',
    hero: '', heroMobile: '', cover: '',
    spaces: [], brochure: '', plans: '', mapQuery: ''
  }
];

const forSale = () => PROJECTS.filter(p => p.stage !== 'entregado');
const delivered = () => PROJECTS.filter(p => p.stage === 'entregado');

function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function bedroomsText(b){ if (!b || !b.length) return ''; return (b.length === 1 ? b[0] : b.slice(0,-1).join(', ') + ' y ' + b[b.length-1]) + ' dorm.'; }
function projectUrl(p){ return '/proyecto.html?p=' + encodeURIComponent(p.slug); }

function projectCard(p){
  const img = p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.name)}" loading="lazy">` : '';
  const line = [p.areas, bedroomsText(p.bedrooms)].filter(Boolean).join(' · ');
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
