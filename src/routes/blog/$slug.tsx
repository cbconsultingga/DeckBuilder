import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getPost, isLive } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post || !isLive(post)) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} | Jeff's Radius Decks`
          : "Journal | Jeff's Radius Decks",
      },
      { name: "description", content: loaderData?.excerpt ?? "" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-cedar uppercase">
        {post.city} · {post.date} · {post.read}
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      <div className="mt-10 space-y-6">
        {post.body.map((b, i) => {
          if (b.t === "h2")
            return (
              <h2 key={i} className="font-display text-3xl">
                {b.text}
              </h2>
            );
          if (b.t === "p")
            return (
              <p key={i} className="leading-relaxed">
                {b.text}
              </p>
            );
          if (b.t === "ul")
            return (
              <ul key={i} className="list-disc space-y-2 pl-5">
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          return (
            <blockquote
              key={i}
              className="border-l-2 border-cedar pl-5 font-display text-2xl leading-snug"
            >
              {b.text}
            </blockquote>
          );
        })}
      </div>
      <div className="mt-14 rounded-xl bg-ink p-6 text-paper">
        <p className="font-display text-2xl text-paper">If this is your house, stop collecting bids.</p>
        <p className="mt-2 text-sm text-paper/70">
          Hold a measure slot. Fall still has dry weeks inside 25 miles of 30620.
        </p>
        <Button asChild className="mt-5">
          <Link to="/quote">Get a same-week number</Link>
        </Button>
      </div>
    </article>
  );
}
