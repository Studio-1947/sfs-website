"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { BookIcon, BuildingIcon, HelpIcon, HomeIcon, PhoneIcon, SettingsIcon, UsersIcon } from "./admin/icons";

/** The admin sections, in plain words. Shared by the desktop sidebar and the phone tab bar. */
export const adminSections = [
  { label: "Home", hint: "Today at a glance", href: "/admin", icon: HomeIcon },
  { label: "Lessons", hint: "Videos and quizzes", href: "/admin/curriculum", icon: BookIcon },
  { label: "Students", hint: "People and batches", href: "/admin/learners", icon: UsersIcon },
  { label: "Centres", hint: "Schools and partners", href: "/admin/cohorts", icon: BuildingIcon },
  { label: "Settings", hint: "Your organisation", href: "/admin/settings", icon: SettingsIcon },
];

export function isSectionActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="no-scrollbar sticky top-0 hidden h-screen w-[272px] flex-shrink-0 flex-col gap-1.5 overflow-y-auto border-r border-brand-line bg-white px-4 py-6 dark:border-white/10 dark:bg-brand-ink lg:flex">
      <div className="mb-5 flex items-center gap-3 px-2">
        <Logo href="/admin" size={28} iconOnly />
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold text-brand-black dark:text-white">Admin</span>
          <span className="text-xs text-brand-gray dark:text-white/50">Schools for Skills</span>
        </div>
      </div>

      <nav aria-label="Admin sections" className="flex flex-col gap-1.5">
        {adminSections.map((item) => {
          const active = isSectionActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 ${
                active ? "bg-brand-green text-white" : "text-brand-black hover:bg-brand-black/5 dark:text-white dark:hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                  active ? "bg-white/20" : "bg-brand-black/5 text-brand-gray group-hover:text-brand-black dark:bg-white/5 dark:text-white/60 dark:group-hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[15px] font-semibold">{item.label}</span>
                <span className={`text-xs ${active ? "text-white/80" : "text-brand-gray dark:text-white/45"}`}>{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-3 rounded-2xl bg-brand-cream p-4 dark:bg-white/5">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-black dark:text-white">
          <HelpIcon className="h-5 w-5 text-brand-green-dark dark:text-brand-green" />
          Stuck? We can help.
        </div>
        <p className="text-xs leading-relaxed text-brand-gray dark:text-white/55">Call the support team, Monday to Saturday, 9 AM to 6 PM.</p>
        <a
          href="tel:+918447841831"
          className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-brand-black text-sm font-semibold text-white transition-colors hover:bg-brand-ink dark:bg-white dark:text-brand-black"
        >
          <PhoneIcon /> Call support
        </a>
      </div>

      <Link href="/" className="px-3 py-2 text-sm font-semibold text-brand-gray hover:text-brand-black dark:text-white/50 dark:hover:text-white">
        &larr; Leave admin
      </Link>
    </aside>
  );
}
