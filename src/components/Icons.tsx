import { cn } from "./ui";

const paths: Record<string, React.ReactNode> = {
  fragmented: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7M14 17.5h7" strokeDasharray="2 2" />
    </>
  ),
  capacity: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7" />
      <path d="M20 20v-3" strokeDasharray="2 2" />
      <path d="M2 20h20" />
    </>
  ),
  coordination: (
    <>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="19" r="2.2" />
      <path d="M7 7.5 10.5 17M17 7.5 13.5 17M7.2 6h9.6" />
    </>
  ),
  uncertainty: (
    <>
      <path d="M12 3 21 19H3L12 3Z" />
      <path d="M12 10v4M12 16.5v.5" />
    </>
  ),
  accelerate: (
    <>
      <path d="M4 17 10 11l3 3 7-7" />
      <path d="M15 7h5v5" />
    </>
  ),
  scale: (
    <>
      <rect x="3" y="13" width="6" height="8" rx="1.5" />
      <rect x="11" y="8" width="6" height="13" rx="1.5" />
      <path d="M19 3v18M16.5 5.5 19 3l2.5 2.5" />
    </>
  ),
  coordinate: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
      <path d="M12 3.5V1M12 23v-2.5M3.5 12H1M23 12h-2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  pods: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <circle cx="12" cy="16" r="3" />
    </>
  ),
  gcc: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5Z" />
    </>
  ),
  specialist: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
      <path d="m15.5 4.5 1.5-1.5" />
    </>
  ),
  governance: (
    <>
      <path d="M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6H3Z" />
    </>
  ),
  discover: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  decide: (
    <>
      <path d="M12 3v6M12 9l-6 6v6M12 9l6 6v6" />
      <circle cx="12" cy="3" r="1.5" />
    </>
  ),
  connect: (
    <>
      <path d="M9 15 15 9" />
      <path d="M10.5 6.5 12.5 4.5a4 4 0 0 1 5.7 5.7l-2 2M13.5 17.5l-2 2a4 4 0 0 1-5.7-5.7l2-2" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function IconTile({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-strong ring-1 ring-brand/15",
        className,
      )}
    >
      <Icon name={name} />
    </span>
  );
}
