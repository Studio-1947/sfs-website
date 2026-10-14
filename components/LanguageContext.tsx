"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/lib/data";
import { formatDate, localizeDigits, translate, type TranslateVars } from "@/lib/i18n";

const STORAGE_KEY = "sfs_language";

const htmlLang: Record<Language, string> = { EN: "en", BN: "bn", HI: "hi", NE: "ne" };

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Translated UI string; `{name}` placeholders are filled from `vars` and digits are localized. */
  t: (key: string, vars?: TranslateVars) => string;
  /** A bare number (or numeric string) written in the current language's numerals. */
  n: (value: string | number) => string;
  /** A date written in the current language. */
  date: (iso: string, opts?: Intl.DateTimeFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored) setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
  }, [lang]);

  function setLang(next: Language) {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: (key, vars) => translate(lang, key, vars),
        n: (value) => localizeDigits(lang, value),
        date: (iso, opts) => formatDate(lang, iso, opts),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
