"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SolvrrMark } from "@/components/Logo";
import { Arrow } from "@/components/ui";

const KEY = "tn-announce-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-inverse text-on-inverse">
      <Link
        href="/solvrr"
        className="group flex h-11 items-center justify-center gap-2 px-12 text-center text-[13.5px] font-medium tracking-[-0.01em]"
      >
        <SolvrrMark className="h-5" />
        <span aria-hidden className="h-3.5 w-px bg-on-inverse/25" />
        A clearer way to structure technology decisions
        <Arrow className="h-3.5 w-3.5" />
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(KEY, "1");
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-on-inverse/70 hover:bg-on-inverse/10 hover:text-on-inverse"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
