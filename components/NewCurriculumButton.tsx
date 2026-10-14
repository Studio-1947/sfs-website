"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";

const fieldClass =
  "h-11 rounded-xl border-[1.5px] border-brand-line bg-transparent px-3.5 text-sm text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white";

export default function NewCurriculumButton() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function close() {
    setOpen(false);
    setSubmitted(false);
    setName("");
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
        className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-line px-3.5 py-2 text-sm font-semibold text-brand-gray transition-colors hover:border-brand-green hover:text-brand-green-dark dark:border-white/15 dark:text-white/70 dark:hover:text-brand-green"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        New curriculum
      </button>

      {open ? (
        <ModalShell title="Create a curriculum" onClose={close}>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-brand-black dark:text-white">
                &ldquo;{name}&rdquo; curriculum was created.
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Curriculum name (e.g. Maternal & Child Health)"
                className={fieldClass}
              />
              <button
                type="submit"
                className="mt-1 rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Create curriculum
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
