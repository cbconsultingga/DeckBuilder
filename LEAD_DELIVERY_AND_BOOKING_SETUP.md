# Lead Delivery and Booking Setup

This implementation separates **public configuration** from **private delivery settings**. A submitted quote or cost-brief request is validated, classified, stored in the site database, and optionally delivered to one approved private destination. The public Operations Playbook no longer exposes lead records in a browser.

## Lead lifecycle

| Lead type                                                    | Classification | Customer experience                                                                       | Team action                                                       |
| ------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Quote: homeowner, service ZIP, viable budget, ready timeline | `qualified`    | Sees the estimate brief and, once a calendar link is configured, a measure-booking action | Respond within 30 minutes and confirm the site measure            |
| Quote: out of area or not the homeowner                      | `review`       | Receives the estimate brief without an automatic booking path                             | Decide whether travel or a decision-maker exception is worthwhile |
| Quote: below the minimum band or “just looking”              | `nurture`      | Receives the estimate brief and no booking path                                           | Keep for future follow-up only if appropriate                     |
| Cost brief request                                           | `nurture`      | Opens the brief immediately                                                               | Use only for consent-based follow-up                              |

## Required production configuration

### 1. Durable database

Set `DATABASE_URL` in the deployment environment to a managed PostgreSQL-compatible database. The included migration `migrations/0002_leads.sql` creates `leads` and `lead_events` automatically during `npm run build`. This database is the system of record; do not use a browser’s local storage, a public sheet, or the `/playbook` route as a lead inbox.

### 2. Private notification or CRM destination

Set `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` as **private deployment secrets**. The URL must be a full HTTPS endpoint controlled by the business or its automation provider; the secret must be a long, unique random value shared only with that endpoint. On each submitted lead, the site sends a JSON request with the event name `lead.captured`, the stored lead ID, qualification, consent version, contact information, project details, estimate brief, and booking status. The request includes an HMAC SHA-256 signature in `x-lead-signature`; the receiver must verify the raw request body against `LEAD_WEBHOOK_SECRET` and respond with a `2xx` status within six seconds.

A secure endpoint can then send Jeff an email or SMS, create a CRM record, add a private spreadsheet row, or open a scheduling draft. Keep the endpoint URL secret; it must never be added to `src/lib/business.ts`, the source repository, client-side JavaScript, or a public page.

> The site records a failed delivery in the database when the webhook rejects or times out. It does not claim that a notification was sent when the downstream service fails.

### 3. Public booking link

In `src/lib/business.ts`, set `PUBLIC_BUSINESS_PROFILE.calendar` to Jeff’s **public** Google Appointment Schedule, Calendly, or equivalent booking page. Only qualified leads will see the “Choose a measure time” button after form submission. The link should offer a 45-minute site measure, include travel buffers, and expose only available measure windows—not Jeff’s private calendar.

### 4. Consent and privacy

The quote and cost-brief forms require the visitor to agree that Jeff’s Radius Decks may contact them about their request. Each accepted record stores the consent flag and version. The public [privacy notice](/privacy) explains collection and use. Keep the wording aligned with the actual delivery tools, and do not use this request-specific consent for unrelated marketing.

## Deployment acceptance test

1. Deploy with `DATABASE_URL`, `LEAD_WEBHOOK_URL`, and the public calendar link configured.
2. Submit a test quote using a business-owned test email and phone number.
3. Confirm that a `leads` row and a `lead_events` capture record exist.
4. Confirm the webhook destination receives the exact test payload, verifies the `x-lead-signature` HMAC against `LEAD_WEBHOOK_SECRET`, and returns `2xx`.
5. Confirm the lead’s routing status is `delivered`; investigate any `failed` status before launch.
6. Confirm a qualified test sees the measure-booking action, and that the booking page opens without exposing private calendar events.
7. Run a second test with an out-of-area ZIP or low budget; verify it does not receive automatic booking.

## Current scope boundary

The site now provides durable lead capture, classification, a secure delivery hook, and booking handoff. It does not create a vendor account, send an SMS/email itself, book an appointment automatically, or publish to a third-party CRM until Jeff supplies the chosen service credentials or destination URL.
