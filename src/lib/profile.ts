import { SITE } from "./site";

const KEY = "jrd-owner-profile";

export type OwnerProfile = {
  phone: string;
  email: string;
  thumbtack: string;
  facebook: string;
  instagram: string;
  gbp: string;
  calendar: string;
};

export const DEFAULT_PROFILE: OwnerProfile = {
  phone: SITE.phoneDefault,
  email: SITE.emailDefault,
  thumbtack: SITE.thumbtackDefault,
  facebook: SITE.facebookDefault,
  instagram: SITE.instagramDefault,
  gbp: "",
  calendar: "",
};

export function readProfile(): OwnerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function writeProfile(profile: OwnerProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return phone;
}
