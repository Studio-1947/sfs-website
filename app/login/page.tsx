import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex flex-1 flex-col items-center overflow-hidden">
        <div className="pointer-events-none absolute -left-36 -top-28 h-[480px] w-[480px] rounded-full bg-brand-black opacity-[0.04] dark:opacity-[0.15]" />

        <header className="w-full px-4 py-5 sm:px-8 sm:py-7 lg:px-16">
          <Logo size={34} />
        </header>

        <main className="relative mt-4 flex w-full max-w-[480px] flex-1 flex-col justify-center gap-6 rounded-[28px] bg-white p-8 dark:bg-brand-ink sm:mt-10 sm:flex-none sm:p-12">
          <div>
            <h1 className="text-[32px] font-semibold text-brand-black dark:text-white">Welcome back</h1>
            <p className="mt-1 text-base text-brand-gray dark:text-white/55">
              Sign in to see your progress and certificates.
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-brand-gray dark:text-white/55">
            New to Schools for Skills?{" "}
            <Link href="/signup" className="font-semibold text-brand-green-dark dark:text-brand-green">
              Create an account
            </Link>
          </p>
        </main>
      </div>

      <div
        className="relative hidden flex-1 bg-cover bg-center lg:flex"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/40 to-brand-black/70" />
        <div className="relative mt-auto flex flex-col gap-2 p-16">
          <span className="w-fit rounded-2xl border border-brand-green bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-green backdrop-blur-sm">
            FOR RURAL YOUTH
          </span>
          <p className="max-w-[420px] text-2xl font-semibold leading-snug text-white">
            Short video lessons, a quick quiz, a certificate anyone can verify.
          </p>
        </div>
      </div>
    </div>
  );
}
