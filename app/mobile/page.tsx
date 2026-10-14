import Link from "next/link";
import Image from "next/image";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileTabBar from "@/components/mobile/MobileTabBar";
import { ArrowRight, CheckIcon, ChevronRight, PlayIcon, QuizIcon, StepDot } from "@/components/learn/icons";
import {
  chapterNextHref,
  chapterStates,
  course,
  courseCompletedCount,
  courseGroups,
  courses,
  isCourseComplete,
  learner,
} from "@/lib/data";

export default function MobileHomePage() {
  const states = chapterStates();
  const done = courseCompletedCount();
  const pct = Math.round((done / courses.length) * 100);
  const complete = isCourseComplete();
  const current = states.find((s) => s.state === "in-progress") ?? states.find((s) => s.state === "not-started") ?? states[0];
  const currentHref = chapterNextHref(current);
  const onQuiz = current.video === "done" && current.quiz !== "done";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream dark:bg-brand-black">
      <MobileTopBar />

      <main className="flex flex-1 flex-col gap-6 px-4 pb-28 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-brand-green-dark dark:text-brand-green">One small step is enough.</p>
            <h1 className="text-2xl font-semibold text-brand-black dark:text-white">Hi, {learner.name.split(" ")[0]}!</h1>
            <p className="text-sm text-brand-gray dark:text-white/55">Your next lesson is ready.</p>
          </div>
          <span className="flex-shrink-0 rounded-full bg-brand-green-tint px-3.5 py-2 text-sm font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green">
            {learner.streakDays}-day streak
          </span>
        </div>

        {/* The one thing to do next */}
        {complete ? (
          <Link
            href="/mobile/certificate"
            className="flex items-center justify-between gap-4 rounded-3xl bg-brand-green p-5 text-white"
          >
            <span className="flex flex-col">
              <span className="text-lg font-semibold">You finished the course!</span>
              <span className="text-sm text-white/85">Get your certificate</span>
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green">
              <ArrowRight />
            </span>
          </Link>
        ) : (
          <section className="overflow-hidden rounded-3xl bg-brand-black text-white dark:border dark:border-white/10 dark:bg-brand-ink">
            <div className="relative aspect-[16/9] w-full">
              <Image src={current.chapter.thumbImage} alt="" fill sizes="448px" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-black/10" />
              <span className="absolute left-4 top-4 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold text-white">
                Your next mission &middot; Chapter {current.number}
              </span>
              {current.chapter.status === "in-progress" ? (
                <span className="absolute bottom-0 left-0 h-1.5 w-full bg-white/20">
                  <span className="block h-1.5 bg-brand-green" style={{ width: `${current.chapter.progress}%` }} />
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-brand-green">Step {onQuiz ? "2" : "1"} of 2</p>
                <h2 className="text-xl font-semibold leading-snug">{current.chapter.title}</h2>
                <p className="text-sm text-white/60">
                  {onQuiz ? `Next: quiz · ${current.chapter.quizQuestions.length} questions` : `Next: video · ${current.chapter.duration}`}
                </p>
              </div>
              <Link
                href={currentHref}
                className="flex min-h-[56px] items-center justify-between rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-base font-semibold text-white active:bg-brand-green-dark"
              >
                {onQuiz ? "Take the quiz" : current.chapter.status === "in-progress" ? "Continue video" : "Start video"}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green">
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Course progress */}
        <section className="flex flex-col gap-3 rounded-3xl bg-white p-5 dark:bg-brand-ink">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-base font-semibold text-brand-black dark:text-white">Your course progress</span>
            <span className="flex-shrink-0 text-sm font-semibold text-brand-green-dark dark:text-brand-green">{pct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-brand-green-tint-2 dark:bg-white/10">
            <div className="h-2.5 rounded-full bg-brand-green" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-sm text-brand-gray dark:text-white/55">
            {done} of {courses.length} chapters complete. Keep going to earn your certificate!
          </p>
        </section>

        {/* All chapters */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-brand-black dark:text-white">Your learning path</h2>
            <p className="text-sm text-brand-gray dark:text-white/55">Choose the next card, watch the video, then take its quiz.</p>
          </div>
          {courseGroups.map((group) => {
            const items = states.filter((s) => s.chapter.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="flex flex-col gap-2.5">
                <span className="px-1 text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">
                  {group}
                </span>
                {items.map((s) => {
                  const marker = s.state === "completed" ? "done" : s.state === "in-progress" ? "current" : "todo";
                  return (
                    <Link
                      key={s.chapter.slug}
                      href={chapterNextHref(s)}
                      className="flex min-h-[72px] items-center gap-3.5 rounded-2xl bg-white p-3.5 transition-colors active:bg-brand-green-tint dark:bg-brand-ink dark:active:bg-white/10"
                    >
                      <StepDot state={marker} size="h-10 w-10">
                        <span className="text-sm font-semibold">{s.number}</span>
                      </StepDot>
                      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">
                          {s.chapter.title}
                        </span>
                        <span className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${
                              s.video === "done"
                                ? "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                                : "bg-brand-black/5 text-brand-gray dark:bg-white/10 dark:text-white/60"
                            }`}
                          >
                            <PlayIcon className="h-3 w-3" /> Video {s.video === "done" ? "✓" : s.chapter.duration}
                          </span>
                          <span
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${
                              s.quiz === "done"
                                ? "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                                : "bg-brand-black/5 text-brand-gray dark:bg-white/10 dark:text-white/60"
                            }`}
                          >
                            <QuizIcon className="h-3 w-3" /> Quiz {s.quiz === "done" ? "✓" : ""}
                          </span>
                        </span>
                      </span>
                      <ChevronRight className="h-5 w-5 flex-shrink-0 text-brand-gray-light dark:text-white/30" />
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </section>
      </main>

      <MobileTabBar />
    </div>
  );
}
