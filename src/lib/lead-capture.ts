import { createServerFn } from "@tanstack/react-start";
import { PUBLIC_BUSINESS_PROFILE } from "./business";
import {
  bookingStatusFor,
  normalizeLead,
  safePublicUrl,
  type LeadSubmission,
} from "./lead-routing";

export type LeadCaptureReceipt = {
  id: string;
  qualification: "qualified" | "review" | "nurture";
  bookingStatus: "ready" | "needs_callback" | "not_requested";
  durable: boolean;
  routingStatus: "disabled" | "delivered" | "failed";
};

async function deliverWebhook(url: URL, secret: string, payload: Record<string, unknown>) {
  const { createHmac } = await import("node:crypto");
  const body = JSON.stringify(payload);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lead-event": "lead.captured",
        "x-lead-signature": createHmac("sha256", secret).update(body).digest("hex"),
      },
      body,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`destination returned ${response.status}`);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Client-callable server function. Database and environment modules are loaded
 * inside the handler so contact information and private delivery settings never
 * enter the browser bundle.
 */
export const captureLead = createServerFn({ method: "POST" })
  .validator((input: LeadSubmission) => input)
  .handler(async ({ data }): Promise<LeadCaptureReceipt> => {
    const [{ dbSource, getSql }, { env, isWorkspacePreview }] = await Promise.all([
      import("./db"),
      import("./env.server"),
    ]);
    const lead = normalizeLead(data);
    const id = crypto.randomUUID();
    const bookingUrl = safePublicUrl(PUBLIC_BUSINESS_PROFILE.calendar);
    const bookingStatus = bookingStatusFor(lead.qualification, Boolean(bookingUrl));
    const webhookUrl = safePublicUrl(env("LEAD_WEBHOOK_URL"));
    const webhookSecret = env("LEAD_WEBHOOK_SECRET");
    const webhook = webhookUrl ? new URL(webhookUrl) : null;
    if (!isWorkspacePreview() && dbSource !== "neon") {
      throw new Error(
        "Durable lead storage has not been configured yet. Please call the crew directly.",
      );
    }
    if (!isWorkspacePreview() && (!webhook || !webhookSecret)) {
      throw new Error("Lead delivery has not been configured yet. Please call the crew directly.");
    }
    const sql = await getSql();

    await sql.query(
      `INSERT INTO leads (
        id, kind, qualification, name, email, phone, zip, homeowner,
        job_type, size_band, height_band, budget_band, timeline, source,
        notes, estimate, routing_status, booking_status, contact_consent, consent_version
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20
      )`,
      [
        id,
        lead.kind,
        lead.qualification,
        lead.name,
        lead.email,
        lead.phone,
        lead.zip,
        lead.homeowner,
        lead.jobType,
        lead.size,
        lead.height,
        lead.budget,
        lead.timeline,
        lead.source,
        lead.notes,
        lead.estimate,
        webhook ? "pending" : "disabled",
        bookingStatus,
        lead.contactConsent,
        "2026-09-17",
      ],
    );
    await sql.query(
      "INSERT INTO lead_events (id, lead_id, event_type, detail) VALUES ($1, $2, $3, $4)",
      [crypto.randomUUID(), id, "captured", `${lead.kind}; consent=2026-09-17`],
    );

    let routingStatus: LeadCaptureReceipt["routingStatus"] = "disabled";
    if (webhook && webhookSecret) {
      try {
        await deliverWebhook(webhook, webhookSecret, {
          event: "lead.captured",
          lead: { id, ...lead, bookingStatus },
        });
        routingStatus = "delivered";
        await sql.query("UPDATE leads SET routing_status = $1, routed_at = now() WHERE id = $2", [
          routingStatus,
          id,
        ]);
        await sql.query(
          "INSERT INTO lead_events (id, lead_id, event_type, detail) VALUES ($1, $2, $3, $4)",
          [crypto.randomUUID(), id, "routed", webhook.hostname],
        );
      } catch (error) {
        routingStatus = "failed";
        const message = error instanceof Error ? error.message.slice(0, 240) : "delivery failed";
        await sql.query("UPDATE leads SET routing_status = $1, routing_error = $2 WHERE id = $3", [
          routingStatus,
          message,
          id,
        ]);
        await sql.query(
          "INSERT INTO lead_events (id, lead_id, event_type, detail) VALUES ($1, $2, $3, $4)",
          [crypto.randomUUID(), id, "routing_failed", message],
        );
      }
    }

    return {
      id,
      qualification: lead.qualification,
      bookingStatus,
      durable: dbSource === "neon",
      routingStatus,
    };
  });
