export const ADMIN_COOKIE = "wdg_admin";
const SESSION_MESSAGE = "wake-dog-groomers-admin-session-v1";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bufToHex(sig);
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function expectedSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  return hmacHex(secret, SESSION_MESSAGE);
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedSessionToken();
  if (!expected) return false;
  return timingSafeEqualStr(token, expected);
}

export function checkPassword(password: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  return timingSafeEqualStr(password, secret);
}
