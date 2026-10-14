/**
 * Shape of a translated content pack. Arrays line up index-for-index with the English
 * data in lib/data.ts. Leave `value` / `options` out where the English is just numbers:
 * those are reused with the digits localized.
 */
export interface CourseText {
  title: string;
  description: string;
  duration: string;
  keyFacts: { label: string; value?: string }[];
  learningPoints: string[];
  steps: { title: string; detail: string }[];
  quiz: { question: string; options?: string[] }[];
}

export interface ContentPack {
  groups: Record<string, string>;
  course: { title: string; description: string };
  courses: Record<string, CourseText>;
  notices: { title: string; body: string }[];
  scholarship: {
    title: string;
    summary: string;
    mission: string;
    eligibility: string[];
    incomeBrackets: string[];
    applySteps: { title: string; detail: string }[];
    benefit: string;
  };
  placement: {
    title: string;
    summary: string;
    stats: { label: string; value?: string }[];
    roles: string[];
    highlights: string[];
  };
}
