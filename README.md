# Urba Inmobiliaria website

Static site served by Cloudflare Workers (static assets), the same setup as `gonzalocrs/portfolio`.
Every push to `main` deploys automatically.

## Where things live
- `public/projects.js`: the list of projects (name, type, district, stage, bedrooms, areas, photos, spaces, brochure/plans). Add a project here and it shows up in the home slider, the filters, the projects page and its own page (`/proyecto.html?p=<slug>`).
- Project type sets the colour, per the brand manual: `vivienda` = amarillo, `oficinas` (oficinas y comercio) = celeste, `retail` = naranja. It colours the project page, its slide (and the header while that slide shows) and the card tag.
- `public/site.js`: phone, WhatsApp, emails, address, RUC and social links, plus the shared header, footer and lead form (sends to WhatsApp).
- `public/styles.css`: brand colors and fonts are the variables at the top.
- `public/img/proyectos/<slug>/`: project photos.

## Local preview
`npx wrangler dev`, then open http://localhost:8787

## Brand (from Manual de Marca Urba)
- Colors: Grafito `#282829` (always), plus ONE accent per page: Celeste `#3ec2cf`, Naranja `#f04e3e`, Amarillo `#f9ec00`. Set with `<body class="theme-celeste|theme-naranja|theme-amarillo">`.
- Logo, logo + tagline, isotipo: `public/img/brand/*.svg`, extracted as vectors from the manual. Used as CSS masks so they take any brand color.
- Type: Bonn BF (Light, Regular, Medium, Bold, Black) for titles and UI, Helvetica for text. Self-hosted, Latin-subset .woff2 files in `public/fonts/` (Bonn BF by Brody Fonts; check the license covers web use).
