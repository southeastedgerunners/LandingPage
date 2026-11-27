# De-slop plan: SouthEast EdgeRunners site

Evaluation date: 2026-11-23. **Status: approved 2026-11-23 (all steps). Estimator to be removed.**

Inputs:
- `PRODUCT.md` and `DESIGN.md`, both written in this pass. DESIGN.md records the palette as locked, with cyan leading and pink rare.
- An Impeccable critique done by two independent reviewers: one design review, one detector plus browser measurements.
- An Impeccable audit covering accessibility, performance, theming, responsive behavior and implementation integrity.
- Screenshots at 1440px and 390px.

## Progress (2026-11-23)

All steps 0–10 have been run. The Estimator was removed first, at your request.

| Step | Status | Notes |
|---|---|---|
| 0 extract | ✅ | Tokens in `src/index.css`. Shared `Modal` on native `<dialog>`, `CallRequestForm` and `IntakeForm`, `SmsConsent` (single source for the compliance text), `lib/phone.ts`, `lib/contact.ts`, one `LegalPage.css`. Vitest set up. |
| 1 typeset | ✅ | Archivo variable font, self-hosted; condensed headings; one type scale; 65ch measure. |
| 2 layout | ✅ | New homepage structure, header with one CTA, footer with contact details and legal links. |
| 3 distill | ✅ | Stats, count-up, service cards, blobs, hero logo, legal side-stripe cards all removed. |
| 4 clarify | ✅ | Owner-language copy; errors with email fallback; missing-field hints; one-business-day promise. |
| 5 quieter | ✅ | Solid cyan buttons with charcoal text; no glows or gradients; pink only as the example's outcome marker; small radii. |
| 6 harden | ✅ | Dialog focus/Escape/return; inline contact pages; Tawk controls only after load; 404 page; per-page titles; meta; 15s submit timeout. |
| 7 adapt | ✅ | 44px targets; 320px header fixed; 16px inputs. |
| 8 animate | ✅ | One focal moment (the example log plays once); reduced-motion paths. |
| 9 optimize | ✅ | 2.4KB logo instead of 368KB; Tawk loads when the page is idle; favicon and touch icon. Route splitting skipped (82KB gzip JS is fine). |
| 10 polish | ✅ | Detector clean apart from one intentional 16px input size; DESIGN.md refreshed to describe the shipped system. |

### Scores after

| Check | Before | After |
|---|---|---|
| Critique (Nielsen, 2 n/a) | 17/32 | **24/32** (Good) |
| Audit | 12/20 | **16/20** (Good) |
| Detector findings | 3 (Inter, 2× side-tab) | 1 advisory (intentional 16px inputs) |
| Live overlay anti-patterns | 9 on home | **0** on /, /privacy, /contact, dialog |

Fixed after the re-check: dialogs keep typed input; send button stays enabled with inline per-field errors and focus on the first problem; focus kept while sending and moved to the success heading; new pages start at the top with focus on main; stronger input focus ring; 200% text no longer overflows; 44px hit areas on text links; per-page meta descriptions; no orphaned service items.

Remaining, needs owner input: founder photo and first-person intro; a business phone number; honest answers about cost and what happens on the call (FAQ or "what to expect"); whether to bring the call form inline instead of behind a button.

## Scores (before)

| Check | Score | Band |
|---|---|---|
| Critique (Nielsen heuristics, 2 n/a for a landing page) | **17 / 32** | Acceptable: significant work needed |
| Audit (a11y 2, perf 3, theming 2, responsive 3, integrity 2) | **12 / 20** | Acceptable |
| Cognitive load | 4 of 8 checks fail | High |
| Design specificity | **Category-interchangeable** | Swap the logo and it's any 2025 "AI automation agency" template |

## AI-slop tells

| Tell | Found? | Where |
|---|---|---|
| Generic font | **Yes** | `src/index.css:3` declares Inter but never loads it, so every visitor gets their system sans (Arial/Segoe/SF). |
| Gradient text | No | The hero accent is solid pink. |
| Colored side-border accent cards | **Yes** | Each Privacy section (7) and Terms section (8) has `border-left: 3px solid` cyan. See `PrivacyPolicyPage.css:43` and `TermsPage.css:43`. |
| Identical card grids | **Yes** | 4 stat cards, 3 step cards and 8 service cards, all the same rounded gradient box (`HomePage.css`). |
| Uniform fade-up entrances | Mostly no | There is no scroll-reveal. The related tells are the vanity count-up on the stats and the same 2–4px hover lift on every card, including cards you can't click. |
| Glassmorphism / glow overuse | **Yes (glow)** | Colored glows on both CTAs, the nav, stat/service/step cards, the logo (pink drop-shadow on a cyan logo), the success icon and the results total. Stat and service cards also have each other's shadow tint swapped. |
| Generic hero + three-feature-columns layout | **Yes** | Split hero with logo, then "By the Numbers", then a 3-step "How It Works", then an 8-card "What We Do". This is the template sequence, section titles included. |
| Stock-sounding marketing copy | **Yes** | Examples: "Automate your business. Grow faster.", "focus on growth", "built with purpose", "without lifting a finger", "run on autopilot", "crafted by real creatives", "running around the clock". |
| Emoji / icon filler | Minor | The 💬 chat-restore button. The pink radial blobs on the service cards fill the same decorative role. |
| Other | **Yes** | Invented stats (50+, 200+, 100%, 5x) animated as if real; gradient circle number badges joined by a gradient line; 135° two-stop gradient buttons; "→" on every CTA; 20–24px radius on every surface; generic section titles. |

## What's working (keep it)

- **The palette and logo.** The sharp cyan "ER" monogram on charcoal is distinctive. The palette isn't the problem; how it's spent is.
- **Form fundamentals.** Phone auto-formatting, correct `autoComplete` and labels, a 2-field call form, marked optional fields, visible SMS consent with a Privacy link, and input is kept after an error.
- **Body text contrast is comfortable**: #e6e6e6 is 11.3:1 and #b6b6b6 is 7.0:1 on charcoal.
- **No horizontal overflow** at 320px or 390px on any route.
- **Copy lives in one file** (`src/content/homePage.ts`), so a rewrite is cheap.

---

## Prioritized issues

Severity: **High** means it costs trust, conversion or accessibility now. **Med** means a noticeable problem or slop tell. **Low** means cleanup.

### High

| # | Where | What's wrong | Command |
|---|---|---|---|
| H1 | Home, "By the Numbers" (`HomePage.tsx:31-36, 44-86, 119-126`) | The stats are invented placeholders shown as fact, and they render "0+ / 0% / 0x" until scrolled into view. A new local company claiming "100% retention, 5x ROI" is the fastest way to lose a skeptical owner, and it breaks PRODUCT.md's honesty principle. | `/impeccable distill` removes the section and the count-up. `/impeccable clarify` replaces it with honest commitments (e.g. "free workflow review, no obligation", "you own what we build", a response-time promise). |
| H2 | Both modals (`CallRequestModal.tsx`, `IntakeFormModal.tsx`), `/contact`, `/quick-contact` | The dialog doesn't take focus. Tab reaches controls behind the overlay, Escape doesn't close it, focus isn't returned on close, and the page scrolls behind it. On `/contact` and `/quick-contact` the ✕, "Done" and overlay click do nothing. | `/impeccable harden`: use native `<dialog>` + `showModal()` with focus return. Render the standalone pages as normal page sections with an h1. |
| H3 | Global type (`src/index.css:3`, every page) | Generic font, and Inter never loads. Hierarchy is size-only, and the homepage H1 (max 2.6rem) is *smaller* than the legal page titles (2.75rem). | `/impeccable typeset`: pick a self-hosted face with character that suits the angular logo, set one scale for display, section, title, body and label, and cap prose at about 70ch (Privacy currently runs about 129 characters per line). |
| H4 | Home structure (`HomePage.tsx` whole page) | Template sequence. There are two equal-weight hero CTAs and none at the end, so the page ends on the weakest moment. Nothing says where you are or who you are. | `/impeccable layout`, in four parts. **1.** Make **Request a Call** the single primary; intake becomes a quieter secondary. **2.** Group the 8 services into 2–3 outcome groups (e.g. *Get found*: site, ads, branding; *Never miss a lead*: CRM/texting, automations, AI; *Get paid and reviewed*: QuickBooks, reviews). **3.** Replace the logo-as-hero-art with one concrete worked example (e.g. *missed call at 4:55pm → auto-text in 10s → booked*). **4.** Add a short "who we are / where we work" block and a closing CTA. |
| H5 | Copy (`src/content/homePage.ts`, hero, section titles, modal copy) | Stock marketing phrasing, and it leads with tools ("n8n", "CRM", "churn", "AI Applications") instead of the owner's day. That breaks PRODUCT.md's principle 3. | `/impeccable clarify`: outcome-first copy in plain owner language, with tool names in supporting lines. Rewrite "What We Do / How It Works / By the Numbers" as specific headings. |
| H6 | CTA and accent treatment (`index.css:43-82`, `HomePage.css:63-67, 89, 236, 307-315`, `Layout.css:62-72`, `EstimatorResultsPage.css:148-155`, `CallRequestModal.css:255`) | Glows, gradients and 2 accents at equal volume. Both accents fail as small text, and only pink accent usage is wrong. Measured failures: white on cyan button 2.5–2.9:1, white on solid pink 3.5:1, white on cyan step badges 2.48:1, pink "Last updated" 2.7:1, pink links 4.0–4.2:1. | `/impeccable quieter`: remove colored shadows and drop-shadows, and flatten gradients to solid fills. Fixes with **existing palette values only** are in "Color plan" below. Pink gets one moment per screen. Tighten the 20–24px radii toward the logo's angular geometry. |

### Medium

| # | Where | What's wrong | Command |
|---|---|---|---|
| M1 | Header nav (`Layout.tsx`) | The nav is Home, Privacy, Terms, Estimator, with no contact action. On a phone the four pills take two rows before the offer appears. | `/impeccable layout`: nav becomes brand + a "Request a Call" button. Privacy and Terms move to the footer; the compliance doc only requires the Privacy link inside the consent text, and it stays there. Estimator leaves the nav (see M8). |
| M2 | Privacy / Terms (`PrivacyPolicyPage.*`, `TermsPage.*`) | Side-stripe gradient cards on every section, a pink H1, cyan H2s and pink links: three accent roles on a legal page. The CSS files are duplicates. | `/impeccable distill`: plain readable document, no cards, one shared legal-page style. The legal text itself is unchanged. |
| M3 | Motion (`index.css:61`, `HomePage.css:124-129, 240, 298`, `Layout.css:66`, count-up) | The same hover lift is on everything, including non-clickable cards, implying affordances that don't exist. There's no `prefers-reduced-motion` handling anywhere. | `/impeccable animate`: remove hover lifts on non-interactive elements and the count-up. Keep short state feedback on real controls, add a reduced-motion path, and allow at most one purposeful motion: the worked example from H4 playing once. |
| M4 | Forms and errors (modals, `EstimatorPage.tsx:318-324`) | The error says "reach out directly" but gives no phone or email. The estimator shows a raw "Server error: 404". The submit button is disabled with no hint about which field is missing. Email is only checked for non-empty. Errors aren't announced to screen readers. | `/impeccable clarify` for the messages, `/impeccable harden` for validation, announcing errors with `role="alert"`, and the hint linked to its field. |
| M5 | Form field contrast (`CallRequestModal.css:116, 136, 177`, `EstimatorPage.css:132, 190`) | Placeholder 2.29:1. Hint and "(optional)" 3.19:1. Unchecked checkbox border 1.47:1, and that's the **required** SMS consent box. Error text 4.19:1. | `/impeccable harden`, using existing Ash (#b6b6b6) for hints, placeholders and borders. |
| M6 | Footer (`Layout.tsx:55`, `Layout.css:85, 103`) | 10px text at 4.1:1. Terms is linked but Privacy isn't. No phone, email or service area. | `/impeccable layout` for footer content, `/impeccable harden` for size and contrast. |
| M7 | Tawk chat (`TawkWidget.tsx`, `TawkWidget.css`, `index.html:11-21`) | "✕ Hide chat" renders even when Tawk fails to load, floating over content on mobile at a 24px tall target. The restore button is a 💬 emoji. Chat is a third contact path competing with two CTAs. | `/impeccable harden`: render the controls only after `Tawk_API.onLoad` and replace the emoji. `/impeccable optimize`: lazy-load Tawk after first interaction or idle. |
| M8 | Estimator (`/estimator`, `/estimator/results`) | Off-message: a DIY materials calculator in the main nav of an automation/website company. It also sends 0 values to the server and loses results on refresh. You said it's an experiment. | Minimal effort. Move it out of the nav (footer link or unlisted). `/impeccable harden` only for its validation and error states. It inherits the global quieter/typeset passes for free. **Your call: keep unlisted, or remove.** |
| M9 | Mobile (`HomePage.css:195-197` vs `344-346`) | Cascade bug: the later 720px rule overrides the 560px one-column rule, so service cards are 140px wide at 320px. The hero logo sits mid-page. The modal close button is 32px. | `/impeccable adapt` |
| M10 | Hero logo (`src/assets/SouthEasternEdgeRunners.png`) | A 1024², 368KB PNG shown at 140–260px. It's the LCP element, has no width/height, and weighs more than all the JS and CSS combined. It also duplicates the header brand. | `/impeccable optimize`: SVG or a ~520px WebP with dimensions. Whether it stays in the hero at all is decided in H4. |
| M11 | Every route (`index.html`) | Same `<title>` on every page. No meta description, OG tags or favicon. No h1 on `/contact`, `/quick-contact` or the empty results state. | `/impeccable harden` |

### Low

| # | Where | What's wrong | Command |
|---|---|---|---|
| L1 | All CSS | 108 hard-coded color literals, 51 of them retyped alpha variants of the two accents. Duplicate legal CSS. `formatPhone` and the modal shell are duplicated. | `/impeccable extract`: accent alpha tokens, text-role tokens, one modal shell, one legal stylesheet. |
| L2 | Hero H1, success copy | A forced `<br>` makes an awkward desktop break. "shortly." strands alone on the last line. Success says "shortly" with no business-hours framing. | `/impeccable clarify`, then `/impeccable polish` |
| L3 | `HomePage.css:48-54` | Dead CSS (`.hero__note`, `.hero__tally-link`). | `/impeccable polish` |
| L4 | Bundle | One JS chunk with no route splitting. It's 82KB gzipped, so this is minor. | `/impeccable optimize` (optional) |

### Not design work: flagged for you

- **Compliance copy (review it, don't let a design pass change it):**
  - The Privacy page says SMS opt-in comes from the "Request a Call" form, but the Intake form collects it too (`PrivacyPolicyPage.tsx:67`).
  - Terms repeats the "Message and data rates" sentence (`TermsPage.tsx:38-39`).
- **Untracked folder from this evaluation:** the browser tool left screenshots and console logs in `.playwright-mcp/` (56 files) in the project root. It isn't in `.gitignore`. Safe to delete; I'll leave it until you say.

---

## Color plan

**Default: no new colors.** Every contrast failure above can be fixed with the existing values by changing how they're used:

| Use | Locked-palette fix | Ratio |
|---|---|---|
| Primary button (Request a Call) | Solid Edge Cyan `#00b5c9` with Shop Charcoal `#2b2b2b` text, no gradient or glow | 5.7:1 ✅ |
| Secondary button, if kept filled | Solid Runner Pink Deep `rgb(180,0,90)` (already in the palette as the gradient end) with white text | 6.8:1 ✅ |
| Step badges / cyan chips | Charcoal text on cyan, or a cyan outline with cyan numeral | 5.7:1 ✅ |
| Runner Pink as text | Only at large display size (≥24px, or ≥18.7px bold), e.g. the one hero accent word. Never for links, dates or labels. | 4.04:1 (passes large only) |
| Links in body / legal text | Edge Cyan | 5.7:1 on charcoal ✅ |
| Hints, placeholders, footer, checkbox borders | Ash `#b6b6b6` | 6.0–7.0:1 ✅ |
| Pink as non-text accent | Borders, underlines, a small mark, the one highlight per screen | ≥3:1 ✅ |

**Optional proposals.** You said you like the palette, so these are only for you to weigh. Each is an *addition* that fills a gap; none replaces anything.

1. **Runner Pink Light `#ff6aa8`**, a lighter tint of the same pink. It lets pink work as small text or links (5.3:1 on charcoal, 4.6:1 on raised charcoal). Only worth adding if you want pink links or pink small labels; otherwise skip it and keep pink large-only.
2. **Night Charcoal `#232323`**, one step darker than the background, for alternating section bands. It gives the homepage rhythm without boxing everything in cards (body text 12.6:1 on it).

Recommendation: skip #1 (keeping pink large-only reinforces "pink is rare") and consider #2 when the layout pass runs.

Commands **not** used and why:
- **colorize:** the palette is locked, and the site isn't under-colored.
- **bolder:** the problem is too loud, not too safe.
- **overdrive:** wrong direction for a trust-first local business site.

---

## Execution order

Each step is one `/impeccable` run. Review after each.

| Step | Command | Scope | Fixes |
|---|---|---|---|
| 0 | `/impeccable extract` | Tokens: accent alpha variants, text-role tokens; one modal shell; one legal stylesheet | L1. Runs first so later passes edit tokens, not 108 literals. |
| 1 | `/impeccable typeset` | Global font, scale, legal-page measure | H3, part of M2 |
| 2 | `/impeccable layout` | Homepage structure, CTA hierarchy, nav, footer | H4, M1, M6 (content) |
| 3 | `/impeccable distill` | Remove stats and count-up, service-card blobs, legal side-stripe cards, duplicate hero logo | H1 (removal), M2 |
| 4 | `/impeccable clarify` | All homepage copy, section headings, commitments block, modal and error copy | H1 (replacement), H5, M4 (copy), L2 |
| 5 | `/impeccable quieter` | Glows, gradients, pink usage, button and badge contrast, radii | H6 |
| 6 | `/impeccable harden` | Modals → `<dialog>`, contact pages, form contrast and validation, Tawk controls, titles/meta/h1s, estimator validation | H2, M4, M5, M6 (contrast), M7, M8, M11 |
| 7 | `/impeccable adapt` | Mobile cascade bug, touch targets, mobile hero | M9 |
| 8 | `/impeccable animate` | Remove decorative motion, add reduced-motion, one purposeful moment | M3 |
| 9 | `/impeccable optimize` | Logo asset, lazy Tawk, optional route split | M10, M7 (perf), L4 |
| 10 | `/impeccable polish` | Final pass, then re-run critique and audit to compare scores | L2, L3 |

Typeset and layout come before the copy passes so the copy is written for the new structure. Quieter runs after the content passes because some glowing elements will already be gone by then. Harden runs once the components are in their final shape.

## Open questions for you

1. **Founder / local block:** ✅ Jaron Singley, serving Southeastern Kentucky and surrounding areas. Photo: still open (the block works without one).
2. **Contact details:** ✅ southeast.edgerunners@gmail.com, shown in the footer and in form error messages.
3. **Estimator:** ✅ Remove it (pages, route, Netlify function).
4. **Response-time promise:** ✅ Within one business day.
5. **Optional colors:** ✅ Neither. Palette stays exactly as is.
