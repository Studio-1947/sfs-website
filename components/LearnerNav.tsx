"use client";

import Link from "next/link";
import Logo from "./Logo";
import NavControls from "./NavControls";
import LearnerProfileMenu from "./LearnerProfileMenu";
import MobileNav from "./MobileNav";
import { useLanguage } from "./LanguageContext";
import { notices } from "@/lib/data";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6 9.5a6 6 0 1 1 12 0c0 3.6 1 5.2 1.6 6.1.2.3 0 .7-.3.7H4.7c-.3 0-.5-.4-.3-.7C5 14.7 6 13.1 6 9.5Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export default function LearnerNav({
  active,
  backHref,
  backLabel,
  dimmed = false,
  hasSidebar = false,
}: {
  active: "dashboard" | "lesson" | "quiz" | "certificate" | "profile" | "scholarship" | "noticeboard" | "placement";
  backHref?: string;
  backLabel?: string;
  dimmed?: boolean;
  hasSidebar?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <>
      <header
        className={`sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-brand-line bg-brand-cream/95 px-4 py-3.5 backdrop-blur dark:border-white/10 dark:bg-brand-black/95 sm:px-8 sm:py-5 lg:px-16 ${
          dimmed ? "blur-sm brightness-90" : ""
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <div className={hasSidebar ? "lg:hidden" : ""}>
            <Logo href="/dashboard" size={28} responsiveText />
          </div>
          {backHref ? (
            <Link
              href={backHref}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-gray transition-colors hover:border-brand-green hover:text-brand-black dark:border-white/15 dark:text-white/55 dark:hover:border-brand-green dark:hover:text-white sm:h-auto sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:gap-1.5"
              aria-label={backLabel ?? t("common.goBack")}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                <path d="M19 12H5m0 0l6 6m-6-6l6-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          ) : null}
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <NavControls />
          <Link
            href="/noticeboard"
            className="relative hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-brand-black transition-colors hover:bg-brand-black/5 dark:text-white dark:hover:bg-white/10 lg:flex"
            aria-label={t("nav.noticeboard")}
          >
            <BellIcon />
            {notices.some((n) => n.unread) ? (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-green ring-2 ring-brand-cream dark:ring-brand-black" />
            ) : null}
          </Link>
          <div className="hidden lg:block">
            <LearnerProfileMenu />
          </div>
        </div>
      </header>
      <MobileNav />
    </>
  );
}
