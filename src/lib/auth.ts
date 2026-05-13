import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin1234";
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "portfolio-session-secret-change-me";
}

function timingSafeEqualString(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a, "utf-8");
  const bBuffer = Buffer.from(b, "utf-8");

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function sign(expiration: number): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(String(expiration))
    .digest("base64url");
}

export function validatePassword(password: string): boolean {
  return timingSafeEqualString(password, getAdminPassword());
}

export function createSessionToken(): string {
  const expiration = Date.now() + SESSION_DURATION_MS;
  const signature = sign(expiration);
  return `${expiration}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const [expirationRaw, signature] = token.split(".");
  if (!expirationRaw || !signature) {
    return false;
  }

  const expiration = Number(expirationRaw);
  if (!Number.isFinite(expiration) || expiration < Date.now()) {
    return false;
  }

  const expected = sign(expiration);
  return timingSafeEqualString(signature, expected);
}
