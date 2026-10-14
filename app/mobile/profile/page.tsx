import Link from "next/link";
import MobileTopBar from "@/components/mobile/MobileTopBar";
import MobileTabBar from "@/components/mobile/MobileTabBar";
import { ChevronRight } from "@/components/learn/icons";
import { course, courseCompletedCount, courses, learner } from "@/lib/data";

export default function MobileProfilePage() {
  const done = courseCompletedCount();
  const stats = [
    { label: "Chapters done", value: `${done}/${courses.length}` },
    { label: "Day streak", value: String(learner.streakDays) },
    { label: "Points", value: String(learner.points) },
  ];
  const links = [
    { href: "/profile", label: "Edit my profile" },
    { href: "/noticeboard", label: "Noticeboard" },
    { href: "/scholarship", label: "Scholarship & Scope" },
    { href: "/dashboard", label: "Switch to desktop view" },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream dark:bg-brand-black">
      <MobileTopBar title="Me" />

      <main className="flex flex-1 flex-col gap-5 px-4 pb-28 pt-5">
        <section className="flex items-center gap-4 rounded-3xl bg-white p-5 dark:bg-brand-ink">
          <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-2xl font-semibold text-white">
            {learner.name.charAt(0)}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-xl font-semibold text-brand-black dark:text-white">{learner.name}</span>
            <span className="text-sm text-brand-gray dark:text-white/55">{learner.school}</span>
            <span className="text-sm font-semibold text-brand-green-dark dark:text-brand-green">{learner.rank}</span>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 rounded-2xl bg-white px-2 py-4 text-center dark:bg-brand-ink">
              <span className="text-xl font-semibold text-brand-black dark:text-white">{s.value}</span>
              <span className="text-xs text-brand-gray dark:text-white/50">{s.label}</span>
            </div>
          ))}
        </section>

        <p className="px-1 text-sm text-brand-gray dark:text-white/55">
          Learning <span className="font-semibold text-brand-black dark:text-white">{course.title}</span>. Change your
          language with the globe button at the top.
        </p>

        <nav className="flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-brand-ink">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex min-h-[56px] items-center justify-between px-5 text-[15px] font-semibold text-brand-black active:bg-brand-green-tint dark:text-white dark:active:bg-white/10 ${
                i > 0 ? "border-t border-brand-line dark:border-white/10" : ""
              }`}
            >
              {l.label}
              <ChevronRight className="h-5 w-5 text-brand-gray-light dark:text-white/30" />
            </Link>
          ))}
        </nav>
      </main>

      <MobileTabBar />
    </div>
  );
}
