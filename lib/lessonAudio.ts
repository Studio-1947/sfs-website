import type { Language } from "./data";

export type LessonAudioLanguage = Language | "MR";

export const lessonAudioLanguages: { code: LessonAudioLanguage; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "BN", label: "Bengali" },
  { code: "HI", label: "Hindi" },
  { code: "MR", label: "Marathi" },
  { code: "NE", label: "Nepali" },
];

const lessonAudio: Record<string, Partial<Record<LessonAudioLanguage, string>>> = {
  "bone-structure": {
    BN: "/audios/chapter%201/lesson-demo-bengali.wav",
    HI: "/audios/chapter%201/lesson-demo-hindi.wav",
    MR: "/audios/chapter%201/lesson-demo-marathi.wav",
    NE: "/audios/chapter%201/lesson-demo-nepali.wav",
  },
  "how-the-heart-works": {
    BN: "/audios/chapter%202/chapter%202-bengali.wav",
    HI: "/audios/chapter%202/chapter%202-hindi.wav",
    MR: "/audios/chapter%202/chapter%202-marathi.wav",
    NE: "/audios/chapter%202/chapter%202-nepali.wav",
  },
};

export function hasLessonAudioTracks(slug: string): boolean {
  return slug in lessonAudio;
}

/** Alternate narration is available only for lessons represented in the map above. */
export function getLessonAudio(slug: string, language: LessonAudioLanguage): string | undefined {
  return lessonAudio[slug]?.[language];
}
