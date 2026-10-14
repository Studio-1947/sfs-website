"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sfs_profile_photo";
const MAX_BYTES = 2 * 1024 * 1024;

export function getStoredAvatar(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function ProfileAvatarUpload({ initials }: { initials: string }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhoto(getStoredAvatar());
  }, []);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be under 2 MB.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhoto(dataUrl);
      try {
        window.localStorage.setItem(STORAGE_KEY, dataUrl);
        window.dispatchEvent(new Event("sfs-avatar-updated"));
      } catch {
        setError("Couldn't save image — try a smaller file.");
      }
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhoto(null);
    setError("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("sfs-avatar-updated"));
    } catch {}
  }

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-green text-xl sm:text-2xl font-bold text-white shadow-sm ring-4 ring-brand-green-tint dark:ring-brand-green/20">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="Profile photo" className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-brand-green px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-green-dark"
          >
            {photo ? "Change photo" : "Upload photo"}
          </button>
          {photo ? (
            <button
              type="button"
              onClick={removePhoto}
              className="rounded-full border border-brand-line px-3 py-1.5 text-xs sm:text-sm font-semibold text-brand-gray transition-colors hover:border-red-500 hover:text-red-500 dark:border-white/15 dark:text-white/55"
            >
              Remove
            </button>
          ) : null}
        </div>
        <span className="text-[11px] sm:text-xs text-brand-gray-light dark:text-white/40">JPG or PNG, up to 2 MB</span>
        {error ? <span className="text-xs font-semibold text-red-500">{error}</span> : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
