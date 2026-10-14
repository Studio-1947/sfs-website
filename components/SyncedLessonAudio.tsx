"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Keeps an alternate narration aligned with the browser's native video controls. */
export default function SyncedLessonAudio({
  videoRef,
  src,
}: {
  videoRef: RefObject<HTMLVideoElement>;
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio || !src) return;

    const syncTime = () => {
      if (Math.abs(audio.currentTime - video.currentTime) > 0.15) audio.currentTime = video.currentTime;
    };
    const playAudio = () => {
      syncTime();
      audio.playbackRate = video.playbackRate;
      audio.play().catch(() => {});
    };
    const pauseAudio = () => audio.pause();
    const syncRate = () => {
      audio.playbackRate = video.playbackRate;
    };

    video.addEventListener("play", playAudio);
    video.addEventListener("pause", pauseAudio);
    video.addEventListener("seeking", syncTime);
    video.addEventListener("timeupdate", syncTime);
    video.addEventListener("ratechange", syncRate);

    if (!video.paused) playAudio();

    return () => {
      video.removeEventListener("play", playAudio);
      video.removeEventListener("pause", pauseAudio);
      video.removeEventListener("seeking", syncTime);
      video.removeEventListener("timeupdate", syncTime);
      video.removeEventListener("ratechange", syncRate);
      audio.pause();
    };
  }, [src, videoRef]);

  return src ? <audio ref={audioRef} src={src} preload="auto" /> : null;
}
