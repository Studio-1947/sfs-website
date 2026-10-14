"use client";

import LearnerNav from "@/components/LearnerNav";
import LearnerSidebar from "@/components/LearnerSidebar";
import { notices } from "@/lib/data";

export default function NoticeboardPage() {
  return (
    <div className="flex">
      <LearnerSidebar active="noticeboard" />
      <div className="min-w-0 flex-1">
        <LearnerNav active="noticeboard" backHref="/dashboard" backLabel="Back to dashboard" hasSidebar />

        <main className="flex flex-col gap-6 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
          <div>
            <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[32px]">Noticeboard</h1>
            <p className="text-base text-brand-gray dark:text-white/55">
              Updates, new batches, and announcements from Schools for Skills.
            </p>
          </div>

          <div className="flex flex-col gap-3 pb-6">
            {notices.map((notice) => (
              <div
                key={notice.title}
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
                  {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
