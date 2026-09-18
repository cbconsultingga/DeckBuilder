import { isInServiceZip } from "./site.ts";

export type LeadKind = "quote" | "magnet";
export type LeadQualification = "qualified" | "review" | "nurture";

export type LeadSubmission = {
  kind: LeadKind;
  name: string;
  email: string;
  contactConsent: boolean;
  phone?: string;
  zip: string;
  homeowner?: boolean;
  jobType?: string;
  size?: string;
  height?: string;
  budget?: string;
  timeline?: string;
  source?: string;
  notes?: string;
  estimate?: string;
};

export type NormalizedLead = Required<LeadSubmission> & {
  qualification: LeadQualification;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: string | undefined, max: number) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, max);
}

export function safePublicUrl(value: string | undefined) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function phone(value: string | undefined) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 ? digits : "";
}

export function classifyLead(
  input: Pick<LeadSubmission, "kind" | "zip" | "homeowner" | "budget" | "timeline">,
): LeadQualification {
  if (input.kind === "magnet") return "nurture";
  if (input.homeowner !== true || !isInServiceZip(input.zip)) return "review";
  if (input.budget === "Under $8,500" || input.timeline === "Just looking") return "nurture";
  return "qualified";
}

export function normalizeLead(input: LeadSubmission): NormalizedLead {
  const kind = input.kind === "magnet" ? "magnet" : "quote";
  const name = text(input.name, 120);
  const email = text(input.email, 320).toLowerCase();
  const zip = text(input.zip, 5).replace(/\D/g, "");
  const normalized: Omit<NormalizedLead, "qualification"> = {
    kind,
    name,
    email,
    contactConsent: input.contactConsent === true,
    phone: phone(input.phone),
    zip,
    homeowner: input.homeowner === true,
    jobType: text(input.jobType, 120),
    size: text(input.size, 80),
    height: text(input.height, 80),
    budget: text(input.budget, 80),
    timeline: text(input.timeline, 80),
    source: text(input.source, 80),
    notes: text(input.notes, 2000),
    estimate: text(input.estimate, 3000),
  };

  if (!normalized.name) throw new Error("Please add your name.");
  if (!EMAIL.test(normalized.email)) throw new Error("Please enter a valid email address.");
  if (normalized.zip.length !== 5) throw new Error("Please enter a five-digit ZIP code.");
  if (!normalized.contactConsent) {
    throw new Error("Please confirm that the crew may contact you about this request.");
  }
  if (kind === "quote") {
    if (!normalized.phone) throw new Error("Please enter a valid phone number.");
    if (
      !normalized.jobType ||
      !normalized.size ||
      !normalized.height ||
      !normalized.budget ||
      !normalized.timeline
    ) {
      throw new Error("Please complete each project question.");
    }
  }

  return {
    ...normalized,
    qualification: classifyLead(normalized),
  };
}

export function bookingStatusFor(qualification: LeadQualification, hasBookingUrl: boolean) {
  if (qualification !== "qualified") return "not_requested";
  return hasBookingUrl ? "ready" : "needs_callback";
}
