// All projects live here. Add one object per project; photos go in /img/proyectos/<slug>/.
// status: 'en-venta' | 'en-construccion' | 'entregado'
const PROJECTS = [
  {
    slug: 'proyecto-1',
    name: 'Proyecto 1',
    district: 'Santiago de Surco',
    status: 'en-venta',
    type: 'Departamentos',
    summary: 'Descripción corta del proyecto (por completar).',
    description: 'Descripción completa del proyecto: concepto, ubicación, áreas comunes y acabados (por completar).',
    facts: { 'Unidades': '—', 'Áreas': '— m² a — m²', 'Dormitorios': '1 a 3', 'Entrega': '—' },
    features: ['Área común 1', 'Área común 2', 'Estacionamientos'],
    address: 'Dirección por confirmar',
    mapQuery: 'Santiago de Surco, Lima',
    cover: '',
    photos: []
  },
  {
    slug: 'proyecto-2',
    name: 'Proyecto 2',
    district: 'Miraflores',
    status: 'en-construccion',
    type: 'Departamentos',
    summary: 'Descripción corta del proyecto (por completar).',
    description: 'Descripción completa (por completar).',
    facts: { 'Unidades': '—', 'Áreas': '—', 'Entrega': '—' },
    features: [],
    address: '',
    mapQuery: 'Miraflores, Lima',
    cover: '',
    photos: []
  },
  {
    slug: 'proyecto-3',
    name: 'Proyecto 3',
    district: 'Barranco',
    status: 'entregado',
    type: 'Departamentos',
    summary: 'Descripción corta del proyecto (por completar).',
    description: 'Descripción completa (por completar).',
    facts: { 'Unidades': '—', 'Entregado': '—' },
    features: [],
    address: '',
    mapQuery: 'Barranco, Lima',
    cover: '',
    photos: []
  }
];

const STATUS_LABEL = { 'en-venta': 'En venta', 'en-construccion': 'En construcción', 'entregado': 'Entregado' };

function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function projectCard(p){
  const img = p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.name)}" loading="lazy">` : '';
  return `<a class="card" href="/proyecto.html?p=${encodeURIComponent(p.slug)}">
    <div class="ph">${img}<span class="tag tag-${esc(p.status)}">${esc(STATUS_LABEL[p.status] || '')}</span></div>
    <h3>${esc(p.name)}</h3><p>${esc(p.district)} · ${esc(p.type)}</p></a>`;
}
