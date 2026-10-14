"use client";

import { useEffect, useState } from "react";
import {
  LearnerProfile,
  defaultProfile,
  getProfile,
  saveProfile,
  isProfileComplete,
  missingProfileFields,
} from "@/lib/profile";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import { learner } from "@/lib/data";

const fieldClass =
  "h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white";
const labelClass = "text-sm font-semibold text-brand-black dark:text-white";

function formatDob(dob: string) {
  if (!dob) return "";
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return dob;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const viewFields: { label: string; key: keyof LearnerProfile; format?: (v: string) => string }[] = [
  { label: "Full name", key: "fullName" },
  { label: "Date of birth", key: "dob", format: formatDob },
  { label: "Phone number", key: "phone" },
  { label: "Email", key: "email" },
  { label: "Guardian name", key: "guardianName" },
  { label: "School or community group", key: "school" },
  { label: "Address", key: "address" },
  { label: "Education", key: "education" },
  { label: "Work status", key: "workStatus" },
];

export default function ProfileForm() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  function update(field: keyof LearnerProfile, value: string) {
    setProfile((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    setSaved(true);
    setEditing(false);
  }

  const complete = isProfileComplete(profile);
  const missing = missingProfileFields(profile);

  return (
    <div className="flex flex-col gap-7 rounded-2xl border border-brand-line/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-brand-ink sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <ProfileAvatarUpload initials={learner.name.charAt(0)} />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-brand-black dark:text-white sm:text-3xl">{learner.name}</h1>
            <p className="text-sm text-brand-gray dark:text-white/60">
              {learner.school} &middot; Learning in {learner.language}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-brand-line/70 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-brand-black dark:text-white">Profile details</h2>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                complete
                  ? "bg-brand-green/15 text-brand-green-darker dark:bg-brand-green/20 dark:text-brand-green"
                  : "bg-brand-line/70 text-brand-gray dark:bg-white/10 dark:text-white/60"
              }`}
            >
              {complete ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  Profile complete
                </>
              ) : (
                `${missing} field${missing === 1 ? "" : "s"} missing`
              )}
            </span>
          </div>
          <p className="mt-1 text-sm text-brand-gray dark:text-white/55">
            Kept up to date, your certificates print correctly the first time.
          </p>
        </div>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group inline-flex w-fit flex-shrink-0 items-center gap-2 rounded-full border border-brand-line bg-brand-cream/50 py-1.5 pl-4 pr-2 text-sm font-semibold text-brand-black shadow-sm transition-all hover:border-brand-green hover:bg-brand-green/5 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-brand-green"
          >
            <span>Edit profile</span>
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ) : null}
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-name" className={labelClass}>
                Full name
              </label>
              <input
                id="pf-name"
                value={profile.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Priya Rai"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-dob" className={labelClass}>
                Date of birth
              </label>
              <input
                id="pf-dob"
                type="date"
                value={profile.dob}
                onChange={(e) => update("dob", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-phone" className={labelClass}>
                Phone number
              </label>
              <input
                id="pf-phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 00000 00000"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-email" className={labelClass}>
                Email (optional)
              </label>
              <input
                id="pf-email"
                type="email"
                value={profile.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-guardian" className={labelClass}>
                Guardian name (optional)
              </label>
              <input
                id="pf-guardian"
                value={profile.guardianName}
                onChange={(e) => update("guardianName", e.target.value)}
                placeholder="e.g. Anita Rai"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-school" className={labelClass}>
                School or community group
              </label>
              <input
                id="pf-school"
                value={profile.school}
                onChange={(e) => update("school", e.target.value)}
                placeholder="e.g. Schools for Skills, Kolkata"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="pf-address" className={labelClass}>
                Address
              </label>
              <input
                id="pf-address"
                value={profile.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Village / town, district, state"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-education" className={labelClass}>
                Education
              </label>
              <select
                id="pf-education"
                value={profile.education}
                onChange={(e) => update("education", e.target.value)}
                className={fieldClass}
              >
                <option value="">Select education</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pf-work-status" className={labelClass}>
                Work status
              </label>
              <select
                id="pf-work-status"
                value={profile.workStatus}
                onChange={(e) => update("workStatus", e.target.value)}
                className={fieldClass}
              >
                <option value="">Select work status</option>
                <option value="Student">Student</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Self-Employed">Self-Employed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-green py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              <span className="pl-6">Save profile</span>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setProfile(getProfile());
                setEditing(false);
              }}
              className="text-sm font-semibold text-brand-gray hover:text-brand-black dark:text-white/55 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {viewFields.map((f) => {
            const raw = profile[f.key];
            const value = f.format ? f.format(raw) : raw;
            return (
              <div
                key={f.key}
                className="flex flex-col gap-1 rounded-xl border border-brand-line/70 bg-brand-cream/60 p-3.5 shadow-sm transition-all hover:border-brand-green/30 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray-light dark:text-white/40">
                  {f.label}
                </span>
                <span className="text-sm font-medium text-brand-black dark:text-white sm:text-[15px]">
                  {value || <span className="font-normal italic text-brand-gray-light/80 dark:text-white/30">Not set</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {saved && !editing ? (
        <div className="flex items-center gap-2 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-2.5 text-sm font-semibold text-brand-green-darker dark:text-brand-green">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Profile updated successfully
        </div>
      ) : null}
    </div>
  );
}
