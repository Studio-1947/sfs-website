"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { adminUser } from "@/lib/data";

const navItems = [
  { label: "Overview", href: "/admin" },
  { label: "Curriculum", href: "/admin/curriculum" },
  { label: "Learners", href: "/admin/learners" },
  { label: "Cohorts & partners", href: "/admin/cohorts" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col gap-2 overflow-y-auto border-r border-brand-line bg-white px-5 py-7 dark:border-white/10 dark:bg-brand-ink">
      <div className="mb-6 flex items-center gap-2.5 px-2.5">
        <Logo size={28} iconOnly />
        <span className="text-lg font-semibold text-brand-black dark:text-white">Admin</span>
      </div>

      {navItems.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors ${
              isActive
                ? "bg-brand-green text-white"
                : "text-brand-gray hover:bg-brand-black/5 hover:text-brand-black dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <div className="flex-1" />

      <Link
        href="/admin/settings"
        className="flex items-center gap-2.5 rounded-xl bg-brand-black/5 px-3.5 py-3 transition-colors hover:bg-brand-black/10 dark:bg-white/5 dark:hover:bg-white/10"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
          {adminUser.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-brand-black dark:text-white">{adminUser.name}</span>
          <span className="text-xs text-brand-gray-light dark:text-white/50">{adminUser.role}</span>
        </div>
      </Link>
      <Link
        href="/"
        className="px-3.5 py-1 text-sm font-semibold text-brand-gray-light hover:text-brand-black dark:text-white/50 dark:hover:text-white"
      >
        &larr; Exit admin view
      </Link>
    </aside>
  );
}
