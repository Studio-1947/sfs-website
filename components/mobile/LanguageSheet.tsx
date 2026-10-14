"use client";

import { useState } from "react";
import { languages } from "@/lib/data";
import { useLanguage } from "@/components/LanguageContext";
import { CheckIcon, CloseIcon, GlobeIcon } from "@/components/learn/icons";

/** Header chip + bottom sheet. Big native-script options so anyone can find their language. */
export default function LanguageSheet() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-brand-line px-3.5 text-sm font-semibold text-brand-black dark:border-white/15 dark:text-white"
        aria-label="Change language"
      >
        <GlobeIcon />
        {lang}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Choose language">
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            className="relative w-full max-w-md rounded-t-3xl bg-white px-5 pt-3 dark:bg-brand-ink"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-brand-line dark:bg-white/20" />
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-semibold text-brand-black dark:text-white">Choose your language</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full text-brand-gray dark:text-white/60"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {languages.map((l) => {
                const active = lang === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`flex min-h-[56px] items-center justify-between rounded-2xl border-2 px-5 text-left transition-colors ${
                      active
                        ? "border-brand-green bg-brand-green-tint dark:bg-brand-green/15"
                        : "border-brand-line dark:border-white/15"
                    }`}
                  >
                    <span className="flex flex-col leading-tight">
                      <span className="text-lg font-semibold text-brand-black dark:text-white">{l.native}</span>
                      <span className="text-xs text-brand-gray dark:text-white/50">{l.label}</span>
                    </span>
                    {active ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-white">
                        <CheckIcon />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <p className="px-1 pt-3 text-xs text-brand-gray dark:text-white/45">
              Videos are in English. Your language is used for subtitles and the app.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
