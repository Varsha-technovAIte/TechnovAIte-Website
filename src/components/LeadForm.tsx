"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { businessNeeds, capabilities, site } from "@/lib/site";
import { Arrow, cn } from "./ui";

type Kind = "contact" | "waitlist" | "careers";

const fieldCls =
  "mt-1.5 block w-full rounded-xl border bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-slate/60 transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

function Field({
  label,
  name,
  error,
  optional,
  dark,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={cn("text-sm font-medium", dark ? "text-white" : "text-ink")}>
        {label}
        {optional && <span className={cn("ml-1 font-normal", dark ? "text-white/50" : "text-slate")}>(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ kind = "contact", defaultNeed, dark }: { kind?: Kind; defaultNeed?: string; dark?: boolean }) {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const initialNeed = businessNeeds.find((n) => n.slug === defaultNeed);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      ...Object.fromEntries(form.entries()),
      consent: form.get("consent") === "on",
      kind,
      startedAt: startedAt.current,
    };
    const local: Record<string, string> = {};
    if (kind !== "waitlist" && String(payload.name ?? "").trim().length < 2) local.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(payload.email ?? ""))) local.email = "Please enter a valid work email.";
    if (kind === "contact" && !String(payload.company ?? "").trim()) local.company = "Please enter your company.";
    if (!payload.consent) local.consent = "Please confirm you agree to be contacted.";
    setErrors(local);
    if (Object.keys(local).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const messages = {
      contact: ["Thank you — we've received your enquiry.", "A member of the TechnovAIte team will be in touch shortly."],
      waitlist: ["You're on the list.", "We'll share Solvrr™ updates as the platform progresses."],
      careers: ["Thank you for your interest.", "We'll keep your details on file and reach out if a suitable opportunity arises."],
    }[kind];
    return (
      <div role="status" className={cn("rounded-2xl p-8", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-mist")}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">✓</span>
        <p className={cn("mt-4 text-xl font-semibold", dark ? "text-white" : "text-ink")}>{messages[0]}</p>
        <p className={cn("mt-2", dark ? "text-white/70" : "text-slate")}>{messages[1]}</p>
      </div>
    );
  }

  const inputCls = (name: string) => cn(fieldCls, errors[name] ? "border-red-400" : "border-line");
  const err = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {kind !== "waitlist" && (
          <Field label="Full name" name="name" error={errors.name} dark={dark}>
            <input id="name" name="name" autoComplete="name" required className={inputCls("name")} {...err("name")} />
          </Field>
        )}
        <Field label="Work email" name="email" error={errors.email} dark={dark}>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputCls("email")} {...err("email")} />
        </Field>
        {kind !== "careers" && (
          <Field label="Company" name="company" error={errors.company} optional={kind === "waitlist"} dark={dark}>
            <input id="company" name="company" autoComplete="organization" className={inputCls("company")} {...err("company")} />
          </Field>
        )}
        {kind === "contact" && (
          <>
            <Field label="What are you looking to achieve?" name="goal" dark={dark}>
              <select id="goal" name="goal" defaultValue={initialNeed?.label ?? ""} className={inputCls("goal")}>
                <option value="">Select an option</option>
                {businessNeeds.map((n) => (
                  <option key={n.slug} value={n.label}>
                    {n.label}
                  </option>
                ))}
                <option value="Something else">Something else</option>
              </select>
            </Field>
            <Field label="Capability interest" name="capability" dark={dark}>
              <select id="capability" name="capability" defaultValue="" className={inputCls("capability")}>
                <option value="">Not sure yet</option>
                {capabilities.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}
        {kind === "careers" && (
          <Field label="Area of interest" name="capability" dark={dark}>
            <select id="capability" name="capability" defaultValue="" className={inputCls("capability")}>
              <option value="">Select an option</option>
              <option>Working at TechnovAIte</option>
              <option>Becoming a delivery partner</option>
            </select>
          </Field>
        )}
      </div>

      {kind !== "waitlist" && (
        <Field label="Message" name="message" optional dark={dark}>
          <textarea id="message" name="message" rows={4} className={inputCls("message")} />
        </Field>
      )}

      <div>
        <label className={cn("flex items-start gap-3 text-sm", dark ? "text-white/70" : "text-slate")}>
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[#f2690d]"
            {...err("consent")}
          />
          <span>
            I agree to TechnovAIte contacting me about this enquiry. Your details are handled in line with our{" "}
            <Link href="/privacy" className={cn("underline underline-offset-2", dark ? "hover:text-white" : "hover:text-ink")}>
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && !Object.keys(errors).length && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try again or email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="underline underline-offset-2">
            {site.contact.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-medium text-white transition-all hover:bg-brand-strong active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending"
          ? "Sending…"
          : { contact: "Send enquiry", waitlist: "Join the Waitlist", careers: "Register interest" }[kind]}
        <Arrow />
      </button>
    </form>
  );
}
