"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      aria-label="Log out"
      title="Log out"
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-gray transition-colors hover:border-red-400 hover:text-red-500 dark:border-white/15 dark:text-white/70 dark:hover:border-red-400 dark:hover:text-red-400"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px]" aria-hidden="true">
        <path
          d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9M16 17l5-5-5-5M21 12H9"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
