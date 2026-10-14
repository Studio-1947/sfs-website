"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LearnIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 5.5C10 4 7 3.7 4 4.2v13.6c3-.5 6-.2 8 1.2 2-1.4 5-1.7 8-1.2V4.2c-3-.5-6-.2-8 1.3Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertificateIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="9" r="6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} />
      <path d="M9 14.5 7.5 21l4.5-2.5 4.5 2.5-1.5-6.5" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
    </svg>
  );
}

function MeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} />
      <path d="M4.5 20c.8-3.6 3.6-5.5 7.5-5.5s6.7 1.9 7.5 5.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

const tabs = [
  { key: "learn", href: "/mobile", label: "Learn", icon: LearnIcon },
  { key: "certificate", href: "/mobile/certificate", label: "Certificate", icon: CertificateIcon },
  { key: "me", href: "/mobile/profile", label: "Me", icon: MeIcon },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md items-stretch border-t border-brand-line bg-white/95 backdrop-blur dark:border-white/10 dark:bg-brand-ink/95"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.href === "/mobile" ? pathname === "/mobile" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-[60px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
              active ? "text-brand-green-dark dark:text-brand-green" : "text-brand-gray-light dark:text-white/45"
            }`}
          >
            <Icon active={active} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
