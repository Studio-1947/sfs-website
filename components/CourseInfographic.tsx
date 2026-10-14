import Link from "next/link";
import { CourseInfographic as CourseInfographicData } from "@/lib/data";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseInfographic({
  data,
  quizHref,
  quizLabel = "Take the quiz",
}: {
  data: CourseInfographicData;
  quizHref: string;
  quizLabel?: string;
}) {
  return (
    <section className="flex flex-col gap-8 rounded-3xl bg-white p-8 dark:bg-brand-ink sm:p-10">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
          Course at a glance
        </span>
        <h2 className="mt-1 text-[22px] font-semibold text-brand-black dark:text-white">
          What this lesson covers
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {data.keyFacts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1.5 rounded-2xl bg-brand-cream p-4 dark:bg-white/5"
          >
            <span className="text-lg font-semibold text-brand-black dark:text-white sm:text-xl">
              {fact.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
              {fact.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3.5">
          <span className="text-sm font-semibold text-brand-black dark:text-white">What you&rsquo;ll learn</span>
          <ul className="flex flex-col gap-3">
            {data.learningPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-gray dark:text-white/60">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                  <CheckIcon />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="text-sm font-semibold text-brand-black dark:text-white">Step by step</span>
          <ol className="flex flex-col gap-4">
            {data.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-xs font-semibold text-white dark:bg-brand-green">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-brand-black dark:text-white">{step.title}</span>
                  <span className="text-sm leading-relaxed text-brand-gray dark:text-white/55">{step.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-2xl bg-brand-green-tint px-6 py-6 dark:bg-brand-green/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-brand-black dark:text-white">Ready to test what you learned?</p>
          <p className="text-sm text-brand-gray dark:text-white/55">A short quiz unlocks your certificate for this topic.</p>
        </div>
        <Link
          href={quizHref}
          className="group inline-flex w-fit flex-shrink-0 items-center gap-3 rounded-full bg-brand-green py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          <span className="pl-6">{quizLabel}</span>
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
