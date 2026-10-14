export default function ProgressBar({
  value,
  className = "",
  trackClassName = "bg-brand-green-tint-2 dark:bg-white/10",
  fillClassName = "bg-brand-green",
}: {
  value: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2.5 w-full rounded-full ${trackClassName} ${className}`}>
      <div
        className={`h-2.5 rounded-full ${fillClassName}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
