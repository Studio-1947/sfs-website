"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

export default function UnlockPage() {
  return (
    <Suspense fallback={null}>
      <UnlockForm />
    </Suspense>
  );
}

function UnlockForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState<"laptop" | "mobile">("laptop");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      const next = searchParams.get("next") || "/";
      router.replace(device === "mobile" ? "/mobile" : next);
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-cream px-4 dark:bg-brand-black">
      <Logo size={40} />
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-7 dark:bg-brand-ink"
      >
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-lg font-semibold text-brand-black dark:text-white">This site is password protected</h1>
          <p className="text-sm text-brand-gray dark:text-white/55">Enter the password to continue.</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gray-light dark:text-white/35">
            Preview as
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {(
              [
                { key: "laptop" as const, label: "Laptop" },
                { key: "mobile" as const, label: "Mobile" },
              ]
            ).map((opt) => (
              <label
                key={opt.key}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] px-3.5 py-3 text-sm font-semibold transition-colors ${
                  device === opt.key
                    ? "border-brand-green bg-brand-green-tint text-brand-green-darker dark:bg-brand-green/15 dark:text-brand-green"
                    : "border-brand-line text-brand-gray dark:border-white/15 dark:text-white/70"
                }`}
              >
                <input
                  type="radio"
                  name="device"
                  value={opt.key}
                  checked={device === opt.key}
                  onChange={() => setDevice(opt.key)}
                  className="h-4 w-4 accent-brand-green"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white"
        />
        {error ? <p className="text-sm font-semibold text-red-500">Incorrect password. Try again.</p> : null}
        <button
          type="submit"
          disabled={loading || !password}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-green py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
