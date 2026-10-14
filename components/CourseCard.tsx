import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/data";

const statusStyles: Record<Course["status"], { label: string; className: string }> = {
  completed: {
    label: "Completed",
    className: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  },
  "in-progress": {
    label: "In progress",
    className: "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  },
  "not-started": {
    label: "Not started",
    className: "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/45",
  },
};

export default function CourseCard({ course }: { course: Course }) {
  const status = statusStyles[course.status];

  return (
    <Link
      href={`/lesson/${course.slug}`}
      className="flex flex-1 flex-col gap-3 overflow-hidden rounded-2xl bg-white transition-colors hover:bg-brand-green-tint dark:bg-brand-ink dark:hover:bg-white/5"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-brand-black">
        <Image
          src={course.thumbImage}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <div className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
        </div>
        {course.status === "completed" ? (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs font-semibold text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {course.quizQuestions.length}/{course.quizQuestions.length} answered
          </span>
        ) : null}
        {course.status === "in-progress" ? (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/15">
            <div className="h-1 bg-brand-green" style={{ width: `${course.progress}%` }} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`self-start rounded-lg px-2.5 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.label.toUpperCase()}
          </span>
          <span className="flex-shrink-0 text-xs font-semibold text-brand-gray-light dark:text-white/35">
            {course.duration} &middot;{" "}
            {course.status === "completed"
              ? `${course.quizQuestions.length}/${course.quizQuestions.length} answered`
              : `${course.quizQuestions.length} Qs`}
          </span>
        </div>
        <span className="text-lg font-semibold leading-snug text-brand-black dark:text-white">{course.title}</span>
        <span className="line-clamp-2 text-sm leading-relaxed text-brand-gray dark:text-white/55">
          {course.description}
        </span>
      </div>
    </Link>
  );
}
