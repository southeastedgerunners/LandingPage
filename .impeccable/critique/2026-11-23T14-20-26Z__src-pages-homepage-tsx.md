---
target: whole site (homepage primary)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx"
target_fingerprint: "sha256:da8008a4129875ee2cd23463d2dd4da29a465d65b24de1e95f75b1bdd5d94926"
target_path: /home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx
timestamp: 2026-11-23T14-20-26Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Fixed after review: errors now inline; caller number not stated |
| 2 | Match System / Real World | 3 | "Free intake", n8n, CRM still jargon |
| 3 | User Control and Freedom | 3 | Fixed after review: closing a dialog no longer loses input |
| 4 | Consistency and Standards | 3 | Title Case labels vs sentence-case headings |
| 5 | Error Prevention | 3 | Phone formatting, e.g. placeholders, optional fields marked |
| 6 | Recognition Rather Than Recall | 3 | Fixed after review: errors next to each field |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Service area and email repeated; long grey services block |
| 9 | Error Recovery | 3 | Email fallback, input kept |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **24/32** | **Good** |

## Design Specificity Verdict
Content specific (worked example, local copy); structure still the split-hero agency sequence. Detector: 1 advisory (intentional 16px input). Overlay: no anti-patterns on /, /privacy, /contact, dialog open. Audit 16/20.

## Priority Issues (remaining, need owner input)
- [P1] Trust gap: no founder photo, voice, or business phone number. shape + clarify.
- [P1] No cost / what-to-expect answers. clarify (owner-confirmed facts only).
- [P2] Layout still template-shaped; brand under-expressed after the hero; form behind a button rather than inline. layout (+ bolder within palette).
Fixed after this review: dialog input loss, disabled-submit a11y, focus after submit, route scroll/focus, input focus ring, 200% text overflow, text-link hit areas, per-route descriptions, orphaned service items.
