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

Page structure, in order: Hero → trust strip → why (data ownership) → the four phases
(six tools, each an expanded product section) → pricing. The hero/why/phase-headline copy
is locked from an earlier round (the reasoning behind the line breaks and the "every /
every / one" rhythm lives in the session that built this — ask Mark if it needs retrieving).
The per-product description/benefits/checklist copy in `Phases.tsx` is **not** invented —
it's pulled from Mark's own live sites (see "Expanded product sections" below) and should
be treated as real until he says otherwise.

**Layout/chrome deliberately matches the live sibling sites** (adproof.com.au,
campaignreport.com.au, contentproof.com.au, and projectprofile.agency/software), not a
literal reading of the brand guidelines PDF — Mark asked for this explicitly after seeing
the first pass. Where the two disagree (pill buttons vs. the guideline's flat 6px radius;
centered hero vs. asymmetric; a white sticky nav with a circular product badge instead of a
transparent-over-hero one) the live sites win. What still comes from the brand guidelines:
lowercase-with-period display headings, Montserrat, and yellow used sparingly as a single
accent (except the solid yellow CTA band, which the guidelines explicitly allow as a
marketing-surface treatment).

### Expanded product sections (Phases.tsx)

Each of the six tools gets its own full section — tagline, description, a "Key benefits"
box, and a feature checklist — grouped under the four locked phase headlines (phase 2 holds
three: Content Proof, Ad Proof, Conversion Pages). This replaced the original compact card
grid after Mark pointed at `projectprofile.agency/software`'s expanded-section layout as the
model to follow. The description/benefits/checklist text for Launch Planner, Conversion
Pages, Campaign Report and Lead Reactivation is copied near-verbatim from that agency page;
Content Proof's and Ad Proof's come from their own marketing sites (contentproof.com.au,
adproof.com.au). None of it was written from scratch — if a product's real copy changes on
its own site, this page will drift out of sync until someone updates it here too.

**Still missing: real product screenshots.** The agency reference page shows an actual UI
mockup beside each product's text; this page uses an icon square instead, because
fabricating a screenshot with invented numbers would misrepresent the actual product. Swap
in real screenshots when they're available.

**One deliberate scope call:** Project Email is a real, live product (projectemail.com.au,
marked "Coming Soon" on the agency page) but isn't included here — the agency page's own
footer lists exactly the same six tools as this site's suite (Launch Planner, Conversion
Pages, Campaign Report, Lead Reactivation, Ad Proof, Content Proof), so that's the
confirmed current roster, not five or seven.

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
    Nav.tsx                      # sticky white nav — badge + name + links + Book a call + AppSwitcher + CTA
    AppSwitcher.tsx               # waffle menu — see "AppSwitcher" note below
    Button.tsx                    # shared pill button/link — variants: primary, onAccent
                                   # (white-on-yellow), outline, outlineOnDark; active:scale press feedback
    Reveal.tsx                    # scroll-triggered fade-up wrapper, reduced-motion safe
    Footer.tsx                    # plain light footer, matches sibling convention
  sections/
    Hero.tsx                      # centered, yellow underline accent under the headline
    TrustStrip.tsx                 # "Used by" — 3 client names, plain text — see Known gaps
    WhyBlock.tsx                  # "stop renting access to your own data."
    Phases.tsx                    # six expanded product sections grouped under 4 phase headlines — see above
    Pricing.tsx                   # "two ways to buy" — individually (link to #suite) vs. the
                                   # full-suite bundle with a PM, $TBA — solid yellow CTA band
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
build spec) were updated to match in the same session. Internal id (`project-base`) is
unchanged; the label and the URL both changed — the tile now points at `launchplanner.com.au`
(confirmed against the agency site's own nav), not the old `projectbase.com.au`, which was
stale in all three repos' switchers until this session fixed it everywhere.

### "Book a call"

Nav and the Pricing bundle card both link to `https://www.projectprofile.agency/discovery`
in a new tab — confirmed live (title "Book a Discovery Call | Project Profile") as the real
scheduler, not a guess. It's the agency's own discovery-call booking page; there's no
separate scheduler for the software suite specifically.

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

1. **Pricing shows `$XXX`** (individual tools) **and `$TBA`** (the full-suite bundle) — both
   deliberately left as placeholders.
2. **"Start a project" CTAs point nowhere real** (`#`, in-page anchors) — needs a real
   contact flow: a form, a Calendly link, or an email address. ("Book a call" is wired up
   for real, to `/discovery` — this is specifically about the "Start a project" buttons.)
3. **No custom domain attached in Vercel yet** — see Deployment above.
4. **No downloadable asset yet.** Mark said his team will produce one (a sample report or
   similar) — there's nowhere on the page to link it to yet, add a download CTA once it
   exists.
5. **TrustStrip shows client company names as plain text, not logos or specific projects.**
   Recommended project names over company logos (matches the pattern already live on
   `projectprofile.agency/discovery`, which lists specific projects — "Monarch Residences,"
   "Ashbourne," etc. — not developer logos) but don't have real project names for
   Consolidated Properties/Stockwell/RV Lifestyle to use, so it's just their company names
   for now. Also worth noting: using a client's name publicly typically needs their sign-off
   — confirm permission before this ships, whichever direction it goes.
6. **No real product screenshots** in the expanded Phases sections — see the note above.
