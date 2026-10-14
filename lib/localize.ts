import { course, notices, placementInfo, scholarshipInfo, type Course, type Language, type Notice } from "./data";
import { localizeDigits } from "./i18n";
import type { ContentPack } from "./translations/types";
import { bn } from "./translations/bn";
import { hi } from "./translations/hi";
import { ne } from "./translations/ne";

// English lives in lib/data.ts; these packs overlay it. Every string still goes through
// localizeDigits so numbers come out in the language's own numerals.
const packs: Partial<Record<Language, ContentPack>> = { BN: bn, HI: hi, NE: ne };

/** A course with its text in `lang`. `group` stays in English because it is used as a key. */
export function localizeCourse(c: Course, lang: Language): Course {
  const p = packs[lang]?.courses[c.slug];
  if (!p) return c;
  const d = (s: string) => localizeDigits(lang, s);
  return {
    ...c,
    title: d(p.title),
    description: d(p.description),
    duration: d(p.duration),
    infographic: {
      keyFacts: c.infographic.keyFacts.map((f, i) => ({
        label: d(p.keyFacts[i]?.label ?? f.label),
        value: d(p.keyFacts[i]?.value ?? f.value),
      })),
      learningPoints: c.infographic.learningPoints.map((x, i) => d(p.learningPoints[i] ?? x)),
      steps: c.infographic.steps.map((s, i) => ({
        title: d(p.steps[i]?.title ?? s.title),
        detail: d(p.steps[i]?.detail ?? s.detail),
      })),
    },
    quizQuestions: c.quizQuestions.map((q, i) => ({
      ...q,
      question: d(p.quiz[i]?.question ?? q.question),
      options: q.options.map((o, j) => d(p.quiz[i]?.options?.[j] ?? o)),
    })),
  };
}

export function localizeGroup(group: string, lang: Language): string {
  return packs[lang]?.groups[group] ?? group;
}

export function localizeCourseMeta(lang: Language) {
  const p = packs[lang]?.course;
  return p ? { ...course, title: p.title, description: p.description } : course;
}

export function localizeNotices(lang: Language): Notice[] {
  const p = packs[lang]?.notices;
  if (!p) return notices;
  return notices.map((n, i) => ({ ...n, title: localizeDigits(lang, p[i]?.title ?? n.title), body: localizeDigits(lang, p[i]?.body ?? n.body) }));
}

export function localizeScholarship(lang: Language) {
  const p = packs[lang]?.scholarship;
  if (!p) return scholarshipInfo;
  const d = (s: string) => localizeDigits(lang, s);
  return {
    title: d(p.title),
    summary: d(p.summary),
    mission: d(p.mission),
    eligibility: p.eligibility.map(d),
    incomeBrackets: p.incomeBrackets.map(d),
    applySteps: p.applySteps.map((s) => ({ title: d(s.title), detail: d(s.detail) })),
    benefit: d(p.benefit),
  };
}

export function localizePlacement(lang: Language) {
  const p = packs[lang]?.placement;
  if (!p) return placementInfo;
  const d = (s: string) => localizeDigits(lang, s);
  return {
    ...placementInfo,
    title: d(p.title),
    summary: d(p.summary),
    stats: placementInfo.stats.map((s, i) => ({ label: d(p.stats[i]?.label ?? s.label), value: d(p.stats[i]?.value ?? s.value) })),
    roles: placementInfo.roles.map((r, i) => d(p.roles[i] ?? r)),
    highlights: placementInfo.highlights.map((h, i) => d(p.highlights[i] ?? h)),
  };
}
