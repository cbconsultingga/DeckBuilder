import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { JsonLd, Shell } from "@/components/layout";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = SITE.name;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} | Bethlehem GA Deck Builder | 30620` },
      {
        name: "description",
        content:
          "Jeff's Radius Decks builds custom radius decks and fast redecks for homeowners in Bethlehem, Georgia 30620 and 25 miles out. 10–14 day typical turnaround. Same-week measures for ready decision-makers.",
      },
      { name: "theme-color", content: "#1b1511" },
      { name: "geo.region", content: "US-GA" },
      { name: "geo.placename", content: "Bethlehem, Georgia" },
      { name: "geo.position", content: "33.9395;-83.7438" },
      { name: "ICBM", content: "33.9395, -83.7438" },
      { name: "robots", content: "index,follow" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">That page was never framed.</h1>
      <p className="mt-4 text-muted-foreground">
        The deck is still here. Start at home or get a number.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/quote">Get a number</Link>
        </Button>
      </div>
    </main>
  );
}

function RootComponent() {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <JsonLd />
          <Shell>
            <Outlet />
          </Shell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
