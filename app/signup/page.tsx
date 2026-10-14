import Link from "next/link";
import Logo from "@/components/Logo";
import LanguagePicker from "@/components/LanguagePicker";
import { LinkButton } from "@/components/Button";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex flex-1 flex-col items-center overflow-hidden">
        <header className="w-full px-4 py-5 sm:px-8 sm:py-7 lg:px-16">
          <Logo size={34} />
        </header>

        <main className="relative mt-2 flex w-full max-w-[560px] flex-1 flex-col justify-center gap-6 rounded-[28px] bg-white p-8 dark:bg-brand-ink sm:flex-none sm:p-12">
          <div>
            <h1 className="text-[32px] font-semibold text-brand-black dark:text-white">Create your account</h1>
            <p className="mt-1 text-base text-brand-gray dark:text-white/55">A few details, then you&rsquo;re learning.</p>
          </div>

          <form className="flex flex-col gap-5" action="/dashboard">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-name" className="text-sm font-semibold text-brand-black dark:text-white">
                Full name
              </label>
              <input
                id="su-name"
                name="name"
                type="text"
                placeholder="e.g. Priya Rai"
                className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-phone" className="text-sm font-semibold text-brand-black dark:text-white">
                Phone number
              </label>
              <input
                id="su-phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-state" className="text-sm font-semibold text-brand-black dark:text-white">
                State
              </label>
              <select
                id="su-state"
                name="state"
                defaultValue=""
                className="h-[52px] rounded-2xl border-[1.5px] border-brand-line bg-transparent px-[18px] text-[15px] text-brand-black outline-none focus:border-brand-green dark:border-white/15 dark:text-white dark:[color-scheme:dark]"
              >
                <option value="" disabled>
                  Select your state
                </option>
                <option value="West Bengal">West Bengal</option>
                <option value="Assam">Assam</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Meghalaya">Meghalaya</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-brand-black dark:text-white">Preferred language</span>
              <LanguagePicker />
            </div>

            <LinkButton href="/dashboard" variant="primary" className="mt-1 w-full">
              Continue
            </LinkButton>
          </form>

          <p className="text-center text-sm text-brand-gray dark:text-white/55">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-green-dark dark:text-brand-green">
              Sign in
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
