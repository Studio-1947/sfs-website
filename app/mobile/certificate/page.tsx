import Link from "next/link";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileTabBar from "@/components/mobile/MobileTabBar";
import { ArrowRight, BadgeIcon, StepDot } from "@/components/learn/icons";
import { chapterNextHref, chapterStates, course, courseCompletedCount, courses, isCourseComplete } from "@/lib/data";

export default function MobileCertificatePage() {
  const states = chapterStates();
  const done = courseCompletedCount();
  const complete = isCourseComplete();
  const left = courses.length - done;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream dark:bg-brand-black">
      <MobileTopBar title="Certificate" />

      <main className="flex flex-1 flex-col gap-5 px-4 pb-28 pt-5">
        <section className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center dark:bg-brand-ink">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              complete ? "bg-brand-green text-white" : "bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green"
            }`}
          >
            <BadgeIcon className="h-8 w-8" />
          </span>
          <h1 className="text-xl font-semibold text-brand-black dark:text-white">
            {complete ? "Your certificate is ready" : `${left} more chapter${left === 1 ? "" : "s"} to go`}
          </h1>
          <p className="text-sm leading-relaxed text-brand-gray dark:text-white/55">
            {complete
              ? `You finished all of ${course.title}.`
              : `Finish every video and quiz in ${course.title} to earn 1 certificate.`}
          </p>
          {complete ? (
            <Link
              href="/certificate"
              className="mt-1 flex min-h-[56px] w-full items-center justify-between rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-base font-semibold text-white"
            >
              View certificate
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green">
                <ArrowRight />
              </span>
            </Link>
          ) : null}
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">
            Checklist
          </h2>
          {states.map((s) => (
            <Link
              key={s.chapter.slug}
              href={chapterNextHref(s)}
              className="flex min-h-[64px] items-center gap-3.5 rounded-2xl bg-white p-3.5 dark:bg-brand-ink"
            >
              <StepDot state={s.state === "completed" ? "done" : s.state === "in-progress" ? "current" : "todo"} size="h-9 w-9">
                <span className="text-sm font-semibold">{s.number}</span>
              </StepDot>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">{s.chapter.title}</span>
                <span className="text-xs text-brand-gray dark:text-white/50">
                  {s.state === "completed" ? "Video and quiz done" : s.video === "done" ? "Quiz left" : "Video and quiz left"}
                </span>
              </span>
            </Link>
          ))}
        </section>
      </main>

      <MobileTabBar />
    </div>
  );
}
