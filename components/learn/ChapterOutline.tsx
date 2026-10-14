import Link from "next/link";
import { chapterStates, courseGroups } from "@/lib/data";
import { PlayIcon, QuizIcon, StepDot } from "./icons";

/**
 * Compact course outline shown beside the lesson and quiz.
 * Each chapter shows its two beats: video, then quiz.
 */
export default function ChapterOutline({
  currentSlug,
  currentStep,
  className = "",
}: {
  currentSlug: string;
  currentStep: "video" | "quiz";
  className?: string;
}) {
  const states = chapterStates();

  return (
    <nav aria-label="Course outline" className={`flex flex-col gap-5 ${className}`}>
      {courseGroups.map((group) => {
        const items = states.filter((s) => s.chapter.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group} className="flex flex-col gap-1.5">
            <span className="px-2 text-[11px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
              {group}
            </span>
            {items.map((s) => {
              const isCurrent = s.chapter.slug === currentSlug;
              return (
                <div
                  key={s.chapter.slug}
                  className={`rounded-xl px-2 py-2 transition-colors ${
                    isCurrent ? "bg-brand-green-tint dark:bg-brand-green/10" : "hover:bg-brand-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <p className="px-1 pb-1.5 text-sm font-semibold leading-snug text-brand-black dark:text-white">
                    <span className="mr-1.5 text-brand-gray-light dark:text-white/35">{s.number}.</span>
                    {s.chapter.title}
                  </p>
                  <div className="flex flex-col">
                    <Link
                      href={`/lesson/${s.chapter.slug}`}
                      className="flex items-center gap-2.5 rounded-lg px-1 py-1 text-[13px] text-brand-gray dark:text-white/60"
                    >
                      <StepDot state={isCurrent && currentStep === "video" && s.video !== "done" ? "current" : s.video} size="h-6 w-6">
                        <PlayIcon className="h-3 w-3" />
                      </StepDot>
                      Video &middot; {s.chapter.duration}
                    </Link>
                    <Link
                      href={`/quiz/${s.chapter.slug}`}
                      className="flex items-center gap-2.5 rounded-lg px-1 py-1 text-[13px] text-brand-gray dark:text-white/60"
                    >
                      <StepDot state={isCurrent && currentStep === "quiz" ? "current" : s.quiz} size="h-6 w-6">
                        <QuizIcon className="h-3 w-3" />
                      </StepDot>
                      Quiz &middot; {s.chapter.quizQuestions.length} questions
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
