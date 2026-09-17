import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Timer, Ruler, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BeforeAfter, PhotoCarousel } from "@/components/media";
import { QuoteFunnel } from "@/components/funnel";
import { PUBLIC_BUSINESS_FEATURES } from "@/lib/business";
import { FAQS, PROOF_STATS, SERVICES, SITE, TESTIMONIALS, slotsThisWindow } from "@/lib/site";
import { BEFORE_AFTER, PHOTOS } from "@/lib/gallery";
import { livePosts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Deck Builder Bethlehem GA | Fast Redecks & Custom Radius | 30620",
      },
      {
        name: "description",
        content:
          "Jeff's Radius Decks: 12-year Bethlehem crew for homeowners in zip 30620 and 25 miles. Fast redecks, pressure-treated builds, true radius rails. Same-week measure for ready buyers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const slots = slotsThisWindow();
  const hero = PHOTOS[0];
  const carousel = PHOTOS.filter((p) => !p.src.includes("before"));
  const posts = livePosts().slice(0, 3);
  const ba = BEFORE_AFTER[0];

  return (
    <main>
      <section className="relative min-h-[92dvh] overflow-hidden bg-ink text-paper">
        <img
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/25" />
        <div className="relative mx-auto flex min-h-[92dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <Badge className="w-fit bg-paper/10 text-paper">
            Bethlehem · {SITE.zip} · 25-mile crew
          </Badge>
          <h1 className="mt-5 max-w-3xl font-display text-5xl text-paper sm:text-6xl md:text-7xl">
            The last deck you pay for.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            Jeff builds the radius work most crews will not touch. Right now the calendar is open
            for fast redecks and clean pressure-treated builds — so you have a finished, insured
            deck under your feet before the next Georgia storm.
          </p>
          <p className="mt-4 text-sm text-paper/60">{hero.caption}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link to="/quote">
                Get a same-week number
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="bg-paper/10 text-paper hover:bg-paper/20"
            >
              <Link to="/work">See the transformations</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-paper/55">
            {slots} measure slots left in this fall window. Homeowners only. Decision on the visit.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {PROOF_STATS.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <p className="font-display text-3xl text-cedar sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.18em] text-cedar uppercase">
            How we make money for you
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Fast jobs first. Custom when the house asks.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Radius is the craft. Redecks are the machine. You get the same crew either way — and you
            do not get a six-month maybe.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.id} className="rounded-xl bg-card p-6 shadow-border sm:p-8">
              <p className="text-xs tracking-[0.18em] text-cedar uppercase">{s.kicker}</p>
              <h3 className="mt-2 font-display text-3xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm">
                  From <span className="font-medium">{s.from}</span>
                </p>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/quote">
                    {s.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs tracking-[0.18em] text-paper/40 uppercase">Before / after</p>
            <h2 className="mt-3 font-display text-4xl text-paper sm:text-5xl">{ba.title}</h2>
            <p className="mt-2 text-sm text-paper/50">{ba.city}</p>
            <p className="mt-5 text-paper/75">{ba.story}</p>
            <Button asChild className="mt-8">
              <Link to="/work">
                Drag every transformation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <BeforeAfter
            beforeSrc={ba.before.src}
            afterSrc={ba.after.src}
            beforeAlt={ba.before.caption}
            afterAlt={ba.after.caption}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-[0.18em] text-cedar uppercase">The work</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Not stock photos. Job sites.</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/work">Full gallery</Link>
          </Button>
        </div>
        <PhotoCarousel photos={carousel.slice(0, 8)} />
      </section>

      {PUBLIC_BUSINESS_FEATURES.showTestimonials ? (
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs tracking-[0.18em] text-cedar uppercase">Neighbors, not actors</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl">
              People who already spent the money — and would again.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-xl bg-background p-6 shadow-border sm:p-8"
                >
                  <p className="font-display text-xl leading-snug sm:text-2xl">“{t.quote}”</p>
                  <footer className="mt-6 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.name}</span>
                    {" · "}
                    {t.city}
                    <span className="mt-1 block text-xs tracking-wide uppercase">{t.job}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.18em] text-cedar uppercase">Lead magnet</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            The 2026 Deck Rebuild Brief for 30620.
          </h2>
          <p className="mt-4 text-muted-foreground">
            What homeowners in Bethlehem and 25 miles actually pay. The three questions that kill a
            bad bid. When a redeck is enough — and when you are burning money on stain.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <Shield className="mt-0.5 size-4 text-cedar" />
              Written for people who can afford the right job, not a souvenir quote.
            </li>
            <li className="flex gap-3">
              <Timer className="mt-0.5 size-4 text-cedar" />
              Fall is the last clean window. Spring is a pile-up.
            </li>
            <li className="flex gap-3">
              <Ruler className="mt-0.5 size-4 text-cedar" />
              Finish the brief, then hold a measure slot the same day.
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 text-cedar" />
              Barrow, west Gwinnett, Jackson, Walton — if you are further, say so.
            </li>
          </ul>
          <Button asChild size="lg" className="mt-8">
            <Link to="/guide">Send me the brief</Link>
          </Button>
        </div>
        <QuoteFunnel compact />
      </section>

      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-4xl">Straight answers.</h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {posts.length ? (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl">From the shop journal</h2>
            <Link to="/blog" className="text-sm text-cedar">
              All posts
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-xl bg-card p-6 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover"
              >
                <p className="text-xs text-muted-foreground">
                  {p.city} · {p.date}
                </p>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-cedar px-4 py-16 text-primary-foreground sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-3xl sm:text-4xl">Ready this season, or not at all.</p>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
              If you need a committee, a miracle budget, or a maybe in March, we are the wrong crew.
              If you own the house and want it used by the holidays, hold a slot.
            </p>
          </div>
          <Button asChild size="xl" variant="secondary">
            <Link to="/quote">Hold a measure slot</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
