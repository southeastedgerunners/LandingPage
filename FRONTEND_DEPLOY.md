Frontend — Netlify deployment notes

Netlify is a great fit for the static Vite build. Steps:

1. Build the site locally:
   npm install
   npm run build
   The static output is created in the `dist/` folder.

2. Connect repository to Netlify (recommended):
   - In Netlify, choose "New site from Git" and select this repository.
   - Set the build command to: `npm run build`
   - Set the publish directory to: `dist`

3. Environment variables on Netlify:
   - VITE_API_BASE_URL should be set to the publicly reachable backend URL (e.g., https://api.edgerunners.app)
   - Any other VITE_ prefixed env vars will be inlined at build-time.

4. Alternate manual deploy:
   - Upload the contents of `dist/` to Netlify or use the Netlify CLI `netlify deploy --prod --dir=dist`.

5. CORS:
   - Ensure the API allows the Netlify site origin (see api/DEPLOYMENT.md). If you use a Netlify subdomain, set that origin exactly.

6. Local dev:
   - For local development, the Vite dev server proxies to /api (configured in vite.config.ts). When deploying, the frontend should use VITE_API_BASE_URL to call the backend.

If you'd like, I can create a Netlify _headers file or an example netlify.toml for redirects and headers (security and caching).