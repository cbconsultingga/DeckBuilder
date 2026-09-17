export type SocialPost = {
  date: string;
  platform: "Facebook" | "Instagram" | "Thumbtack";
  hook: string;
  body: string;
  visual: string;
  cta: string;
};

const START = new Date("2026-09-17T12:00:00");

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x.toISOString().slice(0, 10);
}

const TEMPLATES: Omit<SocialPost, "date">[] = [
  {
    platform: "Facebook",
    hook: "The rail moved. That is not a personality trait.",
    body: "If you lean and it gives, you do not have a quaint old deck. You have a liability sitting on a house in Bethlehem. Jeff's crew is booking fall redecks inside 25 miles of 30620. Measure this week. Eat outside next month.",
    visual: "Close-up of stained cedar cap / radius-underside",
    cta: "Get a same-week number — link in bio / site",
  },
  {
    platform: "Instagram",
    hook: "Before the moss. After the curve.",
    body: "Same house. Split stairs. Radius upper. Iron balusters. This is what 'we'll just stain it' was postponing. Bethlehem, Georgia.",
    visual: "Before/after carousel — before-weathered + after-rebuild",
    cta: "Save this if your rail feels soft. Then send the zip.",
  },
  {
    platform: "Thumbtack",
    hook: "Need a redeck before the holidays? Crew is local.",
    body: "12 years. Bethlehem 30620. Fast pressure-treated redecks and new builds, 10–14 day typical. Radius work is the specialty — we will not upsell it if the house does not need it. Homeowners only. Ready to decide on the visit.",
    visual: "Portfolio: complete-radius, two-level-new, white-house-stained",
    cta: "Message for a measure this week",
  },
  {
    platform: "Facebook",
    hook: "A $6,200 rebuild is not a rebuild.",
    body: "In Barrow County in 2026, a real redeck starts around $8,500 because flashing, hardware, and a rail that holds a person cost money. The cheaper number is a delay with a receipt. Jeff prices the job you keep.",
    visual: "Ledger / house-edge photo",
    cta: "Read the 2026 Cost Brief on the site",
  },
  {
    platform: "Instagram",
    hook: "Picture-frame decking is layout, not luck.",
    body: "Diagonal field. Straight border. The line that makes pressure-treated look designed. Winder, Hoschton, Dacula — we build this every month.",
    visual: "herringbone + picture-frame detail",
    cta: "Want this on your existing frame? Redeck first.",
  },
  {
    platform: "Facebook",
    hook: "Thumbtack sent you three bids. Put this next to them.",
    body: "Ask each one: who pulls the permit, what is on the ledger, and can I see a radius they actually built. Jeff's answers are in the gallery. Local crew. No committee projects. Fall slots are finite.",
    visual: "lifestyle-complete",
    cta: "Hold a measure slot",
  },
  {
    platform: "Instagram",
    hook: "Sunset through iron. That is the purchase.",
    body: "Not the spreadsheet. The hour after work. Bethlehem decks, built once.",
    visual: "sunset-balusters",
    cta: "Link in profile — same-week number",
  },
  {
    platform: "Thumbtack",
    hook: "Custom radius without a six-month circus.",
    body: "Most 'custom' decks are squares with extra adjectives. We laminate the cap, through-bolt the posts, and set steel on layout. Also taking straight redecks so the crew stays stacked. 25 miles of 30620.",
    visual: "cedar-cap + radius-underside",
    cta: "Request a quote — homeowners ready this season",
  },
  {
    platform: "Facebook",
    hook: "Neighbor in Auburn just asked if we 'do normal decks too.'",
    body: "Yes. Radius is the specialty. Redecks and clean PT builds are how we keep the calendar honest and the crew paid. Same flashing. Same rail. No performance about it.",
    visual: "two-level-new",
    cta: "Zip code + photos → crew brief",
  },
  {
    platform: "Instagram",
    hook: "Stairs people actually use.",
    body: "Even rises. A rail that starts before you need it. Split landings so the path from the kitchen to the grass is not a death march with a casserole.",
    visual: "stained-stairs + stair-landing",
    cta: "Stairs-only jobs from $4,800 when the frame can take them",
  },
  {
    platform: "Facebook",
    hook: "Reviews are not a personality. Showing up is.",
    body: "If we built your deck in Barrow, Gwinnett, or Jackson — Google and Thumbtack reviews are how the next homeowner skips the bad bid. One paragraph. The town. The week count. That is the whole ask.",
    visual: "white-house-stained",
    cta: "Already a client? Reply REVIEW and we send the links.",
  },
  {
    platform: "Instagram",
    hook: "The underside is the job.",
    body: "Joists, tape, hardware you will never photograph and will absolutely feel in year five. This is why the cheap guy is cheaper.",
    visual: "dark-radius soffit / radius-underside",
    cta: "Ask your bidder what is under the boards. Then ask us.",
  },
];

export const SOCIAL_CALENDAR: SocialPost[] = Array.from({ length: 60 }, (_, i) => {
  const date = addDays(START, i);
  const day = new Date(date + "T12:00:00").getDay();
  // Post Mon/Wed/Fri/Sat (skip empty days as "prepare content")
  const postDays = new Set([1, 3, 5, 6]);
  if (!postDays.has(day)) {
    return {
      date,
      platform: "Facebook" as const,
      hook: "Production day — no public post",
      body: "Shoot one detail photo on the current job. Ask the homeowner for a two-sentence review. Load tomorrow's caption in Meta Business Suite.",
      visual: "On-site phone photos, geotagged",
      cta: "Internal",
    };
  }
  const t = TEMPLATES[i % TEMPLATES.length];
  return { ...t, date };
});

export const BLOG_CADENCE = "Tuesdays, 7:00 a.m. ET — publish the next scheduled journal post, then share the link to Facebook and as an Instagram carousel of 4 job photos plus the first paragraph.";
