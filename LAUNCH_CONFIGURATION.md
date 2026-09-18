# Jeff’s Radius Decks — Launch Configuration

The public site is intentionally shipped without invented phone numbers, emails, social links, review claims, or booking links. Before the first public launch, update the verified values in `src/lib/business.ts`, then run the normal build and deploy process.

## Required business inputs

| Item                    | Required value                                                         | Where it appears                             |
| ----------------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| Primary phone           | A monitored business number that can receive calls and texts           | Header and footer when configured            |
| Lead-notification email | An inbox checked during business hours                                 | Future lead-routing integration              |
| Thumbtack profile       | Jeff’s exact public profile URL, not `thumbtack.com`                   | Footer when configured                       |
| Google Business Profile | Jeff’s public Google Maps/Business Profile URL                         | Future profile and conversion links          |
| Facebook and Instagram  | Exact business-page/profile URLs                                       | Future social links and campaign attribution |
| Booking page            | A public Google Appointment Schedule, Calendly, or similar booking URL | Qualified-lead scheduling flow               |

> Never place passwords, API keys, private calendar links, or account recovery data in `src/lib/business.ts`. It is delivered to every website visitor.

## Proof and copy approval

The home-page testimonials are currently disabled through `PUBLIC_BUSINESS_FEATURES.showTestimonials`. Enable them only after replacing each placeholder with an approved, attributable review and confirming that Jeff has permission to display it. Before launch, also verify each stated service area, turnaround time, price range, permit claim, insurance statement, and photo usage right.

## Pre-launch acceptance check

1. Complete and deploy `src/lib/business.ts` with verified public values.
2. Replace or remove every temporary testimonial, then enable the testimonials switch only after approval.
3. Configure the production `DATABASE_URL`, `LEAD_WEBHOOK_URL`, and `LEAD_WEBHOOK_SECRET` values described in `LEAD_DELIVERY_AND_BOOKING_SETUP.md`. Submit a test quote using a non-customer address, confirm its signed delivery, and confirm that no personally identifiable data is left only in browser storage.
4. Open all configured external profile and scheduling links in a private browser session.
5. Verify the phone number reaches a monitored line and the booking page does not expose Jeff’s personal calendar.
6. Recheck every site claim against real business operations, insurance, licensing, permits, pricing, and available capacity.

## Current scope boundary

The site now includes durable server-side lead capture, consent tracking, a signed private delivery hook, and a qualified-lead booking handoff. It does **not** create a vendor account, publish a real calendar link, send messages directly, or enable an external CRM until Jeff supplies the chosen public links and private credentials. Automated social publishing remains a later phase.
