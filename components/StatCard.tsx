export default function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-2xl bg-white p-6 dark:bg-brand-ink">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
        {label}
      </span>
      <span className="font-sans text-[32px] font-semibold leading-none text-brand-black dark:text-white">
        {value}
      </span>
      {sub ? <span className="text-sm text-brand-gray dark:text-white/55">{sub}</span> : null}
    </div>
  );
}
