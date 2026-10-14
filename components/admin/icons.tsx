// Simple line icons for the admin area. All 24x24, stroke = currentColor.
const base = { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
const s = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type P = { className?: string };

export function HomeIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11.5 12 4l9 7.5" {...s} />
      <path d="M5.5 10v9.5h4.5v-5h4v5h4.5V10" {...s} />
    </svg>
  );
}

export function BookIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" {...s} />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z" {...s} />
      <path d="m10 8 4 2.5-4 2.5V8Z" {...s} />
    </svg>
  );
}

export function UsersIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3.5" {...s} />
      <path d="M2.5 20c.9-3.6 3.4-5.5 6.5-5.5s5.6 1.9 6.5 5.5" {...s} />
      <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.7 3 2.4 3.5 5.2" {...s} />
    </svg>
  );
}

export function BuildingIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M2 21h20" {...s} />
      <path d="M8 8h3M8 12h3M8 16h3" {...s} />
    </svg>
  );
}

export function SettingsIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" {...s} />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
        {...s}
      />
    </svg>
  );
}

export function UploadIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" {...s} />
      <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" {...s} />
    </svg>
  );
}

export function PlusIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" {...s} />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" {...s} />
      <path d="m20 20-4.2-4.2" {...s} />
    </svg>
  );
}

export function InfoIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" {...s} />
      <path d="M12 11v5M12 8h.01" {...s} />
    </svg>
  );
}

export function AlertIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" {...s} />
      <path d="M12 9.5v4M12 17h.01" {...s} />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 13l4 4L19 7" {...s} strokeWidth={2.2} />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" {...s} />
      <path d="M12 7v5l3.5 2" {...s} />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...s} />
      <path d="M3.5 10h17M8 3v4M16 3v4" {...s} />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" {...s} />
      <circle cx="12" cy="9.5" r="2.5" {...s} />
    </svg>
  );
}

export function GlobeIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" {...s} />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" {...s} />
    </svg>
  );
}

export function CertificateIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="5.5" {...s} />
      <path d="m8.8 13.4-1.3 6.6L12 17.8l4.5 2.2-1.3-6.6" {...s} />
    </svg>
  );
}

export function ChartIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V10M10 20V4M16 20v-7M2.5 20.5h19" {...s} />
    </svg>
  );
}

export function TrendUpIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="m3 17 6-6 4 4 8-8M15 7h6v6" {...s} />
    </svg>
  );
}

export function EditIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" {...s} />
    </svg>
  );
}

export function ArrowUpIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 19V5M6 11l6-6 6 6" {...s} />
    </svg>
  );
}

export function ArrowDownIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M6 13l6 6 6-6" {...s} />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" {...s} />
    </svg>
  );
}

export function PlayIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
    </svg>
  );
}

export function QuizIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3.5" width="16" height="17" rx="3" {...s} />
      <path d="M8 9h8M8 13h5" {...s} />
    </svg>
  );
}

export function BellIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9.5a6 6 0 1 1 12 0c0 3.6 1 5.2 1.6 6.1.2.3 0 .7-.3.7H4.7c-.3 0-.5-.4-.3-.7C5 14.7 6 13.1 6 9.5Z" {...s} />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" {...s} />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" {...s} />
      <path d="m3.5 7 8.5 6.5L20.5 7" {...s} />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 20.6 3.4 14.1 3.4 6c0-.6.4-1 1-1H7.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 1.3Z"
        {...s}
      />
    </svg>
  );
}

export function WhatsappIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.44 1.28 4.87L2 22l5.36-1.39a9.9 9.9 0 0 0 4.68 1.19h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.44-.72-2.9-1.15-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function LogoutIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9M16 17l5-5-5-5M21 12H9" {...s} />
    </svg>
  );
}

export function HelpIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" {...s} />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01" {...s} />
    </svg>
  );
}

export function SparkIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" {...s} />
    </svg>
  );
}

export function VideoIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="6" width="13.5" height="12" rx="2.5" {...s} />
      <path d="m16 10.5 5.5-3v9l-5.5-3" {...s} />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" {...s} />
      <path d="m9 12 2 2 4-4" {...s} />
    </svg>
  );
}
