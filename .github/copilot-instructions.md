# SouthEast EdgeRunners - Copilot Instructions

## Project Overview

This repository is the SouthEast EdgeRunners marketing site for a business automation company. The current app is a small React + TypeScript + Vite site focused on two public routes: the homepage and the privacy policy page.

The homepage messaging should stay aligned with the business described in `instructions.md`: workflow automation with n8n, AI applications, website creation, Facebook ads, CRM lead routing, and automated text follow-up.

## Build, Test, and Lint

```bash
npm run dev
npm run build
npm run preview
dotnet build api\EdgeRunners.Api\EdgeRunners.Api.csproj
```

- `npm run build` runs TypeScript type-checking via `tsc` and then creates the production bundle with Vite.
- The ASP.NET Core API lives in `api\EdgeRunners.Api` and should be built with `dotnet build api\EdgeRunners.Api\EdgeRunners.Api.csproj`.
- There is currently no test runner configured and no lint script in `package.json`.
- There is currently no single-test command because the repo does not yet include a test framework.

## High-Level Architecture

- `src/main.tsx` is the entry point. It mounts the app with `createRoot`, wraps the app in `BrowserRouter`, and imports the global stylesheet from `src/index.css`.
- `src/App.tsx` is intentionally thin and only defines the route tree. It renders a shared `Layout` route at `/`, with nested routes for:
  - `index` -> `HomePage`
  - `/privacy` -> `PrivacyPolicyPage`
- `src/components/Layout.tsx` owns the persistent shell: brand, top navigation, main content area, and footer. Nested pages render through `<Outlet />`.
- `src/pages/HomePage.tsx` contains the homepage content and the booking entry point.
- `src/components/BookingModal.tsx` owns the consultation booking UI. It renders the modal, loads availability when opened, and submits booking requests.
- `src/pages/PrivacyPolicyPage.tsx` is a static content page broken into titled sections.
- `api\EdgeRunners.Api` is a minimal ASP.NET Core backend that proxies booking traffic to n8n:
  - `GET /api/booking/availability` -> calls the n8n availability webhook and normalizes `slots[]`
  - `POST /api/booking/requests` -> forwards the booking payload to the n8n booking webhook
- Styling is split by responsibility:
  - `src/index.css` defines global resets plus the shared design tokens on `:root`
  - `src/components/Layout.css` handles the site shell, brand, nav, footer, and shared page spacing
  - `src/components/BookingModal.css` styles the booking modal and calendar surface
  - page-specific CSS lives next to each page component
- Static branding assets live under `src/assets/`. The homepage logo currently uses `src/assets/SouthEasternEdgeRunners.png`.

## Key Conventions

- Dark mode is the only supported theme. Reuse the CSS custom properties from `src/index.css` instead of introducing unrelated color values:

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

- Keep the shared page frame intact: `.app-shell` -> `.site-header` + `.main-area` + `.footer`. New pages should render inside the existing `Layout` route rather than duplicating the shell.
- Internal navigation uses `NavLink` so the active state can apply `.nav-button--active`. The home link uses `end` to avoid staying active on nested routes.
- CSS naming follows the current component-scoped pattern (`.brand__line`, `.hero__content`, `.services__grid`, `.privacy__section`) rather than utility classes or CSS Modules.
- The design language comes from `examples.md` and is already reflected in the current styles: rounded cards, subtle gradient surfaces, teal/pink accent lighting, and hover motion in the 150-180ms range.
- The main responsive breakpoint is `@media (max-width: 720px)`, where the header and hero layouts collapse vertically and horizontal padding is reduced.
- Frontend booking traffic should go through the ASP.NET Core API, not directly to n8n. The browser calls `/api/...`, and the API owns the actual webhook URLs.
- Local frontend development uses Vite proxying for `/api` to `http://localhost:5240`. Override the frontend base with `VITE_API_BASE_URL` only when the API is hosted on a different origin.
- Configure n8n webhook URLs on the backend in `api\EdgeRunners.Api\appsettings.Development.json` or equivalent environment configuration under the `N8n` section.
- If you add a new page, wire it in both `src/App.tsx` and `src/components/Layout.tsx` when it should appear in the primary navigation.
