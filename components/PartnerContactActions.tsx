import { MailIcon, PhoneIcon, WhatsappIcon } from "./admin/icons";

const PHONE = "+918447841831";
const EMAIL = "partnerships@schoolforskills.in";

export default function PartnerContactActions({ name }: { name: string }) {
  const btnClass =
    "flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-2xl border-2 border-brand-line text-sm font-semibold text-brand-black transition-colors hover:border-brand-green hover:text-brand-green-dark dark:border-white/15 dark:text-white dark:hover:border-brand-green dark:hover:text-brand-green";

  return (
    <div className="flex items-center gap-2">
      <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Coordinating with ${name}`)}`} className={btnClass} aria-label={`Email ${name}`}>
        <MailIcon />
        Email
      </a>
      <a href={`tel:${PHONE}`} className={btnClass} aria-label={`Call ${name}`}>
        <PhoneIcon />
        Call
      </a>
      <a
        href={`https://wa.me/${PHONE.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={`WhatsApp ${name}`}
      >
        <WhatsappIcon />
        WhatsApp
      </a>
    </div>
  );
}
