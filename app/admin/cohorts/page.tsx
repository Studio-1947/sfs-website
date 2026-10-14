"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import PartnerContactActions from "@/components/PartnerContactActions";
import { EmptyState, PageIntro, SearchBox, Segmented, StatTile, btnSmall, formatNumber } from "@/components/admin/ui";
import { ArrowRightIcon, BuildingIcon, PinIcon, UsersIcon } from "@/components/admin/icons";
import { centreType } from "@/lib/admin";
import { adminCohorts, type AdminCohort } from "@/lib/data";

type Filter = "all" | AdminCohort["type"];

const typeTone: Record<AdminCohort["type"], string> = {
  School: "bg-brand-green text-white",
  "NGO Partner": "bg-brand-black text-white dark:bg-white dark:text-brand-black",
  "Hospital Partner": "bg-amber-500 text-white",
};

export default function CentresPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const types = Object.keys(centreType) as AdminCohort["type"][];
  const totalStudents = adminCohorts.reduce((s, c) => s + c.learners, 0);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminCohorts.filter(
      (c) => (filter === "all" || c.type === filter) && (!q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
    );
  }, [filter, query]);

  return (
    <AdminShell>
      <PageIntro
        title="Centres & partners"
        description="The schools, charities and hospitals you work with. See how many students each one has, and call or message their coordinator in one tap."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          icon={<BuildingIcon className="h-5 w-5" />}
          label="All places"
          value={String(adminCohorts.length)}
          sentence={`with ${formatNumber(totalStudents)} students between them.`}
        />
        {types.map((t) => {
          const list = adminCohorts.filter((c) => c.type === t);
          return (
            <StatTile
              key={t}
              icon={<BuildingIcon className="h-5 w-5" />}
              label={centreType[t].plural}
              value={String(list.length)}
              sentence={`${centreType[t].meaning}.`}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchBox value={query} onChange={setQuery} placeholder="Type a name or city to find a centre" />
        <Segmented
          label="Filter centres"
          value={filter}
          onChange={setFilter}
          options={[
            { key: "all", label: "All", count: adminCohorts.length },
            ...types.map((t) => ({ key: t, label: centreType[t].plural, count: adminCohorts.filter((c) => c.type === t).length })),
          ]}
        />
      </div>

      {shown.length === 0 ? (
        <EmptyState
          title="No centres found"
          body={query ? `Nothing matches “${query}”. Check the spelling, or try the city name.` : "There are no centres of this kind yet."}
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className={btnSmall}
            >
              Show all centres
            </button>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => (
            <li key={c.name} className="flex flex-col overflow-hidden rounded-3xl border border-brand-line/70 bg-white dark:border-white/10 dark:bg-brand-ink">
              <div className="relative h-36 w-full overflow-hidden">
                <Image src={c.thumbImage} alt={`Photo of ${c.name}`} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${typeTone[c.type]}`}>
                  {centreType[c.type].label}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[17px] font-semibold leading-snug text-brand-black dark:text-white">{c.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-brand-gray dark:text-white/55">
                    <PinIcon /> {c.location}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-white/5">
                  <span className="inline-flex items-center gap-2 text-sm text-brand-gray dark:text-white/60">
                    <UsersIcon className="h-5 w-5 text-brand-green-dark dark:text-brand-green" />
                    <span>
                      <span className="text-xl font-semibold text-brand-black dark:text-white">{c.learners}</span> students
                    </span>
                  </span>
                  <Link href="/admin/learners" className={btnSmall}>
                    See them <ArrowRightIcon />
                  </Link>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <span className="text-sm font-semibold text-brand-black dark:text-white">Talk to their coordinator</span>
                  <PartnerContactActions name={c.name} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
