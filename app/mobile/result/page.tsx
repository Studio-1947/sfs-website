import Link from "next/link";
import { adjacentChapters, courses, isCourseComplete } from "@/lib/data";
import { ArrowRight, CheckIcon } from "@/components/learn/icons";

export default function MobileResultPage({
  searchParams,
}: {
  searchParams: { video?: string; score?: string; total?: string };
}) {
  const chapter = courses.find((c) => c.slug === searchParams.video);
  const score = Number(searchParams.score ?? 0);
  const total = Math.max(1, Number(searchParams.total ?? 1));
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 60;
  const { next } = chapter ? adjacentChapters(chapter.slug) : { next: null };
  const complete = isCourseComplete();

  const primary = passed
    ? next
      ? { href: `/mobile/lesson/${next.slug}`, label: "Next chapter" }
      : { href: "/mobile/certificate", label: "Get my certificate" }
    : chapter
      ? { href: `/mobile/lesson/${chapter.slug}`, label: "Watch the video again" }
      : { href: "/mobile", label: "Back to chapters" };

  const r = 54;
  const circ = 2 * Math.PI * r;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream px-5 dark:bg-brand-black">
      <main className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-brand-line dark:stroke-white/10" />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct / 100)}
              className={passed ? "stroke-brand-green" : "stroke-amber-400"}
            />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-4xl font-semibold text-brand-black dark:text-white">
              {score}/{total}
            </span>
            <span className="text-sm text-brand-gray dark:text-white/55">correct</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-brand-black dark:text-white">
            {passed ? "Well done!" : "Good try!"}
          </h1>
          <p className="text-base leading-relaxed text-brand-gray dark:text-white/60">
            {passed
              ? chapter
                ? `You completed “${chapter.title}”.`
                : "Chapter complete."
              : "Watch the video once more, then try the quiz again. You can do it."}
          </p>
        </div>

        {passed ? (
          <span className="flex items-center gap-2 rounded-full bg-brand-green-tint px-4 py-2 text-sm font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green">
            <CheckIcon /> Chapter {chapter ? courses.indexOf(chapter) + 1 : ""} complete
          </span>
        ) : null}
      </main>

      <div className="flex flex-col gap-3 pb-6" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
        <Link
          href={primary.href}
          className="flex min-h-[56px] items-center justify-between rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-base font-semibold text-white active:bg-brand-green-dark"
        >
          {primary.label}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green">
            <ArrowRight />
          </span>
        </Link>
        {chapter ? (
          <Link
            href={`/mobile/quiz/${chapter.slug}`}
            className="flex min-h-[52px] items-center justify-center rounded-full border-2 border-brand-line text-base font-semibold text-brand-black dark:border-white/20 dark:text-white"
          >
            Try the quiz again
          </Link>
        ) : null}
        <Link href="/mobile" className="flex min-h-[48px] items-center justify-center text-sm font-semibold text-brand-gray dark:text-white/55">
          {complete ? "Back to home" : "All chapters"}
        </Link>
      </div>
    </div>
  );
}
