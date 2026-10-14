"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import { Field, SuccessState, btnPrimary, btnSmall, inputClass } from "./admin/ui";
import { PlusIcon, UploadIcon, VideoIcon } from "./admin/icons";
import { courseGroups } from "@/lib/data";

export default function UploadVideoButton({
  defaultGroup,
  compact = false,
  trigger,
}: {
  defaultGroup?: string;
  compact?: boolean;
  /** Render your own opener (e.g. a big action tile). Gets a function that opens the form. */
  trigger?: (open: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(defaultGroup ?? courseGroups[0] ?? "");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function close() {
    setOpen(false);
    setSubmitted(false);
    setTitle("");
    setDuration("");
    setFile(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : compact ? (
        <button type="button" onClick={() => setOpen(true)} className={btnSmall}>
          <PlusIcon className="h-4 w-4" />
          Add a lesson here
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={btnPrimary}>
          <UploadIcon className="h-5 w-5" />
          Upload a lesson video
        </button>
      )}

      {open ? (
        <ModalShell
          title="Upload a lesson video"
          description="Fill in the 4 boxes below. Students will see the new lesson after it has been checked."
          onClose={close}
        >
          {submitted ? (
            <SuccessState
              title="Video sent!"
              body={`“${title || "Your lesson"}” is uploading. It will show up in Lessons once it is ready.`}
              onDone={close}
              doneLabel="Great, close this"
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="1. What is the lesson called?" htmlFor="up-title" help="Use a short, clear name, like “How to clean a wound”.">
                <input id="up-title" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
              </Field>
              <Field label="2. Which topic does it belong to?" htmlFor="up-group" help="Topics group similar lessons together.">
                <select id="up-group" value={group} onChange={(e) => setGroup(e.target.value)} className={inputClass}>
                  {courseGroups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="3. How long is the video?" htmlFor="up-duration" help="In minutes. For example: 5 min.">
                <input id="up-duration" required value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="5 min" className={inputClass} />
              </Field>
              <Field label="4. Choose the video file" htmlFor="up-file">
                <label
                  htmlFor="up-file"
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-brand-line px-4 py-6 text-center transition-colors hover:border-brand-green dark:border-white/15"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark dark:bg-brand-green/15 dark:text-brand-green">
                    <VideoIcon className="h-6 w-6" />
                  </span>
                  <span className="text-[15px] font-semibold text-brand-black dark:text-white">{file ? file.name : "Tap here to pick a video"}</span>
                  <span className="text-xs text-brand-gray dark:text-white/50">{file ? "Tap again to pick a different one" : "MP4 works best"}</span>
                  <input id="up-file" type="file" accept="video/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
              </Field>
              <button type="submit" className={`${btnPrimary} w-full`}>
                <UploadIcon className="h-5 w-5" />
                Upload video
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
