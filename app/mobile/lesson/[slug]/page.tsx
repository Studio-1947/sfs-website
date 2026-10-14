"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubtitledVideo from "@/components/mobile/SubtitledVideo";
import LanguageSheet from "@/components/mobile/LanguageSheet";
import ChapterStepper from "@/components/learn/ChapterStepper";
import { ArrowLeft, ArrowRight, CheckIcon, ClockIcon, QuizIcon } from "@/components/learn/icons";
import { useLanguage } from "@/components/LanguageContext";
import { languages } from "@/lib/data";
import { chapterNumber, chapterStates, courses } from "@/lib/data";
import { getLessonAudio, hasLessonAudioTracks, lessonAudioLanguages, type LessonAudioLanguage } from "@/lib/lessonAudio";
import { formatClock, subtitleCues } from "@/lib/subtitles";

const VIDEO = "/videos/lesson-demo.mp4";

type Tab = "summary" | "steps" | "subtitles";

export default function MobileLessonPage({ params }: { params: { slug: string } }) {
  const { lang, setLang } = useLanguage();
  const chapter = courses.find((c) => c.slug === params.slug);
  const [tab, setTab] = useState<Tab>("summary");
  const [captions, setCaptions] = useState(true);
  const [selectedAudioLang, setSelectedAudioLang] = useState<LessonAudioLanguage | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!chapter) return notFound();

  const audioLang = selectedAudioLang ?? lang;
  const dubbedAudio = getLessonAudio(chapter.slug, audioLang);
  const hasAudioChoices = hasLessonAudioTracks(chapter.slug);

  const number = chapterNumber(chapter.slug);
  const state = chapterStates()[number - 1];
  const quizDone = state.quiz === "done";

  function seek(sec: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    v.play().catch(() => {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "summary", label: "Summary" },
    { key: "steps", label: "Steps" },
    { key: "subtitles", label: "Subtitles" },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-cream dark:bg-brand-black">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-brand-line bg-brand-cream/95 px-2 backdrop-blur dark:border-white/10 dark:bg-brand-black/95">
        <Link
          href="/mobile"
          className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-brand-black dark:text-white"
          aria-label="Back to chapters"
        >
          <ArrowLeft className="h-5 w-5" /> Chapters
        </Link>
        <span className="text-sm font-semibold text-brand-gray dark:text-white/55">
          Chapter {number} of {courses.length}
        </span>
        <div className="pr-2">
          <LanguageSheet />
        </div>
      </header>

      {/* Video stays pinned while the learner reads below */}
      <div className="sticky top-14 z-20 bg-black">
        <SubtitledVideo
          src={VIDEO}
          poster={chapter.thumbImage}
          alternateAudioSrc={dubbedAudio}
          lang={lang}
          captions={captions}
          videoRef={videoRef}
          className="aspect-video w-full bg-black object-contain"
        />
      </div>

      <main className="flex flex-1 flex-col gap-5 px-4 pb-32 pt-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-[22px] font-semibold leading-snug text-brand-black dark:text-white">{chapter.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-gray dark:text-white/55">
            <span className="flex items-center gap-1.5">
              <ClockIcon /> {chapter.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <QuizIcon /> {chapter.quizQuestions.length} quiz questions
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3.5 dark:bg-brand-ink">
          <ChapterStepper at="video" video={state.video} quiz={state.quiz} quizHref={`/mobile/quiz/${chapter.slug}`} />
        </div>

        {/* Subtitle language — one tap, big targets */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">
            Subtitles
          </span>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setCaptions(true);
                }}
                aria-pressed={captions && lang === l.code}
                className={`min-h-[44px] flex-shrink-0 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                  captions && lang === l.code
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-brand-line text-brand-black dark:border-white/15 dark:text-white"
                }`}
              >
                {l.native}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCaptions(false)}
              aria-pressed={!captions}
              className={`min-h-[44px] flex-shrink-0 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                !captions
                  ? "border-brand-black bg-brand-black text-white dark:border-white dark:bg-white dark:text-brand-black"
                  : "border-brand-line text-brand-gray dark:border-white/15 dark:text-white/60"
              }`}
            >
              Off
            </button>
          </div>
        </div>

        {hasAudioChoices ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/40">Audio</span>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="radiogroup" aria-label="Audio language">
              {lessonAudioLanguages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="radio"
                  aria-checked={audioLang === l.code}
                  onClick={() => setSelectedAudioLang(l.code)}
                  className={`min-h-[44px] flex-shrink-0 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                    audioLang === l.code
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-brand-line text-brand-black dark:border-white/15 dark:text-white"
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
            <p className="text-xs text-brand-gray dark:text-white/45">
              {audioLang === "EN" ? "English audio from the original video." : `${lessonAudioLanguages.find((l) => l.code === audioLang)?.label} narration is selected.`}
            </p>
          </div>
        ) : null}

        {/* Segmented tabs */}
        <div role="tablist" className="grid grid-cols-3 rounded-2xl bg-brand-black/5 p-1 dark:bg-white/10">
          {tabs.map((x) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={tab === x.key}
              type="button"
              onClick={() => setTab(x.key)}
              className={`min-h-[44px] rounded-xl text-sm font-semibold transition-colors ${
                tab === x.key
                  ? "bg-white text-brand-black shadow-sm dark:bg-brand-ink dark:text-white"
                  : "text-brand-gray dark:text-white/55"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <section role="tabpanel" className="rounded-3xl bg-white p-5 dark:bg-brand-ink">
          {tab === "summary" ? (
            <div className="flex flex-col gap-5">
              <p className="text-[15px] leading-relaxed text-brand-gray dark:text-white/60">{chapter.description}</p>
              <ul className="flex flex-col gap-3">
                {chapter.infographic.learningPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-brand-black dark:text-white/80">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2.5">
                {chapter.infographic.keyFacts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5 rounded-2xl bg-brand-cream p-3.5 dark:bg-white/5">
                    <span className="text-lg font-semibold text-brand-black dark:text-white">{f.value}</span>
                    <span className="text-xs text-brand-gray dark:text-white/45">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "steps" ? (
            <ol className="flex flex-col gap-5">
              {chapter.infographic.steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-white dark:bg-brand-green">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <span className="text-[15px] font-semibold text-brand-black dark:text-white">{s.title}</span>
                    <span className="text-sm leading-relaxed text-brand-gray dark:text-white/55">{s.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {tab === "subtitles" ? (
            <ul className="-mx-2 flex flex-col">
              {subtitleCues.map((cue) => (
                <li key={cue.start}>
                  <button
                    type="button"
                    onClick={() => seek(cue.start)}
                    className="flex min-h-[52px] w-full items-start gap-3.5 rounded-xl px-2 py-3 text-left text-[15px] leading-relaxed active:bg-brand-green-tint dark:active:bg-white/10"
                  >
                    <span className="w-9 flex-shrink-0 pt-px text-sm font-semibold tabular-nums text-brand-green-dark dark:text-brand-green">
                      {formatClock(cue.start)}
                    </span>
                    <span className="text-brand-black dark:text-white/80">{cue.text[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </main>

      {/* Sticky primary action */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-brand-line bg-white/95 px-4 pt-3 backdrop-blur dark:border-white/10 dark:bg-brand-ink/95"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link
          href={`/mobile/quiz/${chapter.slug}`}
          className="flex min-h-[56px] items-center justify-between rounded-full bg-brand-green py-1.5 pl-6 pr-1.5 text-base font-semibold text-white active:bg-brand-green-dark"
        >
          {quizDone ? "Retake the quiz" : "Take the quiz"}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
