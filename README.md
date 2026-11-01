# Urba Inmobiliaria website

Static site served by Cloudflare Workers (static assets), the same setup as `gonzalocrs/portfolio`.

- Pages live in `public/`. Edit `public/index.html` and `public/styles.css`.
- `wrangler.toml` tells Cloudflare to serve `public/` as the site.
- Every push to `main` deploys automatically once the repo is connected in Cloudflare (Workers & Pages > Create > Import a repository).

Local preview: `npx wrangler dev` then open http://localhost:8787
