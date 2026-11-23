# Placeholders

Every spot on the site that is waiting for real content or a rebuilt system.

- **Visible placeholders** appear on the page as `[PLACEHOLDER: …]` (component: `src/components/Placeholder.tsx`), each with a `TODO(…)` comment beside it.
- **Code-only placeholders** don't show on the page and are marked with `TODO(…)` comments.

Find them all with:

```sh
grep -rn "TODO(\|<Placeholder" src netlify
```

The "From" column refers to the numbered items in the housekeeping request of 2026-11-23.

## Systems

| What | File | What goes there | From |
|---|---|---|---|
| Lead pipeline | `netlify/functions/intake.mjs` (top of file) | The rebuilt lead delivery. Right now **no lead is delivered anywhere**: POST returns `503 { delivered: false, reason: 'lead-pipeline-not-connected' }`, nothing is stored, forwarded or logged, and the forms tell visitors to email instead. Return 200 only once a lead is really accepted downstream. | 2 |
| Live chat (Tawk.to) | `src/components/TawkWidget.tsx` | Currently renders nothing and loads no script. Restore from `src/components/disabled/TawkWidget.disabled.tsx` (and its `.css`) after testing in a real browser; the note at the top of that file explains how. | 4 |

## Legal wording

The surrounding wording is unchanged; the owner is updating it.

| What | File | What goes there | From |
|---|---|---|---|
| SMS opt-in scope | `src/pages/PrivacyPolicyPage.tsx` ("SMS / Text Message Communications" → "Opt-in") | Updated wording. It currently names only the "Request a Call" form, but the intake form also collects SMS consent. | 3 |
| Duplicated rates sentence | `src/pages/TermsPage.tsx` ("Message and Data Rates") | Updated wording. "Message and data rates" is stated twice in the paragraph. | 3 |

## Homepage content

All in `src/pages/HomePage.tsx`. Don't fill these with invented content, numbers, phone numbers, prices or testimonials.

| What | Section | What goes there | From |
|---|---|---|---|
| Founder photo | "Local, and easy to reach" | A real photo of Jaron Singley. The slot is 4:5, up to 12rem wide. Use a web-sized image with meaningful alt text. | 5 |
| First-person intro | "Local, and easy to reach" | 2–3 sentences in Jaron's own voice: who he is and why he works locally. | 5 |
| Business phone number | "Local, and easy to reach" → Phone | The real business number. Also consider adding it to the footer (`src/components/Layout.tsx`) and `src/lib/contact.ts`. | 5 |
| Pricing | "Before you call" → "What does it cost?" | Honest, owner-confirmed information on how projects are priced and any monthly costs. | 5 |
| The first call | "Before you call" → "What happens on the call?" | What the first call covers, how long it takes, and what happens after. | 5 |

## Future work

The owner plans a few more traditional-looking pages, different from the pink and cyan advertising style of the homepage, to show potential business clients. These are **not designed or built yet**. When that starts, treat them as a new surface: write a brief with `/impeccable shape` first, and decide whether they share DESIGN.md's tokens or need their own system.
