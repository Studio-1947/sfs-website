# Schools for Skills — Platform Frontend

A Next.js (App Router) + TypeScript + Tailwind frontend for the Schools for Skills
health & first aid learning platform. **Frontend only** — every page runs on the
mock data in `lib/data.ts`. There is no database, auth, or API yet; that's the
next phase.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's here

- `/` — public landing page
- `/signup` — learner sign-up (name, phone, school/group, language picker)
- `/login` — sign-in with a **Student / Admin** role switch. Student routes to
  `/dashboard`, Admin routes to `/admin`. There's no real auth yet, so either
  option just navigates straight through.
- `/dashboard` — the logged-in student's home: profile, overall progress,
  certificates earned, streak, points, a "continue learning" card, and the
  full course catalog grouped by topic with per-course status.
- `/lesson/[slug]` — video lesson screen with a working subtitle-language
  toggle (EN/BN/HI/NE) and a transcript panel.
- `/quiz/[slug]` — a real, stateful quiz (click an option, it highlights;
  "Next question" scores it and moves on; the last question redirects to the
  certificate page with the score in the URL).
- `/certificate/[slug]` — the certificate screen with a QR placeholder,
  download/share buttons (not wired up yet), and the score passed in from the
  quiz.
- `/admin` — the partner/staff dashboard: platform-wide stats and a learner
  roster table, signed in as the Admin profile.

Demo profiles (set in `lib/data.ts`):
- Student: **Rabi**
- Admin: **Surjo**

## Design system

- **Brand**: Schools for Skills (Allied Health Sciences). Logo lives at
  `public/logo.png`.
- **Colors** (`tailwind.config.ts`, `brand.*`): sampled from the logo — an
  olive/chartreuse green (`#A6AC1A`) as the primary accent, black (`#181614`)
  for text and dark surfaces, white and a warm off-white (`#FAFAF6`) for
  backgrounds. No other accent colors are used.
- **Font**: Google Sans Flex, loaded directly from the Google Fonts CSS2 API
  in `app/layout.tsx` (Google made it publicly available in November 2025).
  **Note:** this project's pinned Next.js version (14.2.5) may not yet
  recognize `"Google Sans Flex"` in `next/font/google`'s bundled font list,
  which is why it's loaded via a plain `<link>` tag instead — that works
  regardless of what Next.js's font loader knows about. If the font doesn't
  render for you, check that the family name and weight range in the
  `<link>` in `app/layout.tsx` still match what's on
  fonts.google.com/specimen/Google+Sans+Flex, and check your network can
  reach fonts.googleapis.com. Falls back to the system UI sans-serif stack
  if it fails to load.

## Known gaps (backend phase)

- No real authentication, session, or role guarding — the role switch on
  `/login` is a pure UI toggle.
- No real video playback, quiz scoring persistence, or certificate
  generation/verification (the QR block is a static placeholder).
- All learner and admin data is hardcoded in `lib/data.ts`. Swap this for
  real data fetching (a database, an API route, or a CMS) when the backend
  is ready — the components already take that data as props/imports, so
  wiring in real data shouldn't require restructuring the UI.
- No image optimization domain config needed since the logo is local
  (`public/logo.png`); add `next.config.mjs` `images.domains` if you move it
  to a remote host.
