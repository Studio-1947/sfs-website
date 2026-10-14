"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/lib/data";
import { useLanguage } from "./LanguageContext";
import { ArrowRight, CheckIcon } from "./learn/icons";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuizRunner({
  questions,
  courseSlug,
  resultBase = "/certificate",
  focus = false,
}: {
  questions: QuizQuestion[];
  courseSlug: string;
  courseTitle?: string;
  /** Where to send the learner after the last question. */
  resultBase?: string;
  /** Full-screen mobile mode: no tab bar below, so the action bar sits at the screen bottom. */
  focus?: boolean;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = checked && picked === question.correctIndex;

  function handleCheck() {
    if (picked === null) return;
    setChecked(true);
  }

  function handleNext() {
    const nextResults = [...results, picked === question.correctIndex];
    if (isLast) {
      const score = nextResults.filter(Boolean).length;
      router.push(`${resultBase}?video=${courseSlug}&score=${score}&total=${questions.length}`);
      return;
    }
    setResults(nextResults);
    setIndex(index + 1);
    setPicked(null);
    setChecked(false);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Question tracker */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-brand-black dark:text-white">
            Question {index + 1} <span className="text-brand-gray-light dark:text-white/35">of {questions.length}</span>
          </span>
          <span className="text-brand-gray dark:text-white/55">{results.filter(Boolean).length} correct so far</span>
        </div>
        <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={index + 1}>
          {questions.map((_, i) => {
            const answered = i < results.length;
            const cls = answered
              ? results[i]
                ? "bg-brand-green"
                : "bg-red-400"
              : i === index
                ? "bg-brand-black dark:bg-white"
                : "bg-brand-line dark:bg-white/10";
            return <span key={i} className={`h-1.5 flex-1 rounded-full ${cls}`} />;
          })}
        </div>
      </div>

      <h1 className="text-2xl font-semibold leading-snug text-brand-black dark:text-white sm:text-[28px]">
        {question.question}
      </h1>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, i) => {
          const selected = picked === i;
          const isRight = checked && i === question.correctIndex;
          const isWrong = checked && selected && i !== question.correctIndex;
          const cls = isRight
            ? "border-brand-green bg-brand-green-tint dark:bg-brand-green/15"
            : isWrong
              ? "border-red-400 bg-red-50 dark:bg-red-500/10"
              : selected
                ? "border-brand-black bg-white dark:border-white dark:bg-brand-ink"
                : "border-brand-line bg-white hover:border-brand-green-dark dark:border-white/15 dark:bg-brand-ink";
          const letterCls = isRight
            ? "bg-brand-green text-white"
            : isWrong
              ? "bg-red-400 text-white"
              : selected
                ? "bg-brand-black text-white dark:bg-white dark:text-brand-black"
                : "bg-brand-black/5 text-brand-gray dark:bg-white/10 dark:text-white/60";
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={checked}
              onClick={() => setPicked(i)}
              className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left text-base font-semibold text-brand-black transition-colors dark:text-white sm:px-5 ${cls}`}
            >
              <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${letterCls}`}>
                {isRight ? <CheckIcon /> : LETTERS[i]}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {checked ? (
        <div
          role="status"
          className={`rounded-2xl px-5 py-4 text-sm font-semibold ${
            isCorrect
              ? "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
          }`}
        >
          {isCorrect
            ? "Correct — nicely done."
            : `Not quite. The right answer is “${question.options[question.correctIndex]}”.`}
        </div>
      ) : null}

      {/* Sticky action bar keeps the primary action in thumb reach on mobile */}
      <div className={`sticky z-10 -mx-1 lg:static lg:mx-0 ${focus ? "bottom-4" : "bottom-20"}`}>
        <button
          type="button"
          disabled={picked === null}
          onClick={checked ? handleNext : handleCheck}
          className="group flex min-h-[56px] w-full items-center justify-between gap-3 rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white shadow-lg shadow-black/10 transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-40 lg:shadow-none"
        >
          {checked ? (isLast ? t("quiz.seeResult") : t("quiz.next")) : "Check answer"}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-green">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
