import Link from "next/link";
import Image from "next/image";
import { ChapterState, courseGroups } from "@/lib/data";
import { ArrowRight, ClockIcon, PlayIcon, QuizIcon, StepDot } from "./icons";

function stepLabel(kind: "video" | "quiz", s: ChapterState) {
  const st = kind === "video" ? s.video : s.quiz;
  if (st === "done") return kind === "video" ? "Watched" : "Passed";
  if (st === "current") return kind === "video" ? (s.chapter.progress > 0 ? `${s.chapter.progress}% watched` : "Start") : "Ready";
  return kind === "video" ? "Not started" : "After video";
}

/** Vertical roadmap: groups -> chapters -> [video] [quiz]. */
export default function ChapterRoadmap({
  states,
  activeSlug,
}: {
  states: ChapterState[];
  activeSlug: string;
}) {
  return (
    <div className="flex flex-col gap-10">
      {courseGroups.map((group) => {
        const items = states.filter((s) => s.chapter.group === group);
        if (items.length === 0) return null;
        const done = items.filter((s) => s.state === "completed").length;
        return (
          <section key={group} className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold text-brand-black dark:text-white">{group}</h3>
              <span className="text-sm font-semibold text-brand-gray-light dark:text-white/40">
                {done}/{items.length} chapters
              </span>
            </div>

            <ol className="relative flex flex-col gap-4">
              {items.map((s, idx) => {
                const isActive = s.chapter.slug === activeSlug;
                const lastInGroup = idx === items.length - 1;
                const marker =
                  s.state === "completed" ? "done" : s.state === "in-progress" ? "current" : "todo";
                return (
                  <li key={s.chapter.slug} className="relative flex gap-4 sm:gap-5">
                    {/* rail */}
                    <div className="flex flex-col items-center">
                      <StepDot state={marker} size="h-9 w-9">
                        <span className="text-sm font-semibold">{s.number}</span>
                      </StepDot>
                      {!lastInGroup ? (
                        <span
                          className={`mt-1 w-0.5 flex-1 rounded-full ${
                            s.state === "completed" ? "bg-brand-green" : "bg-brand-line dark:bg-white/10"
                          }`}
                        />
                      ) : null}
                    </div>

                    {/* chapter card */}
                    <div
                      className={`mb-1 flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border bg-white dark:bg-brand-ink md:flex-row ${
                        isActive
                          ? "border-brand-green shadow-[0_0_0_3px_rgba(166,172,26,0.18)]"
                          : "border-brand-line dark:border-white/10"
                      }`}
                    >
                      <Link
                        href={`/lesson/${s.chapter.slug}`}
                        className="relative block aspect-video w-full flex-shrink-0 overflow-hidden bg-brand-black md:aspect-auto md:w-56"
                        aria-label={`Watch ${s.chapter.title}`}
                      >
                        <Image
                          src={s.chapter.thumbImage}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 224px, 100vw"
                          className="object-cover"
                        />
                        <span className="absolute inset-0 bg-black/20" />
                        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm">
                          <PlayIcon className="ml-0.5 h-4 w-4" />
                        </span>
                        {s.chapter.status === "in-progress" ? (
                          <span className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
                            <span className="block h-1 bg-brand-green" style={{ width: `${s.chapter.progress}%` }} />
                          </span>
                        ) : null}
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                            Chapter {s.number}
                          </span>
                          <span className="text-lg font-semibold leading-snug text-brand-black dark:text-white">
                            {s.chapter.title}
                          </span>
                          <span className="line-clamp-2 text-sm leading-relaxed text-brand-gray dark:text-white/55">
                            {s.chapter.description}
                          </span>
                        </div>

                        {/* the two beats of every chapter */}
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          <Link
                            href={`/lesson/${s.chapter.slug}`}
                            className="flex items-center gap-3 rounded-2xl bg-brand-cream px-3.5 py-3 transition-colors hover:bg-brand-green-tint dark:bg-white/5 dark:hover:bg-white/10"
                          >
                            <StepDot state={s.video} size="h-8 w-8">
                              <PlayIcon className="h-3.5 w-3.5" />
                            </StepDot>
                            <span className="flex min-w-0 flex-col leading-tight">
                              <span className="text-sm font-semibold text-brand-black dark:text-white">Video</span>
                              <span className="flex items-center gap-1.5 text-xs text-brand-gray dark:text-white/50">
                                <ClockIcon className="h-3 w-3" /> {s.chapter.duration} &middot; {stepLabel("video", s)}
                              </span>
                            </span>
                          </Link>
                          <Link
                            href={`/quiz/${s.chapter.slug}`}
                            className="flex items-center gap-3 rounded-2xl bg-brand-cream px-3.5 py-3 transition-colors hover:bg-brand-green-tint dark:bg-white/5 dark:hover:bg-white/10"
                          >
                            <StepDot state={s.quiz} size="h-8 w-8">
                              <QuizIcon className="h-4 w-4" />
                            </StepDot>
                            <span className="flex min-w-0 flex-col leading-tight">
                              <span className="text-sm font-semibold text-brand-black dark:text-white">Quiz</span>
                              <span className="text-xs text-brand-gray dark:text-white/50">
                                {s.chapter.quizQuestions.length} questions &middot; {stepLabel("quiz", s)}
                              </span>
                            </span>
                          </Link>
                        </div>

                        {isActive ? (
                          <Link
                            href={`/lesson/${s.chapter.slug}`}
                            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-green-dark hover:underline dark:text-brand-green"
                          >
                            Continue this chapter <ArrowRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
