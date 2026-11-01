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

## Brand (from Manual de Marca Urba)
- Colors: Grafito `#282829` (always), plus ONE accent per page: Celeste `#3ec2cf`, Naranja `#f04e3e`, Amarillo `#f9ec00`. Set with `<body class="theme-celeste|theme-naranja|theme-amarillo">`.
- Logo, logo + tagline, isotipo: `public/img/brand/*.svg`, extracted as vectors from the manual. Used as CSS masks so they take any brand color.
- Type: titles in Bonn BF (licensed). Until webfont files are added, Jost (Google Fonts) stands in. To use Bonn BF, add the .woff2 files to `public/fonts/` and point the `@font-face` rules at the top of `styles.css` to them. Body text: Helvetica.
