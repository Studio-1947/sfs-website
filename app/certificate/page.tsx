import Link from "next/link";
import LearnerNav from "@/components/LearnerNav";
import CertificateDocument from "@/components/CertificateDocument";
import CertificateActions from "@/components/CertificateActions";
import { course, courseCompletedCount, courses, isCourseComplete, learner } from "@/lib/data";

export default function CertificatePage({
  searchParams,
}: {
  searchParams: { video?: string; score?: string; total?: string };
}) {
  const complete = isCourseComplete();
  const completedCount = courseCompletedCount();
  const totalVideos = courses.length;
  const lastVideo = courses.find((c) => c.slug === searchParams.video);
  const certificateId = `SFS-2026-${(course.slug.length * 137).toString().padStart(6, "0")}`;
  const nextChapter = courses.find((c) => c.status !== "completed") ?? courses[0];
  const nextChapterIndex = courses.findIndex((c) => c.slug === nextChapter.slug) + 1;

  return (
    <div className="relative min-h-screen bg-[#F7F6F0] dark:bg-brand-black">
      <LearnerNav active="certificate" backHref="/dashboard" backLabel="Back to dashboard" />

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center px-4 pb-24 pt-6 sm:px-8 sm:py-10 lg:pb-16">
        {/* Page Top Header Banner */}
        <div className="no-print flex max-w-3xl flex-col items-center gap-3 text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
              complete
                ? "bg-brand-green/15 text-brand-green-darker ring-1 ring-brand-green/30 dark:bg-brand-green/20 dark:text-brand-green"
                : "bg-amber-500/15 text-amber-900 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${complete ? "bg-brand-green" : "animate-pulse bg-amber-500"}`}
            />
            {complete ? "Verified & Certified" : `In Progress • ${completedCount} of ${totalVideos} Modules`}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-brand-black dark:text-white sm:text-3xl md:text-4xl">
            {complete ? "Your Official Certificate of Completion" : "Keep going to unlock your certificate"}
          </h1>

          {lastVideo ? (
            <p className="max-w-xl text-sm leading-relaxed text-brand-gray dark:text-white/60 sm:text-base">
              Great job! You passed &ldquo;{lastVideo.title}&rdquo; with {searchParams.score ?? "0"} of{" "}
              {searchParams.total ?? "0"} correct.
            </p>
          ) : (
            <p className="max-w-xl text-sm leading-relaxed text-brand-gray dark:text-white/60 sm:text-base">
              {complete
                ? `You have satisfied all academic requirements in ${course.title}. This credential has been officially recorded.`
                : `${completedCount} of ${totalVideos} modules completed in ${course.title}. Complete remaining chapters to issue your certificate.`}
            </p>
          )}
        </div>

        {/* Certificate Render */}
        <div className="my-7 w-full max-w-[960px]">
          <CertificateDocument
            learnerName={learner.name}
            courseTitle={course.title}
            certificateId={certificateId}
            isComplete={complete}
            completedCount={completedCount}
            totalVideos={totalVideos}
            issueDate="October 2026"
          />
        </div>

        {/* Post-Certificate Actions / Next Steps */}
        <div className="no-print w-full max-w-[960px]">
          {complete ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-line/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-ink sm:p-8">
              <h3 className="text-base font-bold text-brand-black dark:text-white sm:text-lg">
                Your credential is ready to save, print, and share
              </h3>
              <p className="text-center text-xs text-brand-gray dark:text-white/60 sm:text-sm">
                Signed by the Academic Director and Dean of Curriculum, Schools for Skills Foundation.
              </p>
              <CertificateActions />
            </div>
          ) : (
            <div className="flex flex-col gap-6 rounded-2xl border border-brand-line/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-brand-ink sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-brand-black dark:text-white sm:text-lg">
                    Next Chapter: Chapter {nextChapterIndex} &mdash; {nextChapter.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-brand-gray dark:text-white/60 sm:text-sm">
                    Finish each video and quiz to automatically unlock and verify this certificate.
                  </p>
                </div>
                <Link
                  href={`/lesson/${nextChapter.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-dark"
                >
                  <span>Resume Chapter {nextChapterIndex}</span>
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Course Chapter Progress Strip */}
              <div className="border-t border-brand-line/60 pt-4 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gray-light dark:text-white/40">
                  Course Checklist ({completedCount} of {totalVideos} Complete)
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                  {courses.map((c, i) => {
                    const isDone = c.status === "completed";
                    const isCurrent = c.slug === nextChapter.slug;
                    return (
                      <Link
                        key={c.slug}
                        href={isDone ? `/lesson/${c.slug}` : `/lesson/${c.slug}`}
                        className={`flex flex-col gap-1 rounded-xl border p-2.5 text-xs transition-all ${
                          isDone
                            ? "border-brand-green/30 bg-brand-green-tint/50 text-brand-green-darker dark:border-brand-green/20 dark:bg-brand-green/10 dark:text-brand-green"
                            : isCurrent
                              ? "border-amber-500/50 bg-amber-500/10 text-amber-900 shadow-sm dark:border-amber-400/40 dark:text-amber-200"
                              : "border-brand-line/60 bg-brand-cream/40 text-brand-gray dark:border-white/5 dark:bg-white/[0.02] dark:text-white/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Ch. {i + 1}</span>
                          {isDone ? (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[10px] text-white">
                              ✓
                            </span>
                          ) : isCurrent ? (
                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                          ) : null}
                        </div>
                        <span className="line-clamp-1 font-medium">{c.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
