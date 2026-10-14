"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import CourseIcon from "@/components/CourseIcon";
import UploadVideoButton from "@/components/UploadVideoButton";
import NewCurriculumButton from "@/components/NewCurriculumButton";
import EditLessonButton from "@/components/EditLessonButton";
import { Card, PageIntro, ProgressBar, Segmented, TipBox, btnSmall } from "@/components/admin/ui";
import { ArrowDownIcon, ArrowUpIcon, BookIcon, CertificateIcon, CheckIcon, ClockIcon, QuizIcon, UploadIcon } from "@/components/admin/icons";
import { Course, courseGroups, courses } from "@/lib/data";

const howItWorks = [
  { icon: <UploadIcon className="h-6 w-6" />, title: "You upload a video", body: "Each lesson is one short video." },
  { icon: <QuizIcon className="h-6 w-6" />, title: "Students watch, then answer a quiz", body: "A few easy questions check what they learned." },
  { icon: <CertificateIcon className="h-6 w-6" />, title: "All lessons done = certificate", body: "Students get it by themselves. Nothing for you to do." },
];

function LessonInfo({ course, topic }: { course: Course; topic?: string }) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
        <CourseIcon icon={course.thumbIcon} className="h-5 w-5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-[16px] font-semibold leading-snug text-brand-black dark:text-white">{course.title}</span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-gray dark:text-white/55">
          {topic ? <span className="font-semibold text-brand-black dark:text-white/80">{topic}</span> : null}
          <span className="inline-flex items-center gap-1">
            <ClockIcon /> {course.duration} video
          </span>
          <span className="inline-flex items-center gap-1">
            <QuizIcon /> {course.quizQuestions.length} quiz questions
          </span>
        </span>
        <div className="flex max-w-xs items-center gap-2">
          <ProgressBar value={course.progress} />
          <span className="whitespace-nowrap text-xs font-semibold text-brand-gray dark:text-white/55">{course.progress}% of students finished</span>
        </div>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  const [view, setView] = useState<"topics" | "list">("topics");
  const [moved, setMoved] = useState<string | null>(null);
  const topics = courseGroups.filter((group) => courses.some((c) => c.group === group));

  const [order, setOrder] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(topics.map((group) => [group, courses.filter((c) => c.group === group).map((c) => c.slug)]))
  );
  const bySlug = Object.fromEntries(courses.map((c) => [c.slug, c])) as Record<string, Course>;

  function move(group: string, slug: string, direction: -1 | 1) {
    setOrder((prev) => {
      const list = [...(prev[group] ?? [])];
      const index = list.indexOf(slug);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, [group]: list };
    });
    setMoved(bySlug[slug]?.title ?? null);
  }

  return (
    <AdminShell>
      <PageIntro
        title="Lessons"
        description={`All ${courses.length} videos your students watch, sorted into ${topics.length} topics. Add a new video, fix a lesson, or change the order students see them in.`}
        actions={
          <>
            <NewCurriculumButton />
            <UploadVideoButton />
          </>
        }
      />

      <Card title="How lessons work" help="Three steps, from your video to a student’s certificate." icon={<BookIcon className="h-5 w-5" />}>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <li key={s.title} className="relative flex items-start gap-3 rounded-2xl bg-brand-cream p-4 dark:bg-white/5">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white">{s.icon}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-green-dark dark:text-brand-green">Step {i + 1}</span>
                <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">{s.title}</span>
                <span className="text-sm text-brand-gray dark:text-white/55">{s.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Segmented
        label="Show lessons"
        value={view}
        onChange={setView}
        options={[
          { key: "topics", label: "Sorted by topic" },
          { key: "list", label: "One long list" },
        ]}
      />

      {moved ? (
        <div role="status" className="flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-3 text-sm font-semibold text-white">
          <CheckIcon className="h-5 w-5" /> Moved “{moved}”. Students will now see the lessons in this order.
        </div>
      ) : null}

      {view === "topics" ? (
        <div className="flex flex-col gap-5">
          {topics.map((group, gi) => {
            const slugs = order[group] ?? [];
            return (
              <Card
                key={group}
                title={`Topic ${gi + 1}: ${group}`}
                help={`${slugs.length} lessons. Students watch them from top to bottom.`}
                action={<UploadVideoButton defaultGroup={group} compact />}
              >
                <ol className="flex flex-col gap-3">
                  {slugs.map((slug, i) => {
                    const course = bySlug[slug];
                    if (!course) return null;
                    return (
                      <li
                        key={slug}
                        className="flex flex-col gap-4 rounded-2xl border border-brand-line p-4 dark:border-white/10 md:flex-row md:items-center"
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <span
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-white dark:bg-white dark:text-brand-black"
                            aria-label={`Lesson ${i + 1}`}
                          >
                            {i + 1}
                          </span>
                          <LessonInfo course={course} />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:flex-shrink-0">
                          <button type="button" onClick={() => move(group, slug, -1)} disabled={i === 0} className={btnSmall} aria-label={`Move ${course.title} up`}>
                            <ArrowUpIcon /> Move up
                          </button>
                          <button
                            type="button"
                            onClick={() => move(group, slug, 1)}
                            disabled={i === slugs.length - 1}
                            className={btnSmall}
                            aria-label={`Move ${course.title} down`}
                          >
                            <ArrowDownIcon /> Move down
                          </button>
                          <EditLessonButton course={course} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card title={`All ${courses.length} lessons`} help="Every lesson in one place. Tap Edit to change one.">
          <ul className="flex flex-col gap-3">
            {courses.map((c) => (
              <li key={c.slug} className="flex flex-col gap-3 rounded-2xl border border-brand-line p-4 dark:border-white/10 sm:flex-row sm:items-center">
                <LessonInfo course={c} topic={c.group} />
                <EditLessonButton course={c} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      <TipBox title="About certificates">
        Students get their certificate by themselves once they finish every lesson and pass each quiz. Every certificate has its own code
        (like <span className="font-semibold">SFS-2026-000123</span>) and a QR code anyone can scan to check it is real.
      </TipBox>
    </AdminShell>
  );
}
