"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type Role = "student" | "admin";

export default function LoginForm({ onCreateAccount }: { onCreateAccount?: () => void } = {}) {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet: route straight to the matching dashboard.
    router.push(role === "student" ? "/dashboard" : "/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-brand-black dark:text-white">I am signing in as</span>
        <div className="flex w-fit flex-wrap gap-2 rounded-2xl bg-brand-green-tint p-1.5 dark:bg-white/5">
          <button
            type="button"
            role="radio"
            aria-checked={role === "student"}
            onClick={() => setRole("student")}
            className={[
              "flex w-fit items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
              role === "student"
                ? "bg-white text-brand-black shadow-sm dark:bg-brand-black dark:text-white"
                : "text-brand-gray dark:text-white/45",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2",
                role === "student" ? "border-brand-green" : "border-brand-gray-light dark:border-white/25",
              ].join(" ")}
            >
              {role === "student" ? <span className="h-2 w-2 rounded-full bg-brand-green" /> : null}
            </span>
            Student
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={role === "admin"}
            onClick={() => setRole("admin")}
            className={[
              "flex w-fit items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
              role === "admin"
                ? "bg-white text-brand-black shadow-sm dark:bg-brand-black dark:text-white"
                : "text-brand-gray dark:text-white/45",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2",
                role === "admin" ? "border-brand-green" : "border-brand-gray-light dark:border-white/25",
              ].join(" ")}
            >
              {role === "admin" ? <span className="h-2 w-2 rounded-full bg-brand-green" /> : null}
            </span>
            Admin or Partner
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="li-phone" className="text-sm font-semibold text-brand-black dark:text-white">
          Phone Number or Email
        </label>
        <input
          key={role}
          id="li-phone"
          type="text"
          defaultValue={role === "student" ? "rabi@email.com" : "surjo@email.com"}
          className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] py-3.5 text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="li-otp" className="text-sm font-semibold text-brand-black dark:text-white">
          {role === "student" ? "One-time code" : "Password"}
        </label>
        <input
          id="li-otp"
          type={role === "student" ? "text" : "password"}
          placeholder={role === "student" ? "Sent by SMS" : "••••••••"}
          className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] py-3.5 text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" className="w-fit">
          Sign in
        </Button>
        {onCreateAccount ? (
          <Button type="button" variant="secondary" className="w-fit" onClick={onCreateAccount}>
            Create an account
          </Button>
        ) : null}
      </div>
    </form>
  );
}
