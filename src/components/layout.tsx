import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NAV, SITE, slotsThisWindow } from "@/lib/site";
import { formatPhone, readProfile, type OwnerProfile } from "@/lib/profile";
import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="6" fill="currentColor" className="text-cedar" />
      <path
        d="M6 22c6-10 14-10 20 0"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M16 8v14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function useOwner() {
  const [profile, setProfile] = useState<OwnerProfile | null>(null);
  useEffect(() => {
    setProfile(readProfile());
    const on = () => setProfile(readProfile());
    window.addEventListener("jrd-profile", on);
    return () => window.removeEventListener("jrd-profile", on);
  }, []);
  return profile;
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const owner = useOwner();
  const home = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        home
          ? "border-transparent bg-ink/80 text-paper backdrop-blur-md"
          : "border-border bg-background/90 text-foreground backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-tight">
              Jeff's Radius
            </span>
            <span
              className={cn(
                "block text-[0.65rem] tracking-[0.18em] uppercase",
                home ? "text-paper/60" : "text-muted-foreground",
              )}
            >
              Decks · {SITE.city}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.to
                  ? home
                    ? "text-paper"
                    : "text-cedar"
                  : home
                    ? "text-paper/70 hover:text-paper"
                    : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {owner?.phone ? (
            <a
              href={`tel:${owner.phone}`}
              className={cn(
                "inline-flex h-11 items-center gap-2 text-sm",
                home ? "text-paper/80" : "text-foreground",
              )}
            >
              <Phone className="size-4" />
              {formatPhone(owner.phone)}
            </a>
          ) : null}
          <Button asChild>
            <Link to="/quote">Get a same-week number</Link>
          </Button>
        </div>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 text-foreground md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex h-11 items-center text-base"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/guide"
              className="flex h-11 items-center text-base"
              onClick={() => setOpen(false)}
            >
              2026 Cost Brief
            </Link>
            <Button asChild className="mt-2">
              <Link to="/quote" onClick={() => setOpen(false)}>
                Get a same-week number
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const owner = useOwner();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-2xl">Jeff's Radius Decks</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
            Custom radius and fast redecks for homeowners in Bethlehem, Georgia
            and 25 miles of zip 30620. Twelve years. A crew that shows up. A
            number that does not move.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-paper/40 uppercase">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            <li>
              <Link to="/work" className="hover:text-paper">
                Transformations
              </Link>
            </li>
            <li>
              <Link to="/quote" className="hover:text-paper">
                Get a number
              </Link>
            </li>
            <li>
              <Link to="/guide" className="hover:text-paper">
                2026 Cost Brief
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-paper">
                Journal
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-paper/40 uppercase">Area</p>
          <p className="mt-3 text-sm text-paper/80">
            {SITE.city}, {SITE.state} {SITE.zip}
            <br />
            Barrow, Gwinnett, Jackson, Walton
          </p>
          {owner?.phone ? (
            <a href={`tel:${owner.phone}`} className="mt-3 block text-sm text-paper">
              {formatPhone(owner.phone)}
            </a>
          ) : (
            <Link to="/quote" className="mt-3 block text-sm text-paper">
              Request a callback
            </Link>
          )}
          {owner?.thumbtack ? (
            <a
              href={owner.thumbtack}
              className="mt-2 block text-sm text-paper/70 hover:text-paper"
              target="_blank"
              rel="noreferrer"
            >
              See Jeff on Thumbtack
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-paper/40 sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <Link to="/playbook" className="hover:text-paper/70">
            Operations playbook
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function StickyCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const slots = slotsThisWindow();
  if (pathname === "/quote") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <Button asChild className="h-12 w-full">
        <Link to="/quote">Hold a measure slot · {slots} left this window</Link>
      </Button>
    </div>
  );
}

export function MagnetBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (pathname === "/guide" || pathname === "/quote" || pathname === "/playbook") return;
    if (sessionStorage.getItem("jrd-magnet-hide") === "1") return;
    const t = window.setTimeout(() => setShow(true), 9000);
    return () => window.clearTimeout(t);
  }, [pathname]);
  if (!show) return null;
  return (
    <div className="fixed right-4 bottom-20 z-30 max-w-sm rounded-xl bg-ink p-4 text-paper shadow-border-hover md:bottom-6">
      <button
        type="button"
        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-md text-paper/60"
        aria-label="Dismiss"
        onClick={() => {
          sessionStorage.setItem("jrd-magnet-hide", "1");
          setShow(false);
        }}
      >
        <X className="size-4" />
      </button>
      <p className="pr-6 font-display text-xl text-paper">
        The 2026 Deck Rebuild Brief
      </p>
      <p className="mt-2 text-sm text-paper/70">
        What Barrow County homeowners actually pay for a redeck, a new build, and
        a radius — and the three questions that kill a bad bid.
      </p>
      <Button asChild variant="default" className="mt-4 w-full">
        <Link to="/guide">Send me the brief</Link>
      </Button>
    </div>
  );
}

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description:
      "Custom radius decks, fast redecks, and pressure-treated builds for homeowners in Bethlehem, Georgia 30620 and a 25-mile radius.",
    areaServed: SERVICE_AREA_LD,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: "GA",
      postalCode: SITE.zip,
      addressCountry: "US",
    },
    priceRange: "$$$$",
    image: "/gallery/complete-radius.jpg",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SERVICE_AREA_LD = [
  { "@type": "City", name: "Bethlehem, GA" },
  { "@type": "City", name: "Winder, GA" },
  { "@type": "City", name: "Dacula, GA" },
  { "@type": "City", name: "Hoschton, GA" },
  { "@type": "City", name: "Auburn, GA" },
  { "@type": "AdministrativeArea", name: "Barrow County" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <SiteFooter />
      <StickyCta />
      <MagnetBanner />
    </div>
  );
}
