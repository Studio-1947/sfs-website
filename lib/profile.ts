export type Education = "10th" | "12th" | "Graduation" | "Post Graduation" | "";
export type WorkStatus = "Student" | "Employed" | "Unemployed" | "Self-Employed" | "";

export interface LearnerProfile {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  guardianName: string;
  school: string;
  address: string;
  education: Education;
  workStatus: WorkStatus;
}

export const defaultProfile: LearnerProfile = {
  fullName: "Rabi",
  phone: "+91 90000 11122",
  email: "",
  dob: "2008-12-01",
  guardianName: "",
  school: "Schools for Skills, Kolkata",
  address: "Salt Lake, Kolkata, West Bengal",
  education: "12th",
  workStatus: "Student",
};

const STORAGE_KEY = "sfs_learner_profile";

export function getProfile(): LearnerProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: LearnerProfile) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

export const requiredProfileFields: (keyof LearnerProfile)[] = [
  "fullName",
  "phone",
  "dob",
  "school",
  "address",
  "education",
  "workStatus",
];

export function isProfileComplete(profile: LearnerProfile): boolean {
  return requiredProfileFields.every((field) => profile[field].trim().length > 0);
}

export function missingProfileFields(profile: LearnerProfile): number {
  return requiredProfileFields.filter((field) => profile[field].trim().length === 0).length;
}
