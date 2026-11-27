---
target: the whole site after mobile-first conversion
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx"
target_fingerprint: "sha256:2ce5aa27150ea3fbe59c501ce733d73e8e128a72e030a12d5f87c17d2ae8183d"
target_path: /home/izaya/EdgeRunners/LandingPage/src/pages/HomePage.tsx
timestamp: 2026-11-27T18-14-35Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A: design review from source and screenshots; B: detector and headless browser). Run after the mobile-first CSS conversion, which kept rendering pixel-identical.

## Design health score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Phone intake dialog gives no cue that consent and submit are below its fold |
| 2 | Match system / real world | 3 | "Free intake", CRM, n8n, lead funnels unexplained |
| 3 | User control and freedom | 3 | Intake dialog close button scrolls out of view on phones |
| 4 | Consistency and standards | 3 | Mixed label case; round success check; service columns misalign between groups |
| 5 | Error prevention | 3 | SMS requirement explained only after a failed send |
| 6 | Recognition rather than recall | 3 | Phone call action only at top and ~4,000px later |
| 7 | Flexibility and efficiency | n/a | Landing page |
| 8 | Aesthetic and minimalist design | 3 | Uniform services list; dead strips in the tablet band |
| 9 | Error recovery | 4 | Specific messages, focus to problem, email fallback, input kept |
| 10 | Help and documentation | n/a | "Before you call" answers are placeholders |
| Total | | 25/32 (78%) | Good |

## Design specificity
Honest and competent. The worked example is authored (606 number, roof, square markers, single pink Booked). The rest is the stock agency section order with one repeated section move. On phones the first screen is the generic headline and a 6-line lead; the example starts at y=562 at 375px and its load-time animation has finished before it is seen.

Detector: exit 0, one advisory design-system-font-size at src/components/forms.css:92 (false positive: 16px stops iOS zoom). Overlay: two straggler lines in the services list (375 and 1280). No overflow, no settled contrast failures.

## Priority issues
- [P1] Phone first screen is generic; the example animates unseen. Fix: start log on scroll into view, raise phone display size, shorten heroLead (copy: owner call). /impeccable animate, /impeccable clarify.
- [P1] No call action for ~3,300px on phones; nothing in thumb reach. Fix: phone-only bottom action bar. /impeccable adapt.
- [P2] Tablet band 561-900 is a stretched phone layout; seam at 901; email breaks mid-word at 901/1024 (overflow-wrap: anywhere). Fix: container-query the example, 721 tier for process and about, break email at @. /impeccable adapt, /impeccable layout.
- [P2] Services is a uniform 1,300px list on phones; h2 28px vs h3 24px; auto-fit misaligns columns. /impeccable typeset, /impeccable distill.
- [P2] Long intake form opens as a floating dialog on phones. Fix: full-screen sheet with sticky close below 561. /impeccable adapt.

## Persona red flags
- Jordan: unexplained jargon; cost and first-call answers are placeholders.
- Riley: email breaks mid-word; "Request a Call" three times on /quick-contact.
- Casey: no call action between y=461 and y=3,760; dialog in a dialog with keyboard up.
- Local roofer: hook line not on first screen; face and number are placeholders.

## Minor observations
Standalone links under 24px (404 "Go to the homepage", about email). Legal pages ~80 chars/line (65ch). Closing panel padding at 320. Wrapped placeholder splits into two boxes. caret-color unset. 404 has no call action. PRODUCT.md is stale on Tawk and stats.

## Questions
- Should the worked example be the phone hero?
- When the phone number arrives, should "Call" lead?
- Should the thread-and-square motif carry into process steps and success?
