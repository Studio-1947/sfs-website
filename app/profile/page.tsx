import LearnerNav from "@/components/LearnerNav";
import LearnerSidebar from "@/components/LearnerSidebar";
import IconStatCard from "@/components/IconStatCard";
import ProfileForm from "@/components/ProfileForm";
import { course, courseCompletedCount, courses, isCourseComplete, learner } from "@/lib/data";

export default function ProfilePage() {
  const complete = isCourseComplete();
  const completedCount = courseCompletedCount();
  const pct = Math.round((completedCount / courses.length) * 100);

  return (
    <div className="flex">
      <LearnerSidebar active="profile" />

      <div className="min-w-0 flex-1">
        <LearnerNav active="profile" hasSidebar />

        <main className="flex flex-col gap-8 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
          <div className="rounded-3xl border border-brand-green/25 bg-brand-green-tint/80 p-4 dark:border-brand-green/20 dark:bg-brand-green/10 sm:p-6">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-wider text-brand-green-darker dark:text-brand-green sm:text-sm">
              Your learning stats
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <IconStatCard icon="certificate" label="Certificates earned" value={String(learner.certificatesEarned)} sub="of 1 course" />
              <IconStatCard icon="streak" label="Learning streak" value={`${learner.streakDays} days`} sub="Keep it going" />
              <IconStatCard icon="points" label="Points" value={String(learner.points)} sub={`Rank: ${learner.rank}`} />
              <IconStatCard icon="progress" label="Overall progress" value={`${learner.overallProgress}%`} />
            </div>
          </div>

          <ProfileForm />

          <div className="flex flex-col gap-3.5 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray-light dark:text-white/40 sm:text-sm">
              Your certificate
            </p>
            <a
              href="/certificate"
              className="group flex flex-col gap-4 rounded-2xl border border-brand-line/80 bg-white p-5 shadow-sm transition-all hover:border-brand-green/40 hover:shadow-md dark:border-white/10 dark:bg-brand-ink sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold leading-snug text-brand-black transition-colors group-hover:text-brand-green-dark dark:text-white dark:group-hover:text-brand-green">
                  {course.title}
                </span>
                <span className="text-sm text-brand-gray dark:text-white/60">{course.description}</span>
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-brand-line/60 dark:bg-white/10 sm:w-40">
                    <div className="h-full rounded-full bg-brand-green transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-brand-gray-light dark:text-white/40">
                    {completedCount} of {courses.length} videos
                  </span>
                </div>
              </div>
              <span
                className={`w-fit flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  complete
                    ? "bg-brand-green text-white group-hover:bg-brand-green-dark"
                    : "bg-brand-line/70 text-brand-black dark:bg-white/10 dark:text-white group-hover:bg-brand-green group-hover:text-white"
                }`}
              >
                {complete ? "Certified — view certificate →" : "View progress →"}
              </span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
