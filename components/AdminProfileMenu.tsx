"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminUser } from "@/lib/data";

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth={1.6} />
      <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.6} />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.14.6.62 1.06 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <path
        d="M3 12h4l2-7 4 14 2-7h6"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <path
        d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const menuItems = [
  { label: "View Profile", href: "/admin/settings", icon: ProfileIcon },
  { label: "Account Setting", href: "/admin/settings", icon: SettingsIcon },
  { label: "Login Activity", href: "/admin/settings", icon: ActivityIcon },
];

export default function AdminProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-brand-black/5 dark:hover:bg-white/5"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
          {adminUser.name.charAt(0)}
        </span>
        <span className="hidden flex-col items-start leading-tight sm:flex">
          {adminUser.verified ? null : (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-orange-500">Unverified</span>
          )}
          <span className="text-sm font-semibold text-brand-black dark:text-white">{adminUser.name}</span>
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0 text-brand-gray-light dark:text-white/35" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-72 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-xl dark:border-white/10 dark:bg-brand-ink">
          <div className="flex items-center gap-3 bg-brand-cream px-5 py-4 dark:bg-white/5">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
              {adminUser.name.charAt(0)}
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[15px] font-semibold text-brand-black dark:text-white">{adminUser.name}</span>
              <span className="truncate text-sm text-brand-gray dark:text-white/55">{adminUser.email}</span>
            </div>
          </div>

          <div className="flex flex-col py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-brand-gray transition-colors hover:bg-brand-cream hover:text-brand-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <Icon />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-brand-line py-2 dark:border-white/10">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-3 px-5 py-2.5 text-sm font-semibold text-brand-gray transition-colors hover:bg-brand-cream hover:text-red-500 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-red-400"
            >
              <SignOutIcon />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
