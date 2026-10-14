"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNav from "@/components/AdminNav";
import LineAreaChart from "@/components/LineAreaChart";
import DonutChart from "@/components/DonutChart";
import DateRangePicker from "@/components/DateRangePicker";
import UploadVideoButton from "@/components/UploadVideoButton";
import FilterPills from "@/components/FilterPills";
import {
  adminActivity,
  adminCohorts,
  adminLearners,
  adminStats,
  adminUser,
  courseGroups,
  courses,
  enrollmentSources,
  enrollmentSourcesLastMonth,
  languageDistribution,
  languageDistributionNewEnrollments,
  languages,
  monthlyEnrollment,
  monthlyEnrollment12mo,
  weeklyActiveLearners,
  weeklyActiveLearnersLastWeek,
} from "@/lib/data";

const statusStyles: Record<string, string> = {
  Active: "text-brand-green-dark dark:text-brand-green",
  Completed: "text-brand-black dark:text-white",
  Invited: "text-brand-gray-light dark:text-white/35",
};

const uploadAction = (
  <div className="flex flex-shrink-0 items-center gap-3">
    <DateRangePicker />
    <UploadVideoButton />
  </div>
);

export default function AdminPage() {
  const [enrollmentRange, setEnrollmentRange] = useState<"6m" | "12m">("6m");
  const [weeklyRange, setWeeklyRange] = useState<"thisWeek" | "lastWeek">("thisWeek");
  const [groupSort, setGroupSort] = useState<"completion" | "lessons">("completion");
  const [languageScope, setLanguageScope] = useState<"all" | "new">("all");
  const [sourceRange, setSourceRange] = useState<"thisMonth" | "lastMonth">("thisMonth");

  const groupStats = courseGroups
    .map((group) => {
      const groupCourses = courses.filter((c) => c.group === group);
      const avgProgress = groupCourses.length
        ? Math.round(groupCourses.reduce((sum, c) => sum + c.progress, 0) / groupCourses.length)
        : 0;
      return { group, count: groupCourses.length, avgProgress };
    })
    .filter((g) => g.count > 0)
    .sort((a, b) => (groupSort === "completion" ? b.avgProgress - a.avgProgress : b.count - a.count));
  const maxAvgProgress = Math.max(...groupStats.map((g) => g.avgProgress), 1);

  const topCourses = [...courses].sort((a, b) => b.progress - a.progress).slice(0, 5);

  const weeklyData = weeklyRange === "thisWeek" ? weeklyActiveLearners : weeklyActiveLearnersLastWeek;
  const maxWeekly = Math.max(...weeklyData.map((d) => d.count), 1);

  const enrollmentData = enrollmentRange === "6m" ? monthlyEnrollment : monthlyEnrollment12mo;

  const languageData = languageScope === "all" ? languageDistribution : languageDistributionNewEnrollments;
  const languageSegments = languageData.map((l) => ({
    label: languages.find((lang) => lang.code === l.code)?.label ?? l.code,
    percent: l.percent,
  }));

  const sourceData = sourceRange === "thisMonth" ? enrollmentSources : enrollmentSourcesLastMonth;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav title={`${adminUser.org} · Overview`} action={uploadAction} />

        <main className="flex flex-1 flex-col gap-6 bg-brand-cream px-11 py-9 dark:bg-brand-black">
          <div className="flex gap-[18px]">
            <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white p-5 dark:bg-brand-ink">
              <span className="text-[13px] font-semibold text-brand-gray-light dark:text-white/35">ACTIVE LEARNERS</span>
              <span className="text-[26px] font-semibold text-brand-black dark:text-white">
                {adminStats.activeLearners.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white p-5 dark:bg-brand-ink">
              <span className="text-[13px] font-semibold text-brand-gray-light dark:text-white/35">CERTIFICATES ISSUED</span>
              <span className="text-[26px] font-semibold text-brand-black dark:text-white">
                {adminStats.certificatesIssued.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white p-5 dark:bg-brand-ink">
              <span className="text-[13px] font-semibold text-brand-gray-light dark:text-white/35">AVG. COMPLETION RATE</span>
              <span className="text-[26px] font-semibold text-brand-black dark:text-white">
                {adminStats.avgCompletionRate}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white p-5 dark:bg-brand-ink">
              <span className="text-[13px] font-semibold text-brand-gray-light dark:text-white/35">LANGUAGES LIVE</span>
              <span className="text-[26px] font-semibold text-brand-black dark:text-white">
                {adminStats.languagesLive}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
            <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 dark:bg-brand-ink lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Enrollment growth</h2>
                <FilterPills
                  options={[
                    { key: "6m", label: "6 months" },
                    { key: "12m", label: "12 months" },
                  ]}
                  value={enrollmentRange}
                  onChange={setEnrollmentRange}
                />
              </div>
              <LineAreaChart data={enrollmentData} />
            </div>

            <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Learners by language</h2>
                <FilterPills
                  options={[
                    { key: "all", label: "All" },
                    { key: "new", label: "New" },
                  ]}
                  value={languageScope}
                  onChange={setLanguageScope}
                />
              </div>
              <DonutChart segments={languageSegments} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
            <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 dark:bg-brand-ink lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Top course groups</h2>
                <FilterPills
                  options={[
                    { key: "completion", label: "Completion" },
                    { key: "lessons", label: "Lessons" },
                  ]}
                  value={groupSort}
                  onChange={setGroupSort}
                />
              </div>
              <div className="flex flex-col gap-4">
                {groupStats.map((g) => (
                  <div key={g.group} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-black dark:text-white">{g.group}</span>
                      <span className="text-brand-gray dark:text-white/55">
                        {g.count} lessons &middot; {g.avgProgress}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-brand-line dark:bg-white/10">
                      <div
                        className="h-2 rounded-full bg-brand-green"
                        style={{ width: `${(g.avgProgress / maxAvgProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <h2 className="text-lg font-semibold text-brand-black dark:text-white">Top courses</h2>
              <div className="flex flex-col gap-3.5">
                {topCourses.map((c) => (
                  <div key={c.slug} className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-brand-black dark:text-white">{c.title}</span>
                      <span className="text-xs text-brand-gray-light dark:text-white/35">{c.group}</span>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-brand-green-dark dark:text-brand-green">
                      {c.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
            <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 dark:bg-brand-ink lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Active learners</h2>
                <FilterPills
                  options={[
                    { key: "thisWeek", label: "This week" },
                    { key: "lastWeek", label: "Last week" },
                  ]}
                  value={weeklyRange}
                  onChange={setWeeklyRange}
                />
              </div>
              <div className="flex h-40 items-end gap-3">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full items-end overflow-hidden rounded-lg bg-brand-line dark:bg-white/10">
                      <div
                        className="w-full rounded-lg bg-brand-green"
                        style={{ height: `${(d.count / maxWeekly) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-brand-gray-light dark:text-white/35">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <h2 className="text-lg font-semibold text-brand-black dark:text-white">Recent activity</h2>
              <div className="flex flex-col gap-3.5">
                {adminActivity.map((a) => (
                  <div key={`${a.name}-${a.time}`} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-xs font-semibold text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                      {a.name.charAt(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm text-brand-black dark:text-white">
                        <span className="font-semibold">{a.name}</span> {a.action}
                      </span>
                      <span className="text-xs text-brand-gray-light dark:text-white/35">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Training centres</h2>
                <Link
                  href="/admin/cohorts"
                  className="text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-green-darker dark:text-brand-green dark:hover:text-white"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {adminCohorts.slice(0, 4).map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 rounded-xl border border-brand-line px-4 py-3.5 dark:border-white/10"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-sm font-semibold text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                      {c.name.charAt(0)}
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-brand-black dark:text-white">{c.name}</span>
                      <span className="text-xs text-brand-gray dark:text-white/55">{c.learners} learners</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-brand-black dark:text-white">Enrollment sources</h2>
                <FilterPills
                  options={[
                    { key: "thisMonth", label: "This month" },
                    { key: "lastMonth", label: "Last month" },
                  ]}
                  value={sourceRange}
                  onChange={setSourceRange}
                />
              </div>
              <div className="flex flex-col gap-3.5">
                {sourceData.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-black dark:text-white">{s.label}</span>
                      <span className="text-brand-gray dark:text-white/55">{s.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-brand-line dark:bg-white/10">
                      <div className="h-1.5 rounded-full bg-brand-green" style={{ width: `${s.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden rounded-2xl bg-white p-2 dark:bg-brand-ink">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-cream dark:bg-white/5">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">
                    LEARNER
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">
                    SCHOOL / GROUP
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">
                    LANGUAGE
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">
                    PROGRESS
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminLearners.map((l) => (
                  <tr key={l.name} className="border-t border-brand-line dark:border-white/10">
                    <td className="px-5 py-4 text-[15px] font-semibold text-brand-black dark:text-white">{l.name}</td>
                    <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.school}</td>
                    <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.language}</td>
                    <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.progress}</td>
                    <td className={`px-5 py-4 text-sm font-semibold ${statusStyles[l.status]}`}>
                      {l.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
