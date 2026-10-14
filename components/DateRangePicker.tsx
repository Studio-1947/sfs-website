"use client";

import { useEffect, useRef, useState } from "react";

const options = ["Last 7 days", "Last 30 days", "Last 90 days"];

export default function DateRangePicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Last 30 days");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative hidden flex-shrink-0 sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-line px-3.5 text-sm font-semibold text-brand-gray transition-colors hover:border-brand-green dark:border-white/15 dark:text-white/70"
      >
        {selected}
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-44 overflow-hidden rounded-xl border border-brand-line bg-white py-1.5 shadow-xl dark:border-white/10 dark:bg-brand-ink">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setSelected(o);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                o === selected
                  ? "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                  : "text-brand-gray hover:bg-brand-cream dark:text-white/70 dark:hover:bg-white/5"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
