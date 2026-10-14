import { StepState } from "@/lib/data";

const base = { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5.5v13a.5.5 0 0 0 .76.43l10.4-6.5a.5.5 0 0 0 0-.86L8.76 5.07A.5.5 0 0 0 8 5.5Z" fill="currentColor" />
    </svg>
  );
}

export function QuizIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3.5" width="16" height="17" rx="3" stroke="currentColor" strokeWidth={1.7} />
      <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      <path d="m14.5 16.2 1.2 1.2 2.3-2.4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.7} />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth={1.7} />
      <path d="m8.8 13.4-1.3 6.6L12 17.8l4.5 2.2-1.3-6.6" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" />
    </svg>
  );
}

/** Round status marker used by every step in the Learn UI (done / current / todo). */
export function StepDot({
  state,
  children,
  size = "h-8 w-8",
}: {
  state: StepState;
  children: React.ReactNode;
  size?: string;
}) {
  const cls =
    state === "done"
      ? "bg-brand-green text-white"
      : state === "current"
        ? "bg-brand-black text-white ring-4 ring-brand-green/30 dark:bg-white dark:text-brand-black"
        : "border border-brand-line bg-transparent text-brand-gray-light dark:border-white/15 dark:text-white/35";
  return (
    <span className={`flex flex-shrink-0 items-center justify-center rounded-full ${size} ${cls}`}>
      {state === "done" ? <CheckIcon className="h-4 w-4" /> : children}
    </span>
  );
}

export function ChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.7} />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth={1.7} />
    </svg>
  );
}
