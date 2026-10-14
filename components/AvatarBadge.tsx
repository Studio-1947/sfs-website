"use client";

import { useEffect, useState } from "react";
import { getStoredAvatar } from "./ProfileAvatarUpload";

export default function AvatarBadge({ initials, size = 36 }: { initials: string; size?: number }) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhoto(getStoredAvatar());
    function onUpdate() {
      setPhoto(getStoredAvatar());
    }
    window.addEventListener("sfs-avatar-updated", onUpdate);
    return () => window.removeEventListener("sfs-avatar-updated", onUpdate);
  }, []);

  return (
    <div
      style={{ height: size, width: size }}
      className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-green text-sm font-semibold text-white"
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
