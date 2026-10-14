"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, LinkButton } from "./Button";
import { getProfile, isProfileComplete, missingProfileFields } from "@/lib/profile";
import { useLanguage } from "./LanguageContext";

export default function CertificateActions() {
  const [ready, setReady] = useState<boolean | null>(null);
  const [missing, setMissing] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const profile = getProfile();
    setReady(isProfileComplete(profile));
    setMissing(missingProfileFields(profile));
  }, []);

  if (ready === null) return <div className="h-[52px]" />;

  if (!ready) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-2xl bg-brand-green-tint px-5 py-3.5 text-sm font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green">
          {missing === 1 ? t("certact.missingOne") : t("certact.missingMany", { n: missing })}
        </div>
        <Link
          href="/profile"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-brand-black py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-ink dark:bg-white/10 dark:hover:bg-white/15"
        >
          <span className="pl-6">{t("certact.completeProfile")}</span>
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <LinkButton href="/dashboard" variant="secondary">
        {t("dashboard.continueLearning")}
      </LinkButton>
      <Button variant="primary" onClick={() => window.print()}>
        {t("certact.download")}
      </Button>
    </div>
  );
}
