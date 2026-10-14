"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavControls from "./NavControls";
import AdminProfileMenu from "./AdminProfileMenu";
import { adminSections, isSectionActive } from "./AdminSidebar";

/** Slim top bar: where you are (section name), theme switch and your account. Page titles live in the page itself. */
export default function AdminNav() {
  const pathname = usePathname();
  const section = adminSections.find((s) => isSectionActive(pathname, s.href));
  const Icon = section?.icon;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-brand-line bg-brand-cream/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-brand-black/95 sm:px-8 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <div className="lg:hidden">
          <Logo href="/admin" size={26} iconOnly />
        </div>
        {section && Icon ? (
          <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-brand-gray dark:text-white/60">
            <span className="hidden sm:inline">Admin</span>
            <span className="hidden text-brand-gray-light sm:inline" aria-hidden="true">
              /
            </span>
            <Icon className="h-4 w-4 flex-shrink-0 text-brand-green-dark dark:text-brand-green" />
            <span className="truncate text-brand-black dark:text-white">{section.label}</span>
          </span>
        ) : null}
      </div>
      <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
        <NavControls showLanguage={false} />
        <AdminProfileMenu />
      </div>
    </header>
  );
}
