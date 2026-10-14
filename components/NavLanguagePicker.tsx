"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "@/lib/data";
import { useLanguage } from "./LanguageContext";

export default function NavLanguagePicker({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-10 items-center gap-1 rounded-full border px-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-brand-green ${
          light
            ? "border-white/30 text-white"
            : "border-brand-line text-brand-black dark:border-white/15 dark:text-white"
        }`}
      >
        <span className="sr-only">Selected language: </span>
        {lang.toLowerCase()}
        <svg viewBox="0 0 24 24" fill="none" className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-2xl border border-brand-line bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-brand-ink"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={lang === l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                lang === l.code
                  ? "bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green"
                  : "text-brand-black hover:bg-brand-green-tint dark:text-white dark:hover:bg-white/5"
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
