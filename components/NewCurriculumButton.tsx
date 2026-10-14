"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import { Field, SuccessState, btnPrimary, btnSecondary, inputClass } from "./admin/ui";
import { PlusIcon } from "./admin/icons";

/** Creates a new topic (a group of lessons). Called "curriculum" in older parts of the code. */
export default function NewCurriculumButton() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function close() {
    setOpen(false);
    setSubmitted(false);
    setName("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={btnSecondary}>
        <PlusIcon className="h-5 w-5" />
        Add a new topic
      </button>

      {open ? (
        <ModalShell title="Add a new topic" description="A topic is a box that holds lessons about the same subject." onClose={close}>
          {submitted ? (
            <SuccessState
              title="Topic added!"
              body={`“${name}” is ready. Next, upload a lesson video into it.`}
              onDone={close}
              doneLabel="Great, close this"
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="What is the topic called?" htmlFor="nc-name" help="For example: “Mother & Baby Health”.">
                <input id="nc-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </Field>
              <button type="submit" className={`${btnPrimary} w-full`}>
                <PlusIcon className="h-5 w-5" />
                Add topic
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
