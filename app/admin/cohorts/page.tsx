import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNav from "@/components/AdminNav";
import PartnerContactActions from "@/components/PartnerContactActions";
import { adminCohorts } from "@/lib/data";

const typeStyles: Record<string, string> = {
  School: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  "NGO Partner": "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  "Hospital Partner": "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/45",
};

export default function CohortsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav
          title="Cohorts & partners"
          subtitle={`${adminCohorts.length} schools and partner organisations`}
        />

        <main className="flex flex-1 flex-col gap-6 bg-brand-cream px-11 py-9 dark:bg-brand-black">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {adminCohorts.map((c) => (
              <div key={c.name} className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-brand-ink">
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={c.thumbImage}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <span className={`w-fit rounded-lg px-2.5 py-1 text-xs font-semibold ${typeStyles[c.type]}`}>
                    {c.type.toUpperCase()}
                  </span>
                  <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">{c.name}</span>
                  <span className="text-sm text-brand-gray dark:text-white/55">{c.location}</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-brand-black dark:text-white">{c.learners} learners</span>
                    <Link
                      href="/admin/learners"
                      aria-label={`View learners from ${c.name}`}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark transition-colors hover:bg-brand-green hover:text-white dark:bg-brand-green/15 dark:text-brand-green dark:hover:bg-brand-green dark:hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path
                          d="M7 17L17 7M17 7H9M17 7V15"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-brand-line pt-3 dark:border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                      Connect with Co-Ordinator
                    </span>
                    <PartnerContactActions name={c.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
