"use client";

import LearnerNav from "@/components/LearnerNav";
import LearnerSidebar from "@/components/LearnerSidebar";
import { useLanguage } from "@/components/LanguageContext";
import { localizeNotices } from "@/lib/localize";

export default function NoticeboardPage() {
  const { t, lang, date } = useLanguage();
  const notices = localizeNotices(lang);
  return (
    <div className="flex">
      <LearnerSidebar active="noticeboard" />
      <div className="min-w-0 flex-1">
        <LearnerNav active="noticeboard" backHref="/dashboard" backLabel={t("lesson.backToDashboard")} hasSidebar />

        <main className="flex flex-col gap-6 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
          <div>
            <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[32px]">{t("nav.noticeboard")}</h1>
            <p className="text-base text-brand-gray dark:text-white/55">
              {t("notice.intro")}
            </p>
          </div>

          <div className="flex flex-col gap-3 pb-6">
            {notices.map((notice) => (
              <div
                key={notice.date}
                className="flex flex-col gap-2 rounded-2xl border border-brand-line bg-white p-5 dark:border-white/10 dark:bg-brand-ink sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    {notice.unread ? <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-green" /> : null}
                    <span className="text-[15px] font-semibold text-brand-black dark:text-white">{notice.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-brand-gray dark:text-white/55">{notice.body}</p>
                </div>
                <span className="flex-shrink-0 text-sm text-brand-gray-light dark:text-white/35">
                  {date(notice.date)}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
