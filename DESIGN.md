---
name: SouthEast EdgeRunners
description: Websites and workflow automation for small businesses, on a dark charcoal stage lit by cyan.
colors:
  shop-charcoal: "#2b2b2b"
  raised-charcoal: "#353535"
  chalk: "#e6e6e6"
  ash: "#b6b6b6"
  hairline: "rgba(255, 255, 255, 0.08)"
  wash: "rgba(255, 255, 255, 0.05)"
  wash-strong: "rgba(255, 255, 255, 0.12)"
  scrim: "rgba(0, 0, 0, 0.72)"
  edge-cyan: "#00b5c9"
  edge-cyan-deep: "#0078a0"
  runner-pink: "#ff2d8a"
  runner-pink-deep: "#b4005a"
  error-rose: "#ff6b8a"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.875rem, 2rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  page-title:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.5rem + 2.4vw, 3rem)"
    fontWeight: 760
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.75rem + 1vw, 2.5rem)"
    fontWeight: 760
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  subheading:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 740
    lineHeight: 1.15
  title:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.25
  lead:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.005em"
  small:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  numeral:
    fontFamily: "Archivo Variable, Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
rounded:
  check: "2px"
  sm: "4px"
  field: "6px"
  control: "6px"
  card: "10px"
spacing:
  tight: "0.35rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(4.5rem, 3rem + 5vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.edge-cyan}"
    textColor: "{colors.shop-charcoal}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  button-disabled:
    backgroundColor: "{colors.wash-strong}"
    textColor: "{colors.ash}"
    rounded: "{rounded.control}"
  text-link:
    textColor: "{colors.edge-cyan}"
  input:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.field}"
    padding: "0.65rem 0.85rem"
  panel:
    backgroundColor: "{colors.raised-charcoal}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
---

# Design System: SouthEast EdgeRunners

## Overview

**Creative North Star: "Night Shift Workshop"**

A local shop that keeps a small business running after hours. The room is dark charcoal, and the light comes from the work itself: Edge Cyan, the color of the logo, is the working signal, and Runner Pink is the occasional spark. The tone is practical and capable rather than flashy, the way a good tradesperson's van is clean and clearly lettered rather than chromed.

The site is built from type, hairlines and a few raised panels rather than cards and glows. Condensed Archivo headings do the talking; content is grouped by proximity and 1px hairlines; the one raised surface on a screen holds the thing that matters most (the worked example, a form, the closing call to action). Proof is shown, not claimed: the homepage's signature element is an honest, labelled example of an automation playing out.

**Key Characteristics:**
- Dark-only theme on Shop Charcoal (#2b2b2b).
- One type family, Archivo, condensed for headings and normal width for reading.
- Edge Cyan leads; Runner Pink appears once per screen at most.
- Small, firm corners (2–10px) that sit with the angular "ER" logo.
- No glows, no gradients, no decorative cards.

## Colors

A charcoal-and-grey stage with two saturated accents: cyan for action and identity, pink for one deliberate highlight.

### Primary
- **Edge Cyan**: the logo color and the working signal. Solid fill of every primary button (with Shop Charcoal text at 5.7:1), links, focus rings, checked checkboxes, step numerals, the markers on the worked example. **Edge Cyan Deep** is kept in the palette but unused.

### Secondary
- **Runner Pink**: the spark, used only as a non-text mark: the "Booked" marker that ends the worked example. Never as small text (4.04:1 fails). Allowed as text only at display size. **Runner Pink Deep** (white text at 6.8:1) is the approved fill if a pink button is ever needed.

### Neutral
- **Shop Charcoal**: page background, and the label color on cyan buttons.
- **Raised Charcoal**: the single raised panel per screen (worked example, closing call to action, dialogs, standalone forms).
- **Chalk**: primary text and headings.
- **Ash**: secondary text, labels, hints, footer (6.0–7.0:1). Mixed 60% into Raised Charcoal for field and checkbox borders (3.2:1), 92% for placeholders (4.6:1).
- **Hairline**: 1px dividers between groups and around panels.
- **Wash / Wash Strong**: field backgrounds and the disabled button.
- **Scrim**: the dimmed backdrop behind dialogs.
- **Error Rose**: form error text and its 1px outline, on Raised Charcoal (4.5:1).

### Named Rules
**The Locked Palette Rule.** The hex values above are fixed by the owner. Fixes change where and how much a color is used, never the values. New colors may be proposed as optional additions, never as replacements.

**The Cyan Leads Rule.** Edge Cyan is the lead accent because it is the logo. Runner Pink is rare: at most one pink moment per screen, used for the thing that most deserves a second look.

**The No Glow Rule.** No colored shadows, drop-shadow halos or gradient fills. Depth comes from Raised Charcoal and hairlines; the only shadow is the neutral one under dialogs.

## Typography

**Font:** Archivo (self-hosted variable font via `@fontsource-variable/archivo`, weight 100–900 and width 62–125%), falling back to Segoe UI and the system sans.

**Character:** a sturdy grotesque with a width axis. Headings run condensed (78–84%) and heavy, like lettering on a work van; reading text runs at normal width.

### Hierarchy
- **Display** (800, 78% width, clamp 2.875–4.5rem, line-height 1.02): the homepage headline only.
- **Page title** (760, 84% width, clamp 2.1–3rem): h1 on inner pages.
- **Heading** (760, 84% width, clamp 2.125–2.5rem): section headings. On phones it stays clearly above Subheading.
- **Subheading** (740, 84% width, 1.5rem): service groups, legal sections, form titles.
- **Title** (650, 1.25rem): smaller headings such as process steps.
- **Lead** (400, 1.125–1.25rem): the paragraph under a major heading.
- **Body** (400, 1.0625rem, line-height 1.6): prose, capped at 60ch (about 72 characters: `ch` is the width of "0", wider than an average letter).
- **Small / Label** (0.9375 / 0.875rem): supporting text, form labels, captions, times.
- **Numeral** (800, 78% width, 3rem, cyan, tabular): process step numbers.

### Named Rules
**The One Family Rule.** Archivo only. Hierarchy comes from width, weight and size together, never from a second face.

**The Measure Rule.** Running text stops at 60ch; headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Layout

One centered column, max 1120px, padded 2.25rem (1rem on phones). Sections are separated generously (clamp 4.5–7.5rem) and grouped tightly inside. The homepage runs:
1. A two-column hero: copy on the left, the worked example on the right.
2. Services as three outcome rows split by hairlines.
3. A three-step numbered process.
4. A local "about" block.
5. A raised closing panel with the call to action.

**The Mobile-First Rule.** Base styles are the phone layout; `min-width` queries add wider layouts (361px, 561px, 721px, 901px). A test (`src/mobileFirst.test.mjs`) fails on any `max-width` media query.

- **Phones (up to 560px):** one column, primary buttons full width, the header button hidden in favour of the phone call bar, the intake dialog as a full-screen sheet.
- **From 721px:** services, the about block (heading and photo | text and facts), the three process steps and the two questions split into columns.
- **From 901px:** the hero goes two-column, and the about text and facts sit side by side.

The worked example sizes itself with container queries, not the viewport: stacked when narrow, time beside the entry from 20rem, a three-column log row from 38rem. Inner pages (legal, not-found) are a single 60ch column.

## Elevation & Depth

Tonal layering, not shadows. Raised Charcoal lifts the one panel that matters on a screen; hairlines separate everything else. The only shadow is under dialogs (`0 24px 60px rgba(0,0,0,0.5)`), over a Scrim backdrop.

## Shapes

Small, firm corners: 2px checkboxes, 4px small controls, 6px buttons and fields, 10px panels and dialogs. The worked example's markers are squares, echoing the cut geometry of the logo. Nothing is pill-shaped except the round chat-restore button.

## Components

### Buttons
- **Primary:** solid Edge Cyan, Shop Charcoal label, 6px corners, at least 44px tall. Hover brightens 10%; active darkens slightly. Keyboard focus shows the global 2px cyan outline offset 3px.
- **Compact:** the header variant, same color, smaller padding, never wraps.
- **Busy:** `aria-disabled` while a form sends, so keyboard focus stays put.
- **Text link button:** for secondary actions that open a dialog (the intake form), styled as a cyan underlined link.

### Panels
- Raised Charcoal, 1px Hairline border, 10px corners, no shadow. At most one per screen region.

### Inputs / Fields
- Wash background, Ash-60% border, 6px corners, 16px text so phones don't zoom.
- Focus: Edge Cyan border plus a 3px Edge Cyan 15% ring.
- Placeholders start with "e.g." so they read as examples, not answers.
- Validation: the send button is never disabled for missing input. A send attempt marks each problem field (`aria-invalid`, Error Rose border, a short message under it linked by `aria-describedby`) and moves focus to the first one. While sending, the button is `aria-disabled` so focus stays on it.
- Send failures: Error Rose text in a 1px Error Rose outline, announced as an alert, with a working email fallback. Success moves focus to the confirmation heading.

### Dialogs
- Native `<dialog>` with `showModal()`: focus moves to the first field, the background is inert, Escape closes, and focus returns to the trigger. Content stays mounted while closed, so an accidental close never loses typing; a form resets only after a successful send. Opens with a 180ms rise; reduced motion gets a fade only. Below 561px the intake dialog is a full-screen sheet with its close button pinned in the corner; the short call dialog stays a centered box.

### Phone call bar
- Below 561px, a Raised Charcoal strip with a hairline top and a full-width primary button is pinned to the bottom of the screen. It shows only while none of the page's own contact actions (elements marked `data-contact-region`) are on screen, slides up in 180ms, and is hidden from the tab order and screen readers while out of view.

### Worked example (signature component)
- A raised panel holding a timestamped log of one automation, joined by a 1px thread with square cyan markers; the outcome gets the screen's single pink marker. Plays in once when half of it is on screen (lines arrive about 0.5s apart); on desktop that is on load. Reduced motion shows it complete. Always captioned as illustrative.

## Do's and Don'ts

### Do:
- **Do** keep every palette value exactly as listed in the frontmatter (The Locked Palette Rule).
- **Do** use solid Edge Cyan with Shop Charcoal text for the primary action.
- **Do** group with space and hairlines before reaching for a panel.
- **Do** label any illustrative example as illustrative.

### Don't:
- **Don't** swap, re-hue, or replace the brand colors.
- **Don't** use Runner Pink for small text, links or labels.
- **Don't** add glows, gradient fills, colored shadows or side-stripe borders (The No Glow Rule).
- **Don't** show invented numbers, testimonials or client logos.
- **Don't** put white text on Edge Cyan (2.5:1).
