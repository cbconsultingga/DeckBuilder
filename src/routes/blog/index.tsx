import { createFileRoute, Link } from "@tanstack/react-router";
import { livePosts, POSTS } from "@/lib/posts";
import { BLOG_CADENCE } from "@/lib/social";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Deck Building Journal | Bethlehem GA | Jeff's Radius Decks" },
      {
        name: "description",
        content:
          "Local deck advice for Bethlehem, Winder, Dacula, and 25 miles of 30620. Costs, permits, radius work, and how to hire a crew that shows up.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const live = livePosts();
  const upcoming = POSTS.filter((p) => !live.some((l) => l.slug === p.slug));

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">Journal</p>
      <h1 className="mt-3 font-display text-5xl">Written for the 25-mile radius.</h1>
      <p className="mt-4 text-muted-foreground">
        Auto-publishes on a Tuesday cadence. Indexed for homeowners searching
        deck cost, redeck, and radius in Bethlehem, GA.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{BLOG_CADENCE}</p>
      <div className="mt-12 space-y-4">
        {live.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="block rounded-xl bg-card p-6 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover"
          >
            <p className="text-xs text-muted-foreground">
              {p.date} · {p.city} · {p.read}
            </p>
            <h2 className="mt-2 font-display text-3xl">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </div>
      {upcoming.length ? (
        <div className="mt-16">
          <h2 className="font-display text-2xl">Scheduled</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {upcoming.map((p) => (
              <li key={p.slug}>
                <span className="text-foreground">{p.date}</span> — {p.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </main>
  );
}
