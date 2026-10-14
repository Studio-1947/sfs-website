"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";

const fieldClass =
  "h-11 rounded-xl border-[1.5px] border-brand-line bg-transparent px-3.5 text-sm text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white";

export default function NewBatchButton() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [programme, setProgramme] = useState("");
  const [startDate, setStartDate] = useState("");

  function close() {
    setOpen(false);
    setSubmitted(false);
    setName("");
    setProgramme("");
    setStartDate("");
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
        className="flex flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
      >
        New batch
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open ? (
        <ModalShell title="Create a new batch" onClose={close}>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-brand-black dark:text-white">
                &ldquo;{name || "New batch"}&rdquo; has been created.
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
                placeholder="Batch name (e.g. Batch KOL-03)"
                className={fieldClass}
              />
              <input
                required
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                placeholder="Programme"
                className={fieldClass}
              />
              <input
                required
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={fieldClass}
              />
              <button
                type="submit"
                className="mt-1 rounded-full bg-brand-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Create batch
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
