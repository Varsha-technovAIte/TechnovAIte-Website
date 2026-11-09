import { cn } from "./ui";

/** TechnovAIte wordmark: serif lettering, orange "AI", corner brackets. */
export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  const ink = dark ? "text-white" : "text-ink";
  return (
    <span className={cn("relative inline-flex items-center px-2.5 py-1", ink, className)} aria-label="TechnovAIte">
      <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-[1.5px] border-l-[1.5px] border-current" />
      <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-[1.5px] border-t-[1.5px] border-current" />
      <span aria-hidden className="font-serif text-[22px] leading-none tracking-[-0.01em]">
        technov<span className="font-sans font-semibold text-brand">AI</span>te
      </span>
    </span>
  );
}

export function SolvrrMark({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-start font-semibold tracking-tight", dark ? "text-white" : "text-ink", className)}>
      <span className="relative">
        <svg aria-hidden viewBox="0 0 24 12" className="absolute -top-2.5 left-[42%] h-2.5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6c-2.5-3.5-4.5-4.5-6.5-4.5a4.5 4.5 0 0 0 0 9c2 0 4-1 6.5-4.5Zm0 0c2.5 3.5 4.5 4.5 6.5 4.5a4.5 4.5 0 0 0 0-9c-2 0-4 1-6.5 4.5Z" />
        </svg>
        Solvrr
      </span>
      <span className="ml-0.5 text-[0.45em] font-medium">™</span>
    </span>
  );
}
