"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "./LanguageContext";
import { learner } from "@/lib/data";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
      <path
        d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScholarshipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
      <path d="M12 4 2 8.5 12 13l10-4.5L12 4Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M6 10.8V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.2" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 9v6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6} />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const menuItems = [
  { key: "dashboard" as const, href: "/dashboard", icon: DashboardIcon, labelKey: "nav.dashboard" as const },
  { key: "scholarship" as const, href: "/scholarship", icon: ScholarshipIcon, labelKey: "nav.scholarship" as const },
];

export default function LearnerSidebar({
  active,
}: {
  active: "dashboard" | "lesson" | "quiz" | "certificate" | "profile" | "scholarship" | "noticeboard" | "placement";
}) {
  const { t } = useLanguage();
  const activeKey =
    active === "lesson" || active === "quiz" || active === "certificate"
      ? "dashboard"
      : active === "placement"
        ? "scholarship"
        : active;

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] flex-shrink-0 flex-col gap-2 overflow-y-auto border-r border-brand-line bg-white px-5 py-7 dark:border-white/10 dark:bg-brand-ink lg:flex">
      <div className="mb-6 px-2.5">
        <Logo href="/dashboard" size={32} iconOnly />
      </div>

      <span className="px-3.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
        Menu
      </span>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeKey === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors ${
              isActive
                ? "bg-brand-green text-white"
                : "text-brand-gray hover:bg-brand-black/5 hover:text-brand-black dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            <Icon />
            {t(item.labelKey)}
          </Link>
        );
      })}

      <span className="mt-5 px-3.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
        Your progress
      </span>
      <div className="flex flex-col gap-3 rounded-xl bg-brand-black/5 px-3.5 py-3.5 dark:bg-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-gray dark:text-white/55">Overall progress</span>
          <span className="font-semibold text-brand-black dark:text-white">{learner.overallProgress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-brand-black/10 dark:bg-white/10">
          <div className="h-1.5 rounded-full bg-brand-green" style={{ width: `${learner.overallProgress}%` }} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-gray dark:text-white/55">Learning streak</span>
          <span className="font-semibold text-brand-black dark:text-white">{learner.streakDays} days</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-gray dark:text-white/55">Certificates</span>
          <span className="font-semibold text-brand-black dark:text-white">{learner.certificatesEarned}</span>
        </div>
      </div>

      <div className="flex-1" />

      <span className="px-3.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
        Assistance
      </span>
      <div className="flex items-center gap-3 rounded-xl bg-brand-black/5 px-3.5 py-3 text-sm font-semibold text-brand-gray dark:bg-white/5 dark:text-white/55">
        <ClockIcon />
        Mon&ndash;Sat, 9 AM&ndash;6 PM
      </div>

      <Link href="/" className="px-3.5 py-2 text-sm font-semibold text-brand-gray-light dark:text-white/50">
        &larr; Back to home
      </Link>
    </aside>
  );
}
