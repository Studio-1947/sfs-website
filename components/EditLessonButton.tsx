"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import { Course, courseGroups } from "@/lib/data";

const fieldClass =
  "h-11 rounded-xl border-[1.5px] border-brand-line bg-transparent px-3.5 text-sm text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white";

export default function EditLessonButton({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [group, setGroup] = useState(course.group);
  const [duration, setDuration] = useState(course.duration);

  function close() {
    setOpen(false);
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Edit ${course.title}`}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-brand-gray transition-colors hover:bg-brand-black/5 hover:text-brand-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ModalShell title="Edit lesson" onClose={close}>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-brand-black dark:text-white">
                &ldquo;{title}&rdquo; was updated.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-1 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lesson title"
                className={fieldClass}
              />
              <select value={group} onChange={(e) => setGroup(e.target.value)} className={fieldClass}>
                {courseGroups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <input
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (e.g. 5 min)"
                className={fieldClass}
              />
              <button
                type="submit"
                className="mt-1 rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Save changes
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
