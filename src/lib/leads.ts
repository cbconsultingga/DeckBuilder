const KEY = "jrd-leads";
const MAGNET_KEY = "jrd-magnet";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  homeowner: boolean;
  jobType: string;
  size: string;
  height: string;
  budget: string;
  timeline: string;
  source: string;
  notes: string;
  qualified: boolean;
  estimate?: string;
  magnet?: boolean;
};

export function readLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead) {
  const all = readLeads();
  all.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 80)));
}

export function magnetUnlocked() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MAGNET_KEY) === "1";
}

export function unlockMagnet() {
  localStorage.setItem(MAGNET_KEY, "1");
}

export function newId() {
  return `ld_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
