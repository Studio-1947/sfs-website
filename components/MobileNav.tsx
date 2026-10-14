"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { learner, notices } from "@/lib/data";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="h-6 w-6" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScopeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 4 2 8.5 12 13l10-4.5L12 4Z" className={active ? "fill-current" : ""} stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M6 10.8V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.2" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

const items = [
  { key: "dashboard", href: "/dashboard", label: "Learn", icon: HomeIcon },
  { key: "scholarship", href: "/scholarship", label: "Scope", icon: ScopeIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-around border-t border-brand-line bg-brand-cream/95 px-2 pt-1.5 backdrop-blur dark:border-white/10 dark:bg-brand-black/95 lg:hidden"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors ${
              active ? "text-brand-green-dark dark:text-brand-green" : "text-brand-gray-light dark:text-white/40"
            }`}
          >
            <Icon active={active} />
            {active ? <span className="h-1 w-1 rounded-full bg-current" /> : <span className="h-1 w-1" />}
          </Link>
        );
      })}

      <Link
        href="/noticeboard"
        className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors ${
          pathname.startsWith("/noticeboard") ? "text-brand-green-dark dark:text-brand-green" : "text-brand-gray-light dark:text-white/40"
        }`}
        aria-label="Noticeboard"
      >
        <span className="relative">
          <BellIcon />
          {notices.some((n) => n.unread) ? (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-brand-cream dark:ring-brand-black" />
          ) : null}
        </span>
        {pathname.startsWith("/noticeboard") ? (
          <span className="h-1 w-1 rounded-full bg-current" />
        ) : (
          <span className="h-1 w-1" />
        )}
      </Link>

      <Link href="/profile" className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${
            pathname.startsWith("/profile") ? "ring-2 ring-brand-green" : "ring-1 ring-brand-line dark:ring-white/20"
          } bg-brand-green`}
        >
          {learner.name.charAt(0)}
        </span>
        {pathname.startsWith("/profile") ? (
          <span className="h-1 w-1 rounded-full bg-brand-green-dark dark:bg-brand-green" />
        ) : (
          <span className="h-1 w-1" />
        )}
      </Link>
    </nav>
  );
}
