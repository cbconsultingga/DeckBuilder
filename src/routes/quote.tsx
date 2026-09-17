import { createFileRoute, Link } from "@tanstack/react-router";
import { QuoteFunnel } from "@/components/funnel";
import { slotsThisWindow } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Same-Week Deck Number | Bethlehem GA | Jeff's Radius Decks" },
      {
        name: "description",
        content:
          "Hold a measure slot for a deck redeck, new build, or custom radius in Bethlehem, Georgia 30620. Homeowners only. Honest ranges. Same-week visits for ready jobs.",
      },
    ],
  }),
  component: Quote,
});

function Quote() {
  const slots = slotsThisWindow();
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <div>
        <p className="text-xs tracking-[0.18em] text-cedar uppercase">
          Lead funnel · {slots} slots this window
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Five minutes. A real range. A call if you qualify.
        </h1>
        <p className="mt-4 text-muted-foreground">
          This is not a contact form that goes to a void. It is a filter. We
          take homeowners inside 25 miles of 30620 who can decide on the visit
          and whose budget can touch a real deck. Everyone else still gets an
          honest brief.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-foreground">
          <li>No site visit fee for qualified jobs in the radius.</li>
          <li>AI crew brief on submit — range, not a fake exact bid.</li>
          <li>Jeff calls the same day when the job is real.</li>
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Want the numbers before the call?{" "}
          <Link to="/guide" className="text-cedar">
            Grab the 2026 Cost Brief.
          </Link>
        </p>
      </div>
      <QuoteFunnel />
    </main>
  );
}
