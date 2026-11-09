import "server-only";
import { site } from "./site";

export type Enquiry = {
  kind: string;
  name: string;
  email: string;
  company: string;
  goal: string;
  capability: string;
  message: string;
  consent: boolean;
};

const subjects: Record<string, string> = {
  contact: "New enquiry",
  waitlist: "New Solvrr™ waitlist sign-up",
  careers: "New careers / partner expression of interest",
};

const labels: [keyof Enquiry, string][] = [
  ["name", "Name"],
  ["email", "Work email"],
  ["company", "Company"],
  ["goal", "Looking to achieve"],
  ["capability", "Capability interest"],
  ["message", "Message"],
];

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function subjectFor(e: Enquiry) {
  const who = e.name || e.email;
  return `${subjects[e.kind] ?? subjects.contact}: ${who}${e.company ? ` (${e.company})` : ""}`;
}

function textBody(e: Enquiry) {
  return labels
    .filter(([k]) => e[k])
    .map(([k, l]) => `${l}: ${e[k]}`)
    .join("\n");
}

function htmlBody(e: Enquiry) {
  const rows = labels
    .filter(([k]) => e[k])
    .map(
      ([k, l]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#67717e;vertical-align:top;white-space:nowrap">${l}</td>` +
        `<td style="padding:6px 0;color:#1d2530;white-space:pre-wrap">${escape(String(e[k]))}</td></tr>`,
    )
    .join("");
  return (
    `<div style="font-family:Inter,Arial,sans-serif;font-size:14px">` +
    `<p style="color:#f2690d;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:11px">` +
    `${escape(subjects[e.kind] ?? subjects.contact)} · technovaite.com</p>` +
    `<table style="border-collapse:collapse">${rows}</table></div>`
  );
}

async function sendEmail(e: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) return false;
  const to = (process.env.ENQUIRY_TO || site.contact.email).split(",").map((s) => s.trim());
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: e.email,
      subject: subjectFor(e),
      text: textBody(e),
      html: htmlBody(e),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  return true;
}

async function sendWebhook(e: Enquiry) {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...e, subject: subjectFor(e), source: site.url, submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

/**
 * Delivers an enquiry by email (Resend) and/or webhook (CRM, Zapier, Make, etc.),
 * whichever are configured. Succeeds if at least one configured channel succeeds.
 */
export async function deliverEnquiry(e: Enquiry): Promise<{ ok: boolean; configured: boolean }> {
  const results = await Promise.allSettled([sendEmail(e), sendWebhook(e)]);
  const sent = results.filter((r) => r.status === "fulfilled" && r.value).length;
  const attempted = sent + results.filter((r) => r.status === "rejected").length;
  results.forEach((r) => r.status === "rejected" && console.error("[enquiry] delivery failed:", r.reason));
  return { ok: sent > 0, configured: attempted > 0 };
}
