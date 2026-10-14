"use client";

import { useMemo, useState } from "react";
import AdminShell from "@/components/AdminShell";
import NewBatchButton from "@/components/NewBatchButton";
import {
  Avatar,
  Card,
  EmptyState,
  Legend,
  PageIntro,
  ProgressBar,
  SearchBox,
  Segmented,
  StatusPill,
  TipBox,
  btnSmall,
} from "@/components/admin/ui";
import { BellIcon, CalendarIcon, CheckIcon, GlobeIcon, UsersIcon } from "@/components/admin/icons";
import { batchStatus, learnerStatus, parseProgress } from "@/lib/admin";
import { adminBatches, adminLearners, type AdminBatch, type AdminLearner } from "@/lib/data";

type Tab = "students" | "batches";
type Filter = "all" | AdminLearner["status"];

const batchOrder: AdminBatch["status"][] = ["Active", "Upcoming", "Completed"];

export default function StudentsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const [tab, setTab] = useState<Tab>(searchParams.tab === "batches" ? "batches" : "students");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [reminded, setReminded] = useState<string[]>([]);

  const count = (s: AdminLearner["status"]) => adminLearners.filter((l) => l.status === s).length;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminLearners.filter(
      (l) => (filter === "all" || l.status === filter) && (!q || l.name.toLowerCase().includes(q) || l.school.toLowerCase().includes(q))
    );
  }, [query, filter]);

  return (
    <AdminShell>
      <PageIntro
        title="Students"
        description="Everyone learning with you, and the batches (groups) they study in. Find a student, see how far they’ve got, and nudge anyone who is stuck."
        actions={tab === "batches" ? <NewBatchButton /> : null}
      />

      <Segmented
        label="Show"
        value={tab}
        onChange={setTab}
        options={[
          { key: "students", label: "Students", count: adminLearners.length, icon: <UsersIcon className="h-4 w-4" /> },
          { key: "batches", label: "Batches", count: adminBatches.length, icon: <CalendarIcon className="h-4 w-4" /> },
        ]}
      />

      {tab === "students" ? (
        <>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchBox value={query} onChange={setQuery} placeholder="Type a name or school to find a student" />
            <Segmented
              label="Filter students"
              value={filter}
              onChange={setFilter}
              options={[
                { key: "all", label: "Everyone", count: adminLearners.length },
                { key: "Active", label: "Learning", count: count("Active") },
                { key: "Completed", label: "Finished", count: count("Completed") },
                { key: "Invited", label: "Not started", count: count("Invited") },
              ]}
            />
          </div>

          <Legend items={(Object.keys(learnerStatus) as AdminLearner["status"][]).map((k) => ({ tone: learnerStatus[k].tone, label: learnerStatus[k].label, meaning: learnerStatus[k].meaning }))} />

          {shown.length === 0 ? (
            <EmptyState
              title="No students found"
              body={query ? `Nobody matches “${query}”. Check the spelling, or try part of the name.` : "No students have this label right now."}
              action={
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className={btnSmall}
                >
                  Show everyone again
                </button>
              }
            />
          ) : (
            <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              {shown.map((l) => {
                const st = learnerStatus[l.status];
                const p = parseProgress(l.progress);
                const sent = reminded.includes(l.name);
                return (
                  <li key={l.name} className="flex flex-col gap-4 rounded-3xl border border-brand-line/70 bg-white p-5 dark:border-white/10 dark:bg-brand-ink">
                    <div className="flex items-start gap-3">
                      <Avatar name={l.name} size={48} />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-semibold text-brand-black dark:text-white">{l.name}</span>
                          <StatusPill tone={st.tone}>{st.label}</StatusPill>
                        </div>
                        <span className="text-sm text-brand-gray dark:text-white/55">{l.school}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-brand-gray dark:text-white/55">
                          <GlobeIcon className="h-4 w-4" /> Learns in {l.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-semibold text-brand-black dark:text-white">
                          Finished {p.done} of {p.total} topics
                        </span>
                        <span className="font-semibold text-brand-green-dark dark:text-brand-green">
                          {p.total ? Math.round((p.done / p.total) * 100) : 0}%
                        </span>
                      </div>
                      <ProgressBar value={p.done} max={p.total} tone={l.status === "Invited" ? "amber" : "green"} />
                    </div>

                    {l.status === "Invited" ? (
                      <button
                        type="button"
                        disabled={sent}
                        onClick={() => setReminded((r) => [...r, l.name])}
                        className={`${btnSmall} w-fit`}
                      >
                        {sent ? (
                          <>
                            <CheckIcon className="h-4 w-4" /> Reminder sent to {l.name}
                          </>
                        ) : (
                          <>
                            <BellIcon className="h-4 w-4" /> Remind {l.name} to start
                          </>
                        )}
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <>
          <TipBox title="What is a batch?">
            A batch is a group of students who start the same course on the same day, like a class at school.
          </TipBox>

          {batchOrder.map((status) => {
            const list = adminBatches.filter((b) => b.status === status);
            if (!list.length) return null;
            const st = batchStatus[status];
            return (
              <Card key={status} title={`${st.label} (${list.length})`} help={`These batches: ${st.meaning}.`}>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {list.map((b) => (
                    <li key={b.name} className="flex flex-col gap-3 rounded-2xl border border-brand-line p-4 dark:border-white/10">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[17px] font-semibold text-brand-black dark:text-white">{b.name}</span>
                        <StatusPill tone={st.tone}>{st.label}</StatusPill>
                      </div>
                      <span className="text-sm leading-snug text-brand-gray dark:text-white/60">{b.programme}</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-brand-line pt-3 text-sm dark:border-white/10">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-black dark:text-white">
                          <UsersIcon className="h-4 w-4 text-brand-green-dark dark:text-brand-green" /> {b.learners} students
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-brand-gray dark:text-white/60">
                          <CalendarIcon className="h-4 w-4" /> {status === "Upcoming" ? "Starts" : "Started"} {b.startDate}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </>
      )}
    </AdminShell>
  );
}
