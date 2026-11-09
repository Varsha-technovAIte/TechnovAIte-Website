"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui";

const lines = [
  "It starts from the outcome, not a catalogue of services.",
  "The capability model is chosen before the people are.",
  "Partners are configured, not collected.",
  "Governance is designed in, not added later.",
  "Delivery stays with the specialist teams who do the work.",
  "You keep a single point of coordination.",
];

export function ConnectedStatement() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLLIElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const index = Number((hit.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.4, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-14 lg:mt-20">
      <ul>
        {lines.map((line, i) => (
          <li
            key={line}
            data-index={i}
            ref={(node) => {
              refs.current[i] = node;
            }}
            className="border-t border-line py-6 sm:py-8"
          >
            <p
              className={cn(
                "max-w-5xl text-balance text-[1.7rem] font-medium leading-[1.2] tracking-[-0.03em] transition-colors duration-500 sm:text-4xl lg:text-5xl",
                i === active ? "text-ink" : "text-ink/55",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mr-3 inline-block h-2 w-2 translate-y-[-0.15em] rounded-full align-middle transition-colors duration-500 sm:mr-4",
                  i === active ? "bg-brand" : "bg-ink/15",
                )}
              />
              {line}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
