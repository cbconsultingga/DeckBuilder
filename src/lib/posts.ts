export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  city: string;
  read: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "deck-rebuild-cost-bethlehem-ga-2026",
    title: "What a deck actually costs in Bethlehem, GA in 2026",
    excerpt:
      "Real ranges for redecks, new pressure-treated builds, and radius work inside 25 miles of zip 30620 — and the bids you should walk away from.",
    date: "2026-08-04",
    city: "Bethlehem",
    read: "7 min",
    body: [
      {
        t: "p",
        text: "If you own a house in Bethlehem, Winder, Dacula, or Hoschton, you have already collected three numbers that do not match. One is a handshake from a guy with a truck. One is a Thumbtack bid that forgot the stairs. One is high enough that you closed the tab. This is the map Jeff uses when a homeowner in zip 30620 asks what the job is worth in 2026.",
      },
      { t: "h2", text: "The ranges that hold up in Barrow County" },
      {
        t: "ul",
        items: [
          "Sound-frame redeck, standard rail, iron balusters: $8,500–$18,500",
          "New pressure-treated build, one story: from $18,000",
          "Two-story with landings: $28,000–$45,000 is common once height and stairs are honest",
          "True radius rail and picture-frame decking: plan a premium of $4,000–$12,000 over square",
          "Stairs only: from $4,800 if the structure can take them",
        ],
      },
      {
        t: "p",
        text: "These are not internet averages from Cleveland. They are what a permitted, flashed, inspected deck costs when the crew lives here and the lumber is walking through Georgia humidity. Composite, cable rail, and covered roofs sit on top of this — they are not a substitute for a structure.",
      },
      { t: "h2", text: "Why the cheap bid is the expensive one" },
      {
        t: "p",
        text: "A $6,200 'rebuild' in this market is a re-skin with leftover fasteners and no joist tape. You will pay for it again when the ledger pulls or the inspector fails the rail. Insurance notices spongy boards. Buyers discount them. Waiting a season does not freeze the price — it adds demo.",
      },
      {
        t: "quote",
        text: "If the number cannot touch $8,500 for a real redeck, you are not buying a deck. You are buying a delay.",
      },
      { t: "h2", text: "How to use this without getting played" },
      {
        t: "p",
        text: "Put every bid next to three lines: flashing at the house, post-to-beam hardware, and a rail a grown man can lean on. If those are 'allowances,' it is not a bid. Jeff's crew prices them in. Fall is the last clean window before winter rain sits in the joists. Ready homeowners in the 25-mile radius get a same-week measure.",
      },
    ],
  },
  {
    slug: "redeck-vs-replace-barrow-county",
    title: "Redeck or replace? A Barrow County rule of thumb",
    excerpt:
      "When the frame can be saved, a 10–14 day redeck is the fastest way to stop throwing money at a dying surface.",
    date: "2026-08-18",
    city: "Winder",
    read: "6 min",
    body: [
      {
        t: "p",
        text: "Most homeowners in Winder and Bethlehem call because the boards look tired. The boards are rarely the whole story. A redeck is the right move when the posts, beams, and joists are still honest. A replace is the right move when they are not. Guessing that from the yard is how you buy the job twice.",
      },
      { t: "h2", text: "Save the frame if" },
      {
        t: "ul",
        items: [
          "Posts are plumb and the bases are not compost",
          "Beams are not split through the hardware",
          "Joists have bounce, not crunch",
          "The ledger is flashed or can be re-flashed without opening the house",
        ],
      },
      { t: "h2", text: "Tear it down if" },
      {
        t: "ul",
        items: [
          "You can push a screwdriver into a joist without trying",
          "The rail posts are toenailed into rotten rim",
          "The last guy skipped flashing and the siding is staining",
          "The stairs have already been 'fixed' once with sistered stringers",
        ],
      },
      {
        t: "p",
        text: "Jeff crawls it with a camera on the visit. You see what he sees. If the frame is sound, a redeck with iron balusters and a real cap rail changes the house in two weeks. If it is not, he will not take your money to hide it. That is the entire sales pitch.",
      },
    ],
  },
  {
    slug: "signs-your-deck-is-failing-georgia",
    title: "Seven signs your Georgia deck is already failing",
    excerpt:
      "Humidity, fasteners, and a rail that moves. What homeowners in 30620 should look at before the next party.",
    date: "2026-09-02",
    city: "Dacula",
    read: "5 min",
    body: [
      {
        t: "p",
        text: "Georgia does not rot decks in a dramatic Hollywood way. It does it quietly, under the stain, at the ledger, in the end grain of a post that sat in soil. If you host in Dacula, Auburn, or Bethlehem, walk the deck this weekend with these seven checks.",
      },
      {
        t: "ul",
        items: [
          "The rail moves when you lean. A rail is a life-safety system, not a trim piece.",
          "Boards cup and hold water after a storm. That water is going somewhere.",
          "Fastener stains like black tears. The metal is talking.",
          "A bounce that used to be 'character' and is now a dip.",
          "Siding above the ledger is bubbling or dirty in a line.",
          "Stairs that do not feel even — someone already patched a stringer.",
          "You have not seen the undersides in two years. That is the tell.",
        ],
      },
      {
        t: "p",
        text: "One of those is a maintenance day. Three of those is a crew. Waiting for a board to break at a birthday party is a choice, even if it does not feel like one. Fall still has dry weeks. Winter does not.",
      },
    ],
  },
  {
    slug: "why-a-radius-deck-is-worth-it",
    title: "Why a radius deck costs more — and when it is worth every dollar",
    excerpt:
      "Most crews will not bend a rail. That is the point. When the house asks for a curve, a square box makes the whole property look unfinished.",
    date: "2026-09-16",
    city: "Hoschton",
    read: "6 min",
    body: [
      {
        t: "p",
        text: "A radius is not a flourish. It is what happens when the architecture already has a bow — a sunroom, a bay, a yard that wraps — and you refuse to put a plywood rectangle on it. Jeff's shop is built around that refusal.",
      },
      { t: "h2", text: "Where the money goes" },
      {
        t: "p",
        text: "Laminated caps, custom layout, more posts, more steel, more time on the jig. A curve that is 'close enough' reads as a mistake in every photo. A true radius reads as the house costing more than it did. That is why people in Hoschton and Braselton pay the premium: resale photos, the view from the kitchen, the way guests walk the edge.",
      },
      { t: "h2", text: "When you should not buy one" },
      {
        t: "p",
        text: "If the house is a straight ranch and you just want out of the mud, buy a clean square deck with a good rail and go live your life. Jeff will say that on the visit. The specialty is not a hammer looking for a nail. It is a shop that can do the hard geometry when the house needs it — and still stack fast redecks when you need those instead.",
      },
    ],
  },
  {
    slug: "pressure-treated-vs-composite-georgia-humidity",
    title: "Pressure-treated vs composite in Georgia humidity",
    excerpt:
      "Composite is a product. Pressure-treated is a structure. In Barrow County they are not substitutes, and the brochure will not tell you that.",
    date: "2026-09-23",
    city: "Auburn",
    read: "7 min",
    body: [
      {
        t: "p",
        text: "Every homeowner within 25 miles of Bethlehem gets the composite pitch. Cooler. No splinters. 'Maintenance-free.' Then August arrives, the boards still get dirty, and the frame underneath is the same pine it always was. Here is the grown-up version.",
      },
      { t: "h2", text: "What we actually recommend" },
      {
        t: "p",
        text: "For most jobs we want to turn in 10–14 days, pressure-treated structure and walking surface, iron balusters, a stained cedar cap if you want the hand to feel expensive. Composite belongs on the surface when you have the budget and you hate the look of grain — not as a way to skip flashing, joist tape, or a real rail.",
      },
      {
        t: "ul",
        items: [
          "PT wins on speed, repairability, and the bid you can start this month",
          "Composite wins on fade and splinters, and adds thousands",
          "Neither one saves a rotten ledger",
          "Stain on cedar rails is maintenance. So is soap on composite. Pick your Saturday.",
        ],
      },
      {
        t: "p",
        text: "If a bid uses composite to hide a light frame, walk. Jeff will spec PT when it is the honest material, and composite when you ask for it and the structure can carry it. That is the whole conversation.",
      },
    ],
  },
  {
    slug: "questions-to-ask-a-deck-builder-gwinnett",
    title: "Eleven questions that separate a deck crew from a guy with a saw",
    excerpt:
      "Use this list on every bid in Gwinnett, Barrow, and Jackson. The answers tell you if you will still like them in year three.",
    date: "2026-09-30",
    city: "Lawrenceville",
    read: "8 min",
    body: [
      {
        t: "p",
        text: "Ready homeowners do not need more brochures. They need a filter. Ask these eleven, write the answers down, and you will stop taking meetings that waste a Saturday.",
      },
      {
        t: "ul",
        items: [
          "Who pulls the permit, and in which county?",
          "What is on the ledger — flashing, tape, fasteners — in writing?",
          "Are the posts in-ground or on piers, and why?",
          "What is the rail post connection? Toenails are not an answer.",
          "Who is on site? Subbed labor or the crew in the photos?",
          "What does a change-order look like?",
          "How do you handle HOA and inspections?",
          "Can I see a radius you built, not a Pinterest save?",
          "What is the start date, not the 'weather permitting' poem?",
          "What does the number exclude?",
          "Will you still pick up the phone in 18 months?",
        ],
      },
      {
        t: "p",
        text: "Jeff's answers are boring, which is the goal. Permit in the county that owns you. Flashing specified. Crew of four plus Jeff. Start date on the calendar. Radius work in the gallery because it is the shop specialty, not a rumor. If a bidder gets cute on three of these, you already know.",
      },
    ],
  },
  {
    slug: "barrow-county-deck-permits",
    title: "Deck permits in Barrow County and the towns around 30620",
    excerpt:
      "What usually needs a permit, why 'my cousin did it without one' is not a plan, and how a clean inspection protects the sale of the house.",
    date: "2026-10-07",
    city: "Bethlehem",
    read: "6 min",
    body: [
      {
        t: "p",
        text: "Barrow County, Gwinnett, Jackson, and Walton do not share a brain. Height, attachment to the house, and stairs change what the inspector wants to see. Jeff pulls what the jurisdiction requires so you are not explaining an unpermitted structure to a buyer in four years.",
      },
      { t: "h2", text: "The short version" },
      {
        t: "p",
        text: "If it is attached, elevated, or replacing something that was permitted, assume a permit. If a bidder boasts that they 'don't mess with the county,' they are asking you to hold the risk. That risk shows up at closing, in insurance, and when a rail fails.",
      },
      {
        t: "p",
        text: "Our bids include the permit path. You are not the project manager. You are the homeowner who wants to use the deck.",
      },
    ],
  },
  {
    slug: "finish-the-deck-before-the-holidays",
    title: "The fall window: finish the deck before the holidays",
    excerpt:
      "From late September through early November, Barrow County still has buildable weeks. After that you are staining in the wet or waiting until spring while the old deck keeps rotting.",
    date: "2026-10-14",
    city: "Statham",
    read: "5 min",
    body: [
      {
        t: "p",
        text: "Thanksgiving on a spongy deck is a tradition a lot of families in Statham and Monroe did not mean to keep. Fall is when Jeff stacks the fast jobs — redecks, clean PT builds, stair rescues — so the crew stays sharp and homeowners get the thing in time to use it.",
      },
      {
        t: "p",
        text: "A typical redeck is 10–14 working days once we start. Custom radius takes longer because the rail is built, not guessed. Either way, the constraint is not lumber. It is whether you can decide on the visit. Measure slots in this window go to people who can.",
      },
      {
        t: "quote",
        text: "Spring is a pile-up. Fall is a decision. The homeowners who understand that eat outside in November.",
      },
    ],
  },
];

export function isLive(post: Post, now = new Date()) {
  return new Date(post.date + "T12:00:00") <= now;
}

export function livePosts(now = new Date()) {
  return POSTS.filter((p) => isLive(p, now)).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
