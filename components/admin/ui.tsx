"use client";

import Link from "next/link";
import { AlertIcon, ArrowRightIcon, CheckIcon, InfoIcon, SearchIcon } from "./icons";

/*
 * Building blocks for the admin area. The rules they follow:
 * - every block says in plain words what it shows (title + one-line help),
 * - every number comes with a sentence that explains it,
 * - every status has a colour, an icon AND a word, never colour alone,
 * - every control is big enough to hit easily and has a visible label.
 */

export const btnPrimary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand-green px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:cursor-not-allowed disabled:opacity-40";
export const btnSecondary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-brand-line bg-white px-5 text-[15px] font-semibold text-brand-black transition-colors hover:border-brand-green hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:border-brand-green dark:hover:text-brand-green";
export const btnSmall =
  "inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border-2 border-brand-line px-3.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-green hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/15 dark:text-white dark:hover:border-brand-green dark:hover:text-brand-green";
export const inputClass =
  "h-12 w-full rounded-2xl border-2 border-brand-line bg-white px-4 text-[15px] text-brand-black outline-none transition-colors placeholder:text-brand-gray-light focus:border-brand-green dark:border-white/15 dark:bg-white/5 dark:text-white dark:[color-scheme:dark]";

export function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}

// ---- Page structure ---------------------------------------------------------

export function PageIntro({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-1.5">
        <h1 className="text-[26px] font-semibold leading-tight text-brand-black dark:text-white sm:text-[32px]">{title}</h1>
        <p className="text-base leading-relaxed text-brand-gray dark:text-white/60">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}

export function Card({
  title,
  help,
  icon,
  action,
  children,
  className = "",
}: {
  title?: string;
  help?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex flex-col gap-5 rounded-3xl border border-brand-line/70 bg-white p-5 dark:border-white/10 dark:bg-brand-ink sm:p-6 ${className}`}>
      {title ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? (
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                {icon}
              </span>
            ) : null}
            <div className="flex min-w-0 flex-col gap-0.5">
              <h2 className="text-lg font-semibold leading-snug text-brand-black dark:text-white">{title}</h2>
              {help ? <p className="text-sm leading-relaxed text-brand-gray dark:text-white/55">{help}</p> : null}
            </div>
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** One big task the admin can start from here. Renders a link when `href` is given, a button otherwise. */
export function ActionTile({
  icon,
  title,
  description,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white transition-transform group-hover:scale-105">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">{title}</span>
        <span className="text-sm leading-snug text-brand-gray dark:text-white/55">{description}</span>
      </span>
      <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-brand-gray-light transition-transform group-hover:translate-x-0.5 group-hover:text-brand-green-dark dark:text-white/30" />
    </>
  );
  const cls =
    "group flex w-full items-center gap-4 rounded-3xl border-2 border-brand-line/70 bg-white p-4 transition-all hover:border-brand-green hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 dark:border-white/10 dark:bg-brand-ink dark:hover:border-brand-green";
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

// ---- Numbers ----------------------------------------------------------------

export function StatTile({
  icon,
  label,
  value,
  sentence,
  extra,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sentence: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-brand-line/70 bg-white p-5 dark:border-white/10 dark:bg-brand-ink">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
          {icon}
        </span>
        <span className="text-sm font-semibold text-brand-gray dark:text-white/60">{label}</span>
      </div>
      <span className="text-[34px] font-semibold leading-none tracking-tight text-brand-black dark:text-white">{value}</span>
      <p className="text-sm leading-snug text-brand-gray dark:text-white/55">{sentence}</p>
      {extra}
    </div>
  );
}

export function ProgressBar({ value, max = 100, tone = "green" }: { value: number; max?: number; tone?: "green" | "amber" }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-brand-line/80 dark:bg-white/10"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className={`h-full rounded-full ${tone === "amber" ? "bg-amber-500" : "bg-brand-green"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Vertical bars with the number written on top of each bar. The biggest bar is highlighted. */
export function ColumnChart({ data, unit = "" }: { data: { label: string; value: number }[]; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-56 items-end gap-2 sm:gap-3" role="img" aria-label={data.map((d) => `${d.label}: ${d.value}${unit}`).join(", ")}>
      {data.map((d) => {
        const top = d.value === max;
        return (
          <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <span className={`text-[11px] font-semibold sm:text-xs ${top ? "text-brand-green-dark dark:text-brand-green" : "text-brand-gray dark:text-white/55"}`}>
              {formatNumber(d.value)}
              {unit}
            </span>
            <div
              className={`w-full max-w-[56px] rounded-t-xl rounded-b-md ${top ? "bg-brand-green" : "bg-brand-green/35 dark:bg-brand-green/30"}`}
              style={{ height: `${Math.max(6, (d.value / max) * 100)}%` }}
            />
            <span className={`text-xs font-semibold ${top ? "text-brand-black dark:text-white" : "text-brand-gray-light dark:text-white/40"}`}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Horizontal bars, one per row, each with its name, number and an optional note. */
export function BarList({ items, max = 100, suffix = "%" }: { items: { label: string; value: number; note?: string }[]; max?: number; suffix?: string }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((it) => (
        <li key={it.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-semibold text-brand-black dark:text-white">{it.label}</span>
            <span className="flex-shrink-0 text-[15px] font-semibold text-brand-green-dark dark:text-brand-green">
              {formatNumber(it.value)}
              {suffix}
            </span>
          </div>
          <ProgressBar value={it.value} max={max} />
          {it.note ? <span className="text-xs text-brand-gray dark:text-white/50">{it.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** A one-sentence summary placed above a chart so nobody has to read the chart to get the point. */
export function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-2xl bg-brand-cream px-4 py-3 text-sm font-semibold leading-snug text-brand-black dark:bg-white/5 dark:text-white">
      <InfoIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green-dark dark:text-brand-green" />
      <span>{children}</span>
    </p>
  );
}

// ---- Status -----------------------------------------------------------------

export type Tone = "green" | "dark" | "amber" | "gray";

const toneCls: Record<Tone, string> = {
  green: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  dark: "bg-brand-black text-white dark:bg-white dark:text-brand-black",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
  gray: "bg-brand-line/80 text-brand-gray dark:bg-white/10 dark:text-white/60",
};

const toneDot: Record<Tone, string> = {
  green: "bg-brand-green",
  dark: "bg-white dark:bg-brand-black",
  amber: "bg-amber-500",
  gray: "bg-brand-gray-light",
};

export function StatusPill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold ${toneCls[tone]}`}>
      <span className={`h-2 w-2 rounded-full ${toneDot[tone]}`} />
      {children}
    </span>
  );
}

/** Explains what each status colour means, right next to the list that uses them. */
export function Legend({ items }: { items: { tone: Tone; label: string; meaning: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-white/5">
      <span className="text-sm font-semibold text-brand-black dark:text-white">What the labels mean:</span>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2 text-sm text-brand-gray dark:text-white/60">
          <StatusPill tone={it.tone}>{it.label}</StatusPill>
          {it.meaning}
        </span>
      ))}
    </div>
  );
}

// ---- Controls ---------------------------------------------------------------

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { key: T; label: string; count?: number; icon?: React.ReactNode }[];
  value: T;
  onChange: (key: T) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex w-fit max-w-full flex-wrap gap-1 rounded-full bg-brand-black/5 p-1 dark:bg-white/5">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.key)}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 ${
              active ? "bg-white text-brand-black shadow-sm dark:bg-brand-green dark:text-white" : "text-brand-gray hover:text-brand-black dark:text-white/60 dark:hover:text-white"
            }`}
          >
            {o.icon}
            {o.label}
            {o.count !== undefined ? (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? "bg-brand-green text-white dark:bg-white/25" : "bg-brand-black/5 text-brand-gray dark:bg-white/10 dark:text-white/60"
                }`}
              >
                {o.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block w-full sm:max-w-sm">
      <span className="sr-only">{placeholder}</span>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gray-light" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} pl-12`}
      />
    </label>
  );
}

export function Field({
  label,
  help,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  help?: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[15px] font-semibold text-brand-black dark:text-white">
        {label}
        {optional ? <span className="ml-1.5 text-sm font-normal text-brand-gray-light">(you can skip this)</span> : null}
      </label>
      {children}
      {help ? <span className="text-[13px] leading-snug text-brand-gray dark:text-white/50">{help}</span> : null}
    </div>
  );
}

// ---- Messages ---------------------------------------------------------------

export function TipBox({ tone = "info", title, children }: { tone?: "info" | "warn"; title?: string; children: React.ReactNode }) {
  const warn = tone === "warn";
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
        warn
          ? "bg-amber-50 text-amber-950 ring-1 ring-amber-300/70 dark:bg-amber-400/10 dark:text-amber-100 dark:ring-amber-400/25"
          : "bg-brand-green-tint/70 text-brand-black ring-1 ring-brand-green/25 dark:bg-brand-green/10 dark:text-white/85 dark:ring-brand-green/20"
      }`}
    >
      {warn ? (
        <AlertIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-300" />
      ) : (
        <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green-dark dark:text-brand-green" />
      )}
      <div className="flex flex-col gap-0.5">
        {title ? <span className="font-semibold">{title}</span> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-brand-line px-6 py-12 text-center dark:border-white/15">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
        <SearchIcon className="h-6 w-6" />
      </span>
      <p className="text-lg font-semibold text-brand-black dark:text-white">{title}</p>
      <p className="max-w-sm text-sm text-brand-gray dark:text-white/55">{body}</p>
      {action}
    </div>
  );
}

export function SuccessState({ title, body, onDone, doneLabel = "Done" }: { title: string; body?: string; onDone: () => void; doneLabel?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
        <CheckIcon className="h-8 w-8" />
      </span>
      <p className="text-xl font-semibold text-brand-black dark:text-white">{title}</p>
      {body ? <p className="max-w-xs text-sm leading-relaxed text-brand-gray dark:text-white/55">{body}</p> : null}
      <button type="button" onClick={onDone} className={`${btnPrimary} mt-2 w-full`}>
        {doneLabel}
      </button>
    </div>
  );
}

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
  return (
    <span
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
