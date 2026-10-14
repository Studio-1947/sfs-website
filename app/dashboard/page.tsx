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
import { chapterNumber, chapterStates, course, courseCompletedCount, courses, isCourseComplete, learner } from "@/lib/data";

export default function DashboardPage() {
  const { t } = useLanguage();
  const inProgress = courses.find((c) => c.status === "in-progress") ?? courses[0];
  const completedCount = courseCompletedCount();
  const courseComplete = isCourseComplete();
  const coursePct = Math.round((completedCount / courses.length) * 100);

  const states = chapterStates();
  const current = states.find((s) => s.state === "in-progress") ?? states.find((s) => s.state === "not-started") ?? states[0];
  const nextIsQuiz = current.video === "done" && current.quiz !== "done";
  const nextHref = nextIsQuiz ? `/quiz/${current.chapter.slug}` : `/lesson/${current.chapter.slug}`;
  const nextAction = nextIsQuiz ? "Take the quick quiz" : current.chapter.status === "in-progress" ? "Continue the video" : "Watch the video";

  return (
    <div className="flex">
      <LearnerSidebar active="dashboard" />
      <div className="min-w-0 flex-1">
        <LogoLineIntro />
        <LearnerNav active="dashboard" hasSidebar />

        <main className="flex flex-col gap-7 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-brand-green-dark dark:text-brand-green">Let&rsquo;s do one small thing at a time.</p>
          <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[32px]">
            Hi {learner.name.split(" ")[0]}! Ready to learn?
          </h1>
          <p className="text-base text-brand-gray dark:text-white/55">Watch a short video, answer a few questions, and move one step closer to your certificate.</p>
        </div>

        {/* One big, child-friendly action: tell the learner exactly what to do next. */}
        <section className="relative overflow-hidden rounded-[28px] bg-brand-black text-white shadow-sm dark:border dark:border-white/10 dark:bg-brand-ink">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
          <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <span className="w-fit rounded-full bg-brand-green px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Your next mission</span>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-white/60">Chapter {current.number} of {courses.length}</p>
                <h2 className="text-2xl font-semibold leading-tight sm:text-[32px]">{current.chapter.title}</h2>
                <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  {nextIsQuiz ? "You watched the video. Now show what you know with a quick quiz!" : "First, watch this short video. Then you&rsquo;ll answer a quick quiz."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-3 py-1.5">{nextIsQuiz ? `${current.chapter.quizQuestions.length} questions` : current.chapter.duration}</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">Step {nextIsQuiz ? "2" : "1"} of 2</span>
                {current.chapter.status === "in-progress" ? <span className="rounded-full bg-white/10 px-3 py-1.5">{current.chapter.progress}% done</span> : null}
              </div>
              <Link
                href={courseComplete ? "/certificate" : nextHref}
                className="group inline-flex min-h-[52px] w-fit items-center gap-3 rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-[16px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                {courseComplete ? "See my certificate" : nextAction}
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
            { number: "1", title: "Watch", copy: "See and listen to the lesson.", icon: <PlayIcon className="h-5 w-5" /> },
            { number: "2", title: "Answer", copy: "Try the short quiz after it.", icon: <QuizIcon className="h-5 w-5" /> },
            { number: "3", title: "Celebrate", copy: "Complete every chapter to earn your certificate.", icon: <CheckIcon className="h-5 w-5" /> },
          ].map((step) => (
            <div key={step.number} className="flex items-center gap-3 rounded-2xl bg-brand-cream p-3.5 dark:bg-white/5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">{step.number}</span>
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
            value={`${learner.overallProgress}%`}
            sub={`${completedCount}/${courses.length} videos`}
            href="/profile"
          />
          <IconStatCard
            icon="certificate"
            label={t("dashboard.certificatesEarned")}
            value={String(learner.certificatesEarned)}
            sub={courseComplete ? "Earned" : "Not yet earned"}
            href="/profile"
          />
          <IconStatCard
            icon="streak"
            label={t("dashboard.learningStreak")}
            value={`${learner.streakDays} days`}
            sub="Keep it going"
            href="/profile"
          />
          <IconStatCard
            icon="points"
            label={t("dashboard.points")}
            value={String(learner.points)}
            sub={learner.rank}
            href="/profile"
          />
        </div>

        <div className="pb-6">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-brand-black dark:text-white">Your learning path</h2>
            <p className="text-sm text-brand-gray dark:text-white/55">
              Go from top to bottom. Each chapter has a video first, then a quiz.
            </p>
          </div>
          <ChapterRoadmap states={states} activeSlug={inProgress.slug} />
        </div>
        </main>
      </div>
    </div>
  );
}
