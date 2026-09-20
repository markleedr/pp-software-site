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
The per-product description/benefit copy in `Phases.tsx` came from a live interview with
Mark (pp-ama skill — one question per product, until confident enough to write from) about
what each tool actually changes for the customer, not what it does — see "Expanded product
sections" below for the specifics that came out of it. The checklists stayed closer to the
literal feature copy pulled from Mark's live sites in an earlier pass, corrected wherever
the interview revealed the source copy had the wrong scope.

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
model to follow.

The tagline/description/benefits are outcome-first, Apple-voice copy from the pp-ama
interview, not lifted from any live site. The interview also corrected real scope gaps the
first pass (sourced from the live sites) had gotten wrong:
- **Content Proof** isn't social-only — it proofs every content type (social, blog, EDMs,
  the project brochure) in one place, not a different process per type.
- **Conversion Pages** isn't "a landing page tool" — it carries a project's whole web
  presence across its lifecycle (coming soon → register interest → full site), wired into
  the CRM, with pages that improve themselves automatically over time.
- **Campaign Report** isn't just scheduled reporting — it includes a campaign flow chart
  that shows exactly where a campaign is dropping off, and attribution runs through to the
  sale, not just the lead.

Checklists stayed closer to literal feature/spec detail (that's their job) but were updated
to match these corrected scopes. If a product's real copy changes on its own site, or the
product itself changes, this page will drift out of sync until someone updates it here too.

**Real product screenshots — all 6 of 6 tools done; positioning fixed for all six.** The
screenshot/placeholder lives in the LEFT column, directly under each product's "More
about X" button, not full-width below the whole section — the original placement (a
lone thumbnail below both columns) left it orphaned, disconnected from the text it
illustrates, with a large dead patch of whitespace next to it. `ImageGallery.tsx` renders
one of three states from a product's `images` array: empty → a dashed-border "Screenshot
coming soon" placeholder (never a fabricated screenshot — see below); one image → full
column width, `aspect-video`, rounded corners, `shadow-lg` for presence; 2+ images → the
same, in a horizontal scroll-snap filmstrip with left/right arrows. Launch Planner,
Conversion Pages, Campaign Report, and Lead Reactivation use a "floating dashboard cards
in a browser-chrome frame" mockup style (macOS traffic lights, address bar, individual UI
cards with their own shadows on a plain background) — Campaign Report's earlier real
screenshot (a literal full in-app dashboard crop) was replaced with this style once Mark
decided between the two options discussed in chat. Ad Proof got two screenshots in this
same floating-card style (no browser chrome this time, just the cards) — a single-ad
review modal and a bulk-approve queue view — added together as a 2-image gallery since
they show different, complementary parts of the flow rather than competing takes on the
same screen; Mark's instruction was "replace with the new image" (singular) so this is a
judgment call worth flagging — if he only wanted one, dropping either import from
`images: [adProofReview, adProofBulkQueue]` in `Phases.tsx` is a one-line change. Content
Proof instead got a literal full in-app screenshot (dense, dark sidebar, no browser
chrome) — visibly a different style from the other five; flagged to Mark, not resolved,
purely a visual-consistency call, not a factual problem. Same drop-in pattern for any
future replacement: save under `src/assets/screenshots/`, import it in `Phases.tsx`, add
it to that product's `images` array, no other change needed. Fabricating a screenshot
with invented numbers would misrepresent the actual product — that's why every product got
a placeholder rather than
a fake one while its real screenshot was pending.

**Section rhythm:** don't put two centred, similarly-styled headline blocks back to back —
Mark flagged an earlier version where the Phases section opened with its own big centred
headline directly under WhyBlock's, which read as a duplicate and killed the background
contrast between them (both landed on white). The fix: Phases now opens straight into
"PHASE 01" with no separate intro block; the small "Six tools. Four phases." eyebrow is
folded into phase 1's kicker instead of standing alone. Keep this in mind before adding any
new section-level heading near an existing one.

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
                                   # (white-on-yellow), outline, outlineOnDark, dark
                                   # (black — used for the "More about X" product links so
                                   # they read as real buttons, not text); active:scale press feedback
    ImageGallery.tsx               # scroll-snap image gallery for product sections — see Phases note above
    Reveal.tsx                    # scroll-triggered fade-up wrapper, reduced-motion safe
    Footer.tsx                    # plain light footer, matches sibling convention
  sections/
    Hero.tsx                      # centered, yellow underline accent under the headline
    TrustStrip.tsx                 # "Trusted by" — 9 real projects, all with real logos, on a
                                   # continuously scrolling (CSS marquee) track — see Known gaps
    WhyBlock.tsx                  # "stop renting access to your own data."
    Phases.tsx                    # six expanded product sections grouped under 4 phase headlines — see above
    Pricing.tsx                   # "two ways to buy" — individually (tool list, green ticks,
                                   # no prices shown) vs. the full-suite bundle (5 tools,
                                   # monthly subscription, $899/mo — see Known gaps)
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

1. **Bundle price ($899/mo) is Claude's recommendation, not a confirmed figure — check with
   Mark before this ships.** Individual tool pricing is real (Launch Planner $49/mo, Content
   Proof $224/mo, Ad Proof $224/mo, Conversion Pages $249/mo, Campaign Report from $449/mo,
   Lead Reactivation priced on its own site — sums to $1,195/mo for the five bundled tools),
   but the "Individually" pricing card no longer displays those numbers — Mark asked for
   green tick icons instead (availability, not price; see `SUITE_TOOLS` in `Pricing.tsx`).
   The full-suite card shows `$899/mo` (`BUNDLE_PRICE` in `Pricing.tsx`) with a "$296 less
   than buying them separately" line computed from `INDIVIDUAL_TOTAL - BUNDLE_PRICE` — a
   ~25% discount off the $1,195 individual total, recommended over a smaller ~17%
   discount ($999/mo) because a shallow discount undercuts the "cheaper than buying
   individually" claim in the copy above it. Mark asked for a recommendation rather than
   giving a figure — change `BUNDLE_PRICE` (and the two body-copy sentences either side of
   it if the framing needs to shift) once he confirms a number. The earlier "lump sum, run
   for you by a project manager" framing was wrong (it also read as the Managed Services
   offer, which this site deliberately never mentions — software, not services) and has
   been replaced.
2. **"Start a project" CTAs point nowhere real** (`#`, in-page anchors) — needs a real
   contact flow: a form, a Calendly link, or an email address. ("Book a call" is wired up
   for real, to `/discovery` — this is specifically about the "Start a project" buttons.)
3. **No custom domain attached in Vercel yet** — see Deployment above.
4. **No downloadable asset yet.** Mark said his team will produce one (a sample report or
   similar) — there's nowhere on the page to link it to yet, add a download CTA once it
   exists.
5. **TrustStrip: all 9 remaining projects now have real logos** (`src/assets/logos/`) —
   CPG (Consolidated Properties Group), Stockwell, RV Lifestyle, Rhodes on Melbourne, Noosa
   Civic, Monarch Residences, Bankside, Solana Lifestyle Resorts, Wirra Neutral Bay. All
   were trimmed with Pillow to their actual visible content (the source files had wildly
   inconsistent baked-in padding — some near-zero, RV Lifestyle's had almost half the
   canvas as whitespace above/below the mark, and the four latest arrived on solid
   cream/white backgrounds that needed flood-fill transparency before trimming — so a
   uniform bounding box on the untrimmed originals produced wildly inconsistent visual
   sizes) and resized to a 160px-tall max before saving, then displayed at a uniform height
   with `grayscale + opacity-75`, full colour on hover — except Bankside, which is exempt
   from that treatment (its logo is a very pale cream; grayscale + 75% opacity made it
   nearly invisible against the white background, so it's shown at near-full opacity and
   full colour always). "Bankside West End" and "51 Fish Lane" were removed from the strip
   entirely — the Bankside logo supplied reads "Bankside — the West End Way", confirming
   they were the same project under two names, not two separate ones. "Wira Neutral Bay" is
   now spelled "Wirra Neutral Bay" (double R), corrected against the real logo. The strip
   heading now reads "Trusted by" (was "Projects running on the suite"), and the row scrolls
   continuously (CSS marquee, `tailwind.config.ts`'s `animate-marquee`, 32s per loop, pauses
   on hover, respects `prefers-reduced-motion` via the same global rule `Reveal.tsx` relies
   on) instead of wrapping to a static centred block — the project list is duplicated once
   in the DOM for a seamless loop. The "Colliers" logo flagged in an earlier session (not
   one of the original project list) is still unresolved — separate from this list, ask
   Mark if it needs adding anywhere. Using a project's name or logo publicly typically needs
   sign-off from whoever owns it — worth confirming before this ships.
6. **Product screenshots: all 6 of 6 tools done.** Launch Planner, Conversion Pages,
   Campaign Report and Lead Reactivation all use the same "floating dashboard cards in a
   browser-chrome frame" mockup style (`src/assets/screenshots/launch-planner-dashboard.png`,
   `conversion-pages-builder.png`, `campaign-report-insights.png`, `lead-reactivation-outreach.png`).
   **Ad Proof shows two** (`ad-proof-review.png`, `ad-proof-bulk-queue.png`) in a 2-image
   scroll-snap gallery — a single-ad review modal and a bulk-approve queue, added together
   because they're different views rather than style alternatives. Mark's instruction
   ("replace with the new image", singular) is ambiguous about whether he wanted one or
   both — worth confirming; dropping one from `images: [adProofReview, adProofBulkQueue]`
   in `Phases.tsx` is a one-line fix if so. **Content Proof** has a real screenshot too
   (`content-proof-approval-queue.png`) but in a visibly different style — a literal full
   in-app crop (dense, dark sidebar), not the browser-chrome/floating-card treatment the
   other four share. Worth asking Mark whether to redo it to match, or leave it — flagged,
   not resolved, a consistency call rather than a correctness one. See "Real product
   screenshots" above for the positioning fix (left column, under the CTA button) that
   shipped alongside the first of these.
