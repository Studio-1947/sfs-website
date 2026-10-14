"use client";

import { useState } from "react";
import LearnerNav from "@/components/LearnerNav";
import LearnerSidebar from "@/components/LearnerSidebar";
import { placementInfo, placementStories, scholarshipInfo } from "@/lib/data";

const hospitalColors = [
  "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/55",
];

const roleColors: Record<string, string> = {
  EMT: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  OTA: "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
  GDA: "bg-brand-line text-brand-gray dark:bg-white/5 dark:text-white/55",
  DT: "bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green",
  HFDC: "bg-brand-black/5 text-brand-black dark:bg-white/10 dark:text-white",
};

const PLACEMENT_IMG_BASE = "https://www.schoolforskills.in/assets/img/placement/";

const storyImageFiles: Record<string, string> = {
  "Subhajit Bagani": "Subhajit Bagani.jpg",
  "Biswarup Roy": "Biswarup Roy.jpg",
  "Monika Solanki": "Monika Solanki.jpg",
  "Deepshikha Tamang": "Deepshikha Tamang.jpg",
  "Ananya Debnath": "ANANYA DEBNATH.jpg",
  "Susama Mondal": "Susama Mondal.jpg",
  "Koushik Mondal": "Koushik Mondal.jpg",
  "Shubhajit Mondal": "Shubhajit Mondal.jpg",
  "Samrat Sardar": "Samrat Sardar.jpg",
  "Pankaj Barman": "Pankaj Barman.jpg",
  "Chayanika Devi": "Chayanika Devi.jpg",
  "Pranjit Baruah": "Pranjit Baruah.jpg",
  "Ghanshayam Saha": "Ghanashyam Saha.jpg",
  "Anupam Saha": "Anupam Saha.jpg",
  "Stella Rai": "Stella Rai.jpg",
  "Sonali Bela": "Sonali Bela.jpg",
  "Surajit Giri": "Surajit Giri.jpg",
};

function storyImageUrl(name: string) {
  const file = storyImageFiles[name];
  return file ? `${PLACEMENT_IMG_BASE}${encodeURIComponent(file)}` : null;
}

const galleryImages = [
  "p1.jpeg",
  "p2.jpeg",
  "p3.jpeg",
  "p4.jpeg",
  "p5.jpeg",
  "p6.jpeg",
  "p7.jpeg",
  "p8.jpeg",
  "p9.jpeg",
  "p10.jpg",
  "p11.jpg",
].map((f) => `https://www.schoolforskills.in/assets/img/p/${f}`);

function HospitalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 21V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M2 21h20M9 21v-4h6v4M12 8v5M9.5 10.5h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AcceptanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6} />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function YearsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6} />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LanguagesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6} />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.5 5.7 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.7-3.5-9s1-6.5 3.5-9Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AmbulanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 16V8a1 1 0 0 1 1-1h9v9H3Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M13 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth={1.4} />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth={1.4} />
      <path d="M7.5 8.5v4M5.5 10.5h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function OperationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M8 4c0 2-2 3-2 5.5a3 3 0 0 0 6 0M14 4c0 2 2 3 2 5.5a3 3 0 0 1-6 0"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 14v3l-4 4M11 17l4 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DutyAssistantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="7" r="3.2" stroke="currentColor" strokeWidth={1.6} />
      <path d="M4.5 20c1.3-4.2 4.2-6.3 7.5-6.3s6.2 2.1 7.5 6.3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M9.5 16.5h5M12 14.5v4" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}

function DialysisIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 19V9l9-4 9 4v10" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M3 19h18M8 19v-6h8v6" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}

const roleIcons: Record<string, () => JSX.Element> = {
  EMT: AmbulanceIcon,
  "Operation Theatre Assistant": OperationIcon,
  "General Duty Assistant": DutyAssistantIcon,
  "Dialysis Technician": DialysisIcon,
  "Hospital Front Desk Coordinator": DeskIcon,
};

const statIcons: Record<string, () => JSX.Element> = {
  "Partner hospitals": HospitalIcon,
  "Offer acceptance rate": AcceptanceIcon,
  "Years of placement support": YearsIcon,
  "Languages supported": LanguagesIcon,
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
}

const tabs = [
  { key: "scholarship" as const, label: "Scholarship" },
  { key: "placement" as const, label: "Placement network" },
];

export default function ScholarshipPlacementPage() {
  const [tab, setTab] = useState<"scholarship" | "placement">("scholarship");

  return (
    <div className="flex">
      <LearnerSidebar active="scholarship" />
      <div className="min-w-0 flex-1">
        <LearnerNav active="scholarship" backHref="/dashboard" backLabel="Back to dashboard" hasSidebar />

        <main className="flex flex-col gap-8 px-4 py-6 pb-24 sm:px-8 sm:py-10 lg:px-16 lg:pb-10">
          <div>
            <h1 className="text-2xl font-semibold text-brand-black dark:text-white sm:text-[32px]">
              Scope
            </h1>
            <p className="max-w-2xl text-base text-brand-gray dark:text-white/55">
              Financial support to start your course, and a hospital placement network to help you finish it with a
              job.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-brand-line p-1 dark:border-white/15">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                type="button"
                onClick={() => setTab(tb.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === tb.key
                    ? "bg-brand-green text-white"
                    : "text-brand-gray hover:text-brand-black dark:text-white/70 dark:hover:text-white"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          {tab === "scholarship" ? (
            <>
              <div>
                <h2 className="text-xl font-semibold text-brand-black dark:text-white">{scholarshipInfo.title}</h2>
                <p className="max-w-2xl text-base text-brand-gray dark:text-white/55">{scholarshipInfo.summary}</p>
              </div>

              <div className="rounded-2xl bg-brand-black px-6 py-5 dark:border dark:border-white/10 dark:bg-brand-ink sm:px-8 sm:py-6">
                <p className="text-sm leading-relaxed text-white/70">{scholarshipInfo.mission}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                  <h3 className="text-lg font-semibold text-brand-black dark:text-white">Eligibility</h3>
                  <ul className="flex flex-col gap-2.5">
                    {scholarshipInfo.eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-brand-gray dark:text-white/55">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                  <h3 className="text-lg font-semibold text-brand-black dark:text-white">Household income brackets</h3>
                  <div className="flex flex-wrap gap-2">
                    {scholarshipInfo.incomeBrackets.map((bracket) => (
                      <span
                        key={bracket}
                        className="rounded-full bg-brand-green-tint px-3.5 py-1.5 text-sm font-semibold text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                      >
                        {bracket}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-brand-gray dark:text-white/55">{scholarshipInfo.benefit}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                <h3 className="text-lg font-semibold text-brand-black dark:text-white">How to apply</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {scholarshipInfo.applySteps.map((step, i) => (
                    <div key={step.title} className="flex gap-3.5 rounded-xl border border-brand-line px-4 py-3.5 dark:border-white/10">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-sm font-semibold text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                        {i + 1}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] font-semibold text-brand-black dark:text-white">{step.title}</span>
                        <span className="text-sm text-brand-gray dark:text-white/55">{step.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pb-6">
                <a
                  href="https://www.schoolforskills.in/scholarship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-green py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  <span className="pl-6">Apply on schoolforskills.in</span>
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-semibold text-brand-black dark:text-white">{placementInfo.title}</h2>
                <p className="max-w-2xl text-base text-brand-gray dark:text-white/55">{placementInfo.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {placementInfo.stats.map((stat) => {
                  const Icon = statIcons[stat.label];
                  return (
                    <div key={stat.label} className="flex flex-col gap-3 rounded-2xl bg-white p-5 dark:bg-brand-ink">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                        {Icon ? <Icon /> : null}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                          {stat.label}
                        </span>
                        <span className="text-[26px] font-semibold text-brand-black dark:text-white">{stat.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                <h3 className="text-lg font-semibold text-brand-black dark:text-white">Partner hospitals</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {placementInfo.partnerHospitals.map((h, i) => (
                    <div
                      key={h}
                      className="flex flex-col items-center gap-2.5 rounded-xl border border-brand-line px-3 py-4 text-center dark:border-white/10"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold ${hospitalColors[i % hospitalColors.length]}`}
                      >
                        {initials(h)}
                      </span>
                      <span className="text-sm font-semibold leading-snug text-brand-black dark:text-white">{h}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-brand-gray dark:text-white/55">
                  Plus 20+ more hospital partners across India.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                <h3 className="text-lg font-semibold text-brand-black dark:text-white">Roles graduates are placed in</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {placementInfo.roles.map((role) => {
                    const Icon = roleIcons[role];
                    return (
                      <div
                        key={role}
                        className="flex items-center gap-3 rounded-xl border border-brand-line px-4 py-3.5 dark:border-white/10"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                          {Icon ? <Icon /> : null}
                        </span>
                        <span className="text-sm font-semibold leading-snug text-brand-black dark:text-white">{role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                <div>
                  <h3 className="text-lg font-semibold text-brand-black dark:text-white">Placement stories</h3>
                  <p className="text-sm text-brand-gray dark:text-white/55">
                    {placementStories.length} graduates placed through the network
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {placementStories.map((story, i) => {
                    const imgUrl = storyImageUrl(story.name);
                    return (
                      <div
                        key={story.name}
                        className="flex items-stretch gap-3.5 overflow-hidden rounded-xl border border-brand-line dark:border-white/10"
                      >
                        {imgUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imgUrl}
                            alt={story.name}
                            className="h-auto w-20 flex-shrink-0 object-cover sm:w-24"
                          />
                        ) : (
                          <div
                            className={`flex w-20 flex-shrink-0 items-center justify-center text-lg font-semibold ${hospitalColors[i % hospitalColors.length]}`}
                          >
                            {initials(story.name)}
                          </div>
                        )}
                        <div className="flex flex-col gap-1 py-3.5 pr-4">
                          <span className="text-[15px] font-semibold leading-snug text-brand-black dark:text-white">
                            {story.name}
                          </span>
                          <span
                            className={`w-fit rounded-md px-2 py-0.5 text-xs font-semibold ${roleColors[story.role] ?? roleColors.GDA}`}
                          >
                            {story.role}
                          </span>
                          <span className="text-sm text-brand-gray dark:text-white/55">{story.employer}</span>
                          <span className="text-xs text-brand-gray-light dark:text-white/35">{story.school}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 dark:bg-brand-ink">
                <h3 className="text-lg font-semibold text-brand-black dark:text-white">Success gallery</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {galleryImages.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt="Schools for Skills placement success"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-brand-black px-6 py-5 dark:border dark:border-white/10 dark:bg-brand-ink sm:px-8 sm:py-6">
                <h3 className="text-lg font-semibold text-white">Why our placement network works</h3>
                <ul className="flex flex-col gap-2.5">
                  {placementInfo.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pb-6">
                <a
                  href="https://www.schoolforskills.in/placement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-green py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  <span className="pl-6">See placement stories on schoolforskills.in</span>
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
