---
version: 1
slug: "paper-sample-pages-salon-2"
primary_target: "paper/sample-pages/salon-2"
related_targets: []
---

# Little Lacquer · swatch fan

Scope: Paper page "Salon 2 · Little Lacquer (swatch fan)" (pageId p-4-0). Persuade mode. Sample landing page for a fictional business, shown by SouthEast EdgeRunners to prospective clients.

Audience: women of any age in a small Kentucky town who want a reliable regular salon and care about picking the right color. Job: see the shades, choose one, and book. Action: book an appointment with a shade already picked (the fan is the first step of the booking form).

## Direction contract

THESIS: The page is the salon's swatch fan. Every shade is a glossy tip on a riveted fan, named and numbered, and picking one starts your booking. Refuses the category default of blush and beige, a thin serif and soft photos of hands.

OWN-WORLD: Pure white #FFFFFF ground, like the white plastic of a swatch fan. Color lives only in the tips, which are glossy, saturated and opaque, each with a small white highlight streak, and together form the whole palette: Redbud Pink #E0387A, Cumberland Plum #5B1F4A, Moonbow Mint #8FD9C2, Coal Seam #1A1A1D, Bourbon Barrel #8A3B12, Sorghum Gold #D9A320, Dogwood White #F3EFE8, Creek Blue #2F6FB3. Text is ink #141414. Each tip carries a tiny printed label: shade number and name in small caps. A metal rivet at the fan's pivot. The selected shade becomes the page's accent: its button, its active chip and its highlight. A display face with a point of view (wide or high-contrast grotesk, not a soft serif) and a clear sans for body.

STORY: The visitor fans through the shades, taps one (the comp shows Moonbow Mint selected and pulled out of the fan), sees the services and prices, and books with that shade.

FIRST VIEWPORT (390x844): Status bar. Wordmark "Little Lacquer" small at top left, "Book" text link right. Headline: "Pick a shade. We'll do the rest." The fan dominates: eight tips fanning in an arc from a rivet near the lower left, about 340px wide. Moonbow Mint is pulled out and enlarged, with its label "No. 07 Moonbow Mint, named for the falls". Under the fan: "Moonbow Mint, gel manicure, $40" and a full-width button in mint with ink text: "Book with Moonbow Mint".

FORM: Candidate 1 of 7 on my ranked list (swatch fan, chosen by the user as the second direction). seed:3703b1dfcb0c7ea8

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
Note: these are Paper samples, not part of the EdgeRunners site. Their design notes live in this brief. The repo's DESIGN.md stays untouched.

## Content

- Name: Little Lacquer. 402 Cumberland Avenue, Laurel Gap, KY (fictional town). (606) 555-0129.
- Hours: Mon to Fri 9 to 6. Sat 9 to 3.
- Services (service · time · price): Classic manicure · 30 min · $25. Gel manicure · 45 min · $40. Classic pedicure · 45 min · $38. Gel pedicure · 60 min · $50. Dip powder · 60 min · $45. Polish change · 15 min · $12.
- Shade of the month: Moonbow Mint, named for the moonbow at Cumberland Falls (a real natural landmark, fine to reference).
- The house rule: "Can't decide? We keep the whole fan at the front desk. Take your time."
- Booking block: shade (selected), service, day and time chips, name, phone, "Book my appointment".
- Three short regulars' notes are NOT allowed (no invented testimonials). Use a "What to expect" list instead: we sanitize every tool between clients, we'll tell you how long it will last, we text a reminder the day before.
- Footer: address, hours, phone, and "Sample site for a fictional business. Designed by SouthEast EdgeRunners."

## Design notes (as built, 2026-11-27)

Status: finish review ship after two fix rounds. Paper artboards "Phone · 390" and "Desktop · 1440" on page p-4-0.

- Type: Unbounded (600 to 800) for display, wordmark and prices. Hanken Grotesk for body, labels and controls. Sofia Sans Extra Condensed (500, 700, caps) for the labels printed on each stick and for day numerals.
- Color: white ground, ink #141414, the eight shade colors from the contract. The selected shade (Moonbow Mint #8FD9C2) drives the button, selected chips and highlight. Selected chips carry a 1.5px #2E8C70 border (4.12:1 on white) so the state does not rely on color alone. Link underlines are #3FAE8D, because #8FD9C2 is too faint as a 2px line.
- The fan, the booking stick row, the shade-of-the-month stick and the desktop recap stick are SVG from fan.py and build_round1.py (scratchpad, not durable). build_round1.py refuses output that breaks the 20px margin or puts the note closer than 12px to the stick.
- Changes from the contract: the stick reads "NO. 07 MOONBOW MINT" and the hero note is only "named for the falls". The booking shade step is an upright row of all eight sticks, not a field.
- Paper quirks: changing a frame's border resets the `right` offset of its absolutely positioned children (the chip gloss streaks), so recheck them after any border edit. PNG exports are tagged Display P3, so convert samples to sRGB.

## Recolor (2026-11-27, user request)

The user found the white ground hard on the eyes and asked for light grey. This supersedes "white ground" above. Ground #E2E2E0. Row and footer hairlines #C7C7C5 (the old #E2E2E2 would vanish). Unselected chip and input borders #767676 (3.50:1; the old #8A8A8A failed at 2.66). Link underlines #37977A. Ink, the eight shades, Moonbow Mint #8FD9C2 and the selected border #2E8C70 (3.17:1) are unchanged. Stick stems stay white, which lifts the sticks off the grey. Gloss streak offsets were read back unchanged.
