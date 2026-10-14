"use client";

import { useEffect } from "react";
import LanguagePicker from "./LanguagePicker";
import { LinkButton } from "./Button";
import { useLanguage } from "./LanguageContext";

const fieldClass =
  "h-[48px] rounded-xl border-[1.5px] border-brand-line bg-transparent px-4 text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white dark:[color-scheme:dark]";
const labelClass = "text-sm font-semibold text-brand-black dark:text-white";

const states = ["West Bengal", "Assam", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Meghalaya"];

export default function SignupModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-full w-full max-w-[600px] flex-col gap-5 overflow-hidden rounded-[28px] bg-white p-6 dark:bg-brand-ink sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[28px]">
              {t("signup.title")}
            </h1>
            <p className="mt-1 text-sm text-brand-gray dark:text-white/55">{t("signup.sub")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close")}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-gray transition-colors hover:border-brand-green hover:text-brand-green dark:border-white/15 dark:text-white/70"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form className="flex flex-col gap-4 overflow-y-auto pr-1" action="/dashboard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-name" className={labelClass}>
                {t("pf.fullName")}
              </label>
              <input id="sm-name" name="name" type="text" placeholder={t("pf.namePh")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-dob" className={labelClass}>
                {t("pf.dob")}
              </label>
              <input id="sm-dob" name="dob" type="date" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-phone" className={labelClass}>
                {t("pf.phone")}
              </label>
              <input id="sm-phone" name="phone" type="tel" placeholder="+91 00000 00000" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-email" className={labelClass}>
                {t("pf.email")}
              </label>
              <input id="sm-email" name="email" type="email" placeholder="you@example.com" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-guardian" className={labelClass}>
                {t("pf.guardian")}
              </label>
              <input id="sm-guardian" name="guardian" type="text" placeholder={t("pf.guardianPh")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sm-state" className={labelClass}>
                {t("signup.state")}
              </label>
              <select id="sm-state" name="state" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  {t("signup.selectState")}
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {t(`state.${s}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="sm-address" className={labelClass}>
                {t("pf.address")}
              </label>
              <input id="sm-address" name="address" type="text" placeholder={t("signup.addressPh")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="sm-school" className={labelClass}>
                {t("pf.school")}
              </label>
              <input
                id="sm-school"
                name="school"
                type="text"
                placeholder={t("pf.schoolPh")}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className={labelClass}>{t("lang.preferred")}</span>
            <LanguagePicker size="sm" />
          </div>

          <LinkButton href="/dashboard" variant="primary" className="mt-1 w-full">
            {t("signup.continue")}
          </LinkButton>
        </form>

        <p className="text-center text-sm text-brand-gray dark:text-white/55">
          {t("signup.already")}{" "}
          <button type="button" onClick={onClose} className="font-semibold text-brand-green-dark dark:text-brand-green">
            {t("nav.signIn")}
          </button>
        </p>
      </div>
    </div>
  );
}
