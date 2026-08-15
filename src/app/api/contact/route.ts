import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEnquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5).max(30),
  projectType: z.string().trim().min(1).max(60),
  projectLocation: z.string().trim().max(120).optional(),
  requirement: z.string().trim().max(2000).optional(),
  message: z.string().trim().min(5).max(4000),
  locale: z.string().trim().max(5).default("en"),
  page: z.string().trim().max(200).optional(),
});

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

// Best-effort in-memory rate limit. Resets on cold start and is per-instance
// only — fine as a first line of defence, not a substitute for a proper
// edge/WAF rate limiter or Cloudflare Turnstile in front of this route.
const recentSubmissions = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const formData = await request.formData();

  // Honeypot — a field real visitors never see or fill.
  if (String(formData.get("website") || "").length > 0) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  // Time-trap — form submitted faster than a human plausibly could.
  const startedAt = Number(formData.get("startedAt") || 0);
  if (startedAt && Date.now() - startedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  const raw = {
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    projectLocation: formData.get("projectLocation") || undefined,
    requirement: formData.get("requirement") || undefined,
    message: formData.get("message"),
    locale: formData.get("locale") || "en",
    page: formData.get("page") || undefined,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input", issues: parsed.error.flatten() }, { status: 400 });
  }

  let attachment: { filename: string; content: Buffer; contentType?: string } | undefined;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ ok: false, error: "attachment_too_large" }, { status: 400 });
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "attachment_type_not_allowed" }, { status: 400 });
    }
    attachment = {
      filename: file.name || "attachment",
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    };
  }

  try {
    await sendEnquiryEmail({ ...parsed.data, attachment });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed to send enquiry email", error);
    return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
  }
}
