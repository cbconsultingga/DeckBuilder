import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { magnetUnlocked, newId, saveLead, unlockMagnet } from "@/lib/leads";
import { SERVICE_CITIES } from "@/lib/site";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "2026 Deck Rebuild Cost Brief | Bethlehem GA 30620 | Free" },
      {
        name: "description",
        content:
          "Free 2026 cost brief for Bethlehem, Winder, Dacula, and 25 miles of zip 30620. Redeck vs replace, radius premiums, and the bids to walk away from.",
      },
    ],
  }),
  component: Guide,
});

function Guide() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    setOpen(magnetUnlocked());
  }, []);

  function gate(e: FormEvent) {
    e.preventDefault();
    saveLead({
      id: newId(),
      createdAt: new Date().toISOString(),
      name,
      email,
      phone: "",
      zip,
      homeowner: true,
      jobType: "Cost brief",
      size: "",
      height: "",
      budget: "",
      timeline: "Brief download",
      source: "Lead magnet",
      notes: "",
      qualified: false,
      magnet: true,
    });
    unlockMagnet();
    setOpen(true);
  }

  if (!open) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-cedar uppercase">Lead magnet</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          The 2026 Deck Rebuild Brief.
        </h1>
        <p className="mt-4 text-muted-foreground">
          What homeowners in Bethlehem and 25 miles of 30620 actually pay. Three
          questions that kill a bad bid. When stain is a stall. Drop your name
          and we open the brief on this page — no PDF circus.
        </p>
        <form onSubmit={gate} className="mt-8 space-y-4 rounded-xl bg-card p-6 shadow-border">
          <div className="space-y-2">
            <Label htmlFor="n">Name</Label>
            <Input id="n" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="e">Email</Label>
            <Input
              id="e"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="z">Zip</Label>
            <Input
              id="z"
              inputMode="numeric"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Open the brief
          </Button>
          <p className="text-xs text-muted-foreground">
            No newsletter sludge. Jeff uses this to call people who are actually
            in the radius.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">Unlocked · 2026</p>
      <h1 className="mt-3 font-display text-5xl">Deck Rebuild Brief for zip 30620.</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Written for homeowners who can afford the right job and are tired of
        bids that pretend lumber is free.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-3xl">The numbers that hold</h2>
        <ul className="mt-4 space-y-3 text-foreground">
          <li>Sound-frame redeck: $8,500–$18,500</li>
          <li>New pressure-treated, one story: from $18,000</li>
          <li>Two-story with landings: $28,000–$45,000 is common</li>
          <li>True radius premium: $4,000–$12,000 over square</li>
          <li>Stairs only: from $4,800</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Composite, cable, and roofs sit on top. They are not a substitute for
          flashing and a rail a person can lean on.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Three questions that kill a bad bid</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          <li>Who pulls the permit, in which county?</li>
          <li>What is on the ledger — flashing, tape, fasteners — in writing?</li>
          <li>Can I see a radius you built, not a screenshot?</li>
        </ol>
        <p className="mt-4 text-muted-foreground">
          If any answer is a shrug, you are the warranty.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Redeck vs replace</h2>
        <p className="mt-4">
          Save the frame if posts, beams, and joists are still honest. Tear it
          down if a screwdriver goes in without trying, if the rail posts are
          toenailed into rotten rim, or if the last guy skipped flashing. Jeff
          crawls it. You see the photos. You decide once.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Towns we actually drive</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {SERVICE_CITIES.join(" · ")}
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-ink p-8 text-paper">
        <h2 className="font-display text-3xl text-paper">The brief is not the job.</h2>
        <p className="mt-3 text-paper/75">
          Fall still has dry weeks. Hold a measure slot while the crew has them.
          If you are not the owner, or the budget cannot touch $8,500 for a
          redeck, keep the brief and wait until both of those are true.
        </p>
        <Button asChild className="mt-6">
          <Link to="/quote">Get my crew brief + hold a slot</Link>
        </Button>
      </section>
    </main>
  );
}
