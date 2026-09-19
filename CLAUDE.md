# Project Profile — Software

**Product:** projectprofile.software — a marketing/brochure site for the Project Profile
software suite, sitting alongside [projectprofile.agency](https://www.projectprofile.agency)
(the agency site). Same brand family, same company, different offer: this site sells the
software, the agency site sells the service.

**GitHub:** markleedr/pp-software-site

## What this site is

A single-page, Apple-style brochure site. Outcome-first copy, no feature language above the
fold. Two readers: a boutique developer doing marketing themselves, and an in-house property
marketing manager at a larger developer. The page leads with the marketing manager (higher
value, uses more of the suite) — the control/visibility promise serves the boutique developer
too, they just read it differently.

Page structure, in order: Hero → why (data ownership) → the four phases (six tools) →
pricing. The full locked copy (and the reasoning behind the line breaks and the "every /
every / one" rhythm) is in the session that built this — ask Mark if it needs to be
retrieved, or treat the copy in `src/sections/*.tsx` as the source of truth going forward.

**Out of scope, on purpose:** Media Schedule and Lead Sheet are not part of this suite.
Managed Services (the done-for-you agency offer) isn't mentioned — this site sells software,
not services. CRM-PM is internal-only and must never appear here, not even as a "coming
soon" tile.

## Working with Mark

Same standing rules as the sister repos (Campaign Report, Ad Proof): recommend, don't
survey — lead with a call, offer at most two or three alternatives. Plain English before
technical detail. Tell him what he needs to do, not just what was done. Claims about
anything that leaves the app (an email, a deploy) need to be backed by evidence he can
check, not memory. Batch anything that needs his input into one list at the end of a
reply.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS (hand-rolled shadcn-style CSS variable tokens — no full shadcn/ui component
  library pulled in yet; there's no form/dialog/table surface on this site to justify it.
  Add it if a future feature needs it.)
- `motion` (Framer Motion's successor) is installed for any future gesture-driven
  interaction, per the Apple design skill — nothing on the page uses it yet beyond CSS
  keyframes; the scroll-reveal in `src/components/Reveal.tsx` is a plain
  IntersectionObserver + CSS animation, not a spring.
- `@fontsource/montserrat` — self-hosted Montserrat (500/700/800), the brand's marketing
  personality lead. Do not swap in a Google Fonts `<link>` tag; the self-hosted package
  avoids an external font-loading dependency.
- bun as package manager

## Dev commands

```bash
bun dev        # start dev server (localhost:5173)
bun run build  # production build (tsc -b && vite build)
bun run lint   # eslint
```

## Brand system — read before touching copy or styling

The brand guidelines (Project Profile, v2025.1) define **two dialects that share one DNA**
and must never be mixed on one surface:

- **Surface A — marketing brand** (this site): Montserrat, loud yellow `#FFD600` used as
  full backgrounds/graphics, display headings lowercase ending in a period. This is what
  `src/index.css` and `tailwind.config.ts` implement.
- **Surface B — reporting UI** (the Campaign Report product): Inter, yellow used sparingly,
  sentence-case headings with no period. Not used here — don't import its tokens.

Rules baked into this repo's Tailwind config and `index.css`, do not casually override:

- **Display headings** (the `.display` utility class): Montserrat ExtraBold 800, lowercase,
  `-0.028em` tracking, tight leading, always end in a period. Reserved for headings only —
  never body copy, never UI labels.
- **Body copy**: normal sentence case, Australian English (colour, centre, optimise).
  Numbers: spell out one to nine, numerals for 10+, always numerals for `%`/`$`/data.
- **Colour**: yellow is punctuation, not paint — one CTA or one accent per view, never a
  filled surface, never light text on yellow. `--primary` / `--primary-foreground` in
  `index.css` enforce the dark-on-yellow pairing; don't override it per-component.
- **Voice**: confident, specialist, direct, results-focused. No hype words (leverage,
  utilise, synergy, holistic, best-in-class, game-changing, revolutionary, etc.), no emoji,
  no exclamation marks unless genuinely earned.
- **Imagery**: naturalistic, warm property photography, no heavy filters or grain, full-bleed
  and structural (not a decorative thumbnail). **The hero currently uses a gradient
  placeholder, not a real photo** — see Known gaps below.

Full guideline PDF and the agency one-pager live outside this repo (uploaded to the session
that built this site) — ask Mark for them if a future session needs the source document
rather than this summary.

## Key source locations

```
src/
  App.tsx                        # assembles the page: Nav, Hero, WhyBlock, Phases, Pricing, Footer
  index.css                      # brand CSS variable tokens (Surface A) + .display utility
  lib/
    utils.ts                     # cn() — clsx + tailwind-merge
  components/
    Nav.tsx                      # fixed nav, transparent over hero / translucent white on scroll
    AppSwitcher.tsx               # waffle menu — see "AppSwitcher" note below
    Button.tsx                    # shared button/link with press feedback (active:scale)
    Reveal.tsx                    # scroll-triggered fade-up wrapper, reduced-motion safe
    Footer.tsx
  sections/
    Hero.tsx
    WhyBlock.tsx                  # "stop renting access to your own data."
    Phases.tsx                    # the four phases / six tools, data-driven from PHASES array
    Pricing.tsx                   # $XXX placeholder — see Known gaps
```

### AppSwitcher note

`src/components/AppSwitcher.tsx` mirrors the waffle-menu component in the sibling repos
(Ad Proof, Campaign Report), but is **deliberately scoped to the six tools in this site's
suite** (Launch Planner, Conversion Pages, Campaign Report, Lead Reactivation, Content
Proof, Ad Proof) rather than every product PP has ever shipped — Media Schedule, Lead
Sheet and Managed Services are left out here on purpose, matching the "out of scope" note
above. If that's wrong and Mark wants the universal 9-tool switcher instead, swap the
`TOOLS` array back to match the sibling repos'.

It also reads **"Launch Planner"**, the new name for the product the sibling repos'
switchers still call "Project Base" (same URL, `projectbase.com.au`). That's a deliberate
mismatch introduced here — the rename hasn't been carried into the other repos yet. Ask
Mark before pushing the rename into Ad Proof / Campaign Report's `AppSwitcher.tsx`; that's
a separate, cross-repo change this session didn't make.

## Environment variables

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

Not wired up yet — nothing on this page currently needs a database or auth. Mark supplied
a Supabase project URL (`vlliytfspvumddfjgmhb`) when this site was commissioned; whether
that's a dedicated project for this site or one shared with another app was never
confirmed. Don't wire Supabase in without checking first.

## Known gaps — confirm with Mark before this ships

1. **Hero and phase imagery is a gradient placeholder**, not real photography. The brand
   treats property photography as "the brand's visual currency" — this needs real,
   naturalistic shots before launch.
2. **Pricing shows `$XXX`** — the real figure was deliberately left as a placeholder.
3. **"Start a project" CTAs point nowhere real** (`#`, in-page anchors) — needs a real
   contact flow: a form, a Calendly link, or an email address.
4. **Deployment target is unconfirmed.** No Vercel project or DNS has been set up for
   projectprofile.software; sibling repos deploy to Vercel from `main`, but that hasn't
   been done here.
5. **AppSwitcher scope and the "Launch Planner" rename** — see note above.
