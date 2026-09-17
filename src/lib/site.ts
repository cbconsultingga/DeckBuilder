export const SITE = {
  name: "Jeff's Radius Decks",
  shortName: "Radius Decks",
  owner: "Jeff",
  tagline: "The last deck you pay for.",
  city: "Bethlehem",
  state: "Georgia",
  zip: "30620",
  radiusMiles: 25,
  years: 12,
  crew: "Jeff plus a four-person crew",
} as const;

export const SERVICE_CITIES = [
  "Bethlehem",
  "Winder",
  "Auburn",
  "Carl",
  "Statham",
  "Hoschton",
  "Braselton",
  "Dacula",
  "Jefferson",
  "Pendergrass",
  "Commerce",
  "Monroe",
  "Good Hope",
  "Loganville",
  "Grayson",
  "Lawrenceville",
  "Buford",
  "Flowery Branch",
  "Bogart",
  "Watkinsville",
  "Athens",
] as const;

export const SERVICE_ZIPS = [
  "30620",
  "30680",
  "30011",
  "30548",
  "30517",
  "30019",
  "30666",
  "30549",
  "30655",
  "30656",
  "30052",
  "30045",
  "30043",
  "30046",
  "30519",
  "30542",
  "30622",
  "30677",
  "30601",
  "30605",
  "30606",
  "30607",
  "30567",
  "30575",
  "30641",
  "30012",
  "30019",
  "30548",
  "30011",
] as const;

export const COUNTIES = [
  "Barrow",
  "Gwinnett",
  "Jackson",
  "Walton",
  "Oconee",
  "Hall",
  "Clarke",
] as const;

export function isInServiceZip(zip: string) {
  const cleaned = zip.replace(/\D/g, "").slice(0, 5);
  return (SERVICE_ZIPS as readonly string[]).includes(cleaned);
}

export function slotsThisWindow(now = new Date()) {
  const week = Math.ceil(now.getDate() / 7);
  return Math.max(2, 5 - week);
}

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/quote", label: "Get a Number" },
] as const;

export const SERVICES = [
  {
    id: "redeck",
    title: "Fast redecks",
    kicker: "The money job",
    body: "Boards, rails, and stairs that look new without tearing the house apart. Typical 10–14 day turnaround when the frame is sound. This is how neighbors get a finished deck before the next round of Georgia rain.",
    from: "$8,500",
    cta: "Price a redeck",
  },
  {
    id: "new",
    title: "Pressure-treated new builds",
    kicker: "Clean and code-right",
    body: "Square, strong, permitted structures with black iron balusters and a rail a grown man can lean on. Built to last in Barrow humidity — not a big-box weekend kit.",
    from: "$18,000",
    cta: "Price a new build",
  },
  {
    id: "radius",
    title: "Custom radius & curves",
    kicker: "The shop specialty",
    body: "Bent rails, picture-frame decking, curved landings. Most crews will not touch a true radius. Jeff’s crew does it every week. This is the work that makes the house look expensive from the driveway.",
    from: "Quoted",
    cta: "Talk radius",
  },
  {
    id: "stairs",
    title: "Stairs, landings, rescue",
    kicker: "Make it usable",
    body: "Split stairs, wrap landings, failing stringers, and the ugly add-on the last guy left. We straighten the path from the door to the yard so you actually use the thing.",
    from: "$4,800",
    cta: "Price stairs",
  },
] as const;

export const PROOF_STATS = [
  { value: "12+", label: "years on Georgia decks" },
  { value: "25 mi", label: "from zip 30620" },
  { value: "10–14", label: "days on a typical redeck" },
  { value: "1 visit", label: "to decide, if you are ready" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Two other crews wanted to sister the joists and hope. Jeff crawled it, showed us the rot on his phone in eight minutes, and had a real deck under us in eleven days. We stopped talking about it. That was the point.",
    name: "Mara T.",
    city: "Winder",
    job: "Full redeck, 14 days",
  },
  {
    quote:
      "Everyone else said a radius rail was a $40k science project. Jeff already had the jig. The curve is the first thing people walk over to. We paid for the craft, not a speech.",
    name: "Daniel & Priya R.",
    city: "Hoschton",
    job: "Custom radius, stained rails",
  },
  {
    quote:
      "I am not a project manager and I did not want to become one. They showed up, protected the siding, and left the yard cleaner than they found it. The number we agreed on was the number we paid.",
    name: "Chris L.",
    city: "Dacula",
    job: "New PT build + split stairs",
  },
  {
    quote:
      "He talked us out of composite we did not need and into a better rail we did. That is how you know it is not a volume shop. Our old deck was a liability. This one is the reason we stay outside.",
    name: "Ellen V.",
    city: "Statham",
    job: "Tear-off and rebuild",
  },
] as const;

export const FAQS = [
  {
    q: "How fast can you start in Bethlehem and 25 miles out?",
    a: "Fall is the last clean-build window before winter rain sits in the joists. Qualified homeowners — decision-makers with a real budget — get a site measure the same week. Typical redecks run 10–14 working days once we start. Custom radius takes longer because the rail is built, not guessed.",
  },
  {
    q: "Do you only do fancy curved decks?",
    a: "Radius is the specialty. Redecks and straight pressure-treated builds are how we keep the crew stacked and the calendar honest. You get the same hardware, the same flashing, and the same crew either way. We will not upsell a curve you do not need. We also will not cheap-out a rail you will grab every day.",
  },
  {
    q: "What does a redeck cost around 30620?",
    a: "Most sound-frame redecks in Barrow, west Gwinnett, and Jackson land between $8,500 and $22,000 depending on square footage, rail style, and stairs. New two-story builds start around $18,000 and climb with height, landings, and radius work. If your number has to be under $5,000 for a full rebuild, we are not the crew — and a crew that says yes is not doing you a favor.",
  },
  {
    q: "Are you licensed, insured, and permitting the job?",
    a: "Yes. We pull permits where Barrow, Gwinnett, Jackson, and Walton require them. The bid you see is the bid that includes fasteners, flashing, and the inspection. No 'allowance' games.",
  },
  {
    q: "I already have bids from Thumbtack. Why you?",
    a: "Keep them. Then put Jeff’s number next to theirs and look at the rail, the joist tape, and the curve. Most Thumbtack bids in this radius are square boxes with 2x4 rails. We use that platform because it is where ready homeowners already are. The work in the photos is the work you get.",
  },
  {
    q: "Will you work with a committee, a maybe, or a six-month window?",
    a: "No. We take homeowners who own the house, can decide on the visit, and want the deck used this season. If you need three extra bids and a family vote in March, bookmark us. The calendar is for people ready to pull the trigger.",
  },
] as const;

export const QUALIFY_COPY = {
  floor:
    "Most redecks here start around $8,500. New builds from $18,000. Radius is quoted on site.",
  ready: "We work with homeowners who know what they want and can decide in one visit.",
};

export function pageTitle(page: string) {
  return `${page} | Jeff's Radius Decks | Bethlehem GA 30620`;
}
