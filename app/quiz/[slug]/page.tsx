"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import LearnerNav from "@/components/LearnerNav";
import ChapterStepper from "@/components/learn/ChapterStepper";
import ChapterOutline from "@/components/learn/ChapterOutline";
import { useLanguage } from "@/components/LanguageContext";
import { chapterNumber, chapterStates, course as courseMeta, courses } from "@/lib/data";

export default function QuizPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage();
  const chapter = courses.find((c) => c.slug === params.slug);
  if (!chapter) return notFound();

  const number = chapterNumber(chapter.slug);
  const state = chapterStates()[number - 1];

  return (
    <div className="min-h-screen">
      <LearnerNav active="quiz" backHref={`/lesson/${chapter.slug}`} backLabel={t("quiz.backToLesson")} />

      <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-6 pb-32 sm:px-8 sm:py-8 lg:pb-12">
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold text-brand-gray-light dark:text-white/40">
              <Link href="/dashboard" className="hover:text-brand-green-dark dark:hover:text-brand-green">
                {courseMeta.title}
              </Link>
              <span className="mx-2">/</span>
              Chapter {number} of {courses.length} &middot; Quiz
            </p>
            <h2 className="text-lg font-semibold text-brand-gray dark:text-white/60">{chapter.title}</h2>
          </div>
          <div className="rounded-2xl border border-brand-line bg-white px-4 py-4 dark:border-white/10 dark:bg-brand-ink sm:px-6">
            <ChapterStepper at="quiz" video={state.video} quiz={state.quiz} videoHref={`/lesson/${chapter.slug}`} />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <div className="rounded-3xl bg-white p-5 dark:bg-brand-ink sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-2xl">
              <QuizRunner questions={chapter.quizQuestions} courseSlug={chapter.slug} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl bg-white p-5 dark:bg-brand-ink">
              <p className="px-2 pb-4 text-base font-semibold text-brand-black dark:text-white">Course outline</p>
              <ChapterOutline currentSlug={chapter.slug} currentStep="quiz" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
