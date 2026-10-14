"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import UploadVideoButton from "@/components/UploadVideoButton";
import NewBatchButton from "@/components/NewBatchButton";
import {
  ActionTile,
  Avatar,
  BarList,
  Card,
  ColumnChart,
  ProgressBar,
  Segmented,
  StatTile,
  StatusPill,
  Takeaway,
  TipBox,
  btnSmall,
  formatNumber,
} from "@/components/admin/ui";
import {
  ArrowRightIcon,
  BellIcon,
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  CertificateIcon,
  ChartIcon,
  CheckIcon,
  GlobeIcon,
  PlayIcon,
  PlusIcon,
  SparkIcon,
  TrendUpIcon,
  UploadIcon,
  UsersIcon,
} from "@/components/admin/icons";
import { inTen, learnerStatus } from "@/lib/admin";
import {
  adminActivity,
  adminBatches,
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

const dayNames: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const monthNames: Record<string, string> = {
  Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
  Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};

function activityIcon(action: string) {
  if (action.startsWith("completed")) return <CheckIcon className="h-4 w-4" />;
  if (action.includes("certificate")) return <CertificateIcon className="h-4 w-4" />;
  if (action.startsWith("started")) return <PlayIcon className="h-3.5 w-3.5" />;
  if (action.startsWith("signed up")) return <UsersIcon className="h-4 w-4" />;
  return <BuildingIcon className="h-4 w-4" />;
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function AdminHomePage() {
  const [months, setMonths] = useState<"6" | "12">("6");
  const [week, setWeek] = useState<"this" | "last">("this");
  const [langScope, setLangScope] = useState<"all" | "new">("all");
  const [sourceMonth, setSourceMonth] = useState<"this" | "last">("this");
  const [reminded, setReminded] = useState<string[]>([]);
  // Picked after mount so the server and browser render the same text first.
  const [hello, setHello] = useState("Hello");
  useEffect(() => setHello(greeting()), []);

  // Joining trend
  const joinData = (months === "6" ? monthlyEnrollment : monthlyEnrollment12mo).map((d) => ({ label: d.month, value: d.value }));
  const bestMonth = joinData.reduce((a, b) => (b.value > a.value ? b : a));
  const lastTwo = monthlyEnrollment.slice(-2);
  const growth = lastTwo[1].value - lastTwo[0].value;

  // Busiest day
  const weekData = (week === "this" ? weeklyActiveLearners : weeklyActiveLearnersLastWeek).map((d) => ({ label: d.day, value: d.count }));
  const busiest = weekData.reduce((a, b) => (b.value > a.value ? b : a));

  // Languages
  const langData = (langScope === "all" ? languageDistribution : languageDistributionNewEnrollments).map((l) => {
    const info = languages.find((x) => x.code === l.code);
    return { label: info ? `${info.label} (${info.native})` : l.code, value: l.percent, name: info?.label ?? l.code };
  });
  const topLang = langData.reduce((a, b) => (b.value > a.value ? b : a));

  // Sources
  const sources = sourceMonth === "this" ? enrollmentSources : enrollmentSourcesLastMonth;
  const topSource = sources.reduce((a, b) => (b.percent > a.percent ? b : a));

  // Topics
  const topics = courseGroups
    .map((group) => {
      const list = courses.filter((c) => c.group === group);
      const avg = list.length ? Math.round(list.reduce((s, c) => s + c.progress, 0) / list.length) : 0;
      return { label: group, value: avg, note: `${list.length} lessons in this topic` };
    })
    .filter((t) => t.note !== "0 lessons in this topic")
    .sort((a, b) => b.value - a.value);

  const finishRate = parseInt(adminStats.avgCompletionRate, 10) || 0;
  const invited = adminLearners.filter((l) => l.status === "Invited");
  const upcoming = adminBatches.filter((b) => b.status === "Upcoming");

  return (
    <AdminShell>
      {/* 1. Hello */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[26px] font-semibold leading-tight text-brand-black dark:text-white sm:text-[32px]">
          {hello}, {adminUser.name}!
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-brand-gray dark:text-white/60">
          Here is how your students are doing. Start with the big buttons below, or scroll down to see the numbers.
        </p>
      </div>

      {/* 2. What do you want to do? */}
      <section className="flex flex-col gap-3" aria-labelledby="quick-actions">
        <h2 id="quick-actions" className="text-lg font-semibold text-brand-black dark:text-white">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <UploadVideoButton
            trigger={(open) => (
              <ActionTile icon={<UploadIcon className="h-6 w-6" />} title="Add a lesson video" description="Put a new video online for students" onClick={open} />
            )}
          />
          <NewBatchButton
            trigger={(open) => (
              <ActionTile icon={<PlusIcon className="h-6 w-6" />} title="Start a new batch" description="Make a group of students who begin together" onClick={open} />
            )}
          />
          <ActionTile icon={<UsersIcon className="h-6 w-6" />} title="Check on students" description="See who is learning and who is stuck" href="/admin/learners" />
          <ActionTile icon={<BuildingIcon className="h-6 w-6" />} title="Contact a centre" description="Call or message a school or partner" href="/admin/cohorts" />
        </div>
      </section>

      {/* 3. Needs attention */}
      {invited.length || upcoming.length ? (
        <Card title="Things that need you" help="Small jobs worth doing today." icon={<BellIcon className="h-5 w-5" />}>
          <ul className="flex flex-col gap-3">
            {invited.map((l) => {
              const sent = reminded.includes(l.name);
              return (
                <li key={l.name} className="flex flex-col gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:ring-amber-400/20 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={l.name} size={40} />
                    <p className="text-[15px] text-brand-black dark:text-white">
                      <span className="font-semibold">{l.name}</span> was invited but hasn’t watched any lesson yet.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={sent}
                    onClick={() => setReminded((r) => [...r, l.name])}
                    className={`${btnSmall} flex-shrink-0 bg-white dark:bg-transparent`}
                  >
                    {sent ? (
                      <>
                        <CheckIcon className="h-4 w-4" /> Reminder sent
                      </>
                    ) : (
                      <>
                        <BellIcon className="h-4 w-4" /> Send a reminder
                      </>
                    )}
                  </button>
                </li>
              );
            })}
            {upcoming.map((b) => (
              <li key={b.name} className="flex flex-col gap-3 rounded-2xl bg-brand-cream p-4 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green-dark dark:bg-white/10 dark:text-brand-green">
                    <CalendarIcon className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] text-brand-black dark:text-white">
                    <span className="font-semibold">{b.name}</span> ({b.programme}) starts on <span className="font-semibold">{b.startDate}</span> with{" "}
                    {b.learners} students.
                  </p>
                </div>
                <Link href="/admin/learners?tab=batches" className={`${btnSmall} flex-shrink-0`}>
                  See batch <ArrowRightIcon />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* 4. Numbers at a glance */}
      <section className="flex flex-col gap-3" aria-labelledby="numbers">
        <h2 id="numbers" className="text-lg font-semibold text-brand-black dark:text-white">
          Your numbers today
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile
            icon={<UsersIcon className="h-5 w-5" />}
            label="Students learning"
            value={formatNumber(adminStats.activeLearners)}
            sentence="students are learning with you right now."
            extra={
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-green-tint px-3 py-1 text-xs font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green">
                <TrendUpIcon className="h-3.5 w-3.5" /> {formatNumber(growth)} more than last month
              </span>
            }
          />
          <StatTile
            icon={<CertificateIcon className="h-5 w-5" />}
            label="Certificates given"
            value={formatNumber(adminStats.certificatesIssued)}
            sentence="certificates have been earned by students so far."
          />
          <StatTile
            icon={<CheckIcon className="h-5 w-5" />}
            label="Students who finish"
            value={`${finishRate}%`}
            sentence={`That is ${inTen(finishRate)} students who start a course.`}
            extra={<ProgressBar value={finishRate} />}
          />
          <StatTile
            icon={<GlobeIcon className="h-5 w-5" />}
            label="Languages"
            value={String(adminStats.languagesLive)}
            sentence={`Students can learn in ${languages.map((l) => l.label).join(", ")}.`}
          />
        </div>
      </section>

      {/* 5. Growth + language */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title="New students each month"
          help="Each bar is one month. Taller bar = more students joined."
          icon={<ChartIcon className="h-5 w-5" />}
          action={
            <Segmented
              label="How many months"
              value={months}
              onChange={setMonths}
              options={[
                { key: "6", label: "6 months" },
                { key: "12", label: "1 year" },
              ]}
            />
          }
        >
          <Takeaway>
            {monthNames[bestMonth.label] ?? bestMonth.label} was the best month, with {formatNumber(bestMonth.value)} new students.
          </Takeaway>
          <ColumnChart data={joinData} />
        </Card>

        <Card
          className="xl:col-span-2"
          title="Languages students pick"
          help="Out of every 100 students, how many learn in each language."
          icon={<GlobeIcon className="h-5 w-5" />}
          action={
            <Segmented
              label="Which students"
              value={langScope}
              onChange={setLangScope}
              options={[
                { key: "all", label: "Everyone" },
                { key: "new", label: "New only" },
              ]}
            />
          }
        >
          <Takeaway>
            Most students learn in {topLang.name} ({topLang.value} out of 100).
          </Takeaway>
          <BarList items={langData} />
        </Card>
      </div>

      {/* 6. Busy days + activity */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title="Busiest days"
          help="How many students opened a lesson on each day."
          icon={<CalendarIcon className="h-5 w-5" />}
          action={
            <Segmented
              label="Which week"
              value={week}
              onChange={setWeek}
              options={[
                { key: "this", label: "This week" },
                { key: "last", label: "Last week" },
              ]}
            />
          }
        >
          <Takeaway>
            {dayNames[busiest.label]} was the busiest day, with {formatNumber(busiest.value)} students.
          </Takeaway>
          <ColumnChart data={weekData} />
        </Card>

        <Card className="xl:col-span-2" title="What just happened" help="The newest things students did." icon={<SparkIcon className="h-5 w-5" />}>
          <ol className="flex flex-col gap-1">
            {adminActivity.map((a) => (
              <li key={`${a.name}-${a.time}`} className="flex items-start gap-3 rounded-2xl px-2 py-2.5">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                  {activityIcon(a.action)}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[15px] leading-snug text-brand-black dark:text-white">
                    <span className="font-semibold">{a.name}</span> {a.action}
                  </span>
                  <span className="text-xs text-brand-gray dark:text-white/45">{a.time}</span>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* 7. Topics + lessons */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title="How far students get in each topic"
          help="100% means every student finished every lesson in that topic."
          icon={<BookIcon className="h-5 w-5" />}
          action={
            <Link href="/admin/curriculum" className={btnSmall}>
              See lessons <ArrowRightIcon />
            </Link>
          }
        >
          <Takeaway>
            Students do best in “{topics[0]?.label}” and need the most help with “{topics[topics.length - 1]?.label}”.
          </Takeaway>
          <BarList items={topics} />
        </Card>

        <Card
          className="xl:col-span-2"
          title="Where new students come from"
          help="How students first heard about us."
          icon={<UsersIcon className="h-5 w-5" />}
          action={
            <Segmented
              label="Which month"
              value={sourceMonth}
              onChange={setSourceMonth}
              options={[
                { key: "this", label: "This month" },
                { key: "last", label: "Last month" },
              ]}
            />
          }
        >
          <Takeaway>
            Most come through {topSource.label.toLowerCase()} ({topSource.percent} out of 100).
          </Takeaway>
          <BarList items={sources.map((s) => ({ label: s.label, value: s.percent, note: s.note }))} />
        </Card>
      </div>

      {/* 8. People + places */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card
          title="Some of your students"
          help="Tap “See all” for the full list, search and filters."
          icon={<UsersIcon className="h-5 w-5" />}
          action={
            <Link href="/admin/learners" className={btnSmall}>
              See all <ArrowRightIcon />
            </Link>
          }
        >
          <ul className="flex flex-col divide-y divide-brand-line dark:divide-white/10">
            {adminLearners.map((l) => {
              const st = learnerStatus[l.status];
              return (
                <li key={l.name} className="flex items-center gap-3 py-3">
                  <Avatar name={l.name} size={40} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold text-brand-black dark:text-white">{l.name}</span>
                    <span className="truncate text-sm text-brand-gray dark:text-white/55">{l.school}</span>
                  </div>
                  <StatusPill tone={st.tone}>{st.label}</StatusPill>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card
          title="Your centres"
          help="Schools and partners with the most students."
          icon={<BuildingIcon className="h-5 w-5" />}
          action={
            <Link href="/admin/cohorts" className={btnSmall}>
              See all <ArrowRightIcon />
            </Link>
          }
        >
          <ul className="flex flex-col divide-y divide-brand-line dark:divide-white/10">
            {[...adminCohorts]
              .sort((a, b) => b.learners - a.learners)
              .slice(0, 4)
              .map((c) => (
                <li key={c.name} className="flex items-center gap-3 py-3">
                  <Avatar name={c.name} size={40} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold text-brand-black dark:text-white">{c.name}</span>
                    <span className="truncate text-sm text-brand-gray dark:text-white/55">{c.location}</span>
                  </div>
                  <span className="flex-shrink-0 text-right">
                    <span className="block text-lg font-semibold leading-none text-brand-black dark:text-white">{c.learners}</span>
                    <span className="text-xs text-brand-gray dark:text-white/50">students</span>
                  </span>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <TipBox title="Tip">
        Numbers on this page update by themselves. You don’t need to save anything here.
      </TipBox>
    </AdminShell>
  );
}
