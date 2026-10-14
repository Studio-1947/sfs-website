"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import { Field, SuccessState, btnPrimary, btnSmall, inputClass } from "./admin/ui";
import { EditIcon } from "./admin/icons";
import { Course, courseGroups } from "@/lib/data";

export default function EditLessonButton({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [group, setGroup] = useState(course.group);
  const [duration, setDuration] = useState(course.duration);

  function close() {
    setOpen(false);
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Edit ${course.title}`} className={btnSmall}>
        <EditIcon />
        <span className="hidden sm:inline">Edit</span>
      </button>

      {open ? (
        <ModalShell title="Change this lesson" description="Fix the name, move it to another topic, or update how long it is." onClose={close}>
          {submitted ? (
            <SuccessState title="Saved!" body={`“${title}” has been updated.`} onDone={close} doneLabel="Great, close this" />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="Lesson name" htmlFor={`el-title-${course.slug}`}>
                <input id={`el-title-${course.slug}`} required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
              </Field>
              <Field label="Topic" htmlFor={`el-group-${course.slug}`}>
                <select id={`el-group-${course.slug}`} value={group} onChange={(e) => setGroup(e.target.value)} className={inputClass}>
                  {courseGroups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Video length" htmlFor={`el-dur-${course.slug}`} help="In minutes. For example: 5 min.">
                <input id={`el-dur-${course.slug}`} required value={duration} onChange={(e) => setDuration(e.target.value)} className={inputClass} />
              </Field>
              <button type="submit" className={`${btnPrimary} w-full`}>
                Save changes
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
