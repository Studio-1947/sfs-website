export type CourseIconKey = "bone" | "heart" | "digestive" | "handwash" | "bandage" | "cpr";

const paths: Record<CourseIconKey, JSX.Element> = {
  bone: (
    <path
      d="M6.5 6.5a2.5 2.5 0 1 0-3.6 3.6L14 21.2a2.5 2.5 0 1 0 3.6-3.6L6.5 6.5Zm11-3a2.5 2.5 0 1 0-3.6 3.6l1 1a2.5 2.5 0 1 0 3.6-3.6l-1-1ZM4.9 16.9a2.5 2.5 0 1 0 3.6 3.6l1-1a2.5 2.5 0 1 0-3.6-3.6l-1 1Z"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  ),
  heart: (
    <path
      d="M12 20.5s-7.5-4.6-9.7-9.3C.7 7.8 2.4 4.5 5.8 4a4.6 4.6 0 0 1 6.2 2 4.6 4.6 0 0 1 6.2-2c3.4.5 5.1 3.8 3.5 7.2C19.5 15.9 12 20.5 12 20.5ZM6 12h3l1.5-3 2 5 1.5-3h3.5"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  digestive: (
    <path
      d="M9 3c0 2-2 2.5-2 5s2 3 2 5.5S6.5 16 6.5 18a3.5 3.5 0 0 0 7 0M13 3v6a4 4 0 0 0 4 4h1"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  handwash: (
    <path
      d="M12 3c1.8 3 3.5 5.4 3.5 8a3.5 3.5 0 1 1-7 0c0-2.6 1.7-5 3.5-8ZM5 19c.8-1 2-1.5 3-1s1.6 1.4 2.6.9c.8-.4.9-1.3 1.9-1.3s1 .8 1.9 1.2c1 .5 2.2 0 3-.9M5 21.5c.8-1 2-1.4 3-1s1.6 1.3 2.6.8c.8-.4.9-1.2 1.9-1.2s1 .7 1.9 1.1c1 .5 2.2 0 3-.8"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  bandage: (
    <path
      d="M7 17 17 7a3.5 3.5 0 1 1 5 5L12 22a3.5 3.5 0 0 1-5-5Zm2.5-.5 5-5M9 9l1.5 1.5M13.5 13.5 15 15"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cpr: (
    <path
      d="M3 12h4l1.5-4L11 16l2-8 1.5 4H21M8 18c-2-1.4-4-3.2-4-5.6M16 18c2-1.4 4-3.2 4-5.6"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function CourseIcon({ icon, className = "h-16 w-16" }: { icon: CourseIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
