import { Fragment } from "react";
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

/**
 * Solvrr™ logo, from solvrr.ai (original in public/images/solvrr-logo.svg).
 * The source is white-only; fills use currentColor so the mark stays visible on light surfaces.
 * Size it with a height class (default h-8); width follows the 813×351 aspect ratio.
 * `dark` forces white, `dark={false}` forces ink, and omitting it inherits the surrounding text colour.
 */
export function SolvrrMark({ className = "h-8", dark }: { className?: string; dark?: boolean }) {
  const tone = dark === undefined ? undefined : dark ? "text-white" : "text-ink";
  return (
    <svg
      role="img"
      aria-label="Solvrr™"
      viewBox="0 0 813 351"
      className={cn("inline-block w-auto shrink-0", tone, className)}
    >
      <g transform="translate(-587 -365)">
      <g transform="translate(-1107.556 -2679.979)">
      <g transform="translate(1708.16 3080.44)">
      <path d="M462.533,734.29c-18.546-21.552-23.27-45.83-13.089-71.728,10.206-25.966,31.2-39.05,58.462-41.442,25.5-2.236,47.64,5.74,63.6,26.4,31.038,40.2,7.6,98.856-42.635,107.016-25.108,4.079-47.684-1.386-66.323-20.249m14.725-39.3c.322,1.705.593,3.421.978,5.111a37.534,37.534,0,0,0,32.215,29.234A36.274,36.274,0,0,0,548.089,708.6a45.557,45.557,0,0,0-.582-41.972,34.576,34.576,0,0,0-30.536-20.017,35.507,35.507,0,0,0-34.5,18.219c-5.4,9.078-6.445,19.009-5.215,30.164Z" transform="translate(-267.821 -478.486)" fill="currentColor"/>
      <path d="M876.008,559.725a57.811,57.811,0,0,1-32.964-8.579c-10.5-6.632-20.478-14.1-31.456-21.757l12.024-10.716c7.352,5.478,14.358,11.075,21.746,16.118,11.54,7.875,24.208,11.7,38.169,8.114a28.43,28.43,0,0,0,19.927-38.515c-4.625-10.659-13.661-15.791-24.887-17.173a42.421,42.421,0,0,0-29.811,7.167c-12.286,8.511-24.026,17.878-35.525,27.45-14.558,12.109-28.189,25.3-45.955,33.016-20.142,8.74-44.218,5.332-58.319-8.805-23.512-23.571-14.753-61.231,16.755-72.121a58.493,58.493,0,0,1,43.415,2.171c13.976,5.979,25.586,15.463,37.514,25.792l-10.971,9.645c-4.313-3.234-8.514-6.512-12.848-9.619-11.2-7.994-23.137-14.275-37.264-14.94a33.469,33.469,0,0,0-21.923,6.239c-9.122,6.7-13.857,15.731-11.338,27.162,2.761,12.531,11.368,19.893,23.519,22.693,14.038,3.239,26.917-1.175,38-9.294,13.979-10.24,27.156-21.6,40.48-32.707,14.22-11.857,28.238-23.889,46.795-28.7,21.869-5.675,46.067,3.842,55.766,22.131,14.267,26.9-3.154,60.2-33.8,64.553C880.869,559.353,878.657,559.485,876.008,559.725Z" transform="translate(-280.802 -470.727)" fill="currentColor"/>
      <path d="M277.218,651.238a47.891,47.891,0,0,1,6.731-73.267c18.557-12.5,39.43-15.286,61.093-14.511,19.272.689,37.615,4.755,53.411,16.552,13.565,10.139,19.682,24.037,19.953,41.114H384.777c-.213-1.1-.439-2.145-.616-3.2a27.344,27.344,0,0,0-18.026-22.516,72.854,72.854,0,0,0-52.719-.26,30.02,30.02,0,0,0-7,3.9c-11.9,8.68-11.857,25.29,1.04,32.322,9.268,5.051,19.849,7.734,29.923,11.241,4.118,1.435,8.446,2.259,13.425,3.556-6.291,8.982-12.18,17.483-18.232,25.867a3.739,3.739,0,0,1-3.224.973c-15.577-3.973-31.412-7.305-45.128-16.378C281.876,655.075,279.716,653.185,277.218,651.238Z" transform="translate(-258.479 -475.523)" fill="currentColor"/>
      <path d="M373.555,657.081c9.242,4.121,18.739,7.162,26.865,12.354,14.727,9.408,22.448,23.3,20.847,41.252-1.731,19.4-12.926,32.075-30.034,39.874-18.135,8.27-37.459,9.585-57.045,8.579-18.52-.941-36.4-4.446-52.254-14.709a50.494,50.494,0,0,1-23.722-40.49,28.154,28.154,0,0,1,.169-3.478h34.355a8.175,8.175,0,0,1,.489,1.669c1.061,12.739,8.184,21.083,19.669,25.477a83.191,83.191,0,0,0,54.83,2.137c8.917-2.67,15.926-7.981,17.137-18.122A17.839,17.839,0,0,0,374.2,692.666a219.694,219.694,0,0,0-24.25-9.114c-2.935-1.04-6.024-1.633-9.757-2.618,6.32-9.042,12.284-17.678,18.442-26.184a4.3,4.3,0,0,1,3.593-.728C365.93,654.843,369.546,655.971,373.555,657.081Z" transform="translate(-258.209 -480.23)" fill="currentColor"/>
      <path d="M751.137,751.169a8.319,8.319,0,0,1-3.556,1.383c-7.581.112-15.172.278-22.74-.047a6.606,6.606,0,0,1-4.828-3.169q-26.494-60.217-52.636-120.589c-.361-.829-.642-1.7-1.2-3.19,9.076,0,17.678-.016,26.288,0,9.005.021,8.92.07,12.2,8.246,10.576,26.374,21.216,52.717,32.34,80.331,1.17-2.912,1.978-4.807,2.7-6.736q14.623-39.024,29.174-78.074a4.822,4.822,0,0,1,5.376-3.858c9.447.224,18.9.081,29.395.081C786.03,667.711,768.666,709.269,751.137,751.169Z" transform="translate(-279.284 -478.758)" fill="currentColor"/>
      <path d="M615.76,709.435V570.473h31.6V749.509h-31.6Z" transform="translate(-276.679 -475.891)" fill="currentColor"/>
      <path d="M1007.519,647.455v5.319c-7.155,0-14.039-.941-20.538.182-17.039,2.943-28.264,15.759-29.153,33.666-.78,15.915-.335,31.893-.413,47.834-.029,5.81,0,11.618,0,17.73H926.291V625.581h30.616v21.341c12.681-18.687,29.036-26.2,50.616-22.747C1007.526,631.911,1007.526,639.464,1007.519,647.455Z" transform="translate(-292.714 -478.634)" fill="currentColor"/>
      <path d="M891.685,652.289c-21.058,2.126-34.072,16.069-34.316,36.874-.237,19.438-.073,38.881-.1,58.324,0,1.534-.127,3.065-.205,4.812H826.227V625.493h30.89v19.758a54.977,54.977,0,0,1,21.523-18.138,44.335,44.335,0,0,1,28.009-2.841c0,8.043,0,15.918,0,23.79,0,1.56-.133,3.094-.182,4.193C901.48,652.26,896.8,652.26,891.685,652.289Z" transform="translate(-287.547 -478.619)" fill="currentColor"/>
      </g>
      </g>
      <text transform="translate(1334 530)" fill="currentColor" fontSize="45" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif">
      <tspan x="0" y="0">TM</tspan>
      </text>
      </g>
    </svg>
  );
}

/**
 * Renders a text label with "Solvrr" / "Solvrr™" swapped for the logo, sized to the surrounding text.
 * The logo is 1.5em tall and shifted so its lettering sits on the text baseline.
 */
export function SolvrrLabel({ text, logoClassName }: { text: string; logoClassName?: string }) {
  if (!text.includes("Solvrr")) return <>{text}</>;
  const parts = text.split(/Solvrr™?/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <SolvrrMark className={cn("h-[1.5em] align-[-0.2em]", logoClassName)} />}
        </Fragment>
      ))}
    </>
  );
}
