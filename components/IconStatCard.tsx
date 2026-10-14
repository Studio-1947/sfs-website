"use client";

import Link from "next/link";
import StatIcon from "./StatIcon";
import { useLanguage } from "./LanguageContext";

export default function IconStatCard({
  icon,
  label,
  value,
  sub,
  href,
}: {
  icon: "certificate" | "streak" | "points" | "progress";
  label: string;
  value: string;
  sub?: string;
  href?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="relative flex flex-1 flex-col justify-between rounded-2xl border border-brand-line/80 bg-white p-4 shadow-sm transition-all hover:border-brand-green/40 hover:shadow-md dark:border-white/10 dark:bg-brand-ink sm:p-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/20 dark:text-brand-green sm:h-11 sm:w-11">
            <StatIcon icon={icon} className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 flex flex-col">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand-gray-light dark:text-white/40 leading-snug">
            {label}
          </span>
          <span className="mt-1 text-2xl font-bold tracking-tight text-brand-black dark:text-white sm:text-[28px] leading-tight">
            {value}
          </span>
          {sub ? (
            <span className="mt-1 text-xs text-brand-gray dark:text-white/55 sm:text-sm leading-normal">
              {sub}
            </span>
          ) : null}
        </div>
      </div>

      {href ? (
        <div className="mt-3 pt-1">
          <Link
            href={href}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-green px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-green-dark sm:text-sm"
          >
            {t("stat.explore")}
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
