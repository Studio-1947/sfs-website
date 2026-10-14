"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import { CloseIcon } from "@/components/learn/icons";
import { chapterNumber, courses } from "@/lib/data";

/** Focus mode: no tab bar, one question at a time, exit is always one tap away. */
export default function MobileQuizPage({ params }: { params: { slug: string } }) {
  const chapter = courses.find((c) => c.slug === params.slug);
  if (!chapter) return notFound();
  const number = chapterNumber(chapter.slug);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream dark:bg-brand-black">
      <header className="flex h-14 items-center gap-2 px-2">
        <Link
          href={`/mobile/lesson/${chapter.slug}`}
          aria-label="Leave quiz and go back to the video"
          className="flex h-11 w-11 items-center justify-center rounded-full text-brand-black dark:text-white"
        >
          <CloseIcon className="h-6 w-6" />
        </Link>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">
            Chapter {number} quiz
          </span>
          <span className="truncate text-sm font-semibold text-brand-black dark:text-white">{chapter.title}</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 pb-6 pt-3">
        <QuizRunner questions={chapter.quizQuestions} courseSlug={chapter.slug} resultBase="/mobile/result" focus />
      </main>
    </div>
  );
}
