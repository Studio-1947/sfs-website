"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNav from "@/components/AdminNav";
import CourseIcon from "@/components/CourseIcon";
import UploadVideoButton from "@/components/UploadVideoButton";
import NewCurriculumButton from "@/components/NewCurriculumButton";
import EditLessonButton from "@/components/EditLessonButton";
import { Course, courseGroups, courses } from "@/lib/data";

const statusStyles: Record<string, string> = {
  completed: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  "in-progress": "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  "not-started": "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/45",
};

const textStatusStyles: Record<string, string> = {
  completed: "text-brand-green-dark dark:text-brand-green",
  "in-progress": "text-brand-black dark:text-white",
  "not-started": "text-brand-gray-light dark:text-white/35",
};

const tabs = [
  { key: "groups" as const, label: "By group" },
  { key: "all" as const, label: "All videos" },
];

export default function CurriculumPage() {
  const [tab, setTab] = useState<"groups" | "all">("groups");
  const populatedGroups = courseGroups.filter((group) => courses.some((c) => c.group === group));

  const [order, setOrder] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      populatedGroups.map((group) => [group, courses.filter((c) => c.group === group).map((c) => c.slug)])
    )
  );

  function moveLesson(group: string, slug: string, direction: -1 | 1) {
    setOrder((prev) => {
      const list = [...(prev[group] ?? [])];
      const index = list.indexOf(slug);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, [group]: list };
    });
  }

  const byslug = Object.fromEntries(courses.map((c) => [c.slug, c])) as Record<string, Course>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav
          title="Curriculum"
          subtitle={`${courses.length} lessons across ${populatedGroups.length} curriculums`}
          action={
            <div className="flex flex-shrink-0 items-center gap-3">
              <NewCurriculumButton />
              <UploadVideoButton />
            </div>
          }
        />

        <main className="flex flex-1 flex-col gap-6 bg-brand-cream px-11 py-9 dark:bg-brand-black">
          <div className="flex w-fit items-center gap-2 rounded-full border border-brand-line p-1 dark:border-white/15">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                type="button"
                onClick={() => setTab(tb.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === tb.key
                    ? "bg-brand-green text-white"
                    : "text-brand-gray hover:text-brand-black dark:text-white/70 dark:hover:text-white"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          {tab === "groups" ? (
            <div className="flex flex-col gap-6 overflow-y-auto pb-6">
              {populatedGroups.map((group) => {
                const slugOrder = order[group] ?? [];
                return (
                  <div key={group} className="rounded-2xl bg-white p-5 dark:bg-brand-ink">
                    <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                        Curriculum &middot; {group}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-brand-green-tint px-2.5 py-1 text-xs font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green">
                          {slugOrder.length} LESSONS
                        </span>
                        <UploadVideoButton defaultGroup={group} compact />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {slugOrder.map((slug, i) => {
                        const course = byslug[slug];
                        if (!course) return null;
                        return (
                          <div
                            key={course.slug}
                            className="flex items-center gap-4 rounded-xl border border-brand-line px-4 py-3 dark:border-white/10"
                          >
                            <div className="flex flex-col">
                              <button
                                type="button"
                                onClick={() => moveLesson(group, slug, -1)}
                                disabled={i === 0}
                                aria-label="Move lesson up"
                                className="flex h-4 w-5 items-center justify-center text-brand-gray-light transition-colors hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-30 dark:text-white/35 dark:hover:text-white"
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                                  <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => moveLesson(group, slug, 1)}
                                disabled={i === slugOrder.length - 1}
                                aria-label="Move lesson down"
                                className="flex h-4 w-5 items-center justify-center text-brand-gray-light transition-colors hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-30 dark:text-white/35 dark:hover:text-white"
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                              <CourseIcon icon={course.thumbIcon} className="h-5 w-5" />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <span className="text-[15px] font-semibold text-brand-black dark:text-white">{course.title}</span>
                              <span className="text-sm text-brand-gray dark:text-white/55">{course.duration} lesson</span>
                            </div>
                            <span
                              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${statusStyles[course.status]}`}
                            >
                              {course.status.replace("-", " ").toUpperCase()}
                            </span>
                            <EditLessonButton course={course} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 overflow-hidden rounded-2xl bg-white p-2 dark:bg-brand-ink">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-cream dark:bg-white/5">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">LESSON</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">GROUP</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">DURATION</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">STATUS</th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold text-brand-gray-light dark:text-white/35">EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.slug} className="border-t border-brand-line dark:border-white/10">
                      <td className="px-5 py-4 text-[15px] font-semibold text-brand-black dark:text-white">{c.title}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{c.group}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{c.duration}</td>
                      <td className={`px-5 py-4 text-sm font-semibold ${textStatusStyles[c.status]}`}>
                        {c.status.replace("-", " ").toUpperCase()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end">
                          <EditLessonButton course={c} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
              Certificate template
            </span>
            <p className="text-sm leading-relaxed text-brand-gray dark:text-white/55">
              QR-verifiable certificates are issued automatically once a learner completes every video in a course
              and passes each quiz. Certificate ID format:{" "}
              <span className="font-semibold text-brand-black dark:text-white">SFS-2026-XXXXXX</span>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
