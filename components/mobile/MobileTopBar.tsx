import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSheet from "./LanguageSheet";
import { notices } from "@/lib/data";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M6 9.5a6 6 0 1 1 12 0c0 3.6 1 5.2 1.6 6.1.2.3 0 .7-.3.7H4.7c-.3 0-.5-.4-.3-.7C5 14.7 6 13.1 6 9.5Z"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export default function MobileTopBar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-brand-line bg-brand-cream/95 px-4 backdrop-blur dark:border-white/10 dark:bg-brand-black/95">
      {title ? (
        <span className="text-lg font-semibold text-brand-black dark:text-white">{title}</span>
      ) : (
        <Logo href="/mobile" size={28} iconOnly />
      )}
      <div className="flex items-center gap-2 text-brand-black dark:text-white">
        <LanguageSheet />
        <Link href="/noticeboard" className="relative flex h-10 w-10 items-center justify-center" aria-label="Notifications">
          <BellIcon />
          {notices.some((n) => n.unread) ? (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-green ring-2 ring-brand-cream dark:ring-brand-black" />
          ) : null}
        </Link>
      </div>
    </header>
  );
}
