const COLOR_CLASSES = [
  "text-brand-green",
  "text-brand-black dark:text-white",
  "text-brand-gray dark:text-white/50",
  "text-brand-gray-light dark:text-white/25",
];

const LEGEND_DOT_CLASSES = [
  "bg-brand-green",
  "bg-brand-black dark:bg-white",
  "bg-brand-gray dark:bg-white/50",
  "bg-brand-gray-light dark:bg-white/25",
];

export default function DonutChart({
  segments,
}: {
  segments: { label: string; percent: number }[];
}) {
  const size = 140;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-[140px] w-[140px] flex-shrink-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-brand-line dark:text-white/10"
        />
        {segments.map((s, i) => {
          const dash = (s.percent / 100) * circumference;
          const circle = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              className={COLOR_CLASSES[i % COLOR_CLASSES.length]}
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="flex flex-col gap-2.5">
        {segments.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2.5 text-sm">
            <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${LEGEND_DOT_CLASSES[i % LEGEND_DOT_CLASSES.length]}`} />
            <span className="font-semibold text-brand-black dark:text-white">{s.label}</span>
            <span className="text-brand-gray-light dark:text-white/35">{s.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
