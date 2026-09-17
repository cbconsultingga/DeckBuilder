import { createServerFn } from "@tanstack/react-start";

export type EstimateInput = {
  zip: string;
  homeowner: boolean;
  jobType: string;
  size: string;
  height: string;
  budget: string;
  timeline: string;
  notes: string;
  name: string;
};

export const requestEstimate = createServerFn({ method: "POST" })
  .validator((input: EstimateInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: true as const,
        text: fallbackEstimate(data),
        ai: false,
      };
    }

    const system = `You are Jeff's estimator for Jeff's Radius Decks in Bethlehem, Georgia (zip 30620), serving a 25-mile radius (Barrow, west Gwinnett, Jackson, Walton, Oconee, west Clarke, south Hall).

Voice: calm, specific, craftsman. No emoji. No hype words like "unlock" or "game-changer". Never apologize for price. Anchor high, then show the smart path.

Job mix the shop wants RIGHT NOW: fast redecks and clean pressure-treated builds with 10–14 day turnaround. Custom radius is the specialty and is quoted, not discounted.

Pricing rails (2026, this market):
- Sound-frame redeck: $8,500–$22,000
- New PT build: from $18,000, two-story higher
- Stairs/landings: from $4,800
- Custom radius: premium, often $4k–$12k above a square equivalent depending on sweep
- Under $5k for a full rebuild is not a real job

Rules:
- Give a RANGE, not a bid. Say a site measure locks the number.
- If they are not the homeowner, or timeline is "just looking", or budget is far below the job, be polite and firm: this crew is for ready decision-makers.
- If zip looks outside 25 miles of 30620, say travel may apply or they should confirm.
- End with one clear next step: a same-week measure for qualified jobs.
- 140–220 words. Short paragraphs.`;

    const user = `Homeowner: ${data.homeowner}
Zip: ${data.zip}
Job: ${data.jobType}
Size: ${data.size}
Height: ${data.height}
Budget band: ${data.budget}
Timeline: ${data.timeline}
Notes: ${data.notes || "none"}
Name: ${data.name}`;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 420,
          temperature: 0.4,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: true as const, text: fallbackEstimate(data), ai: false };
      }
      const body = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const text = body.choices[0]?.message.content?.trim() || fallbackEstimate(data);
      return { ok: true as const, text, ai: true };
    } catch {
      return { ok: true as const, text: fallbackEstimate(data), ai: false };
    }
  });

function fallbackEstimate(data: EstimateInput) {
  const job = data.jobType.toLowerCase();
  let range = "$12,000–$22,000";
  if (job.includes("redeck")) range = "$8,500–$18,500";
  if (job.includes("new")) range = "$18,000–$38,000";
  if (job.includes("radius")) range = "$22,000–$48,000 depending on sweep and stain";
  if (job.includes("stair")) range = "$4,800–$14,000";
  if (job.includes("repair")) range = "$3,500–$12,000 if the frame can be saved";

  return `Jeff’s crew brief for a ${data.size} ${data.jobType.toLowerCase()} in ${data.zip}:

Most jobs like this in the 30620 radius land around ${range} in 2026, assuming standard access and a frame that is still honest. Height (${data.height}) and rail style move the number more than people expect. Radius work is quoted after a measure — the jig is the cost, and it is the reason the house looks finished.

This is not a bid. It is the honest band so you do not waste a Saturday. A same-week site measure locks fasteners, flashing, stairs, and stain. If the budget band you picked (${data.budget}) cannot touch the bottom of that range, we will tell you on the visit instead of starting a project we both regret.

Ready homeowners get the next open measure slot. Bring the decision. We bring the tape and the photos of the last one we built down the road.`;
}
