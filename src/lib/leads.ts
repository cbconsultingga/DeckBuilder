const MAGNET_KEY = "jrd-magnet";

/**
 * The browser remembers only that this visitor has opened the cost brief. Lead
 * records and contact information are captured server-side in leads.server.ts.
 */
export function magnetUnlocked() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MAGNET_KEY) === "1";
}

export function unlockMagnet() {
  localStorage.setItem(MAGNET_KEY, "1");
}
