import type { AdminBatch, AdminCohort, AdminLearner } from "./data";
import type { Tone } from "@/components/admin/ui";

/** Learner status in everyday words. Data keeps the original values; this is only how they are shown. */
export const learnerStatus: Record<AdminLearner["status"], { tone: Tone; label: string; meaning: string }> = {
  Active: { tone: "green", label: "Learning", meaning: "is watching lessons" },
  Completed: { tone: "dark", label: "Finished", meaning: "has done every lesson" },
  Invited: { tone: "amber", label: "Not started", meaning: "was invited but hasn’t begun" },
};

export const batchStatus: Record<AdminBatch["status"], { tone: Tone; label: string; meaning: string }> = {
  Active: { tone: "green", label: "Happening now", meaning: "classes are running" },
  Upcoming: { tone: "amber", label: "Starting soon", meaning: "classes haven’t begun" },
  Completed: { tone: "gray", label: "Finished", meaning: "the course is over" },
};

export const centreType: Record<AdminCohort["type"], { label: string; plural: string; meaning: string }> = {
  School: { label: "School", plural: "Schools", meaning: "Our own training centres" },
  "NGO Partner": { label: "NGO partner", plural: "NGOs", meaning: "Charities that send us students" },
  "Hospital Partner": { label: "Hospital partner", plural: "Hospitals", meaning: "Hospitals that train and hire students" },
};

/** "2 of 5 topics" -> { done: 2, total: 5 } */
export function parseProgress(progress: string) {
  const m = progress.match(/(\d+)\s*of\s*(\d+)/);
  return m ? { done: Number(m[1]), total: Number(m[2]) } : { done: 0, total: 0 };
}

/** 68 -> "about 7 in 10" — easier to picture than a percentage. */
export function inTen(percent: number) {
  return `about ${Math.round(percent / 10)} in 10`;
}
