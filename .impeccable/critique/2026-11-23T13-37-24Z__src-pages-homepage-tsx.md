---
target: whole site (homepage primary)
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx"
target_fingerprint: "sha256:807f18cba63b667efb412a1f995b6e5c13b49c608edfe8d97c058b0af1d2cce6"
target_path: /home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx
timestamp: 2026-11-23T13-37-24Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Submit disabled with no hint of what's missing |
| 2 | Match System / Real World | 2 | Tool jargon leads (n8n, CRM, churn) |
| 3 | User Control and Freedom | 2 | No Escape on modals; /contact and /quick-contact close does nothing |
| 4 | Consistency and Standards | 2 | Cyan vs pink buttons have no fixed meaning; H1 color changes per page |
| 5 | Error Prevention | 2 | Estimator sends 0 values; email only checked non-empty |
| 6 | Recognition Rather Than Recall | 3 | Labels visible; disabled-submit guessing |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | Glows, gradient blobs, placeholder stats compete |
| 9 | Error Recovery | 1 | "Reach out directly" with no contact info; raw "Server error: 404" |
| 10 | Help and Documentation | n/a | Marketing surface |
| **Total** | | **17/32** | **Acceptable** |

## Design Specificity Verdict
Category-interchangeable: dark + neon, split hero with glowing logo, count-up stats, 3-step gradient badges, 8 identical service cards. Nothing local, no person, no worked example. Detector: overused-font (Inter, declared but never loaded), side-tab x2 (privacy/terms CSS:43); overlay adds dark-glow, low contrast on cyan CTA (2.9-3.8:1), step badges (2.48:1), footer (4.1:1 at 10px), placeholders (2.3:1), pink small text (2.7-4.2:1).

## Priority Issues
- [P0] Placeholder stats presented as fact (HomePage.tsx:31-36). clarify + distill.
- [P1] Modals: no focus move/trap, no Escape, no focus return, no-op close on /contact and /quick-contact. harden.
- [P1] Homepage generic and tool-first, no closing CTA, no locality/person. layout + clarify + distill.
- [P1] Two equal glowing CTAs, white-on-cyan and pink small-text contrast failures, colored glows everywhere. quieter.
- [P2] Mobile: legal pages in nav, services grid cascade bug (2 cols at 320px), orphan Hide chat pill. adapt.

## Persona Red Flags
Local owner: sees jargon, suspicious of 100% retention, finds no phone/email/person. Mobile: 4 nav pills before offer, no bottom CTA. Keyboard: focus stays behind modal overlay.
