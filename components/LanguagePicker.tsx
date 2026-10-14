"use client";

import { languages } from "@/lib/data";
import { useLanguage } from "./LanguageContext";

export default function LanguagePicker({
  name = "language",
  size = "md",
}: {
  name?: string;
  size?: "sm" | "md";
}) {
  const { lang, setLang, t } = useLanguage();
  const isSmall = size === "sm";

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t("lang.preferred")}>
      <input type="hidden" name={name} value={lang} />
      {languages.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(l.code)}
            className={[
              "rounded-xl border-2 font-semibold transition-colors",
              isSmall ? "px-3.5 py-2 text-xs" : "px-[18px] py-2.5 text-sm",
              active
                ? "border-brand-green bg-brand-green text-white"
                : "border-brand-line bg-white text-brand-black hover:border-brand-green dark:border-white/15 dark:bg-transparent dark:text-white",
            ].join(" ")}
          >
            {isSmall ? l.code : l.native}
          </button>
        );
      })}
    </div>
  );
}
