import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice | Jeff's Radius Decks" },
      {
        name: "description",
        content:
          "How Jeff's Radius Decks uses quote and Deck Rebuild Brief requests from homeowners in the Bethlehem, Georgia area.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">Privacy notice</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        Your project details stay in the job file.
      </h1>
      <p className="mt-5 text-muted-foreground">
        This notice applies to quote requests and Deck Rebuild Brief requests submitted through
        Jeff&apos;s Radius Decks. It is written for homeowners—not data brokers.
      </p>

      <div className="mt-10 space-y-9 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-2xl">What we collect</h2>
          <p className="mt-2">
            When you request a quote or the cost brief, we collect the information you provide, such
            as your name, email address, phone number, ZIP code, project type, budget range, timing,
            referral source, and notes about the work.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Why we use it</h2>
          <p className="mt-2">
            We use the information to provide the requested estimate range or brief, determine
            whether the project is within the normal service area, contact you about a requested
            measure or project, schedule work when you ask us to, and improve how the business
            tracks the source of inquiries.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Who receives it</h2>
          <p className="mt-2">
            Your information is kept in the business&apos;s lead system and may be handled by
            service providers that support scheduling, customer relationship management, email,
            text-message notifications, or hosting. We do not sell personal information or rent lead
            lists.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Your choices</h2>
          <p className="mt-2">
            You may ask the business not to contact you further, request an update or deletion of
            your submitted information where applicable, or decline nonessential follow-up. To make
            a request, use the contact details published on this site after launch.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Updates</h2>
          <p className="mt-2">
            This notice may be updated when the business changes its systems or contact methods. The
            version published on this page controls for website submissions.
          </p>
        </section>
      </div>

      <ButtonBack />
    </main>
  );
}

function ButtonBack() {
  return (
    <Link
      to="/quote"
      className="mt-12 inline-flex h-11 items-center rounded-md bg-ink px-4 text-sm font-medium text-paper"
    >
      Back to quote request
    </Link>
  );
}
