"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import NavControls from "@/components/NavControls";
import LoginForm from "@/components/LoginForm";
import SignupModal from "@/components/SignupModal";
import { useLanguage } from "@/components/LanguageContext";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 20.6 3.4 14.1 3.4 6c0-.6.4-1 1-1H7.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 1.3Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.44 1.28 4.87L2 22l5.36-1.39a9.9 9.9 0 0 0 4.68 1.19h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.44-.72-2.9-1.15-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export default function LandingPage() {
  const { t } = useLanguage();
  const [showSignup, setShowSignup] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [focusLogin, setFocusLogin] = useState(false);

  function handleStartToday() {
    setFocusLogin(true);
    document.getElementById("login-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.getElementById("li-phone")?.focus(), 400);
    window.setTimeout(() => setFocusLogin(false), 3200);
  }

  return (
    <div className="relative overflow-hidden bg-brand-black">
      <div
        className="relative flex min-h-screen flex-col bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black/90" />

        <div className="sfs-neon-pulse-a pointer-events-none absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-brand-green/30 blur-[90px]" />
        <div className="sfs-neon-pulse-b pointer-events-none absolute left-[58%] top-[6%] h-48 w-48 rounded-full bg-orange-500/35 blur-[80px]" />
        <div className="sfs-neon-pulse-c pointer-events-none absolute right-[10%] top-[38%] h-72 w-72 rounded-full bg-brand-green/25 blur-[100px]" />
        <div className="sfs-neon-pulse-a pointer-events-none absolute bottom-[12%] left-[28%] h-56 w-56 rounded-full bg-orange-500/30 blur-[85px]" />
        <div className="sfs-neon-pulse-b pointer-events-none absolute bottom-[24%] right-[28%] h-44 w-44 rounded-full bg-brand-green/30 blur-[70px]" />

        <header
          className={`relative flex flex-col gap-3 px-4 py-5 transition-all duration-500 sm:gap-4 sm:px-8 sm:py-7 lg:px-16 ${
            focusLogin ? "pointer-events-none blur-sm opacity-30" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <Logo size={34} light />
            <div className="flex items-center gap-2 sm:gap-5">
              <NavControls light />
              <div className="hidden items-center gap-3 sm:flex">
                <a
                  href="tel:+918447841831"
                  className="group inline-flex h-11 flex-shrink-0 items-center justify-between gap-3 rounded-full bg-brand-green pl-6 pr-1 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  <span>Support</span>
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                    <PhoneIcon />
                  </span>
                </a>
                <a
                  href="https://wa.me/918447841831"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  <WhatsappIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2.5 sm:hidden">
            <a
              href="tel:+918447841831"
              className="group inline-flex h-9 flex-shrink-0 items-center justify-between gap-2 rounded-full bg-brand-green pl-4 pr-1 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              <span>Support</span>
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                <PhoneIcon />
              </span>
            </a>
            <a
              href="https://wa.me/918447841831"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <WhatsappIcon className="h-4 w-4" />
            </a>
          </div>
        </header>

        <section className="relative flex flex-col gap-10 px-4 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-16 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:pb-40 lg:pt-20">
          <div
            className={`flex flex-col items-start gap-6 transition-all duration-500 ${
              focusLogin ? "pointer-events-none blur-sm opacity-30" : ""
            }`}
          >
            <h1 className="max-w-[480px] text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-[54px]">
              <span className="block">{t("hero.title.1")}</span>
              <span className="block">{t("hero.title.2")}</span>
              <span className="block">{t("hero.title.3")}</span>
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-white/75 sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/50 bg-white/10 py-1.5 pr-1.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <span className="pl-6">Play a learning video</span>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                onClick={handleStartToday}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-brand-green py-1.5 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                <span className="pl-6">Start today</span>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-green">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div id="login-card" className="relative w-full max-w-[500px] flex-shrink-0 scroll-mt-24">
            {focusLogin ? (
              <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-brand-green/40 blur-3xl transition-opacity duration-500" />
            ) : null}
            <div
              className={`relative rounded-[28px] border bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-colors duration-500 dark:bg-brand-ink/70 ${
                focusLogin
                  ? "border-brand-green ring-4 ring-brand-green/50 sfs-card-pop"
                  : "border-white/50 dark:border-white/15"
              }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-brand-black dark:text-white">Welcome back</h2>
                <p className="mt-1 text-sm text-brand-gray dark:text-white/55">
                  Sign in to see your progress and certificates.
                </p>
              </div>

              <LoginForm onCreateAccount={() => setShowSignup(true)} />
            </div>
          </div>
        </section>

        <footer
          className={`absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-4 py-6 text-center transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left lg:px-16 ${
            focusLogin ? "pointer-events-none blur-sm opacity-30" : ""
          }`}
        >
          <span className="text-[10px] text-white/60">
            &copy; 2026{" "}
            <a
              href="https://www.schoolforskills.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-green"
            >
              <span className="font-[700]">Schools for Skills</span> (Allied Health Sciences)
            </a>
          </span>
          <span className="text-[10px] text-white/60">
            Designed and Developed by{" "}
            <a
              href="https://www.1947.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 hover:text-white"
            >
              Studio 1947
            </a>
          </span>
        </footer>
      </div>

      {showSignup ? <SignupModal onClose={() => setShowSignup(false)} /> : null}

      {showVideo ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-brand-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </button>
            <video controls autoPlay className="h-auto w-full">
              <source src="/videos/lesson-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </div>
  );
}
