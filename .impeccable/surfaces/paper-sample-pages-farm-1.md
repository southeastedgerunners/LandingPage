---
version: 1
slug: "paper-sample-pages-farm-1"
primary_target: "paper/sample-pages/farm-1"
related_targets: []
---

# Half Moon Hollow Farm · moon-planting almanac

Scope: Paper page "Farm 1 · Half Moon Hollow Farm (almanac)" (pageId p-3-0). Persuade mode. Sample landing page for a fictional business, shown by SouthEast EdgeRunners to prospective clients.

Audience: local families and back-to-the-landers in Southeastern Kentucky who want vegetables grown without sprays, and who like the farm's slightly mystic, hippie way of doing things. Job: understand the weekly box and want in. Action: join the weekly veggie box (working sign-up: box size, pickup spot, start week).

## Direction contract

THESIS: The farm plants by the moon, and the page is its almanac. This week's phase tells you what's coming out of the ground and into your box. Refuses the category default of kraft paper, cream, a rustic serif, sage green and big vegetable photos.

OWN-WORLD: A night-indigo ground #1C1B4B drenches the page. The moon and every key mark are marigold #F4A51C. Text is moonlight #ECEAF7, secondary text a lighter indigo-lavender #B7B4DC (check 4.5:1). Almanac grammar: thin 1px rules in lavender at 40%, dense tables with tabular figures, small caps column heads, a strip of the eight moon phases drawn as SVG discs. Hand-cut feeling in the details: a little star field of uneven dots, vegetable line drawings in marigold single-weight strokes (garlic bulb, squash, kale leaf, sweet potato). The display face is an almanac voice with some old-time character (not Fraunces, Playfair, Cormorant, Lora or other listed defaults). Body in a warm readable sans or a sturdy text face.
Raise from the ikebana challenger: charged empty space. The moon sits off-center with generous open indigo around it, and nothing decorative fills that space.

STORY: The visitor sees this week's moon and the box it brings, understands why they plant by the moon in plain words, sees the price and pickup spots, and joins the box.

FIRST VIEWPORT (390x844): Status bar. Small wordmark "Half Moon Hollow Farm" top left, "Join" link right. A big waning-gibbous moon disc, about 220px, placed off-center to the right with empty indigo around it. Headline: "Planted by the moon. Picked this week." This week's box as a short almanac entry: "Week of Nov 30 · waning gibbous · root days" then "Sweet potatoes, lacinato kale, garlic, candy roaster squash, a jar of sorghum." Primary marigold button with indigo text: "Join the weekly box · $30". Secondary text link: "Farm stand Saturdays 9 to 1".

FORM: Candidate 7 of 7 on my ranked list (moon-planting almanac). seed:5d733dbcb4f1f169

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
Note: these are Paper samples, not part of the EdgeRunners site. Their design notes live in this brief. The repo's DESIGN.md stays untouched.

## Content

- Name: Half Moon Hollow Farm. 1170 Possum Trot Road, Bell Hollow, KY (fictional town). (606) 555-0118. Run by Juniper and Wes (fictional), 9 acres, no sprays.
- Planting by the moon table (phase · what we do): New moon · sow leafy greens and lettuce. Waxing moon · plant crops that fruit above ground, like beans, squash, tomatoes. Full moon · transplant and harvest herbs. Waning moon · plant roots and garlic, weed, and rest the beds. Add one plain-language line: "It's an old Appalachian habit. We like the rhythm it gives the week."
- Month strip: the moon phases for December with a few dates marked as root days, leaf days, fruit days.
- Weekly box: Half box $18 (2 people) or Full box $30 (a family). Pickup Thursdays 3 to 6 at the farm, or at the Bell Hollow Co-op. Skip any week with a text. 20 weeks, May to October, plus a winter box through December.
- Sign-up form: box size (two options, one selected), pickup spot, start week, name, email, phone, submit "Save my box".
- Farm doings: Full-moon potluck, Dec 23. Seed swap, Jan 18. Bring your own jar for honey and sorghum.
- Footer: address, phone, stand hours, and "Sample site for a fictional business. Designed by SouthEast EdgeRunners."

## Design notes (as built, 2026-11-27)

Status: finish review ship after a hero-moon rebuild, a fresh full review and two more fix rounds (the last one, the kale drawing, approved by the user). Paper artboards "Phone · 390" and "Desktop · 1440" on page p-3-0.

- Type: IM Fell English (regular and italic) for display. Alegreya Sans for body, with lining tabular figures ("lnum", "tnum" via font-feature-settings; Paper drops font-variant-numeric) on every price, date, time and contact number. Alegreya Sans SC for small-caps column heads and plate captions. Running prose keeps old-style figures.
- Color: indigo #1C1B4B ground, marigold #F4A51C for the moon and key marks only, moonlight #ECEAF7 text (13.5:1), lavender #B7B4DC secondary text (8.1:1), unlit moon #28276A. The join band and footer are darker steps of the same indigo.
- Moons are flat discs (dark disc, 1px lavender ring, flat lit shape) generated by moon.py with real phase math: Nov 30, 2026 is a waning gibbous, and the December strip uses true phase times converted to Eastern time, so the full moon falls on Dec 23 with the potluck. Strip day types follow the page's own phase table. The vegetable plate comes from plate.py. Both scripts live in the scratchpad and are not durable.
- Composition: phone moon 220px with a 16px right margin. Desktop moon 340px centered near x 1060, headline at left, so the open sky runs on a diagonal.
- Changes from the content list: invented details (confirmation texts, barn supper, seed giveaway) were removed in review. The sample email uses example.com.

## Recolor (2026-11-27, user request)

The user asked for white, light grey and dark grounds with less indigo and marigold. This supersedes the indigo palette in OWN-WORLD and the notes above. Sections run night #17181C (hero, join band), white #F5F5F2, grey #E6E6E2 and footer #101114. On night: text #ECECE8, secondary #A9AAB0. On paper: ink #1A1A1E, secondary #56575E. Moons on night: lit #ECECE6, unlit #2A2B31, ring #7C7D85. Moons on paper print like an almanac (ink dark part, paper lit part, ink ring). Indigo #2B2A6B only on the primary buttons (with a 1px #8482CE edge) and the selected option; #8482CE for links and focus on night. Marigold #F4A51C only on the Dec 23 full moon and the potluck mark. moon.py and plate.py now draw these colors (earlier versions kept as moon.round2.py and plate.round3.py in the scratchpad). Phone sections paint a 2px box-shadow of their own ground upward to hide subpixel seams. Finish review: fix (the seams), then fixed and verified by pixel sampling.
