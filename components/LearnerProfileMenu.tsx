"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarBadge from "./AvatarBadge";
import { learner } from "@/lib/data";

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth={1.6} />
      <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth={1.6} />
      <path d="M9 14.5 7.5 21l4.5-2.5 4.5 2.5-1.5-6.5" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
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
  { label: "View Profile", href: "/profile", icon: ProfileIcon },
  { label: "My certificate", href: "/certificate", icon: CertificateIcon },
];

export default function LearnerProfileMenu() {
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
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1.5 transition-colors hover:bg-brand-black/5 dark:hover:bg-white/10"
      >
        <AvatarBadge initials={learner.name.charAt(0)} size={36} />
        <span className="hidden text-sm font-semibold text-brand-black dark:text-white md:inline">
          {learner.name}
        </span>
        <svg viewBox="0 0 24 24" fill="none" className="hidden h-4 w-4 flex-shrink-0 text-brand-gray-light dark:text-white/35 md:block" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-64 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-xl dark:border-white/10 dark:bg-brand-ink">
          <div className="flex items-center gap-3 bg-brand-cream px-5 py-4 dark:bg-white/5">
            <AvatarBadge initials={learner.name.charAt(0)} size={40} />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[15px] font-semibold text-brand-black dark:text-white">{learner.name}</span>
              <span className="truncate text-sm text-brand-gray dark:text-white/55">{learner.school}</span>
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
