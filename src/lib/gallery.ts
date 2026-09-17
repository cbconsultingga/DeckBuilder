export type Photo = {
  src: string;
  alt: string;
  caption: string;
  project: string;
};

export const PHOTOS: Photo[] = [
  {
    src: "/gallery/complete-radius.jpg",
    alt: "Finished two-level radius deck with stained cedar rails and black iron balusters in Bethlehem Georgia",
    caption:
      "The curve is not decoration. It is how a back of house becomes the room you actually live in. Stained cedar rail, iron balusters, pressure-treated structure.",
    project: "Radius rebuild",
  },
  {
    src: "/gallery/after-rebuild.jpg",
    alt: "After photo of a full deck rebuild with radius upper deck and split stairs in Bethlehem GA 30620",
    caption:
      "Same house. New structure. Split stairs, radius upper, stained rails. This is what 'tear it down and do it right' looks like from the yard.",
    project: "Bethlehem rebuild",
  },
  {
    src: "/gallery/lifestyle-complete.jpg",
    alt: "Completed stained deck with radius balcony and lower patio in Barrow County Georgia",
    caption:
      "Two levels, one crew, one number. The upper radius reads custom. The lower run is where the grill and the kids actually land.",
    project: "Two-level custom",
  },
  {
    src: "/gallery/radius-underside.jpg",
    alt: "Close-up of a true radius deck rail with laminated cedar and steel balusters",
    caption:
      "A true radius. Laminated cedar, through-bolted posts, steel balusters on layout. This is the detail other crews tell you is impossible.",
    project: "Radius craft",
  },
  {
    src: "/gallery/cedar-cap.jpg",
    alt: "Close-up of a stained cedar curved cap rail on a custom deck",
    caption:
      "The cap you put your coffee on. Thick cedar, stained, eased edges. If the rail feels cheap in the hand, the whole deck feels cheap.",
    project: "Cedar cap",
  },
  {
    src: "/gallery/two-level-new.jpg",
    alt: "New two-story pressure treated deck with stairs and radius landing behind a gray house",
    caption:
      "New build, still in the clean lumber. Radius landing off the sunroom, split stairs to grade. This is a 10–14 day machine when the homeowner is ready.",
    project: "New PT build",
  },
  {
    src: "/gallery/radius-sunroom.jpg",
    alt: "Curved pressure treated deck wrapping a sunroom with black metal balusters",
    caption:
      "The sunroom already had the view. The rail had to follow it. Curved PT with iron balusters — fast material, custom geometry.",
    project: "Sunroom wrap",
  },
  {
    src: "/gallery/white-house-stained.jpg",
    alt: "Stained cedar deck and dual stair runs on a white two-story home in Gwinnett County",
    caption:
      "White siding, cedar stain, two stair runs. The house looked unfinished without this. Now it looks like the listing photo.",
    project: "Stained dual stair",
  },
  {
    src: "/gallery/brown-house-radius.jpg",
    alt: "Radius upper deck and long stair with stained rails on a brown two-story house",
    caption:
      "Long stair, radius upper, stained posts. Height is where cheap crews get people hurt. We overbuild the stringers and the rail.",
    project: "High radius",
  },
  {
    src: "/gallery/dark-radius.jpg",
    alt: "Dark stained radius balcony with lattice soffit and black balusters",
    caption:
      "Dark stain, radius edge, lattice soffit so the underside is not a cave. The house gained a room without adding a room.",
    project: "Dark radius balcony",
  },
  {
    src: "/gallery/solar-caps.jpg",
    alt: "Overhead view of a radius rail with solar post caps and picture frame decking",
    caption:
      "Solar caps on the posts, picture-frame decking, the curve carrying the stair. Night lighting without a sparky on the bid.",
    project: "Radius with caps",
  },
  {
    src: "/gallery/stair-landing.jpg",
    alt: "Looking down a new deck stair onto a diagonal-laid landing in Georgia",
    caption:
      "Diagonal landing boards. It is a small move that makes a square stair feel designed. Homeowners notice it every time they come down with a plate.",
    project: "Landing layout",
  },
  {
    src: "/gallery/herringbone.jpg",
    alt: "Picture frame and diagonal pressure treated decking with stained cedar rails",
    caption:
      "Picture-frame perimeter, diagonal field. This is how a pressure-treated deck stops looking like a lumberyard stack.",
    project: "Decking pattern",
  },
  {
    src: "/gallery/picture-frame.jpg",
    alt: "Close-up of picture-framed pressure treated pine deck boards",
    caption:
      "The field has to run true or the picture frame telegraphs every mistake. This is layout, not luck.",
    project: "Picture frame",
  },
  {
    src: "/gallery/house-edge.jpg",
    alt: "Pressure treated decking meeting house siding with a clean ledger line",
    caption:
      "Where the deck meets the house is where leaks start. Flashed ledger, clean board run, no caulk-as-a-plan.",
    project: "Ledger line",
  },
  {
    src: "/gallery/stained-stairs.jpg",
    alt: "Looking down stained cedar stairs with black balusters to a landing",
    caption:
      "A stair you are not afraid of in the rain. Closed, even rises, a rail that starts before you need it.",
    project: "Stair run",
  },
  {
    src: "/gallery/lower-stair.jpg",
    alt: "Lower stair with stained rails under a curved upper deck",
    caption:
      "The second run to grade. Most people cheap this because guests do not photograph it. We do not.",
    project: "Lower run",
  },
  {
    src: "/gallery/sunset-balusters.jpg",
    alt: "Sunset through black iron deck balusters on a custom radius deck in Georgia",
    caption:
      "This is the reason people spend the money. Not the spreadsheet. The hour after work, through the iron, on a deck that will still be here.",
    project: "Evenings",
  },
  {
    src: "/gallery/before-weathered.jpg",
    alt: "Before photo of a weathered elevated wood deck with failing rails in Bethlehem Georgia",
    caption:
      "Before. Weathered rails, tired structure, the kind of deck insurance notices and buyers discount.",
    project: "Bethlehem rebuild",
  },
  {
    src: "/gallery/before-pergola.jpg",
    alt: "Before photo of a mossy failing pergola and old elevated deck behind a beige home",
    caption:
      "Before. Moss on the beam, hardware rusting, a pergola that had already lost. Waiting another season was the expensive choice.",
    project: "Bethlehem rebuild",
  },
];

export const HERO_PHOTO = PHOTOS[0];

export const BEFORE_AFTER = [
  {
    id: "bethlehem-rebuild",
    title: "Bethlehem tear-off, full rebuild",
    city: "Bethlehem, GA 30620",
    before: {
      src: "/gallery/before-weathered.jpg",
      caption:
        "Failing rails, tired structure, a deck that made the house look older than it is.",
    },
    after: {
      src: "/gallery/after-rebuild.jpg",
      caption:
        "Radius upper, split stairs, stained cedar, iron balusters. Same footprint. Different house.",
    },
    story:
      "The homeowner had lived with the old deck until the rails got spongy. We tore to the posts that were still honest, rebuilt the rest, and put a radius on the upper because the yard deserved a view, not a box. Fall crew. One decision. Done.",
  },
  {
    id: "pergola-gone",
    title: "Kill the moss, keep the yard",
    city: "Bethlehem, GA",
    before: {
      src: "/gallery/before-pergola.jpg",
      caption: "A pergola that had already lost, sitting in front of a deck that was next.",
    },
    after: {
      src: "/gallery/stained-stairs.jpg",
      caption: "Clean stair, stained rail, a path you take on purpose.",
    },
    story:
      "The mossy beam was the warning. We did not paint over it. We replaced the path from the door to the grass so the backyard started working again.",
  },
];

export const PROJECTS = [
  {
    id: "radius-rebuild",
    title: "Radius upper, two-level",
    city: "Bethlehem / Barrow",
    material: "PT structure, stained cedar rail, iron balusters",
    photos: [
      "complete-radius.jpg",
      "lifestyle-complete.jpg",
      "lower-stair.jpg",
      "cedar-cap.jpg",
    ],
  },
  {
    id: "bethlehem-after",
    title: "Full rebuild",
    city: "Bethlehem, 30620",
    material: "Tear-off, radius, split stairs, stain",
    photos: [
      "after-rebuild.jpg",
      "herringbone.jpg",
      "picture-frame.jpg",
      "sunset-balusters.jpg",
    ],
  },
  {
    id: "new-pt",
    title: "New pressure-treated",
    city: "Barrow County",
    material: "PT, iron balusters, radius landing",
    photos: [
      "two-level-new.jpg",
      "radius-sunroom.jpg",
      "radius-underside.jpg",
      "stair-landing.jpg",
    ],
  },
  {
    id: "stained-high",
    title: "High stair + radius",
    city: "Gwinnett / Jackson",
    material: "Stained cedar, dual runs, solar caps",
    photos: [
      "white-house-stained.jpg",
      "brown-house-radius.jpg",
      "dark-radius.jpg",
      "solar-caps.jpg",
    ],
  },
] as const;
