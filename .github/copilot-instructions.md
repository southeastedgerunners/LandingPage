# SouthEast EdgeRunners - Copilot Instructions

## Project Overview

This repository is the SouthEast EdgeRunners marketing site for a business automation company. The app is a React + TypeScript + Vite frontend deployed to Netlify — there is no backend. All lead capture flows directly to n8n via webhook.

The homepage messaging should stay aligned with the business described in `instructions.md`: workflow automation with n8n, AI applications, website creation, Facebook ads, CRM lead routing, and automated text follow-up.

## Build and Preview

```bash
npm run dev
npm run build
npm run preview
```

- `npm run build` runs TypeScript type-checking via `tsc` and then creates the production bundle with Vite.
- `npm start` is an alias for `vite preview --port $PORT` used in deployment environments (e.g., Netlify).
- There is currently no test runner configured and no lint script in `package.json`.

## High-Level Architecture

- `src/main.tsx` is the entry point. It mounts the app with `createRoot`, wraps the app in `BrowserRouter`, and imports the global stylesheet from `src/index.css`.
- `src/App.tsx` is intentionally thin and only defines the route tree. It renders a shared `Layout` route at `/`, with nested routes for:
  - `index` -> `HomePage`
  - `/privacy` -> `PrivacyPolicyPage`
  - `/estimator` -> `EstimatorPage`
  - `/estimator/results` -> `EstimatorResultsPage`
- `src/components/Layout.tsx` owns the persistent shell: brand, top navigation, main content area, and footer. Nested pages render through `<Outlet />`.
- `src/pages/HomePage.tsx` contains the homepage content: hero, stats counter, how-it-works, and services sections.
- `src/components/CallRequestModal.tsx` owns the "Request a Call" form. On submit it POSTs directly to the n8n webhook URL (`VITE_N8N_WEBHOOK_URL`). No backend involved.
- `src/pages/PrivacyPolicyPage.tsx` is a static content page broken into titled sections.

## n8n Integration

**The browser posts directly to n8n. There is no intermediate backend.**

- The webhook URL is stored in the `VITE_N8N_WEBHOOK_URL` environment variable (inlined at build time by Vite).
- Copy `.env.example` to `.env.local` and set `VITE_N8N_WEBHOOK_URL` for local development.
- In Netlify, set `VITE_N8N_WEBHOOK_URL` as a build environment variable.

### Canonical webhook payload (website form → n8n)

```json
{
  "businessName": "Acme Roofing",
  "contactName": "John Smith",
  "phone": "(606) 555-1234",
  "email": "john@acmeroofing.com",
  "website": "acmeroofing.com",
  "industry": "Roofing",
  "message": "We need help with missed-call text back and appointment reminders.",
  "source": "Website Form"
}
```

- The Tally.so form uses the same field labels and posts to the same webhook URL, but n8n normalizes the Tally payload in a Code node. See `TALLY_SETUP.md` for the exact field spec and n8n mapping code.

## Styling

- `src/index.css` defines global resets, shared design tokens on `:root`, and the shared `.cta-button` style.
- `src/components/Layout.css` handles the site shell, brand, nav, and footer.
- `src/components/CallRequestModal.css` styles the modal overlay and form.
- Page-specific CSS lives next to each page component.
- Static branding assets live under `src/assets/`.

## Key Conventions

- Dark mode is the only supported theme. Always use CSS custom properties from `src/index.css`:

```css
--color-background: #2b2b2b;
--color-text: #e6e6e6;
--color-muted: #b6b6b6;
--color-accent: #00b5c9;
--color-accent-alt: #ff2d8a;
--color-elevated: #353535;
--color-border: rgba(255, 255, 255, 0.08);
--shadow-soft: 0 12px 30px rgba(0, 0, 0, 0.3);
```

- Keep the shared page frame intact: `.app-shell` -> `.site-header` + `.main-area` + `.footer`. New pages render inside the existing `Layout` route.
- Internal navigation uses `NavLink` so the active state can apply `.nav-button--active`. The home link uses `end`.
- CSS naming follows component-scoped BEM pattern (`.brand__line`, `.hero__content`, `.crm-modal__header`). No utility classes or CSS Modules.
- The design language: rounded cards (12–20px), subtle gradient surfaces, teal/pink accent lighting, hover motion in the 150–180ms range.
- The main responsive breakpoint is `@media (max-width: 720px)`; a secondary one at `@media (max-width: 560px)`.
- `.cta-button` is defined in `src/index.css` and is available globally — do not redefine it in component CSS.
- TypeScript is configured with `strict: true`. Avoid `any`; use proper interfaces or type aliases. `noEmit: true` means the TypeScript compiler only type-checks — Vite handles transpilation.
- Key library versions: **React 19**, **React Router v7**. Use current API patterns (nested `<Routes>`/`<Route>` with `<Outlet />`).
- If you add a new page, wire it in both `src/App.tsx` and `src/components/Layout.tsx`.
- The Tawk.to live chat widget is embedded via a script tag in `index.html`. Do not move it to a React component.
- **Do not commit `VITE_N8N_WEBHOOK_URL`** to the repo. Use `.env.local` locally; use Netlify build environment variables in production.

## Deployment

- Frontend is a static Vite build (`dist/`) deployed to **Netlify**.
- Build command: `npm run build` | Publish directory: `dist`
- Required Netlify environment variable: `VITE_N8N_WEBHOOK_URL`
