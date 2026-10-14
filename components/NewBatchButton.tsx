"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import { Field, SuccessState, btnPrimary, inputClass } from "./admin/ui";
import { PlusIcon } from "./admin/icons";

const programmes = [
  "General Duty Assistant",
  "Phlebotomist",
  "Emergency Medical Technician - Basic",
  "Hospital Front Desk Coordinator",
  "Operation Theatre Assistant",
  "Dialysis Technician",
];

export default function NewBatchButton({ trigger }: { trigger?: (open: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [programme, setProgramme] = useState(programmes[0]);
  const [startDate, setStartDate] = useState("");

  function close() {
    setOpen(false);
    setSubmitted(false);
    setName("");
    setProgramme(programmes[0]);
    setStartDate("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={btnPrimary}>
          <PlusIcon className="h-5 w-5" />
          Start a new batch
        </button>
      )}

      {open ? (
        <ModalShell
          title="Start a new batch"
          description="A batch is a group of students who begin the same course on the same day."
          onClose={close}
        >
          {submitted ? (
            <SuccessState
              title="Batch created!"
              body={`“${name}” is ready. You can now add students to it.`}
              onDone={close}
              doneLabel="Great, close this"
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="1. Give the batch a name" htmlFor="nb-name" help="Tip: use the city and a number, like “Batch KOL-03”.">
                <input id="nb-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </Field>
              <Field label="2. Which course will they study?" htmlFor="nb-programme">
                <select id="nb-programme" value={programme} onChange={(e) => setProgramme(e.target.value)} className={inputClass}>
                  {programmes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="3. When do classes start?" htmlFor="nb-date">
                <input id="nb-date" required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
              </Field>
              <button type="submit" className={`${btnPrimary} w-full`}>
                <PlusIcon className="h-5 w-5" />
                Create batch
              </button>
            </form>
          )}
        </ModalShell>
      ) : null}
    </>
  );
}
