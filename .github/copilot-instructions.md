# SouthEast EdgeRunners - Copilot Instructions

## Project Overview

This repository is the SouthEast EdgeRunners marketing site for a business automation company. The app is a React + TypeScript + Vite frontend deployed to Netlify. Lead capture goes through a Netlify function that is currently a placeholder (see Lead capture below).

The homepage messaging should stay aligned with the business described in `instructions.md`: workflow automation with n8n, AI applications, website creation, Facebook ads, CRM lead routing, and automated text follow-up.

## Build and Preview

```bash
npm run dev
npm run build
npm run preview
```

- `npm run build` runs TypeScript type-checking via `tsc` and then creates the production bundle with Vite.
- `npm start` is an alias for `vite preview --port $PORT` used in deployment environments (e.g., Netlify).
- `npm test` runs the Vitest suite (jsdom + Testing Library). There is no lint script.

## High-Level Architecture

- `src/main.tsx` is the entry point. It mounts the app with `createRoot`, wraps the app in `BrowserRouter`, and imports the global stylesheet from `src/index.css`.
- `src/App.tsx` is intentionally thin and only defines the route tree. It renders a shared `Layout` route at `/`, with nested routes for:
  - `index` -> `HomePage`
  - `/privacy` -> `PrivacyPolicyPage`
- `src/components/Layout.tsx` owns the persistent shell: brand, top navigation, main content area, and footer. Nested pages render through `<Outlet />`.
- `src/pages/HomePage.tsx` contains the homepage content: hero, stats counter, how-it-works, and services sections.
- `src/components/CallRequestForm.tsx` and `src/components/IntakeForm.tsx` own the lead forms; `Modal.tsx` wraps them in a native `<dialog>`.
- `src/pages/PrivacyPolicyPage.tsx` is a static content page broken into titled sections.

## Lead capture (being rebuilt)

**The lead pipeline is being rebuilt. Leads are not delivered anywhere yet.**

- Both forms (`src/components/CallRequestForm.tsx`, `src/components/IntakeForm.tsx`) POST to `/.netlify/functions/intake`.
- `netlify/functions/intake.mjs` is a placeholder: it stores and forwards nothing and answers `503 { delivered: false }`. The forms show "Online requests aren't connected yet" with the contact email instead of a success screen.
- The old direct-to-n8n webhook flow and its environment variable were removed. No environment variables are needed right now.

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
- Tawk.to live chat is disabled for now. `src/components/TawkWidget.tsx` is a placeholder; the original integration is kept in `src/components/disabled/` for restoring after it is tested in a real browser.
- Never commit `.env` files or secrets. `.gitignore` covers `.env` and `.env.*` (except `.env.example`).

## Deployment

- Frontend is a static Vite build (`dist/`) deployed to **Netlify**.
- Build command: `npm run build` | Publish directory: `dist`
- No Netlify environment variables are required at the moment.
