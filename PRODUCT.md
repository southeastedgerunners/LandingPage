# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owners and operators of small businesses, most likely local to the SouthEast EdgeRunners area but not limited to one industry. They run the business themselves, lose time to manual follow-up, booking, invoicing and admin, and want those jobs handled for them without having to learn the tools.

## Product Purpose
SouthEast EdgeRunners builds websites and n8n workflow automations (plus AI integrations, CRM and auto-texting, lead funnels and related services) so small businesses run more smoothly. The site exists to explain what the company does and to start a conversation: a visitor succeeds when they request a call or submit the intake form.

## Positioning
A local builder who makes both the website and the automations behind it, so a small business gets one partner for its online presence and its back-office workflows. (Further differentiation not yet confirmed.)

## Operating Context
- Leads arrive through two forms: a short "Request a Call" form (name, phone) and a fuller "Free Business Intake" form. Both post to a Netlify function (`netlify/functions/intake.mjs`).
- Both forms require SMS consent. Their wording, and the Privacy Policy and Terms pages, exist for Twilio/A2P compliance and must stay intact (see `SMS_CONSENT_COMPLIANCE.md`). `/contact` and `/quick-contact` render the same forms as standalone pages for compliance review.
- A Tawk.to live-chat widget loads on every page.
- Hosted on Netlify as a Vite + React + TypeScript SPA.

## Capabilities and Constraints
- Services offered: workflow automation (n8n), AI applications, website creation, Facebook ads and lead funnels, CRM and auto-texting, branding and visual identity, QuickBooks automation, reputation and review management.
- The Job Estimator experiment was removed on 2026-11-23 at the owner's request.
- Response-time commitment: the company replies to every inquiry within one business day.
- SMS consent copy, Privacy Policy and Terms content are compliance artifacts: change their presentation freely, but not their substance without review.

## Brand Commitments
- Name: SouthEast EdgeRunners. Logo: `src/assets/SouthEasternEdgeRunners.png`.
- Founder: Jaron Singley. Service area: Southeastern Kentucky and surrounding areas.
- Public contact email: southeast.edgerunners@gmail.com.
- The owner likes the current color palette (dark charcoal with cyan `#00b5c9` and hot pink `#ff2d8a`) and wants it kept by default. New colors may be proposed but are optional.

## Evidence on Hand
- None yet. No clients that can be named, no testimonials, no case studies.
- The homepage stats (50+ workflows, 200+ hours saved monthly, 100% retention, 5x ROI) are placeholders, not real figures. Future work must not present invented numbers, testimonials, client logos or case studies as real.

## Product Principles
1. Honest over impressive: a new company says what it does plainly and does not fake proof.
2. Make contact easy: every page should leave a clear, low-friction path to a call or the intake form.
3. Speak to the owner, not the technologist: lead with outcomes in the owner's words; tool names (n8n, CRM) support the point rather than lead it.
4. Compliance stays visible and intact: SMS consent and legal pages are part of the product, not clutter.
