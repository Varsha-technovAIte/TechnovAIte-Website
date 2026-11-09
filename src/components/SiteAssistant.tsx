"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { businessNeeds, capabilities, orchestrationNodes, site, whatsappHref } from "@/lib/site";
import { cn } from "./ui";

type LinkItem = { label: string; href: string };
type Turn = { text: string; links?: LinkItem[]; suggestions?: string[] };
type Message = Turn & { id: number; from: "bot" | "you" };

const starters = ["What does TechnovAIte do?", "Which capability fits?", "How do you work?", "Talk to the team"];

const capabilityByKey = {
  pods: capabilities[0],
  gcc: capabilities[1],
  specialist: capabilities[2],
  governance: capabilities[3],
} as const;

function answer(raw: string): Turn {
  const q = raw.toLowerCase().trim();

  const need = businessNeeds.find((item) => q.includes(item.label.toLowerCase()));
  if (need) {
    const links = need.capabilities.map((key) => {
      const node = orchestrationNodes.find((item) => item.key === key);
      return { label: node?.label ?? capabilityByKey[key].name, href: node?.href ?? `/capabilities/${capabilityByKey[key].slug}` };
    });
    return {
      text: `${need.explanation} ${need.outcome}`,
      links: [...links, { label: need.cta, href: `/contact?need=${need.slug}` }],
    };
  }

  if (/whats?\s?app/.test(q)) {
    return {
      text: `You can message the team on WhatsApp at ${site.contact.phoneDisplay}. The button below opens that chat.`,
    };
  }

  if (/career|job|hiring|work with you/.test(q)) {
    return {
      text: "Open roles are listed on the careers page. If you don't see a fit, you can register your interest and the team will keep it on file.",
      links: [
        { label: "Careers", href: "/careers" },
        { label: "Register interest", href: "/careers#interest" },
      ],
    };
  }

  if (/solvrr/.test(q)) {
    return {
      text: "Solvrr™ is TechnovAIte's platform concept for structuring technology decisions. It is in development — you can read the vision or join the waitlist.",
      links: [
        { label: "Solvrr", href: "/solvrr" },
        { label: "Join the waitlist", href: "/solvrr#waitlist" },
      ],
    };
  }

  if (/offshore|nano-?gcc|\bbot\b|build operate/.test(q)) {
    return {
      text: "Nano-GCC and Build-Operate-Transfer models structure a right-sized offshore capability through the partner ecosystem, with governance from the first day.",
      links: [
        { label: "Nano-GCC & BOT", href: "/capabilities/nano-gcc-bot" },
        { label: "Discuss offshore capability", href: "/contact?need=offshore-capability" },
      ],
    };
  }

  if (/pod|delivery team|scale engineering|engineering capacity/.test(q)) {
    return {
      text: "AI & Digital Delivery Pods are partner-led teams shaped around a defined initiative — AI engineering, applications, data platforms, automation, or digital product delivery.",
      links: [
        { label: "Delivery Pods", href: "/capabilities/ai-digital-delivery-pods" },
        { label: "Explore delivery models", href: "/contact?need=scale-engineering" },
      ],
    };
  }

  if (/specialist|cloud|cyber|vendor/.test(q)) {
    return {
      text: "Partner-led specialist services connect you with curated expertise across cloud, cyber, AI, and transformation — each partner with a role, rather than another name on a vendor list.",
      links: [
        { label: "Specialist services", href: "/capabilities/partner-led-specialist-services" },
        { label: "Find the right capability", href: "/contact?need=specialist-expertise" },
      ],
    };
  }

  if (/advis|govern|decision|which model/.test(q)) {
    return {
      text: "Platform-enabled advisory helps frame the business outcome and choose a capability model before anyone starts building. Roles and a coordination path are named up front.",
      links: [
        { label: "Advisory", href: "/capabilities/platform-enabled-advisory" },
        { label: "How we work", href: "/company/how-we-work" },
      ],
    };
  }

  if (/\bai\b|initiative|artificial/.test(q)) {
    return {
      text: "An AI initiative can be structured as a delivery pod, specialist review, and a governance path — so the work can leave the slide deck without standing up a whole new team first.",
      links: [{ label: "Discuss your AI initiative", href: "/contact?need=ai-initiative" }],
      suggestions: ["Which capability fits?"],
    };
  }

  if (/how (do|does)|process|approach|steps/.test(q)) {
    return {
      text: "An engagement moves through four steps: Understand the business challenge, Structure the capability model, Connect the right partners, and Coordinate governance as the work progresses.",
      links: [
        { label: "How we work", href: "/company/how-we-work" },
        { label: "Our approach", href: "/company/approach" },
      ],
    };
  }

  if (/contact|email|phone|call|talk|human|team|enquriy|enquiry/.test(q)) {
    return {
      text: `The team replies to enquiries at ${site.contact.email}, and by phone on ${site.contact.phoneDisplay}. You can also continue this chat on WhatsApp.`,
      links: [{ label: "Contact form", href: "/contact" }],
    };
  }

  if (/what (does|do)|who (are|is)|about|technovaite/.test(q)) {
    return {
      text: "TechnovAIte connects specialist technology expertise, flexible delivery models, and trusted partners through one coordinated approach — so the right capabilities are in place for the outcome.",
      links: [
        { label: "About", href: "/company/about" },
        { label: "Capabilities", href: "/capabilities" },
      ],
      suggestions: ["Which capability fits?", "How do you work?"],
    };
  }

  if (/which capability|what fits|not sure|help me choose|recommend/.test(q)) {
    return {
      text: "Tell me the outcome you are aiming for, and I will point you to the closest model.",
      suggestions: businessNeeds.map((item) => item.label),
    };
  }

  return {
    text: "I can help with capabilities, how an engagement is structured, or reaching the team. Try one of these, or send a note through the contact form.",
    links: [{ label: "Contact the team", href: "/contact" }],
    suggestions: starters,
  };
}

const greeting: Message = {
  id: 0,
  from: "bot",
  text: "Hello. I can help you find a TechnovAIte capability, or connect you with the team on WhatsApp.",
  suggestions: starters,
};

export function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string[] | undefined>(starters);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const nextId = useRef(1);

  const lastQuestion = [...messages].reverse().find((message) => message.from === "you")?.text;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = answer(trimmed);
    const you: Message = { id: nextId.current++, from: "you", text: trimmed };
    const bot: Message = { id: nextId.current++, from: "bot", ...reply };
    setMessages((current) => [...current, you, bot]);
    setPending(reply.suggestions);
    setDraft("");
  }

  return (
    <div ref={rootRef} className="print:hidden fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          id="site-assistant"
          role="dialog"
          aria-labelledby={titleId}
          className="flex h-[min(560px,calc(100svh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-paper text-ink shadow-lift"
        >
          <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <p id={titleId} className="text-sm font-semibold tracking-tight">
                TechnovAIte assistant
              </p>
              <p className="text-[12px] text-slate">Answers from this site. The team replies on WhatsApp.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-mist hover:text-ink"
            >
              <CloseIcon />
            </button>
          </header>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.from === "you" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[18rem] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                    message.from === "you" ? "rounded-br-md bg-inverse text-on-inverse" : "rounded-bl-md bg-mist text-ink",
                  )}
                >
                  <p>{message.text}</p>
                  {message.links && message.links.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {message.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="font-medium text-brand-strong underline-offset-2 hover:underline" onClick={() => setOpen(false)}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {pending && pending.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
              {pending.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => ask(item)}
                  className="shrink-0 rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-medium text-ink ring-1 ring-line hover:ring-ink/30"
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-line px-3 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
          >
            <label htmlFor="assistant-message" className="sr-only">
              Message the assistant
            </label>
            <input
              id="assistant-message"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about a capability"
              className="h-10 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none placeholder:text-slate/70 focus:border-brand"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-strong"
            >
              <SendIcon />
            </button>
          </form>
        </section>
      )}

      <div className="flex flex-col items-end gap-2">
        <a
          href={whatsappHref(lastQuestion ? `Hello TechnovAIte — ${lastQuestion}` : undefined)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with TechnovAIte on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
        >
          <WhatsAppIcon />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-assistant"
          onClick={() => setOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lift transition-transform hover:scale-105"
        >
          <span className="sr-only">{open ? "Close assistant" : "Open assistant"}</span>
          {open ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17.5 4 20v-4.2A8 8 0 1 1 8.2 20H7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.14h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.92c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.14.11-1.84-.11-.42-.14-.97-.31-1.67-.61-2.94-1.27-4.85-4.23-5-4.43-.14-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.24-.27.64-.39 1.02-.39.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.2-.14.32-.28.49-.14.17-.29.37-.42.5-.14.13-.28.28-.12.54.16.27.7 1.16 1.51 1.88 1.04.92 1.91 1.21 2.18 1.35.27.13.43.11.59-.07.16-.17.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.54.73 1.8.86.27.13.44.2.51.31.07.11.07.64-.17 1.32Z" />
    </svg>
  );
}
