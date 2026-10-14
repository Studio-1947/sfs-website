function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <path
        d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 20.6 3.4 14.1 3.4 6c0-.6.4-1 1-1H7.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 1.3Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.44 1.28 4.87L2 22l5.36-1.39a9.9 9.9 0 0 0 4.68 1.19h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.44-.72-2.9-1.15-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

const PHONE = "+918447841831";
const EMAIL = "partnerships@schoolforskills.in";

export default function PartnerContactActions({ name }: { name: string }) {
  const btnClass =
    "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-line text-xs font-semibold text-brand-gray transition-colors hover:border-brand-green hover:text-brand-green-dark dark:border-white/15 dark:text-white/70 dark:hover:text-brand-green";

  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Coordinating with ${name}`)}`}
        className={btnClass}
      >
        <EmailIcon />
        Email
      </a>
      <a href={`tel:${PHONE}`} className={btnClass}>
        <PhoneIcon />
        Call
      </a>
      <a
        href={`https://wa.me/${PHONE.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
      >
        <WhatsappIcon />
        WhatsApp
      </a>
    </div>
  );
}
