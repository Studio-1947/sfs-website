export default function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-brand-line p-1 dark:border-white/15">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            value === opt.key
              ? "bg-brand-green text-white"
              : "text-brand-gray hover:text-brand-black dark:text-white/60 dark:hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
