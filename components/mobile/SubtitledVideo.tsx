"use client";

import { RefObject, useEffect, useMemo } from "react";
import type { Language } from "@/lib/data";
import { buildVtt } from "@/lib/subtitles";
import SyncedLessonAudio from "@/components/SyncedLessonAudio";

export default function SubtitledVideo({
  src,
  poster,
  lang,
  captions,
  videoRef,
  alternateAudioSrc,
  className = "",
}: {
  src: string;
  poster?: string;
  lang: Language;
  captions: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  alternateAudioSrc?: string;
  className?: string;
}) {
  const vttUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return URL.createObjectURL(new Blob([buildVtt(lang)], { type: "text/vtt" }));
  }, [lang]);

  useEffect(() => () => { if (vttUrl) URL.revokeObjectURL(vttUrl); }, [vttUrl]);

  useEffect(() => {
    const tracks = videoRef.current?.textTracks;
    if (!tracks) return;
    for (let i = 0; i < tracks.length; i++) tracks[i].mode = captions ? "showing" : "hidden";
  }, [captions, vttUrl, videoRef]);

  return (
    <>
      <video
        ref={videoRef}
        key={lang}
        controls
        playsInline
        muted={Boolean(alternateAudioSrc)}
        preload="metadata"
        poster={poster}
        className={className}
      >
        <source src={src} type="video/mp4" />
        {vttUrl ? <track kind="subtitles" src={vttUrl} srcLang={lang.toLowerCase()} label={lang} default={captions} /> : null}
      </video>
      <SyncedLessonAudio videoRef={videoRef} src={alternateAudioSrc} />
    </>
  );
}
