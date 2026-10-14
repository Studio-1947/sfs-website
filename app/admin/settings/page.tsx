import AdminSidebar from "@/components/AdminSidebar";
import AdminNav from "@/components/AdminNav";
import { adminUser, adminStats, languages } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav title="Settings" subtitle="Organisation and platform preferences" />

        <main className="flex flex-1 flex-col gap-6 bg-brand-cream px-11 py-9 dark:bg-brand-black">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                Organisation
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-brand-gray-light dark:text-white/35">Organisation name</span>
                <span className="text-[15px] font-semibold text-brand-black dark:text-white">{adminUser.org}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-brand-gray-light dark:text-white/35">Admin contact</span>
                <span className="text-[15px] font-semibold text-brand-black dark:text-white">
                  {adminUser.name} &middot; {adminUser.role}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-brand-gray-light dark:text-white/35">Avg. completion rate</span>
                <span className="text-[15px] font-semibold text-brand-black dark:text-white">{adminStats.avgCompletionRate}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                Languages live
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span
                    key={l.code}
                    className="rounded-full bg-brand-green-tint px-3.5 py-1.5 text-sm font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                  >
                    {l.native}
                  </span>
                ))}
              </div>
              <span className="text-sm text-brand-gray dark:text-white/55">
                {adminStats.languagesLive} languages currently available to learners.
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
