"use client";

import { useEffect, useState } from "react";
import { cn } from "./ui";

const STORAGE_KEY = "tn-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return;
      root.classList.toggle("dark", media.matches);
      sync();
    };
    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next = dark ? "light" : "dark";
        applyTheme(next);
        setDark(next === "dark");
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist",
        className,
      )}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={cn("h-[18px] w-[18px]", className)} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="10" r="3.25" />
      <path strokeLinecap="round" d="M10 2.5v1.5M10 16v1.5M2.5 10H4M16 10h1.5M4.4 4.4l1.1 1.1M14.5 14.5l1.1 1.1M15.6 4.4l-1.1 1.1M5.5 14.5l-1.1 1.1" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={cn("h-[18px] w-[18px]", className)} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.4A6.25 6.25 0 0 1 7.6 3.5 6.25 6.25 0 1 0 16.5 12.4Z"
      />
    </svg>
  );
}
