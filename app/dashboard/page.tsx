"use client";

import Link from "next/link";
import Image from "next/image";
import LearnerNav from "@/components/LearnerNav";
import LearnerSidebar from "@/components/LearnerSidebar";
import LogoLineIntro from "@/components/LogoLineIntro";
import IconStatCard from "@/components/IconStatCard";
import ChapterRoadmap from "@/components/learn/ChapterRoadmap";
import { ArrowRight, CheckIcon, PlayIcon, QuizIcon } from "@/components/learn/icons";
import { useLanguage } from "@/components/LanguageContext";
import { chapterStates, courseCompletedCount, courses, isCourseComplete, learner } from "@/lib/data";
import { localizeCourse } from "@/lib/localize";

export default function DashboardPage() {
  const { t, n, lang } = useLanguage();
  const inProgress = courses.find((c) => c.status === "in-progress") ?? courses[0];
  const completedCount = courseCompletedCount();
  const courseComplete = isCourseComplete();
  const coursePct = Math.round((completedCount / courses.length) * 100);

  const states = chapterStates();
  const current = states.find((s) => s.state === "in-progress") ?? states.find((s) => s.state === "not-started") ?? states[0];
  const nextIsQuiz = current.video === "done" && current.quiz !== "done";
  const nextHref = nextIsQuiz ? `/quiz/${current.chapter.slug}` : `/lesson/${current.chapter.slug}`;
  const nextAction = t(nextIsQuiz ? "dash.takeQuickQuiz" : current.chapter.status === "in-progress" ? "dash.continueVideo" : "dash.watchVideo");
  const currentChapter = localizeCourse(current.chapter, lang);

  return (
    <div className="flex">
      <LearnerSidebar active="dashboard" />
      <div className="min-w-0 flex-1">
        <LogoLineIntro />
        <LearnerNav active="dashboard" hasSidebar />

        <main className="flex flex-col gap-7 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-brand-green-dark dark:text-brand-green">{t("dash.tagline")}</p>
          <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[32px]">
            {t("dash.greeting", { name: learner.name.split(" ")[0] })}
          </h1>
          <p className="text-base text-brand-gray dark:text-white/55">{t("dash.intro")}</p>
        </div>

        {/* One big, child-friendly action: tell the learner exactly what to do next. */}
        <section className="relative overflow-hidden rounded-[28px] bg-brand-black text-white shadow-sm dark:border dark:border-white/10 dark:bg-brand-ink">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
          <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <span className="w-fit rounded-full bg-brand-green px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">{t("dash.nextMission")}</span>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-white/60">{t("common.chapterOf", { n: current.number, total: courses.length })}</p>
                <h2 className="text-2xl font-semibold leading-tight sm:text-[32px]">{currentChapter.title}</h2>
                <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  {t(nextIsQuiz ? "dash.nextQuizCopy" : "dash.nextVideoCopy")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-3 py-1.5">{nextIsQuiz ? t("common.questions", { n: current.chapter.quizQuestions.length }) : currentChapter.duration}</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">{t("dash.stepOf", { n: nextIsQuiz ? 2 : 1 })}</span>
                {current.chapter.status === "in-progress" ? <span className="rounded-full bg-white/10 px-3 py-1.5">{t("dash.percentDone", { n: current.chapter.progress })}</span> : null}
              </div>
              <Link
                href={courseComplete ? "/certificate" : nextHref}
                className="group inline-flex min-h-[52px] w-fit items-center gap-3 rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-[16px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                {courseComplete ? t("dash.seeCertificate") : nextAction}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-green">
                  <ArrowRight />
                </span>
              </Link>
            </div>
            <div className="relative hidden min-h-[280px] lg:block">
              <Image src={current.chapter.thumbImage} alt="" fill sizes="300px" className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="grid gap-3 rounded-3xl border border-brand-line bg-white p-4 dark:border-white/10 dark:bg-brand-ink sm:grid-cols-3 sm:p-5">
          {[
            { number: 1, title: t("dash.step1.title"), copy: t("dash.step1.copy"), icon: <PlayIcon className="h-5 w-5" /> },
            { number: 2, title: t("dash.step2.title"), copy: t("dash.step2.copy"), icon: <QuizIcon className="h-5 w-5" /> },
            { number: 3, title: t("dash.step3.title"), copy: t("dash.step3.copy"), icon: <CheckIcon className="h-5 w-5" /> },
          ].map((step) => (
            <div key={step.number} className="flex items-center gap-3 rounded-2xl bg-brand-cream p-3.5 dark:bg-white/5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">{n(step.number)}</span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-black dark:text-white">{step.icon}{step.title}</span>
                <span className="text-xs leading-relaxed text-brand-gray dark:text-white/55">{step.copy}</span>
              </span>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          <IconStatCard
            icon="progress"
            label={t("dashboard.overallProgress")}
            value={n(`${learner.overallProgress}%`)}
            sub={t("dash.videosCount", { done: completedCount, total: courses.length })}
            href="/profile"
          />
          <IconStatCard
            icon="certificate"
            label={t("dashboard.certificatesEarned")}
            value={n(learner.certificatesEarned)}
            sub={t(courseComplete ? "dash.earned" : "dash.notYetEarned")}
            href="/profile"
          />
          <IconStatCard
            icon="streak"
            label={t("dashboard.learningStreak")}
            value={t("common.days", { n: learner.streakDays })}
            sub={t("dashboard.keepItGoing")}
            href="/profile"
          />
          <IconStatCard
            icon="points"
            label={t("dashboard.points")}
            value={n(learner.points)}
            sub={t("learner.rank")}
            href="/profile"
          />
        </div>

        <div className="pb-6">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-brand-black dark:text-white">{t("dash.learningPath")}</h2>
            <p className="text-sm text-brand-gray dark:text-white/55">
              {t("dash.learningPathCopy")}
            </p>
          </div>
          <ChapterRoadmap states={states} activeSlug={inProgress.slug} />
        </div>
        </main>
      </div>
    </div>
  );
}
