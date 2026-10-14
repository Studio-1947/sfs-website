import Link from "next/link";
import { StepState } from "@/lib/data";
import { PlayIcon, QuizIcon, BadgeIcon, StepDot } from "./icons";

/**
 * The 3-beat rhythm of every chapter: Watch the video -> Take the quiz -> Chapter done.
 * `at` is where the learner is right now.
 */
export default function ChapterStepper({
  at,
  video,
  quiz,
  videoHref,
  quizHref,
}: {
  at: "video" | "quiz";
  video: StepState;
  quiz: StepState;
  videoHref?: string;
  quizHref?: string;
}) {
  const videoState: StepState = at === "video" ? (video === "done" ? "done" : "current") : "done";
  const quizState: StepState = at === "quiz" ? "current" : quiz === "done" ? "done" : "todo";
  const doneState: StepState = quiz === "done" ? "done" : "todo";

  const steps = [
    { key: "video", label: "Watch", sub: "1 video", state: videoState, icon: <PlayIcon className="h-3.5 w-3.5" />, href: videoHref },
    { key: "quiz", label: "Quiz", sub: "Check yourself", state: quizState, icon: <QuizIcon className="h-4 w-4" />, href: quizHref },
    { key: "done", label: "Complete", sub: "Chapter done", state: doneState, icon: <BadgeIcon className="h-4 w-4" />, href: undefined },
  ];

  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Chapter progress">
      {steps.map((s, i) => {
        const inner = (
          <>
            <StepDot state={s.state}>{s.icon}</StepDot>
            <span className="flex min-w-0 flex-col leading-tight">
              <span
                className={`text-sm font-semibold ${
                  s.state === "todo" ? "text-brand-gray-light dark:text-white/40" : "text-brand-black dark:text-white"
                }`}
              >
                {s.label}
              </span>
              <span className="hidden text-xs text-brand-gray-light dark:text-white/35 sm:block">{s.sub}</span>
            </span>
          </>
        );
        return (
          <li key={s.key} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none" aria-current={s.state === "current" ? "step" : undefined}>
            {s.href && s.state !== "current" ? (
              <Link href={s.href} className="flex items-center gap-2.5 rounded-full transition-opacity hover:opacity-75">
                {inner}
              </Link>
            ) : (
              <span className="flex items-center gap-2.5">{inner}</span>
            )}
            {i < steps.length - 1 ? (
              <span
                className={`h-0.5 flex-1 rounded-full ${
                  steps[i + 1].state !== "todo" ? "bg-brand-green" : "bg-brand-line dark:bg-white/10"
                }`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
