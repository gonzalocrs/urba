# Urba Inmobiliaria website

Static site served by Cloudflare Workers (static assets), the same setup as `gonzalocrs/portfolio`.
Every push to `main` deploys automatically.

## Where things live
- `public/projects.js`: the list of projects (name, district, status, facts, photos). Add a project here and it shows up on the home page, the projects page and its own detail page (`/proyecto.html?p=<slug>`).
- `public/site.js`: phone, WhatsApp, email, address and social links, plus the shared header and footer.
- `public/styles.css`: brand colors and fonts are the variables at the top.
- `public/img/proyectos/<slug>/`: project photos.

## Local preview
`npx wrangler dev`, then open http://localhost:8787
