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

**Layout/chrome deliberately matches the live sibling sites** (adproof.com.au,
campaignreport.com.au, contentproof.com.au), not a literal reading of the brand guidelines
PDF — Mark asked for this explicitly after seeing the first pass. Where the two disagree
(pill buttons vs. the guideline's flat 6px radius; centered hero vs. asymmetric; a white
sticky nav with a circular product badge instead of a transparent-over-hero one) the live
sites win. What still comes from the brand guidelines: lowercase-with-period display
headings, Montserrat, and yellow used sparingly as a single accent (except the solid yellow
CTA band, which the guidelines explicitly allow as a marketing-surface treatment). See
`Phases.tsx` for one small addition beyond the locked copy: a section-level headline
("everything from launch to sale, in one suite.") above the card grid, added to match the
sibling sites' pattern of a headline over their feature grid — cut or edit it if Mark
didn't intend to reopen the copy.

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
  and structural (not a decorative thumbnail). The hero uses `src/assets/hero-building.jpg` —
  a real photo (golden-hour apartment exterior, roofline visible, deliberately picked to play
  against "including the roof."), pulled from Mark's shared Google Drive folder
  (`Project Profile → Images → Header Images`). That folder has two more prepared header
  images at the same 1920×823 crop (`preview copy.jpg` — an empty warm interior,
  `preview (1).jpg` — a couple at a table, visible iPad/Apple logo so probably not brand-safe
  to use) plus six raw, uncropped AI-rendered source images it looks like those three were
  cropped from — worth a look if a future section needs another photo.

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
    Nav.tsx                      # sticky white nav — badge + name + links + AppSwitcher + CTA
    AppSwitcher.tsx               # waffle menu — see "AppSwitcher" note below
    Button.tsx                    # shared pill button/link — variants: primary, onAccent
                                   # (white-on-yellow), outline, outlineOnDark; active:scale press feedback
    Reveal.tsx                    # scroll-triggered fade-up wrapper, reduced-motion safe
    Footer.tsx                    # plain light footer, matches sibling convention
  sections/
    Hero.tsx                      # centered, yellow underline accent under the headline
    WhyBlock.tsx                  # "stop renting access to your own data."
    Phases.tsx                    # 2x2 white card grid (icon square + headline + body), data-driven from PHASES array
    Pricing.tsx                   # solid yellow CTA band, $XXX placeholder — see Known gaps
```

### AppSwitcher note

`src/components/AppSwitcher.tsx` mirrors the waffle-menu component in the sibling repos
(Ad Proof, Campaign Report), but is **deliberately scoped to the six tools in this site's
suite** (Launch Planner, Conversion Pages, Campaign Report, Lead Reactivation, Content
Proof, Ad Proof) rather than every product PP has ever shipped — Media Schedule, Lead
Sheet and Managed Services are left out here on purpose, matching the "out of scope" note
above. If that's wrong and Mark wants the universal 9-tool switcher instead, swap the
`TOOLS` array back to match the sibling repos'.

It also reads **"Launch Planner"** — confirmed and now renamed everywhere: Ad Proof's and
Campaign Report's `AppSwitcher.tsx` (and vision-property-reports' `app-switcher-prompt.json`
build spec) were updated to match in the same session. URL and internal id (`project-base`)
are unchanged; only the label changed.

## Environment variables

```
VITE_SUPABASE_URL=https://vlliytfspvumddfjgmhb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_hwIibJ5flIyJx9ulytEolA_fRXbgP-t
VITE_SUPABASE_PROJECT_ID=vlliytfspvumddfjgmhb
```

Confirmed by Mark: `vlliytfspvumddfjgmhb` ("PP-software-site" in Supabase, created
2026-09-13) is a **dedicated** project for this site, not shared with another app. Values
above are in `.env.example` — they're safe to commit, the anon/publishable key is meant to
be public. Still not wired into the app itself: nothing on the page currently needs a
database or auth, so there's no Supabase client here yet. Add one when a real feature (the
contact form, most likely) needs it.

## Deployment

**Vercel project `pp-software-site` exists** (team `markleedrs-projects`, framework
auto-detected as Vite), reachable at `pp-software-site.vercel.app`. No custom domain
(`projectprofile.software`) is attached yet — only the default `.vercel.app` subdomains.
Whether the project auto-deploys from this repo's `main` on every push (the way Ad Proof
and Campaign Report do, per their own CLAUDE.md) couldn't be confirmed through the Vercel
API/MCP surface used to check it — that detail lives in the Vercel dashboard's Git
integration, which the API doesn't expose. If a push to `main` doesn't produce a new
deployment, check that in the dashboard before assuming the code is broken.

## Known gaps — confirm with Mark before this ships

1. **Pricing shows `$XXX`** — the real figure was deliberately left as a placeholder.
2. **"Start a project" CTAs point nowhere real** (`#`, in-page anchors) — needs a real
   contact flow: a form, a Calendly link, or an email address.
3. **No custom domain attached in Vercel yet** — see Deployment above.
