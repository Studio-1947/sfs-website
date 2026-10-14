"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguagePicker from "@/components/LanguagePicker";
import LearnerNav from "@/components/LearnerNav";
import SyncedLessonAudio from "@/components/SyncedLessonAudio";
import ChapterStepper from "@/components/learn/ChapterStepper";
import ChapterOutline from "@/components/learn/ChapterOutline";
import { ArrowLeft, ArrowRight, CheckIcon, ClockIcon, QuizIcon } from "@/components/learn/icons";
import { useLanguage } from "@/components/LanguageContext";
import { buildVtt, formatClock, subtitleCues } from "@/lib/subtitles";
import { adjacentChapters, chapterNumber, chapterStates, courses } from "@/lib/data";
import { localizeCourse, localizeCourseMeta } from "@/lib/localize";
import { getLessonAudio, hasLessonAudioTracks, lessonAudioLanguages, type LessonAudioLanguage } from "@/lib/lessonAudio";

const DEFAULT_VIDEO = "/videos/lesson-demo.mp4";

type Tab = "overview" | "steps" | "transcript";

export default function LessonPage({ params }: { params: { slug: string } }) {
  const { t, n, lang } = useLanguage();
  const baseChapter = courses.find((c) => c.slug === params.slug);
  const [captions, setCaptions] = useState(true);
  const [selectedAudioLang, setSelectedAudioLang] = useState<LessonAudioLanguage | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vttUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return URL.createObjectURL(new Blob([buildVtt(lang)], { type: "text/vtt" }));
  }, [lang]);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => () => { if (vttUrl) URL.revokeObjectURL(vttUrl); }, [vttUrl]);

  // Keep the caption track in sync with the on/off toggle and the chosen language.
  useEffect(() => {
    const tracks = videoRef.current?.textTracks;
    if (!tracks) return;
    for (let i = 0; i < tracks.length; i++) tracks[i].mode = captions ? "showing" : "hidden";
  }, [captions, vttUrl]);

  function seek(sec: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    v.play().catch(() => {});
  }

  if (!baseChapter) return notFound();
  const chapter = localizeCourse(baseChapter, lang);
  const courseMeta = localizeCourseMeta(lang);

  const audioLang = selectedAudioLang ?? lang;
  const dubbedAudio = getLessonAudio(chapter.slug, audioLang);
  const hasAudioChoices = hasLessonAudioTracks(chapter.slug);

  const number = chapterNumber(chapter.slug);
  const adjacent = adjacentChapters(chapter.slug);
  const prev = adjacent.prev && localizeCourse(adjacent.prev, lang);
  const next = adjacent.next && localizeCourse(adjacent.next, lang);
  const state = chapterStates()[number - 1];
  const quizDone = state.quiz === "done";

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: t("lesson.overview") },
    { key: "steps", label: t("lesson.stepByStep") },
    { key: "transcript", label: t("lesson.transcript") },
  ];

  return (
    <div>
      <LearnerNav active="lesson" backHref="/dashboard" backLabel={t("lesson.courseOverview")} />

      <main className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-6 pb-28 sm:px-8 sm:py-8 lg:pb-10">
        {/* Chapter header */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold text-brand-gray-light dark:text-white/40">
              <Link href="/dashboard" className="hover:text-brand-green-dark dark:hover:text-brand-green">
                {courseMeta.title}
              </Link>
              <span className="mx-2">/</span>
              {t("common.chapterOf", { n: number, total: courses.length })}
            </p>
            <h1 className="text-2xl font-semibold leading-tight text-brand-black dark:text-white sm:text-[32px]">
              {chapter.title}
            </h1>
          </div>
          <div className="rounded-2xl border border-brand-line bg-white px-4 py-4 dark:border-white/10 dark:bg-brand-ink sm:px-6">
            <ChapterStepper at="video" video={state.video} quiz={state.quiz} quizHref={`/quiz/${chapter.slug}`} />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          {/* Main column */}
          <div className="flex min-w-0 flex-col gap-6">
            <div className="overflow-hidden rounded-3xl bg-brand-black shadow-sm">
              <video
                ref={videoRef}
                key={`${chapter.slug}-${lang}`}
                controls
                crossOrigin="anonymous"
                muted={Boolean(dubbedAudio)}
                preload="metadata"
                poster={chapter.thumbImage}
                className="aspect-video w-full bg-brand-black object-contain"
              >
                <source src={DEFAULT_VIDEO} type="video/mp4" />
                {vttUrl ? (
                  <track kind="subtitles" src={vttUrl} srcLang={lang.toLowerCase()} label={lang} default={captions} />
                ) : null}
              </video>
              <SyncedLessonAudio videoRef={videoRef} src={dubbedAudio} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-gray dark:text-white/55">
                <span className="flex items-center gap-1.5">
                  <ClockIcon /> {chapter.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <QuizIcon /> {t("lesson.quizAfter", { n: chapter.quizQuestions.length })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {hasAudioChoices ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">{t("lesson.audio")}</span>
                    <div className="flex gap-2" role="radiogroup" aria-label={t("lesson.audioAria")}>
                      {lessonAudioLanguages.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          role="radio"
                          aria-checked={audioLang === l.code}
                          onClick={() => setSelectedAudioLang(l.code)}
                          className={`rounded-xl border-2 px-3.5 py-2 text-xs font-semibold transition-colors ${
                            audioLang === l.code
                              ? "border-brand-green bg-brand-green text-white"
                              : "border-brand-line text-brand-black hover:border-brand-green dark:border-white/15 dark:text-white"
                          }`}
                        >
                          {l.code}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">{t("lesson.subtitles")}</span>
                <LanguagePicker size="sm" />
                <button
                  type="button"
                  role="switch"
                  aria-checked={captions}
                  onClick={() => setCaptions((c) => !c)}
                  className={`rounded-xl border-2 px-3.5 py-2 text-xs font-semibold transition-colors ${
                    captions
                      ? "border-brand-black bg-brand-black text-white dark:border-white dark:bg-white dark:text-brand-black"
                      : "border-brand-line text-brand-gray dark:border-white/15 dark:text-white/60"
                  }`}
                >
                  {t(captions ? "lesson.ccOn" : "lesson.ccOff")}
                </button>
              </div>
            </div>
            {hasAudioChoices || lang !== "EN" ? (
              <p className="-mt-3 text-xs text-brand-gray-light dark:text-white/35">
                {audioLang === "EN" ? t("lesson.audioOriginal") : t("lesson.audioNarration", { language: t(`lang.${audioLang}`) })}
              </p>
            ) : null}

            {/* Tabs */}
            <section className="rounded-3xl bg-white dark:bg-brand-ink">
              <div role="tablist" className="flex gap-1 border-b border-brand-line px-3 pt-3 dark:border-white/10 sm:px-5">
                {tabs.map((x) => (
                  <button
                    key={x.key}
                    role="tab"
                    aria-selected={tab === x.key}
                    type="button"
                    onClick={() => setTab(x.key)}
                    className={`-mb-px rounded-t-lg border-b-2 px-3.5 py-3 text-sm font-semibold transition-colors ${
                      tab === x.key
                        ? "border-brand-green text-brand-black dark:text-white"
                        : "border-transparent text-brand-gray-light hover:text-brand-black dark:text-white/40 dark:hover:text-white"
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <div className="p-5 sm:p-7" role="tabpanel">
                {tab === "overview" ? (
                  <div className="flex flex-col gap-7">
                    <p className="max-w-2xl text-base leading-relaxed text-brand-gray dark:text-white/60">
                      {chapter.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {chapter.infographic.keyFacts.map((f) => (
                        <div key={f.label} className="flex flex-col gap-1 rounded-2xl bg-brand-cream p-4 dark:bg-white/5">
                          <span className="text-xl font-semibold text-brand-black dark:text-white">{f.value}</span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                            {f.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-semibold text-brand-black dark:text-white">{t("lesson.learn")}</span>
                      <ul className="flex flex-col gap-2.5">
                        {chapter.infographic.learningPoints.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-gray dark:text-white/60">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                              <CheckIcon className="h-3 w-3" />
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}

                {tab === "steps" ? (
                  <ol className="flex flex-col gap-5">
                    {chapter.infographic.steps.map((s, i) => (
                      <li key={s.title} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-white dark:bg-brand-green">
                          {n(i + 1)}
                        </span>
                        <div className="flex flex-col gap-0.5 pt-0.5">
                          <span className="text-[15px] font-semibold text-brand-black dark:text-white">{s.title}</span>
                          <span className="text-sm leading-relaxed text-brand-gray dark:text-white/55">{s.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : null}

                {tab === "transcript" ? (
                  <ul className="flex max-h-[360px] flex-col gap-1 overflow-y-auto pr-2">
                    {subtitleCues.map((cue) => (
                      <li key={cue.start}>
                        <button
                          type="button"
                          onClick={() => seek(cue.start)}
                          className="flex w-full gap-4 rounded-xl px-3 py-2.5 text-left text-sm leading-relaxed transition-colors hover:bg-brand-green-tint dark:hover:bg-white/5"
                        >
                          <span className="w-10 flex-shrink-0 font-semibold tabular-nums text-brand-green-dark dark:text-brand-green">
                            {n(formatClock(cue.start))}
                          </span>
                          <span className="text-brand-gray dark:text-white/60">{cue.text[lang]}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>

            {/* Next-step card */}
            <section className="flex flex-col gap-4 rounded-3xl bg-brand-black p-6 text-white dark:border dark:border-white/10 dark:bg-brand-ink sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white">
                  <QuizIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold">{t(quizDone ? "lesson.quizPassed" : "lesson.finishedWatching")}</p>
                  <p className="text-sm text-white/60">
                    {t("lesson.quizMeta", { n: chapter.quizQuestions.length, m: Math.max(1, Math.round(chapter.quizQuestions.length * 0.5)) })}
                  </p>
                </div>
              </div>
              <Link
                href={`/quiz/${chapter.slug}`}
                className="group inline-flex w-fit flex-shrink-0 items-center gap-3 rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                {quizDone ? t("lesson.retake") : t("lesson.takeQuiz")}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-green">
                  <ArrowRight />
                </span>
              </Link>
            </section>

            {/* Prev / next chapter */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/lesson/${prev.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-brand-line px-5 py-4 text-sm transition-colors hover:border-brand-green dark:border-white/10"
                >
                  <ArrowLeft className="h-4 w-4 flex-shrink-0 text-brand-gray-light" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                      {t("lesson.prev")}
                    </span>
                    <span className="block truncate font-semibold text-brand-black dark:text-white">{prev.title}</span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/lesson/${next.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-brand-line px-5 py-4 text-sm transition-colors hover:border-brand-green dark:border-white/10"
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
                      {t("lesson.next")}
                    </span>
                    <span className="block truncate font-semibold text-brand-black dark:text-white">{next.title}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-brand-gray-light" />
                </Link>
              ) : null}
            </div>
          </div>

          {/* Course outline */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] no-scrollbar overflow-y-auto rounded-3xl bg-white p-5 dark:bg-brand-ink">
              <p className="px-2 pb-1 text-base font-semibold text-brand-black dark:text-white">{t("common.courseOutline")}</p>
              <p className="px-2 pb-4 text-xs text-brand-gray dark:text-white/50">
                {t("lesson.outlineMeta", { n: courses.length })}
              </p>
              <ChapterOutline currentSlug={chapter.slug} currentStep="video" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
