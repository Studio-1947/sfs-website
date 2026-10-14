type StatIconKey = "certificate" | "streak" | "points" | "progress";

const paths: Record<StatIconKey, JSX.Element> = {
  certificate: (
    <path
      d="M8 3h8l1 5-5 3-5-3 1-5Zm4 8v10m-3-3-2.5 3M15 18l2.5 3"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  streak: (
    <path
      d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c1.5 1.5 2 3.5 2 5a8 8 0 1 1-16 0c0-4 2-6 4-8 1-1 1.5-2.5 1-4-1 1-2 2-2 4"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  points: (
    <path
      d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.3 9.2l6.1-.6L12 3Z"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  progress: (
    <path
      d="M4 20V10m6 10V4m6 16v-7"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function StatIcon({ icon, className = "h-5 w-5" }: { icon: StatIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
