"use client";

import React from "react";
import Logo from "./Logo";
import { useLanguage } from "./LanguageContext";

export interface CertificateProps {
  learnerName: string;
  courseTitle: string;
  certificateId: string;
  isComplete: boolean;
  completedCount: number;
  totalVideos: number;
  issueDate?: string;
  nextChapterSlug?: string;
}

export default function CertificateDocument({
  learnerName,
  courseTitle,
  certificateId,
  isComplete,
  completedCount,
  totalVideos,
  issueDate = "October 2026",
}: CertificateProps) {
  const { t, n } = useLanguage();
  const pct = Math.round((completedCount / totalVideos) * 100);

  return (
    <div className="certificate-print-root relative w-full overflow-hidden rounded-3xl border-[2px] border-amber-600/30 bg-gradient-to-b from-[#FCFBF7] via-[#FAF8F0] to-[#F5F2E6] p-4 text-[#1C1A17] shadow-2xl transition-all duration-300 dark:border-amber-500/30 dark:from-[#1E1B18] dark:via-[#191714] dark:to-[#141210] dark:text-[#F3EFE6] sm:p-7 md:p-10">
      {/* Guilloche / Security Pattern Background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="guilloche-cert" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
            <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0 30 Q 30 0 60 30 Q 30 60 0 30" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <path d="M30 0 Q 60 30 30 60 Q 0 30 30 0" fill="none" stroke="currentColor" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guilloche-cert)" />
      </svg>

      {/* Watermark Crest in Center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.05]">
        <svg viewBox="0 0 474 221" className="h-72 w-72 text-brand-green sm:h-96 sm:w-96" fill="currentColor">
          <path d="M5.86289 42.9647C7.38789 41.0502 8.53638 38.3538 9.96903 36.6852C14.1282 31.8412 18.4933 26.556 23.7388 22.8659C25.2662 21.7914 26.6214 20.2154 28.1811 19.1476C33.0617 16.2818 38.6697 11.9896 43.9255 10.0182C49.2623 8.33544 54.9256 5.12823 60.1993 3.70661C65.5266 2.27044 72.6017 0.948998 78.1946 0.480603C94.7565 -0.906351 113.013 0.523431 128.411 7.21083C130.694 8.20255 133.172 8.81271 135.452 9.83262C141.405 12.8776 149.124 16.282 154.236 20.5396C158.998 24.5065 164.449 29.2419 168.702 33.6928C174.021 39.2591 177.872 46.5342 182.668 52.5765C184.183 54.6334 188.804 63.9185 189.339 65.901C192.573 62.5463 201.298 58.5813 205.71 56.6381C206.857 56.1328 209.021 54.7709 210.056 54.4943C215.907 52.9322 222.832 51.2766 228.855 51.1629C246.132 50.7705 262.871 57.1999 275.444 69.0584C280.949 74.3422 288.143 82.7057 291.68 89.4286C294.759 74.474 302.539 56.8663 311.26 44.2457C312.153 42.9554 314.182 41.4938 315.28 40.1355C316.476 38.6521 318.051 35.8071 319.39 34.6096C322.082 32.1998 325.647 29.9412 328.585 27.7602C330.03 26.6876 332.322 25.6934 333.822 24.6902C336.521 22.8702 339.038 21.0755 342.096 19.8431C359.909 12.6616 380.126 10.8673 398.977 14.4151C404.363 15.4283 423.764 21.4045 423.034 28.6717C422.723 29.1555 422.293 29.7125 421.642 29.6895C415.239 29.463 409.54 29.5393 403.171 30.3535C392.974 31.6577 382.612 34.1909 373.814 39.7154C368.101 43.2748 362.38 46.6795 357.459 51.3349C353.107 56.077 346.436 62.3877 342.771 67.4748C337.698 75.0191 333.196 82.9196 328.092 90.4388C327.401 91.4575 327.432 93.2663 328.513 93.9561C334.15 97.5509 339.577 101.518 345.328 104.927C363.378 115.67 384.937 119.521 405.669 120.042C413.136 120.229 422.795 119.618 429.77 121.552C443.455 125.346 438.715 138.306 432.921 146.65C430.827 149.664 428.14 153.283 426.607 156.29L447.377 156.393C453.547 156.386 459.928 156.038 466.008 157.1C470.532 157.766 473.922 161.967 473.721 166.47C473.46 172.284 469.46 179.275 465.668 183.565C462.668 186.624 460.107 189.817 457.201 192.977C453.432 197.076 448.645 199.571 444.462 202.77C438.845 207.066 435.6 208.81 429.313 211.741C413.093 219.302 396.508 221.371 378.8 220.822C356.631 220.052 335.256 212.37 317.668 198.85C315.112 196.881 311.854 194.551 309.629 192.265C306.935 189.495 304.568 186.181 301.968 183.299C294.388 174.902 288.543 164.808 284.045 154.385C282.162 156.711 280.174 157.792 277.582 159.315C268.979 164.416 259.365 167.577 249.415 168.577C234.188 170.161 217.144 165.898 204.744 156.672C193.708 148.46 188.528 141.817 181.344 130.285C177.453 141.104 173.377 152.773 167.132 162.451C163.287 168.409 157.894 175.112 152.882 180.101C150.176 182.795 147.277 184.786 144.144 186.935C125.078 202.026 98.2846 203.722 75.1689 199.452C69.9043 198.479 51.8559 192.162 52.1803 185.458C53.0902 184.12 58.2812 184.736 60.0679 184.711C64.4732 184.685 68.8712 184.357 73.2317 183.731C80.9403 182.562 86.7095 180.623 93.8392 177.583C99.8355 175.027 101.642 174.165 106.86 170.147C112.026 166.168 117.514 162.724 121.931 157.68C124.206 154.947 126.633 152.086 128.765 149.244C130.249 147.265 133.002 144.869 134.159 142.888C137.626 136.953 141.876 130.864 145.158 124.914C134.535 115.141 116.495 109.674 102.691 106.503C90.8437 103.781 77.2206 104.361 65.1086 104.058C56.4303 103.839 46.0214 105.05 38.3304 100.846C36.8851 98.3661 36.1962 96.8485 37.0135 93.8125C39.0468 86.2611 46.942 78.1234 50.132 71.7652C43.9326 71.9451 36.6948 71.2615 30.4497 70.9723C24.296 70.6871 16.5124 70.8141 10.5123 69.4183C-5.02351 65.8043 -0.107527 53.9005 4.89866 44.4123C5.2507 44.0661 5.59935 43.4083 5.86289 42.9647Z" />
        </svg>
      </div>

      {/* Triple Ornamental Border Frame */}
      <div className="relative rounded-2xl border-[1.5px] border-amber-600/40 p-1.5 dark:border-amber-400/30">
        <div className="relative rounded-xl border border-dashed border-amber-600/30 p-2 dark:border-amber-400/25">
          <div className="relative flex flex-col rounded-lg border-[1.5px] border-amber-600/50 bg-[#FAF9F5]/70 p-5 backdrop-blur-[1px] dark:border-amber-400/35 dark:bg-[#1C1A17]/80 sm:p-8 md:p-12">
            {/* Corner Ornaments */}
            <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 text-amber-600/60 dark:text-amber-400/60 sm:h-12 sm:w-12">
              <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
                <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="currentColor" />
                <path d="M8 8 L28 8 L28 10 L10 10 L10 28 L8 28 Z" fill="currentColor" opacity="0.7" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 -scale-x-100 text-amber-600/60 dark:text-amber-400/60 sm:h-12 sm:w-12">
              <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
                <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="currentColor" />
                <path d="M8 8 L28 8 L28 10 L10 10 L10 28 L8 28 Z" fill="currentColor" opacity="0.7" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 -scale-y-100 text-amber-600/60 dark:text-amber-400/60 sm:h-12 sm:w-12">
              <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
                <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="currentColor" />
                <path d="M8 8 L28 8 L28 10 L10 10 L10 28 L8 28 Z" fill="currentColor" opacity="0.7" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 -scale-x-100 -scale-y-100 text-amber-600/60 dark:text-amber-400/60 sm:h-12 sm:w-12">
              <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
                <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="currentColor" />
                <path d="M8 8 L28 8 L28 10 L10 10 L10 28 L8 28 Z" fill="currentColor" opacity="0.7" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              </svg>
            </div>

            {/* Top Bar: Institution Header & Certificate ID */}
            <div className="flex flex-col items-center justify-between gap-4 border-b border-amber-600/20 pb-6 dark:border-amber-400/20 sm:flex-row">
              <div className="flex items-center gap-3">
                <Logo size={32} />
                <div className="hidden h-8 w-px bg-amber-600/25 dark:bg-amber-400/25 sm:block" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#565A0D] dark:text-brand-green sm:text-sm">
                  {t("certdoc.faculty")}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-amber-600/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:border-amber-400/20 dark:text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{t("certdoc.credentialId")} {certificateId}</span>
              </div>
            </div>

            {/* Certificate Title Badge */}
            <div className="my-6 text-center sm:my-8">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-600/60 dark:to-amber-400/60 sm:w-16" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-green-darker dark:text-brand-green sm:text-xs">
                  {t("certdoc.recognition")}
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-600/60 dark:to-amber-400/60 sm:w-16" />
              </div>

              <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#181614] dark:text-white sm:text-4xl md:text-5xl">
                {t("certdoc.title")}
              </h2>

              <p className="mt-2 text-xs font-medium italic text-stone-600 dark:text-stone-300 sm:text-sm">
                {t("certdoc.certifies")}
              </p>
            </div>

            {/* Recipient Name Showcase */}
            <div className="relative mx-auto my-2 flex w-full max-w-xl flex-col items-center justify-center text-center sm:my-4">
              <div className="w-full">
                <span className="block font-serif text-3xl font-extrabold tracking-tight text-[#181614] dark:text-white sm:text-5xl md:text-6xl">
                  {learnerName}
                </span>
                <div className="mx-auto mt-2 h-1 w-48 rounded-full bg-gradient-to-r from-transparent via-amber-600 dark:via-amber-400 to-transparent opacity-80 sm:w-72" />
              </div>

              <p className="mt-4 max-w-lg text-xs leading-relaxed text-stone-600 dark:text-stone-300 sm:text-sm">
                {isComplete ? (
                  <span>
                    {t("certdoc.completed")}
                  </span>
                ) : (
                  <span>
                    {t("certdoc.enrolled")}
                  </span>
                )}
              </p>

              {/* Course Title Plaque */}
              <div className="mt-4 rounded-2xl border border-brand-green/30 bg-brand-green-tint/90 px-6 py-3 shadow-inner dark:border-brand-green/30 dark:bg-brand-green/15 sm:px-8 sm:py-4">
                <h3 className="text-xl font-bold tracking-tight text-brand-green-darker dark:text-brand-green sm:text-2xl md:text-3xl">
                  {courseTitle}
                </h3>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 sm:text-xs">
                  {t("certdoc.foundations")}
                </p>
              </div>
            </div>

            {/* Middle Section: Seal, QR Code & Signatures */}
            <div className="mt-8 grid grid-cols-1 items-end gap-8 border-t border-amber-600/20 pt-8 dark:border-amber-400/20 sm:grid-cols-3">
              {/* Left Signatory */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                {/* Authentic Signature Graphic */}
                <div className="h-12 w-40 text-[#181614] dark:text-white">
                  <svg viewBox="0 0 160 50" fill="none" className="h-full w-full">
                    <path
                      d="M10 35 C25 15, 35 10, 48 22 C60 35, 70 12, 85 18 C95 22, 105 40, 115 25 C122 15, 135 28, 150 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 38 C55 35, 95 38, 140 32"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="w-full border-t border-stone-400/50 pt-1.5 dark:border-stone-600/60" />
                <span className="text-xs font-bold text-[#181614] dark:text-white sm:text-sm">Dr. Arindam Ghosh</span>
                <span className="text-[11px] text-stone-600 dark:text-stone-300">
                  {t("certdoc.sig1Role")}
                </span>
                <span className="text-[10px] text-stone-600 dark:text-stone-300">
                  Schools for Skills Foundation
                </span>
              </div>

              {/* Center Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                  {/* Embossed Rosette Seal */}
                  <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
                    <defs>
                      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DFB76C" />
                        <stop offset="35%" stopColor="#C69234" />
                        <stop offset="70%" stopColor="#EAD397" />
                        <stop offset="100%" stopColor="#9E6C1F" />
                      </linearGradient>
                      <path
                        id="seal-text-path"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      />
                    </defs>
                    {/* Starburst Rosette */}
                    <circle cx="50" cy="50" r="46" fill="url(#gold-grad)" />
                    <circle cx="50" cy="50" r="42" fill="#FAF8F0" className="dark:fill-[#1C1A17]" />
                    <circle cx="50" cy="50" r="39" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
                    
                    {/* Text along path */}
                    <text fontSize="6" fontWeight="bold" fill="#8C5C15" className="dark:fill-[#DFB76C] uppercase tracking-[0.18em]">
                      <textPath href="#seal-text-path" startOffset="50%" textAnchor="middle">
                        {t("certdoc.seal")}
                      </textPath>
                    </text>

                    {/* Center Medal Icon */}
                    <circle cx="50" cy="50" r="22" fill="url(#gold-grad)" />
                    <path
                      d="M50 36 L53 43 L60 44 L55 49 L56 56 L50 52 L44 56 L45 49 L40 44 L47 43 Z"
                      fill="#FFFFFF"
                    />
                  </svg>

                  {/* Ribbon tails below seal */}
                  <div className="absolute -bottom-3 flex gap-1">
                    <div className="h-4 w-3 origin-top rotate-[-12deg] bg-amber-700/80 dark:bg-amber-600/80 [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />
                    <div className="h-4 w-3 origin-top rotate-[12deg] bg-amber-700/80 dark:bg-amber-600/80 [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />
                  </div>
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  {t(isComplete ? "certdoc.verifiedCred" : "certdoc.previewCred")}
                </span>
                <span className="text-[10px] text-stone-600 dark:text-stone-300">{t("certdoc.issued", { date: issueDate })}</span>
              </div>

              {/* Right Signatory & QR Verification */}
              <div className="flex flex-col items-center text-center sm:items-end sm:text-right">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center sm:items-end">
                    {/* Signature Graphic 2 */}
                    <div className="h-12 w-36 text-[#181614] dark:text-white">
                      <svg viewBox="0 0 150 50" fill="none" className="h-full w-full">
                        <path
                          d="M15 25 Q 35 5, 45 30 T 75 15 T 105 35 T 135 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M20 32 L130 30"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="w-full border-t border-stone-400/50 pt-1.5 dark:border-stone-600/60" />
                    <span className="text-xs font-bold text-[#181614] dark:text-white sm:text-sm">Priya Mukherjee</span>
                    <span className="text-[11px] text-stone-600 dark:text-stone-300">
                      {t("certdoc.sig2Role")}
                    </span>
                  </div>

                  {/* Clean Vector QR Code */}
                  <div
                    className={`group relative flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-xl border border-amber-600/30 bg-white p-1.5 shadow-sm dark:border-amber-400/20 dark:bg-white sm:h-24 sm:w-24 ${
                      isComplete ? "" : "opacity-75"
                    }`}
                  >
                    <svg viewBox="0 0 80 80" className="h-full w-full text-black">
                      {/* Top-Left Finder */}
                      <rect x="5" y="5" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="11" y="11" width="10" height="10" fill="currentColor" />

                      {/* Top-Right Finder */}
                      <rect x="53" y="5" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="59" y="11" width="10" height="10" fill="currentColor" />

                      {/* Bottom-Left Finder */}
                      <rect x="5" y="53" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="11" y="59" width="10" height="10" fill="currentColor" />

                      {/* Data Pattern Modules */}
                      <rect x="32" y="7" width="5" height="5" fill="currentColor" />
                      <rect x="42" y="7" width="5" height="5" fill="currentColor" />
                      <rect x="32" y="17" width="5" height="5" fill="currentColor" />
                      <rect x="42" y="17" width="5" height="5" fill="currentColor" />
                      <rect x="7" y="32" width="5" height="5" fill="currentColor" />
                      <rect x="17" y="32" width="5" height="5" fill="currentColor" />
                      <rect x="7" y="42" width="5" height="5" fill="currentColor" />
                      <rect x="17" y="42" width="5" height="5" fill="currentColor" />
                      <rect x="32" y="32" width="16" height="16" rx="2" fill="#767B12" />
                      <circle cx="40" cy="40" r="4" fill="#FFFFFF" />
                      <rect x="53" y="32" width="5" height="5" fill="currentColor" />
                      <rect x="63" y="32" width="5" height="5" fill="currentColor" />
                      <rect x="68" y="42" width="5" height="5" fill="currentColor" />
                      <rect x="32" y="53" width="5" height="5" fill="currentColor" />
                      <rect x="42" y="53" width="5" height="5" fill="currentColor" />
                      <rect x="32" y="63" width="5" height="5" fill="currentColor" />
                      <rect x="42" y="68" width="5" height="5" fill="currentColor" />
                      <rect x="53" y="53" width="5" height="5" fill="currentColor" />
                      <rect x="63" y="63" width="5" height="5" fill="currentColor" />
                      <rect x="68" y="68" width="5" height="5" fill="currentColor" />
                    </svg>
                    <span className="text-[8px] font-bold tracking-tight text-stone-700">{t("certdoc.scan")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress or Verification Banner */}
            {!isComplete ? (
              <div className="mt-8 rounded-xl border border-amber-600/30 bg-amber-500/10 p-3.5 text-center text-xs dark:border-amber-400/20 dark:bg-amber-400/5">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                      !
                    </span>
                    <span className="font-semibold text-amber-900 dark:text-amber-200">
                      {t("certdoc.previewNote", { total: totalVideos })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                    <span>{t("certdoc.completeCount", { done: completedCount, total: totalVideos })}</span>
                    <span className="rounded-full bg-amber-600/20 px-2 py-0.5 text-[11px]">{n(`${pct}%`)}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
