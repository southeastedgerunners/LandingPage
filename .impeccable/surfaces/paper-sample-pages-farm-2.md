---
version: 1
slug: "paper-sample-pages-farm-2"
primary_target: "paper/sample-pages/farm-2"
related_targets: []
---

# Sundog Farm Collective · psychedelic poster

Scope: Paper page "Farm 2 · Sundog Farm Collective (poster)" (pageId p-2-0). Persuade mode. Sample landing page for a fictional business, shown by SouthEast EdgeRunners to prospective clients.

Audience: locals of all ages who come to the Saturday farm stand, and newer folks who want a weekly box from a fun, hippie collective farm. Job: feel the farm's spirit and know when to show up. Action: get a weekly box (working sign-up) or come to the Saturday stand.

## Direction contract

THESIS: The page is a late-1960s concert poster for the farm. The weekly box, the stand hours and the farm days are billed like a show. Refuses the category default of kraft paper, cream, a rustic serif, sage green and big vegetable photos.

OWN-WORLD: Vibrating complementary color as the whole page: a hot tangerine ground #FF6A13 with electric violet #6A2BD9 lettering, and hot pink #FF3FA4 as the third ink for small moments. A sundog halo behind the headline: concentric rings in alternating violet and pink, with the two bright "sundog" spots flanking the sun on the halo. Lettering is the hero: a psychedelic display face with swelling, melting forms, set huge and tight, with one wavy baseline moment drawn as SVG only if a face can't do it. Body copy is set plainly in a sturdy, legible sans so the poster still reads. Show-bill grammar: "presents", "with", "plus", "tour dates", ticket stubs with perforated edges. Every text block must pass 4.5:1 (violet on tangerine is roughly fine for large text only, so set body in a near-black violet #2A0E5C or on a violet panel).

STORY: The visitor gets the vibe in one look, reads this week's box billed like a lineup, sees the Saturday stand time and the farm days as tour dates, and grabs a box with the ticket-stub form.

FIRST VIEWPORT (390x844): Status bar. Top billing in small caps: "Sundog Farm Collective presents". A huge melting headline: "Fresh Vegetables" filling the width over the halo sun. The bill line: "Every Saturday at the farm stand · 9 to 1 · Weekly box $28". A primary violet button with white text: "Get a weekly box". Secondary: "Directions to the stand".

FORM: Candidate 1 of 7 on my ranked list (psychedelic poster, chosen by the user as the second direction). seed:5d733dbcb4f1f169

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
Note: these are Paper samples, not part of the EdgeRunners site. Their design notes live in this brief. The repo's DESIGN.md stays untouched.

## Content

- Name: Sundog Farm Collective. 77 Rainbow Ridge Lane, Cane Fork, KY (fictional town). (606) 555-0176. Five friends, 12 acres, no sprays, a lot of mulch (fictional).
- This week's lineup (the box): Headliner: Candy Roaster Squash. With: Lacinato Kale, Purple Garlic, Sweet Potatoes. Plus special guest: Sorghum Syrup.
- Tour dates (date · event · place): Sat Dec 5 · Farm stand · the barn. Sat Dec 12 · Wreath-making and cider · the barn. Mon Dec 21 · Solstice bonfire and potluck · the back field. Sat Jan 16 · Seed swap · Cane Fork Library.
- Weekly box: $28, picked up at the Saturday stand, or $32 delivered within 15 miles. Pause anytime. Bring your bag back and we'll refill it.
- Ticket-stub sign-up: name, phone, pickup or delivery, start date, submit "Save my spot".
- The collective: a short paragraph in their voice, warm and a bit goofy, no forced slang. One honest line like "We'd rather feed our neighbors than ship anything."
- Footer: address, phone, stand hours, and "Sample site for a fictional business. Designed by SouthEast EdgeRunners."

## Design notes (as built, 2026-11-27)

Status: finish review ship after two fix rounds. Paper artboards "Phone · 390" and "Desktop · 1440" on page p-2-0.

- Type: Chicle for all display lettering (chosen from 21 rendered candidates for its swelling, melting strokes that stay readable at phone size). Chivo (400 to 800) for body and show-bill labels.
- Color: tangerine #FF6A13 ground, violet #6A2BD9 for the button, rings and box section, pink #FF3FA4 as the third ink. Changes from the contract: the headline is #4A10B8 because #6A2BD9 on tangerine is 2.47:1; pale sun #FFF0C8 added for the sun disc, ticket body and light text on violet.
- "Vegetables" bends along the lower halo. Paper does not render SVG textPath, so each letter is its own rotated Chicle text node, placed by arc_letters.py and applied with arc_payload.sh (scratchpad, not durable). Chicle's F drops about 23px below its baseline, which is why "Fresh" sits high in the sun disc to keep a clear gap to the V.
- Drip dividers overlap 2px into the section above to hide join seams.
- Invented policy and claims were removed in review. Paper quirks: write_html drops position:absolute on children; Paper rotates about the top-left corner whatever transformOrigin says.

## Recolor (2026-11-27, user request)

The user asked to change the orange and purple to #FFD58E and #52B3B6. This supersedes the tangerine and violet in OWN-WORLD, FIRST VIEWPORT and the notes above. Ground and light sections #FFD58E. Button, halo rings, box section and selected option #52B3B6, with an inset 2px #0E676B ring where the fill alone is under 3:1. Display headline and other display type deep teal #0E676B (4.78:1). The old near-black violet #2A0E5C (body ink, lineup and footer bands) became near-black teal #0B2B2D. Text on #52B3B6 is #0B2B2D. Sun disc and ticket #FFF6E0, framed by the pink inner ring. Sundog rays pink #FF3FA4. Special guest "Sorghum Syrup" #52B3B6 so the billing tier reads. Finish review: fix (that guest tier), then fixed.
