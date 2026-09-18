import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { PUBLIC_BUSINESS_PROFILE } from "@/lib/business";
import { requestEstimate } from "@/lib/estimate";
import { captureLead, type LeadCaptureReceipt } from "@/lib/lead-capture";
import { safePublicUrl } from "@/lib/lead-routing";
import { isInServiceZip, slotsThisWindow } from "@/lib/site";
import { unlockMagnet } from "@/lib/leads";
import { cn } from "@/lib/utils";

const JOBS = [
  { id: "Redeck", label: "Redeck / resurface", hint: "Frame is mostly sound" },
  { id: "New pressure-treated build", label: "New PT build", hint: "From the posts up" },
  { id: "Custom radius", label: "Custom radius", hint: "Curves, the specialty" },
  { id: "Stairs and landings", label: "Stairs / landings", hint: "Make the path work" },
  { id: "Repair / rescue", label: "Repair / rescue", hint: "Stop the rot" },
];

const SIZES = ["Under 200 sq ft", "200–400 sq ft", "400–600 sq ft", "600+ sq ft"];
const HEIGHTS = ["Close to grade", "One story", "Two story / high"];
const BUDGETS = [
  { id: "Under $8,500", warn: true },
  { id: "$8,500–$15,000" },
  { id: "$15,000–$25,000" },
  { id: "$25,000–$40,000" },
  { id: "$40,000+" },
];
const TIMES = [
  { id: "This month", hot: true },
  { id: "Next 30 days", hot: true },
  { id: "Next 60 days" },
  { id: "Just looking", warn: true },
];
const SOURCES = ["Google", "Thumbtack", "Neighbor / referral", "Facebook", "Instagram", "Drove by"];

type Draft = {
  zip: string;
  homeowner: boolean | null;
  contactConsent: boolean;
  jobType: string;
  size: string;
  height: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  notes: string;
};

const empty: Draft = {
  zip: "",
  homeowner: null,
  contactConsent: false,
  jobType: "",
  size: "",
  height: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  source: "",
  notes: "",
};

function Choice({
  active,
  onClick,
  title,
  hint,
  warn,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
  warn?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-4 py-3.5 text-left shadow-border transition-[box-shadow,background-color] duration-150",
        active ? "bg-ink text-paper" : "bg-card text-foreground hover:shadow-border-hover",
        warn && active && "bg-muted text-foreground",
      )}
    >
      <span className="block text-sm font-medium">{title}</span>
      {hint ? (
        <span
          className={cn("mt-0.5 block text-xs", active ? "text-paper/70" : "text-muted-foreground")}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

export function QuoteFunnel({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(empty);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<LeadCaptureReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const slots = slotsThisWindow();
  const bookingUrl = safePublicUrl(PUBLIC_BUSINESS_PROFILE.calendar);

  function patch(p: Partial<Draft>) {
    setDraft((d) => ({ ...d, ...p }));
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const estimate = await requestEstimate({
        data: {
          zip: draft.zip,
          homeowner: draft.homeowner === true,
          jobType: draft.jobType,
          size: draft.size,
          height: draft.height,
          budget: draft.budget,
          timeline: draft.timeline,
          notes: draft.notes,
          name: draft.name,
        },
      });
      const captured = await captureLead({
        data: {
          kind: "quote",
          name: draft.name,
          email: draft.email,
          phone: draft.phone,
          zip: draft.zip,
          homeowner: draft.homeowner === true,
          contactConsent: draft.contactConsent,
          jobType: draft.jobType,
          size: draft.size,
          height: draft.height,
          budget: draft.budget,
          timeline: draft.timeline,
          source: draft.source,
          notes: draft.notes,
          estimate: estimate.text,
        },
      });
      unlockMagnet();
      setReceipt(captured);
      setResult(estimate.text);
    } catch {
      setError("Something snagged. Please call the crew or try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    const readyToBook =
      receipt?.qualification === "qualified" && receipt.bookingStatus === "ready" && bookingUrl;
    return (
      <div className="rounded-xl bg-card p-6 shadow-border sm:p-8">
        <p className="text-xs tracking-[0.18em] text-cedar uppercase">
          {receipt?.qualification === "qualified" ? "Qualified · measure next" : "Request received"}
        </p>
        <h3 className="mt-2 font-display text-3xl">Your crew brief</h3>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {result}
        </p>
        <p className="mt-6 text-sm text-foreground">
          {receipt?.qualification === "qualified"
            ? receipt.durable
              ? `Your request is in the crew queue. Jeff's next open window has ${slots} measure slots.`
              : "Preview request captured. In production, ready homeowners are routed straight into the crew queue."
            : "You still have the brief. If the job becomes a fit this season, send the details again and the crew will review it."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {readyToBook ? (
            <Button asChild>
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Choose a measure time
              </a>
            </Button>
          ) : null}
          <Button asChild variant={readyToBook ? "outline" : "default"}>
            <Link to="/guide">Open the 2026 Cost Brief</Link>
          </Button>
        </div>
      </div>
    );
  }

  const steps = compact ? 5 : 5;

  return (
    <form
      className="rounded-xl bg-card p-5 shadow-border sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 4) setStep((s) => s + 1);
        else void submit();
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Step {step + 1} of {steps}
        </p>
        <p className="text-xs text-cedar">{slots} measure slots this window</p>
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-cedar transition-[width] duration-200"
          style={{ width: `${((step + 1) / steps) * 100}%` }}
        />
      </div>

      {step === 0 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl sm:text-3xl">Tell us the house is yours.</legend>
          <p className="text-sm text-muted-foreground">
            We drive 25 miles from zip 30620. We work for the person who owns the deed and can nod
            on the visit.
          </p>
          <div className="space-y-2">
            <Label htmlFor="zip">Zip code</Label>
            <Input
              id="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="30620"
              value={draft.zip}
              onChange={(e) => patch({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })}
              required
            />
            {draft.zip.length === 5 && !isInServiceZip(draft.zip) ? (
              <p className="text-sm text-cedar">
                That sits outside our usual 25 miles. Still send it — travel may apply.
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Choice
              active={draft.homeowner === true}
              onClick={() => patch({ homeowner: true })}
              title="I own it"
              hint="Decision-maker"
            />
            <Choice
              active={draft.homeowner === false}
              onClick={() => patch({ homeowner: false })}
              title="Not the owner"
              hint="We will pass"
              warn
            />
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl sm:text-3xl">What needs to happen.</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {JOBS.map((j) => (
              <Choice
                key={j.id}
                active={draft.jobType === j.id}
                onClick={() => patch({ jobType: j.id })}
                title={j.label}
                hint={j.hint}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl sm:text-3xl">Size and height.</legend>
          <p className="text-sm text-muted-foreground">
            Close enough is fine. The tape finishes it.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SIZES.map((s) => (
              <Choice
                key={s}
                active={draft.size === s}
                onClick={() => patch({ size: s })}
                title={s}
              />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {HEIGHTS.map((s) => (
              <Choice
                key={s}
                active={draft.height === s}
                onClick={() => patch({ height: s })}
                title={s}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl sm:text-3xl">
            Budget and speed. Be adult about it.
          </legend>
          <p className="text-sm text-muted-foreground">
            Most redecks here start around $8,500. New builds from $18,000. A number under that is a
            repair, not a rebuild.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUDGETS.map((b) => (
              <Choice
                key={b.id}
                active={draft.budget === b.id}
                onClick={() => patch({ budget: b.id })}
                title={b.id}
                warn={b.warn}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TIMES.map((t) => (
              <Choice
                key={t.id}
                active={draft.timeline === t.id}
                onClick={() => patch({ timeline: t.id })}
                title={t.id}
                hint={t.hot ? "Fall window" : t.warn ? "We'll hold the brief" : undefined}
                warn={t.warn}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="space-y-4">
          <legend className="font-display text-2xl sm:text-3xl">
            Jeff calls ready people the same day.
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={draft.name}
                onChange={(e) => patch({ name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={draft.phone}
                onChange={(e) => patch({ phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={draft.email}
                onChange={(e) => patch({ email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>How did you find Jeff?</Label>
              <div className="flex flex-wrap gap-2">
                {SOURCES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => patch({ source: s })}
                    className={cn(
                      "h-10 rounded-full px-3 text-sm shadow-border",
                      draft.source === s ? "bg-ink text-paper" : "bg-card",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Anything the crew should know</Label>
              <Textarea
                id="notes"
                placeholder="Rot in the ledger, HOA, old radius you want to keep, dogs in the yard…"
                value={draft.notes}
                onChange={(e) => patch({ notes: e.target.value })}
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2">
              <input
                type="checkbox"
                checked={draft.contactConsent}
                onChange={(event) => patch({ contactConsent: event.target.checked })}
                className="mt-1 size-4 shrink-0 accent-cedar"
                required
              />
              <span>
                I agree that Jeff&apos;s Radius Decks may contact me by phone, email, or text about
                this request. See the{" "}
                <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
                  privacy notice
                </Link>
                .
              </span>
            </label>
          </div>
        </fieldset>
      )}

      {error ? <p className="mt-4 text-sm text-cedar">{error}</p> : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button
          type="submit"
          disabled={
            busy ||
            (step === 0 && (draft.zip.length < 5 || draft.homeowner === null)) ||
            (step === 1 && !draft.jobType) ||
            (step === 2 && (!draft.size || !draft.height)) ||
            (step === 3 && (!draft.budget || !draft.timeline)) ||
            (step === 4 && (!draft.name || !draft.phone || !draft.email || !draft.contactConsent))
          }
        >
          {busy ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Building your brief
            </>
          ) : step === 4 ? (
            <>
              <Check className="size-4" />
              Get my number
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </form>
  );
}
