import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import AdminMobileNav from "./AdminMobileNav";

/** Frame shared by every admin page: sidebar (desktop), top bar, content column, tab bar (phones). */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-cream dark:bg-brand-black">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-7 px-4 pb-28 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pb-12">
          {children}
        </main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
