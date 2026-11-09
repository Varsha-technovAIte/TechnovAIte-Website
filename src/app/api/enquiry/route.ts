import { NextResponse } from "next/server";
import { deliverEnquiry } from "@/lib/deliver";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = ["contact", "waitlist", "careers"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (k: string, max = 200) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const kind = KINDS.includes(body.kind as (typeof KINDS)[number]) ? (body.kind as string) : "contact";

  // Spam protection: honeypot field + minimum time-to-submit.
  const startedAt = Number(body.startedAt);
  if (str("website") || !Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: true }); // silently accept bots
  }

  const data = {
    kind,
    name: str("name"),
    email: str("email"),
    company: str("company"),
    goal: str("goal"),
    capability: str("capability"),
    message: str("message", 4000),
    consent: body.consent === true,
  };

  const errors: Record<string, string> = {};
  if (kind !== "waitlist" && data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid work email.";
  if (kind === "contact" && !data.company) errors.company = "Please enter your company.";
  if (!data.consent) errors.consent = "Please confirm you agree to be contacted.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const { ok, configured } = await deliverEnquiry(data);
  if (!configured) {
    // No delivery channel set up: never silently drop leads in production.
    console.warn("[enquiry] no delivery channel configured", JSON.stringify(data));
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "Enquiries are temporarily unavailable." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }
  if (!ok) return NextResponse.json({ ok: false, error: "We couldn't send your enquiry." }, { status: 502 });

  return NextResponse.json({ ok: true });
}
