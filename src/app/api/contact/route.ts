import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "mihajamikalo@gmail.com";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
const MIN_FORM_FILL_MS = 2500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_MESSAGES_PER_WINDOW = 5;

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const rateLimitStore = new Map<string, number[]>();

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_MESSAGES_PER_WINDOW) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  let payload: {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;
    startedAt?: number;
  } = {};

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const fullName = (payload.fullName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const subject = (payload.subject ?? "").trim();
  const message = (payload.message ?? "").trim();
  const website = (payload.website ?? "").trim();
  const startedAt = Number(payload.startedAt ?? 0);
  const elapsedMs = Date.now() - startedAt;

  if (website || !Number.isFinite(startedAt) || elapsedMs < MIN_FORM_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { message: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  if (!fullName || !email || !subject || !message) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: contactFromEmail,
      to: [contactToEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `New portfolio message`,
        ``,
        `From: ${fullName}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
