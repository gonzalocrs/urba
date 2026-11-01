// Shared header, footer and contact details for every page. Edit contact info here once.
const URBA = {
  phone: '+51 999 999 999',          // TODO real number
  whatsapp: '51999999999',            // digits only, with country code
  email: 'contacto@urba.pe',
  address: 'Santiago de Surco, Lima, Perú',
  instagram: '',                      // e.g. https://instagram.com/urba.pe
  facebook: ''
};

const NAV = [
  ['/', 'Inicio'],
  ['/proyectos.html', 'Proyectos'],
  ['/nosotros.html', 'Nosotros'],
  ['/contacto.html', 'Contacto']
];

function waLink(text){
  return `https://wa.me/${URBA.whatsapp}?text=${encodeURIComponent(text || 'Hola, quisiera información sobre sus proyectos.')}`;
}

(function renderChrome(){
  const here = location.pathname.replace(/index\.html$/, '');
  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `
      <div class="wrap top">
        <a class="brand" href="/" aria-label="Urba Inmobiliaria, inicio"><span class="logo" aria-hidden="true"></span></a>
        <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menú</button>
        <nav id="nav">${NAV.map(([h, t]) =>
          `<a href="${h}"${(h === here || (h !== '/' && here.startsWith(h.replace('.html','')))) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
        </nav>
      </div>`;
    const btn = header.querySelector('.menu-btn');
    btn.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    const social = [['Instagram', URBA.instagram], ['Facebook', URBA.facebook]].filter(s => s[1])
      .map(([n, u]) => `<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join(' · ');
    footer.innerHTML = `
      <div class="wrap foot">
        <div><span class="logo-foot" role="img" aria-label="Urba. Creamos espacios, construimos comunidad"></span></div>
        <div><p><a href="tel:${URBA.phone.replace(/\s/g,'')}">${URBA.phone}</a><br><a href="mailto:${URBA.email}">${URBA.email}</a></p>${social ? `<p>${social}</p>` : ''}</div>
        <div><p>${URBA.address}</p><p class="small">© ${new Date().getFullYear()} Urba Inmobiliaria</p></div>
      </div>`;
  }
  // floating WhatsApp button
  const wa = document.createElement('a');
  wa.className = 'wa-float'; wa.href = waLink(); wa.target = '_blank'; wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Escríbenos por WhatsApp'); wa.textContent = 'WhatsApp';
  document.body.appendChild(wa);
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + URBA.email; a.textContent = URBA.email; });
  document.querySelectorAll('[data-phone]').forEach(a => { a.href = 'tel:' + URBA.phone.replace(/\s/g,''); a.textContent = URBA.phone; });
  document.querySelectorAll('[data-address]').forEach(el => { el.textContent = URBA.address; });
})();
