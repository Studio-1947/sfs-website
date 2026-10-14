"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSections, isSectionActive } from "./AdminSidebar";

/** Bottom tab bar for phones and tablets, where the sidebar is hidden. Every tab has a word under its icon. */
export default function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Admin sections"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-line bg-white/95 px-1 pt-1.5 backdrop-blur dark:border-white/10 dark:bg-brand-ink/95 lg:hidden"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      {adminSections.map((item) => {
        const active = isSectionActive(pathname, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold ${
              active ? "text-brand-green-dark dark:text-brand-green" : "text-brand-gray dark:text-white/50"
            }`}
          >
            <span className={`flex h-8 w-12 items-center justify-center rounded-full ${active ? "bg-brand-green-tint dark:bg-brand-green/15" : ""}`}>
              <Icon className="h-5 w-5" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
