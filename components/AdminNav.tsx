import NavControls from "./NavControls";
import AdminProfileMenu from "./AdminProfileMenu";

export default function AdminNav({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-brand-line bg-brand-cream/95 px-8 py-5 backdrop-blur dark:border-white/10 dark:bg-brand-black/95 lg:px-11">
      <div className="min-w-0">
        <h1 className="truncate text-[22px] font-semibold text-brand-black dark:text-white">{title}</h1>
        {subtitle ? <p className="truncate text-sm text-brand-gray dark:text-white/55">{subtitle}</p> : null}
      </div>
      <div className="flex flex-shrink-0 items-center gap-4">
        <NavControls showLanguage={false} />
        {action}
        <AdminProfileMenu />
      </div>
    </header>
  );
}
