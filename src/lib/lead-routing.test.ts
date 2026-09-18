import assert from "node:assert/strict";
import test from "node:test";
import { bookingStatusFor, classifyLead, normalizeLead, safePublicUrl } from "./lead-routing.ts";

test("classifies ready in-area homeowners as qualified", () => {
  assert.equal(
    classifyLead({
      kind: "quote",
      zip: "30620",
      homeowner: true,
      budget: "$15,000–$25,000",
      timeline: "This month",
    }),
    "qualified",
  );
});

test("sends out-of-area and non-owner quotes to review", () => {
  assert.equal(
    classifyLead({
      kind: "quote",
      zip: "99999",
      homeowner: true,
      budget: "$15,000–$25,000",
      timeline: "This month",
    }),
    "review",
  );
  assert.equal(
    classifyLead({
      kind: "quote",
      zip: "30620",
      homeowner: false,
      budget: "$15,000–$25,000",
      timeline: "This month",
    }),
    "review",
  );
});

test("nurtures research-stage and lead-magnet contacts", () => {
  assert.equal(
    classifyLead({
      kind: "quote",
      zip: "30620",
      homeowner: true,
      budget: "Under $8,500",
      timeline: "This month",
    }),
    "nurture",
  );
  assert.equal(classifyLead({ kind: "magnet", zip: "30620" }), "nurture");
});

test("normalizes validated input and produces safe booking status", () => {
  const lead = normalizeLead({
    kind: "quote",
    name: "  Jeff's Test Lead ",
    email: " TEST@EXAMPLE.COM ",
    contactConsent: true,
    phone: "(555) 555-1212",
    zip: "30620",
    homeowner: true,
    jobType: "Redeck",
    size: "200–400 sq ft",
    height: "One story",
    budget: "$15,000–$25,000",
    timeline: "This month",
  });
  assert.equal(lead.email, "test@example.com");
  assert.equal(lead.phone, "5555551212");
  assert.equal(lead.qualification, "qualified");
  assert.equal(bookingStatusFor(lead.qualification, true), "ready");
  assert.equal(bookingStatusFor(lead.qualification, false), "needs_callback");
});

test("refuses lead storage without contact consent", () => {
  assert.throws(
    () =>
      normalizeLead({
        kind: "magnet",
        name: "No Consent",
        email: "no-consent@example.com",
        zip: "30620",
        contactConsent: false,
      }),
    /may contact you/,
  );
});

test("accepts only HTTPS public booking URLs", () => {
  assert.equal(
    safePublicUrl("https://calendar.example.com/measure"),
    "https://calendar.example.com/measure",
  );
  assert.equal(safePublicUrl("http://calendar.example.com/measure"), "");
  assert.equal(safePublicUrl("not a URL"), "");
});
