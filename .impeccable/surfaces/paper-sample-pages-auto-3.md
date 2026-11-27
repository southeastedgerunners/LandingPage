---
version: 1
slug: "paper-sample-pages-auto-3"
primary_target: "paper/sample-pages/auto-3"
related_targets: []
---

# Tolliver Tire & Wrecker · feed-store corkboard

Scope: Paper page "Auto 3 · Tolliver Tire & Wrecker (corkboard)" (pageId p-7-0). Persuade mode. Sample landing page for a fictional business, shown by SouthEast EdgeRunners to prospective clients. The user asked for a third auto shop that feels "more redneck/southern".

Audience: rural Southeastern Kentucky folks with a work truck, a farm truck, a tractor or a mower that quit, reading on a phone after a neighbor sent the link. They want a fair shop that answers the phone and doesn't talk down to them. Job: see what they fix and what it costs, then grab an open time. Action: tear off a tab (book an open time slot) in the first viewport, or call the wrecker.

## Direction contract

THESIS: The page is the corkboard by the register at the feed store, and the shop's flyer is pinned on it. The open times are the tear-off tabs along the flyer's bottom, and tearing one off books it. Refuses the category default for a country garage: camo, diamond plate, rusty stencil type, a truck photo with a "Why choose us" row.

OWN-WORLD: Cork drenches the page, #B5824F with drawn darker #8E5F33 and lighter #CFA06C speckle. All text sits on paper pinned to it, never on bare cork. The shop flyer is bright white copy paper (#FFFFFF, not cream), hand-lettered in black marker #151515 with red marker #C8202A for prices and the one thing that matters. Around it, at most two neighbor items at a time: a lined index card, a business card, a sheet of neon copy paper (one hue, bright green #9BE15D). Hardware: round pushpins (red, blue, white) drawn with a small highlight and a soft cast shadow, one strip of silver duct tape #A7A9AC with torn ends. Papers sit slightly rotated (no more than 2 degrees) and cast a soft short shadow on the cork. The tear-off fringe: narrow vertical tabs with cut lines between them, each with a day, a time and the phone number; taken times are torn off, leaving a ragged stub. A bold marker hand for headlines and a plain, legible hand or a printed face for body and prices.

STORY: The visitor sees a flyer from a shop that fixes anything that rolls, reads plain prices, sees open times this week as tabs, and tears off one to book. Further down: what they work on, the price list, the wrecker, the booking details, how to find the place.

FIRST VIEWPORT (390x844): Status bar over cork. The flyer fills about 88% of the width, pinned at its top corners, tilted about -1 degree. On it, top to bottom: wordmark TOLLIVER TIRE & WRECKER in marker caps; headline about 40px "If it rolls, we'll fix it."; one line "Trucks, cars, tractors, mowers and the four-wheeler."; three red-marker price lines (Oil change $39, Flat fixed $15, Mower tune-up $60); then the tear-off fringe with six tabs for Tuesday (8:00, 9:30 torn, 11:00 selected and pulled half loose, 1:00, 2:30 torn, 4:00). Below the flyer on the cork: a full-width, plainly clickable primary button "Book Tuesday 11:00" and a secondary "Wrecker: (606) 555-0134". The index card "FRESH EGGS $4 A DOZEN" peeks in behind the flyer's top right.

FORM: Candidate 6 of 7 on my ranked list (feed-store corkboard with a tear-off flyer, chosen by the user from a degraded roll with no challengers). seed:c747fcd7b85e62dc

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
Note: these are Paper samples, not part of the EdgeRunners site. Their design notes live in this brief. The repo's DESIGN.md stays untouched.

## Hard rules for this page

- Country and funny, never mocking. The joke is on the trucks and the mowers, not on the people.
- Loaded symbols stay out: no Confederate flag or its colors as a motif, no rebel imagery, no guns, no beer, no camo pattern, no real brands (no real feed store, tire brand or dollar-store name).
- Use only the facts below. Do not invent policies, guarantees, years in business, awards or extra services.

## Content

- Name: Tolliver Tire & Wrecker. 1902 Turkey Creek Road, Cane Fork, KY (fictional town). (606) 555-0134. Run by Darrell Tolliver and his daughter Kayla (fictional).
- Hours: Mon to Fri 7 to 5. Sat 7 to noon. Closed Sunday. Wrecker answers day or night.
- Headline: "If it rolls, we'll fix it." Sub: "Trucks, cars, tractors, mowers and the four-wheeler."
- Price list (the second pinned sheet, lined notebook paper or a printed list): Oil change, conventional · $39. Oil change, full synthetic · $69. Flat repair · $15. Mount and balance · $15 a tire. Brakes · from $129 an axle. Check engine light read · $40, counts toward the fix. Mower or small engine tune-up · $60. Wrecker hookup in Cane Fork · $85.
- What we work on (one sheet or card): pickups and work trucks, cars and vans, farm tractors, riding mowers and push mowers, four-wheelers and side-by-sides. "If you can drive it in or we can drag it in, bring it."
- Wrecker: a business card. "Broke down? Call the wrecker." (606) 555-0134. "Day or night. Kayla answers if Darrell's under a truck."
- Booking block further down: day tabs Tue to Sat this week, open-time tear-off tabs per day (some torn), what it is (pickup, car, tractor, mower, four-wheeler) with one selected, name and phone fields, "Book it". A line: "We'll text you back to confirm." is NOT allowed (unconfirmed feature); use "We'll call you back to confirm." only.
- Finding us: "On Turkey Creek Road, a mile past the blue water tower. Big gravel lot, pull right up."
- Payment line: "Cash, card, or a check if we know you."
- Neighbor items (decor, fictional): index card "FRESH EGGS $4 A DOZEN. Ask at the register."; a green neon sheet "4-H BAKE SALE · SATURDAY · 9 TO 1" (use only below the first viewport, once).
- Footer (on a last pinned strip or card): address, hours, phone, and "Sample site for a fictional business. Designed by SouthEast EdgeRunners."

## Design notes (as built, 2026-11-27)

Status: finish review ship after one fix round. Paper artboards "Phone · 390" and "Desktop · 1440" on page p-7-0.

- Type: Permanent Marker for wordmark, headlines, prices and tab times (its ampersand reads as a plus, so every "&" in a marker line is set in Patrick Hand). Patrick Hand for body, lists, the egg card and filled form values. Atkinson Hyperlegible for buttons, the wrecker card, address and footer.
- Color: cork #B5824F with #8E5F33 and #CFA06C speckle, white copy paper, black marker #151515, red marker #C8202A, duct tape #A7A9AC, neon green #9BE15D for the bake sale sheet.
- Drawings come from scratchpad scripts (not durable): gen.py (cork tile, pins, tab stubs, tape, tow truck), fringe.py, prices.py, map.py. The cork is one 240px tile repeated.
- Changes from the content list: the flyer adds "Open times Tuesday. Tear one off." above the tabs. The sample customer number is (606) 555-0195. Review fixes: the tow truck got a boom and hook, the egg card's second line hides fully under the flyer.
- Open ceiling notes from review (optional): desktop lower sheets keep phone type sizes and leave about 210px of empty cork above "Finding us"; marker-drawn ticks would suit "What we work on" better than stroke icons.
