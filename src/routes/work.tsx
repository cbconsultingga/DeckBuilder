import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BeforeAfter, PhotoCarousel } from "@/components/media";
import { BEFORE_AFTER, PHOTOS, PROJECTS } from "@/lib/gallery";
import { slotsThisWindow } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Deck Transformations | Radius & Redecks | Bethlehem GA 30620" },
      {
        name: "description",
        content:
          "Before-and-after deck rebuilds, custom radius rails, and pressure-treated builds by Jeff's Radius Decks in Bethlehem, Georgia and 25 miles of zip 30620.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  const [filter, setFilter] = useState<string>("all");
  const slots = slotsThisWindow();
  const photos = useMemo(() => {
    if (filter === "all") return PHOTOS;
    return PHOTOS.filter((p) => p.project.toLowerCase().includes(filter));
  }, [filter]);

  return (
    <main>
      <header className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.18em] text-paper/40 uppercase">
            Bethlehem · Barrow · Gwinnett · Jackson
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-paper sm:text-6xl">
            Proof you can lean on.
          </h1>
          <p className="mt-4 max-w-xl text-paper/70">
            Every photo is a job. Captions are the truth of the build — not
            marketing fog. Drag the sliders. Then send the zip.
          </p>
          <Button asChild className="mt-8">
            <Link to="/quote">Hold one of {slots} measure slots</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        {BEFORE_AFTER.map((ba) => (
          <article key={ba.id} className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <BeforeAfter
              beforeSrc={ba.before.src}
              afterSrc={ba.after.src}
              beforeAlt={ba.before.caption}
              afterAlt={ba.after.caption}
            />
            <div>
              <p className="text-xs tracking-[0.18em] text-cedar uppercase">{ba.city}</p>
              <h2 className="mt-2 font-display text-4xl">{ba.title}</h2>
              <p className="mt-4 text-muted-foreground">{ba.story}</p>
              <p className="mt-4 text-sm text-foreground">{ba.after.caption}</p>
              <Button asChild className="mt-6">
                <Link to="/quote">Build mine like this</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-4xl">Job carousels</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Four bodies of work. Same hardware philosophy. Different houses.
          </p>
          <div className="mt-10 space-y-16">
            {PROJECTS.map((p) => {
              const shots = p.photos
                .map((file) => PHOTOS.find((ph) => ph.src.endsWith(file)))
                .filter(Boolean);
              return (
                <div key={p.id}>
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <h3 className="font-display text-3xl">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.city} · {p.material}
                    </p>
                  </div>
                  <PhotoCarousel photos={shots as typeof PHOTOS} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {["all", "radius", "rebuild", "stair", "decking"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "h-10 rounded-full px-4 text-sm capitalize shadow-border",
                filter === f ? "bg-ink text-paper" : "bg-card",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <figure key={p.src} className="overflow-hidden rounded-xl bg-ink">
              <img src={p.src} alt={p.alt} className="media aspect-4/3 w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm text-paper/85">
                <span className="block text-xs tracking-widest text-paper/45 uppercase">
                  {p.project}
                </span>
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-cedar px-6 py-10 text-primary-foreground">
          <h2 className="font-display text-3xl">If this looks like your house, it can be next.</h2>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
            Ready homeowners get the next measure. Bring the decision. We bring
            the tape.
          </p>
          <Button asChild variant="secondary" className="mt-6">
            <Link to="/quote">Get a same-week number</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
