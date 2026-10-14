"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Card, PageIntro, TipBox, btnPrimary, btnSecondary } from "@/components/admin/ui";
import { CertificateIcon, CheckIcon, GlobeIcon, HelpIcon, MailIcon, PhoneIcon, ShieldIcon, UsersIcon, WhatsappIcon } from "@/components/admin/icons";
import { adminUser, languages } from "@/lib/data";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-brand-cream px-4 py-3 dark:bg-white/5">
      <span className="text-[13px] font-semibold text-brand-gray dark:text-white/50">{label}</span>
      <span className="text-[15px] font-semibold text-brand-black dark:text-white">{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  const [verifySent, setVerifySent] = useState(false);
  const [langOn, setLangOn] = useState<Record<string, boolean>>(() => Object.fromEntries(languages.map((l) => [l.code, true])));
  const onCount = Object.values(langOn).filter(Boolean).length;

  return (
    <AdminShell>
      <PageIntro title="Settings" description="Your organisation’s details, the languages students can choose, and how to get help." />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card title="Your organisation" help="This is shown to partners and on certificates." icon={<UsersIcon className="h-5 w-5" />}>
          <div id="organisation" className="flex scroll-mt-24 flex-col gap-3">
            {adminUser.verified ? null : (
              <TipBox tone="warn" title="Your account isn’t verified yet">
                <p>Verify it so partners know messages really come from you. We’ll email you a link.</p>
                <button type="button" disabled={verifySent} onClick={() => setVerifySent(true)} className={`${btnPrimary} mt-3 min-h-[42px] text-sm`}>
                  {verifySent ? (
                    <>
                      <CheckIcon className="h-4 w-4" /> Link sent to {adminUser.email}
                    </>
                  ) : (
                    <>
                      <ShieldIcon className="h-4 w-4" /> Send me the link
                    </>
                  )}
                </button>
              </TipBox>
            )}
            <Row label="Organisation name" value={adminUser.org} />
            <Row label="Main contact" value={`${adminUser.name} (${adminUser.role})`} />
            <Row label="Email" value={adminUser.email} />
          </div>
        </Card>

        <Card
          title="Languages students can pick"
          help="Switch a language off to hide it from new students. Students already learning in it are not affected."
          icon={<GlobeIcon className="h-5 w-5" />}
        >
          <ul className="flex flex-col gap-2">
            {languages.map((l) => {
              const on = langOn[l.code];
              const isLast = on && onCount === 1;
              return (
                <li key={l.code} className="flex items-center justify-between gap-3 rounded-2xl border border-brand-line px-4 py-3 dark:border-white/10">
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold text-brand-black dark:text-white">{l.label}</span>
                    <span className="text-sm text-brand-gray dark:text-white/55">{l.native}</span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`${l.label} ${on ? "on" : "off"}`}
                    disabled={isLast}
                    title={isLast ? "At least one language must stay on" : undefined}
                    onClick={() => setLangOn((s) => ({ ...s, [l.code]: !s[l.code] }))}
                    className={`relative inline-flex h-9 w-[92px] flex-shrink-0 items-center rounded-full px-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:cursor-not-allowed disabled:opacity-60 ${
                      on ? "bg-brand-green text-white" : "bg-brand-line text-brand-gray dark:bg-white/10 dark:text-white/60"
                    }`}
                  >
                    <span className={`absolute h-7 w-7 rounded-full bg-white shadow transition-all ${on ? "left-[60px]" : "left-1"}`} />
                    <span className={`w-full ${on ? "pr-8 text-left pl-2" : "pl-9 text-left"}`}>{on ? "On" : "Off"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-brand-gray dark:text-white/55">
            {onCount} of {languages.length} languages are on.
          </p>
        </Card>

        <Card title="Certificates" help="How students earn them. There is nothing you need to set up." icon={<CertificateIcon className="h-5 w-5" />}>
          <ol className="flex flex-col gap-2.5">
            {["Student watches every lesson video.", "Student passes the quiz after each video.", "The certificate is made by itself, with a QR code anyone can scan."].map(
              (t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">{i + 1}</span>
                  <span className="pt-0.5 text-[15px] text-brand-black dark:text-white">{t}</span>
                </li>
              )
            )}
          </ol>
          <Row label="Certificate codes look like this" value="SFS-2026-000123" />
        </Card>

        <Card title="Need help?" help="Our team answers Monday to Saturday, 9 AM to 6 PM." icon={<HelpIcon className="h-5 w-5" />}>
          <div id="help" className="flex scroll-mt-24 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+918447841831" className={btnPrimary}>
              <PhoneIcon /> Call us
            </a>
            <a href="https://wa.me/918447841831" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              <WhatsappIcon /> WhatsApp
            </a>
            <a href="mailto:partnerships@schoolforskills.in" className={btnSecondary}>
              <MailIcon /> Email
            </a>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
