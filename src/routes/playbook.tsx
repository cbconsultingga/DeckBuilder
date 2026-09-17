import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { readLeads, type Lead } from "@/lib/leads";
import { DEFAULT_PROFILE, readProfile, writeProfile, type OwnerProfile } from "@/lib/profile";
import { SOCIAL_CALENDAR, BLOG_CADENCE } from "@/lib/social";
import { POSTS } from "@/lib/posts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playbook")({
  head: () => ({
    meta: [
      { title: "Operations Playbook | Jeff's Radius Decks" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Playbook,
});

function Playbook() {
  const [tab, setTab] = useState<"ops" | "leads" | "social" | "settings">("ops");
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">Internal · send this URL to Jeff</p>
      <h1 className="mt-3 font-display text-5xl">Operations playbook</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        How to plug in phone, Thumbtack, Facebook, Google Business, and Calendar
        so this site starts throwing qualified homeowners at the crew. Print or
        share. Do the setup in the order written.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["ops", "SOPs"],
            ["leads", "Lead inbox"],
            ["social", "60-day calendar"],
            ["settings", "Plug-in links"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-11 rounded-full px-4 text-sm shadow-border",
              tab === id ? "bg-ink text-paper" : "bg-card",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {tab === "ops" && <Sops />}
        {tab === "leads" && <Inbox />}
        {tab === "social" && <Calendar />}
        {tab === "settings" && <Settings />}
      </div>
    </main>
  );
}

function Sops() {
  return (
    <Accordion type="multiple" className="bg-card px-5 shadow-border rounded-xl">
      <AccordionItem value="order">
        <AccordionTrigger>Do this in order (week one)</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Fill Plug-in links with Jeff's real phone, email, Thumbtack, Facebook, Instagram, GBP, and calendar URL.</li>
            <li>Claim / clean Google Business Profile (full SOP below). Photos from this site, geotagged.</li>
            <li>Turn on Thumbtack Instant Book for redecks and repairs only. Custom radius stays "send a message."</li>
            <li>Connect a booking calendar (Google Calendar + a scheduling front). Put the public link in settings.</li>
            <li>Wire form notifications: Formspree, Google Sheets, or email forward. Until then, check Lead inbox on this page after every demo.</li>
            <li>Post the first 7 days of the social calendar. Ask three past clients for Google + Thumbtack reviews.</li>
            <li>Set the blog cadence: {BLOG_CADENCE}</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="gbp">
        <AccordionTrigger>Google Business Profile — lead machine</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              Search "Google Business Profile" → Manage now. If a listing for
              the old name exists, claim it. If not, create: Jeff's Radius Decks,
              primary category <strong>Deck Builder</strong>, secondary
              Carpenter, Fence Contractor (only if true), General Contractor.
            </p>
            <h3 className="font-medium text-foreground">Service area, not a fake storefront</h3>
            <p>
              Set as a service-area business based in Bethlehem, GA 30620.
              Service area: 25 miles, or explicitly add Barrow, west Gwinnett,
              Jackson, Walton, Oconee, south Hall, west Clarke. Hours: crew
              hours (e.g. Mon–Fri 7:30–5, Sat measure-only 8–12). Phone: the
              tracking number from settings.
            </p>
            <h3 className="font-medium text-foreground">Description (paste)</h3>
            <p>
              Jeff's Radius Decks builds custom radius decks and fast redecks
              for homeowners in Bethlehem, Georgia (30620) and 25 miles. Twelve
              years on Georgia structures. Pressure-treated new builds, stained
              cedar rails, iron balusters, stairs, and true curved caps most
              crews will not touch. Typical redeck 10–14 days. Permits pulled.
              Homeowners only — ready to decide on the visit.
            </p>
            <h3 className="font-medium text-foreground">Photos + geolocation</h3>
            <ol className="list-decimal space-y-2 pl-5">
              <li>On an iPhone: Settings → Privacy → Location Services → Camera → While Using. Android: Camera location tags ON.</li>
              <li>Shoot every job from the street, the yard, the rail, the underside, and a detail. Do not crop out the house context.</li>
              <li>Before upload, confirm EXIF GPS: on desktop, Preview/Photos inspect, or use a free EXIF viewer. Photos without GPS still help, but GBP ranks local photos with coordinates inside the service area harder.</li>
              <li>Upload 15–25 photos in week one from this site's gallery plus any extras. Cover: logo, team (even one shot of Jeff), exterior of a finished job, before/after albums, and "at work" shots.</li>
              <li>Create photo categories: Exteriors, At work, Before & after. Add a product: Redeck from $8,500; New PT from $18,000; Custom radius — call.</li>
              <li>Monthly: 4 new photos minimum. Never let the profile go 30 days without a photo or a Google Post.</li>
            </ol>
            <h3 className="font-medium text-foreground">Posts, Q&A, reviews, messages</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Google Post weekly. Use the social calendar hooks. Always a button: Book or Learn more → this site's /quote.</li>
              <li>Seed Q&A yourself: "Do you do redecks in Winder?" Yes. "Do you need to be the homeowner?" Yes. "Radius decks?" Specialty.</li>
              <li>Reviews: after final walkthrough, text the client the GBP short link. Ask for town + job type in the first sentence. Reply to every review in 24 hours, even stars.</li>
              <li>Turn on messaging. Saved reply: "Thanks — zip and a couple photos and Jeff will tell you if we can measure this week."</li>
              <li>Utm the website field: your live domain with ?utm_source=google&utm_medium=organic&utm_campaign=gbp</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="cal">
        <AccordionTrigger>Google Calendar + booking</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Create a Google account the crew actually checks, or a calendar named "Measures" on Jeff's account.</li>
            <li>In Google Calendar: Settings → Add calendar → Create. Color it cedar in your head. Share with the lead carpenter (see all event details).</li>
            <li>Appointment schedule: Settings → Appointment schedules → New. Service "On-site measure — 45 min." Location: customer's address. Buffer 30 min. Window: Tue–Fri 9–4, Sat 8–12. Max 2 measures/day so estimates still get built.</li>
            <li>Booking page: copy the public Google Appointment link into Plug-in links → Calendar. When present, the quote thank-you can point at it.</li>
            <li>Alternative: Calendly or Accuity on top of the same Google calendar if you want SMS reminders. Same link field.</li>
            <li>Missed-measure rule: if they no-show, one text, then the slot dies. Do not chase tire-kickers.</li>
            <li>Block travel: 25 miles from 30620. If a lead is Athens-east or past Lawrenceville-south, add a trip charge on the calendar notes before confirming.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tt">
        <AccordionTrigger>Thumbtack — you already paid for this, squeeze it</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p>
              Jeff has time in Thumbtack. Treat it as a paid front door, not a
              personality. The site should steal the high-intent traffic; Thumbtack
              should close the people already in "hire" mode.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Profile name: Jeff's Radius Decks — Bethlehem GA.</li>
              <li>Intro: first two lines must say zip 30620, 25-mile radius, redecks + custom radius, homeowners only.</li>
              <li>Upload the same gallery. Put before/after first. Captions with town names.</li>
              <li>Services: Decks, Redecking, Stairs, Custom woodwork. Price guides that match the brief (do not undercut the site).</li>
              <li>Instant Book: ON for "repair / small stair" only. OFF for full custom so you do not get a $2,500 dreamer auto-booked.</li>
              <li>Response time: under 5 minutes 8am–6pm. Saved reply: "Zip, photos of the underside and the rail, and whether you own the house. If the job is real we measure this week."</li>
              <li>Decline out of area fast — it protects your metrics.</li>
              <li>Reviews: after every job, send the Thumbtack review link in the same text as Google. Two platforms, one ask.</li>
              <li>Weekly: 3 new photos. Once a month: boost only in 30620, 30680, 30011, 30019, 30548, 30666.</li>
              <li>On this website, the footer points at Thumbtack once the real URL is in settings. Never send a qualified inbound web lead back into a bid war if you can call them first.</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="social">
        <AccordionTrigger>Facebook, Instagram, and the 60-day engine</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Facebook Page: Jeff's Radius Decks. Category Deck Builder. Same 30620 NAP as GBP. CTA button: Get quote → /quote.</li>
            <li>Instagram: business account, same name, link in bio to the site. Highlight covers: Radius, Redecks, Stairs, Before/After.</li>
            <li>Meta Business Suite: connect both. Schedule the 60-day calendar (this page, Social tab). Best times locally: Wed 11:30a, Sat 9:00a, Sun 4:00p.</li>
            <li>Every post: one photo from a real job, town in the first line, one CTA. No stock. Geotag Bethlehem, Winder, Dacula, Hoschton as relevant.</li>
            <li>Boost $5–$12 only on posts with a finished after photo, targeting homeowners 35–64, 25 mi of 30620, interests home improvement. Kill ads that do not produce messages in 48 hours.</li>
            <li>DM script: "Zip and a photo of the rail and the underside. If you own it and you are building this season, Jeff will call."</li>
            <li>Never argue in comments. Offer the brief, then the quote form.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="leads">
        <AccordionTrigger>Lead routing — from click to cash</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Web form (this site) is the primary. Qualified = homeowner + in radius + budget ≥ $8,500 + timeline not "just looking."</li>
            <li>Until email is wired: open Operations → Lead inbox daily. Call qualified leads within 30 minutes.</li>
            <li>Wire production later: Formspree or a Google Sheet + Zapier "new lead → email Jeff + SMS + calendar draft." Do not dump personal data on a public spreadsheet.</li>
            <li>Call script: name, confirm zip, confirm they own it, ask what is spongy, offer Tue/Thu measure. If they want three more bids, politely end it. Log the reason.</li>
            <li>After measure: written range same day. 48-hour decision window. Fall slots do not sit.</li>
            <li>Won job: deposit, permit, schedule. Ask for review at substantial completion, not six months later.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="blog">
        <AccordionTrigger>Blog auto-post schedule</AccordionTrigger>
        <AccordionContent>
          <p className="mb-3">{BLOG_CADENCE}</p>
          <ul className="list-disc space-y-1 pl-5">
            {POSTS.map((p) => (
              <li key={p.slug}>
                {p.date} — {p.title}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Posts with dates in the future stay hidden until that morning. On
            publish day, share to Facebook (link) and Instagram (4-photo
            carousel + first paragraph). Then GBP post with the same URL.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Inbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => setLeads(readLeads()), []);
  if (!leads.length) {
    return (
      <p className="text-muted-foreground">
        No leads in this browser yet. Submit the quote form or the cost brief
        once — they land here so you can see the funnel work.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {leads.map((l) => (
        <article key={l.id} className="rounded-xl bg-card p-5 shadow-border">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl">{l.name || "Unnamed"}</h3>
            <span className={cn("text-xs tracking-wide uppercase", l.qualified ? "text-cedar" : "text-muted-foreground")}>
              {l.qualified ? "Qualified" : "Unqualified / magnet"}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {l.email} · {l.phone} · {l.zip} · {new Date(l.createdAt).toLocaleString()}
          </p>
          <p className="mt-3 text-sm">
            {l.jobType} · {l.size} · {l.height} · {l.budget} · {l.timeline} · {l.source}
          </p>
          {l.notes ? <p className="mt-2 text-sm">{l.notes}</p> : null}
          {l.estimate ? (
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-muted-foreground">
              {l.estimate}
            </pre>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function Calendar() {
  const rows = useMemo(() => SOCIAL_CALENDAR, []);
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        60 days from Sep 17, 2026. Copy into Meta Business Suite and Thumbtack.
        Days marked "Production day" are for shooting and review asks — still
        work, just not a public post.
      </p>
      {rows.map((r) => (
        <article key={r.date + r.hook} className="rounded-lg bg-card p-4 shadow-border">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {r.date} · {r.platform}
          </p>
          <h3 className="mt-1 font-display text-xl">{r.hook}</h3>
          <p className="mt-2 text-sm">{r.body}</p>
          <p className="mt-2 text-xs text-muted-foreground">Visual: {r.visual}</p>
          <p className="text-xs text-cedar">CTA: {r.cta}</p>
        </article>
      ))}
    </div>
  );
}

function Settings() {
  const [p, setP] = useState<OwnerProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  useEffect(() => setP(readProfile()), []);
  return (
    <form
      className="space-y-4 rounded-xl bg-card p-6 shadow-border"
      onSubmit={(e) => {
        e.preventDefault();
        writeProfile(p);
        window.dispatchEvent(new Event("jrd-profile"));
        setSaved(true);
      }}
    >
      <p className="text-sm text-muted-foreground">
        Stored in this browser. Phone and Thumbtack show in the header and
        footer as soon as you save. For production, also paste the same values
        into the site config before a long-term deploy.
      </p>
      {(
        [
          ["phone", "Phone"],
          ["email", "Email for lead notices"],
          ["thumbtack", "Thumbtack profile URL"],
          ["facebook", "Facebook Page URL"],
          ["instagram", "Instagram URL"],
          ["gbp", "Google Business Profile URL"],
          ["calendar", "Google Appointment / Calendly URL"],
        ] as const
      ).map(([key, label]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{label}</Label>
          {key === "email" ? (
            <Input
              id={key}
              type="email"
              value={p[key]}
              onChange={(e) => setP({ ...p, [key]: e.target.value })}
            />
          ) : (
            <Input
              id={key}
              value={p[key]}
              onChange={(e) => setP({ ...p, [key]: e.target.value })}
            />
          )}
        </div>
      ))}
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea placeholder="License #, insurance agent, permit contacts…" readOnly={false} />
      </div>
      <Button type="submit">Save on this device</Button>
      {saved ? <p className="text-sm text-cedar">Saved. Header and footer will pick this up.</p> : null}
    </form>
  );
}
