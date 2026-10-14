"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNav from "@/components/AdminNav";
import NewBatchButton from "@/components/NewBatchButton";
import { adminBatches, adminLearners } from "@/lib/data";

const learnerStatusStyles: Record<string, string> = {
  Active: "text-brand-green-dark dark:text-brand-green",
  Completed: "text-brand-black dark:text-white",
  Invited: "text-brand-gray-light dark:text-white/35",
};

const batchStatusStyles: Record<string, string> = {
  Active: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  Upcoming: "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  Completed: "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/45",
};

const tabs = [
  { key: "learners" as const, label: "Learners" },
  { key: "batches" as const, label: "Batches" },
];

export default function LearnersPage() {
  const [tab, setTab] = useState<"learners" | "batches">("learners");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav
          title="Learners"
          subtitle={
            tab === "learners"
              ? `${adminLearners.length} learners enrolled`
              : `${adminBatches.length} batches across all programmes`
          }
          action={tab === "batches" ? <NewBatchButton /> : undefined}
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

          {tab === "learners" ? (
            <div className="flex-1 overflow-hidden rounded-2xl bg-white p-2 dark:bg-brand-ink">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-cream dark:bg-white/5">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">LEARNER</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">SCHOOL / GROUP</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">LANGUAGE</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">PROGRESS</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {adminLearners.map((l) => (
                    <tr key={l.name} className="border-t border-brand-line dark:border-white/10">
                      <td className="px-5 py-4 text-[15px] font-semibold text-brand-black dark:text-white">{l.name}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.school}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.language}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{l.progress}</td>
                      <td className={`px-5 py-4 text-sm font-semibold ${learnerStatusStyles[l.status]}`}>{l.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden rounded-2xl bg-white p-2 dark:bg-brand-ink">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-cream dark:bg-white/5">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">BATCH</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">PROGRAMME</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">LEARNERS</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">START DATE</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-brand-gray-light dark:text-white/35">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {adminBatches.map((b) => (
                    <tr key={b.name} className="border-t border-brand-line dark:border-white/10">
                      <td className="px-5 py-4 text-[15px] font-semibold text-brand-black dark:text-white">{b.name}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{b.programme}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{b.learners}</td>
                      <td className="px-5 py-4 text-sm text-brand-gray dark:text-white/55">{b.startDate}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${batchStatusStyles[b.status]}`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
