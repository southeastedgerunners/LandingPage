---
version: 1
slug: "paper-sample-pages-auto-2"
primary_target: "paper/sample-pages/auto-2"
related_targets: []
---

# Hollan's Garage · carbon work order

Scope: Paper page "Auto 2 · Hollan's Garage (work order)" (pageId p-6-0). Persuade mode. Sample landing page for a fictional business, shown by SouthEast EdgeRunners to prospective clients.

Audience: an older or budget-minded driver in Southeastern Kentucky who has been burned by surprise repair bills, reading on a phone. Job: believe this garage prices honestly. Action: start a repair order (working form) or call.

## Direction contract

THESIS: The page is a filled-out carbonless repair order. Every price is a line item and nothing gets fixed until you sign. Refuses the category default of a stock bay photo, trust badges and a "Why choose us" card row.

OWN-WORLD: Canary carbonless paper #F7E68A as the drenched ground of the whole page. The printed form is one ink, near-black #1C1A14: ruled boxes, field labels in small caps, a numbered header. Handwritten entries in ballpoint blue #2340A8 in a legible handwriting face. One red rubber-stamp moment per screen, stamp red #C4162A, slightly rotated with an inked, uneven edge. A red numbering-machine serial "No. 04417". Perforated tear lines (dashed rules with half-circle punch marks) separate the form copies, which are the page sections. Square corners and 1px or 2px ruled boxes. No shadows except a faint carbon smudge where it earns it.

STORY: The visitor reads a repair order that already has their problem written on it, sees the shop's real prices as line items, reads friendly fine print (we keep your old parts on the seat, we call before anything over the estimate), and starts their own repair order.

FIRST VIEWPORT (390x844): Status bar. The form header: HOLLAN'S GARAGE, "Family owned since 1978", the address and phone printed small, and the red serial No. 04417 at right. Three filled fields in handwriting: Customer "You", Vehicle "The one making that noise", Concern "Grinding when I brake". Printed headline about 38px: "Nothing gets fixed until you say so." A red stamp "WE CALL FIRST" overlapping the field block. Primary button as a solid ink box: "Start a repair order". Secondary: "Call (606) 555-0187".

FORM: Candidate 1 of 7 on my ranked list (carbon work order, chosen by the user as the second direction). seed:98586935f277b200

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
Note: these are Paper samples, not part of the EdgeRunners site. Their design notes live in this brief. The repo's DESIGN.md stays untouched.

## Content

- Name: Hollan's Garage. 88 Mill Road, Laurel Gap, KY (fictional town). (606) 555-0187.
- Hours: Mon to Fri 8 to 5. Closed weekends, "we go fishing".
- Line items (Description · Labor hrs · Amount): Oil and filter change · 0.5 · $45.00. Front brake pads · 1.5 · $189.00. Check-engine diagnosis · 1.0 · $85.00, credited if we do the repair. Tire rotation · 0.5 · $25.00. Battery test · none · No charge. Summary line: "Total: you approve it before we start."
- Fine print (friendly): We call before any work over the estimate. Your old parts go in a box on the passenger seat. If it's not worth fixing, we'll tell you.
- Signature line: "Customer approval ______" with a handwritten signature.
- The working form is the "customer copy" at the bottom: name, phone, vehicle, what's wrong, best day to drop it off, submit "Send my repair order".
- About: Dale Hollan opened in 1978, his daughter Renee runs it now (fictional).
- Footer: address, hours, phone, and "Sample site for a fictional business. Designed by SouthEast EdgeRunners."

## Design notes (as built, 2026-11-27)

Status: finish review ship after one fix round. Paper artboards "Phone · 390" and "Desktop · 1440" on page p-6-0.

- Type: Libre Franklin (700 to 900) for the printed form. Kalam for ballpoint entries (19 to 23px phone), Kalam Light #4760B4 for placeholder hints (4.62:1). Homemade Apple for the "You" signature only. Serial numbers are drawn numbering-wheel digits based on Oswald SemiBold.
- Color: canary #F7E68A, form ink #1C1A14, ballpoint #2340A8, stamp red #C4162A with no blend mode.
- Stamps (WE CALL FIRST, NO CHARGE) and serials are SVG from stamp.py (scratchpad, not durable): glyph outlines unioned with the frame as one path, one wear pass with eroded edges, a wet-to-dry density field and real voids. Paper stores the SVGs in the file's own assets.
- Changes from the contract: two stamps, not one per screen (hero and table). The EST. 1978 stamp was removed in review. The customer copy shows placeholder hints, not a stranger's filled order.

## Recolor (2026-11-27, user request)

The user disliked the canary yellow and asked for off-white paper. This supersedes the canary in OWN-WORLD and the notes above. Ground #F2F0EA (the white top copy of the order). Form ink #1C1A14, ballpoint #2340A8, Kalam Light hints #4760B4 (now 5.12:1) and stamp red #C4162A are unchanged. Paper-colored text on ink buttons and table heads follows the ground. The footer ply note reads "WHITE: CUSTOMER COPY". The stamp SVGs carry only red, so they were not regenerated. Checked by me against the export; no Impeccable review, since only the ground changed and every contrast rose.
