# Scheduling and Follow-Up SOP

This SOP turns the website’s `qualified` lead classification into a site measure, then a written range and a decision. It assumes the site is deployed with a production database, a signed lead-delivery webhook, and Jeff’s public scheduling link. It does not ask a homeowner to expose a private calendar or send consent-free text messages.

## 1. Choose the booking and notification setup

| Approach                                                      | Tradeoffs                                                                                                                                                          | Cost                                                                                      | Setup complexity |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------- |
| **Public Google Appointment Schedule + signed lead webhook**  | Uses a familiar Google booking page and keeps a separate private automation endpoint for alerts and lead records. Calendar availability must be managed carefully. | Usually included with the selected Google Workspace plan; automation provider costs vary. | Moderate         |
| **Calendly or equivalent booking page + signed lead webhook** | Strong booking controls and reminders; adds a separate vendor account and billing relationship.                                                                    | Vendor plan varies; automation provider costs vary.                                       | Moderate         |
| **Callback-only workflow**                                    | Least setup, but qualified homeowners must wait for a call and more leads will cool off before the measure is booked.                                              | No additional service cost.                                                               | Low              |

Use only one public booking page. The page must offer a **45-minute site measure**, prevent double booking, add travel buffers, and show only availability—not Jeff’s personal calendar details.

## 2. Production configuration

Configure these deployment secrets; they are not website content and must never be committed to the repository.

| Setting               | Purpose                                                                   | Required for launch |
| --------------------- | ------------------------------------------------------------------------- | ------------------- |
| `DATABASE_URL`        | Managed PostgreSQL database that retains lead and event records           | Yes                 |
| `LEAD_WEBHOOK_URL`    | HTTPS endpoint for the CRM, notification, or automation workflow          | Yes                 |
| `LEAD_WEBHOOK_SECRET` | Long random secret used to verify that a lead event came from the website | Yes                 |

In `src/lib/business.ts`, add the public booking page to `PUBLIC_BUSINESS_PROFILE.calendar`. This link is client-visible and must be safe to publish.

> A webhook receives an `x-lead-event: lead.captured` header and an `x-lead-signature` SHA-256 HMAC of the raw JSON body. The receiving automation must recompute the HMAC with `LEAD_WEBHOOK_SECRET` and reject mismatches. It must return HTTP 2xx within six seconds. Never put the secret in a browser form, spreadsheet, email template, or public booking page.

## 3. Lead response standard

| Classification | First response target                                                         | Owner                        | Action                                                                                                 |
| -------------- | ----------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `qualified`    | 30 minutes, 8:00 a.m.–6:00 p.m.; next business morning otherwise              | Jeff or designated crew lead | Confirm the request, offer the booking page or two measure windows, and create the private lead record |
| `review`       | Same business day                                                             | Jeff                         | Confirm ZIP and decision-maker status; decide whether travel or an exception is warranted              |
| `nurture`      | No automated text unless consent and applicable messaging rules are satisfied | Marketing owner              | Send only the requested brief or an approved, consent-based follow-up sequence                         |

The website records consent version `2026-09-17` on every accepted request. That consent is for contact about the homeowner’s deck request. It is not blanket permission to subscribe a person to unrelated promotions. Review the contact wording and any phone or email workflow against the chosen providers and applicable requirements before activating a campaign.

## 4. Qualified-lead response templates

### Immediate confirmation email

**Subject:** Your deck measure request — Jeff’s Radius Decks

> Thanks, {{first_name}}. Your request for a {{job_type}} in {{zip}} is in the crew queue. Your estimated range is {{estimate_range}}; the site measure is where we confirm structure, flashing, stairs, access, and materials. Choose a measure time here: {{booking_link}}. If no listed time works, reply with two windows that do. We will not treat this as a final bid until Jeff sees the deck.

### Immediate text message

> Jeff’s Radius Decks: We received your {{job_type}} request in {{zip}}. Your estimate range is {{estimate_range}}. To lock a site measure, choose a time: {{booking_link}}. Reply STOP to opt out.

Do not send a text without confirming that the chosen delivery tool, local policy, and the homeowner’s consent support it.

### 24-hour booking reminder

Send only to a `qualified` lead who received a booking link, has not booked, and has not opted out.

> Hi {{first_name}} — the crew still has a measure window this week for your {{job_type}}. If you want Jeff to look at it, choose a time here: {{booking_link}}. If the timing changed, no problem—reply and we’ll close the request.

### Measure confirmation

> You’re set for {{appointment_start}} at {{job_address}}. Please make sure the homeowner or another decision-maker is there. If available, send a photo of the underside, ledger, stairs, and rail before the visit. Jeff will confirm scope and a written range after the measure.

### Day-before reminder

> Reminder from Jeff’s Radius Decks: site measure tomorrow at {{appointment_start}}. Please secure pets and make sure we can see the deck’s underside and stair/rail connection. Reply if access or timing changed.

## 5. Measure-to-decision workflow

1. Before leaving for the measure, review ZIP, project type, budget band, timeline, notes, source, and photos.
2. At the home, verify structural condition, ledger/flashing, posts, stairs, rails, access, HOA requirements, permit jurisdiction, and material choice. Photograph the relevant condition with permission.
3. Send the written range or proposal the same day. State what is included, what changes the number, and who handles permit questions.
4. Hold the relevant crew window for **48 hours only if that availability is true**. Never manufacture scarcity.
5. Log the result as booked, proposal sent, won, lost, nurture, or disqualified, with the actual reason.
6. After substantial completion, request a review with a direct Google and Thumbtack link. Do not condition incentives on positive reviews.

## 6. Delivery failure procedure

If the lead-delivery automation receives a non-2xx response or times out, the website records `routing_status = failed` and a routing error in the database. The automation owner must investigate the destination, retry only after correcting the configuration, and reconcile any missed records from the private database. Do not tell a homeowner that an appointment is confirmed until the calendar provider has created it.

## 7. Launch test

Use an internal test name, test email, and test phone number. Submit one qualified quote and one non-qualified request. Confirm the database record, signed webhook verification, destination record, notification content, public booking behavior for the qualified lead only, calendar event details, opt-out behavior, and failure logging. Delete the test records afterward if the CRM policy allows it.
