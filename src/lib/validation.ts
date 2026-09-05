export const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[\d\s()+.-]{7,20}$/;
export const ZIP_RE = /^\d{5}$/;

export const GMB_HOST_HINTS = [
  "google.com/maps",
  "g.page",
  "business.google.com",
  "goo.gl/maps",
  "maps.app.goo.gl",
];

export function isValidUrl(url: string): boolean {
  return URL_RE.test(url);
}

export function isLikelyGmbUrl(url: string): boolean {
  if (!URL_RE.test(url)) return false;
  const lower = url.toLowerCase();
  return GMB_HOST_HINTS.some((hint) => lower.includes(hint));
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone);
}

export function isValidZip(zip: string): boolean {
  return ZIP_RE.test(zip);
}
