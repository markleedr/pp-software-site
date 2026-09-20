import {
  CalendarClock,
  FileCheck2,
  Megaphone,
  LayoutTemplate,
  TrendingUp,
  RefreshCcw,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { ButtonLink } from '@/components/Button'
import { ImageGallery } from '@/components/ImageGallery'
import launchPlannerDashboard from '@/assets/screenshots/launch-planner-dashboard.png'
import conversionPagesBuilder from '@/assets/screenshots/conversion-pages-builder.png'
import campaignReportInsights from '@/assets/screenshots/campaign-report-insights.png'
import leadReactivationOutreach from '@/assets/screenshots/lead-reactivation-outreach.png'
import contentProofApprovalQueue from '@/assets/screenshots/content-proof-approval-queue.png'
import adProofReview from '@/assets/screenshots/ad-proof-review.png'
import adProofBulkQueue from '@/assets/screenshots/ad-proof-bulk-queue.png'

interface Product {
  name: string
  url: string
  tagline: string
  icon: LucideIcon
  description: string
  benefits: string[]
  checklist: string[]
  // Real screenshots — see CLAUDE.md. Once Mark supplies one for the
  // remaining tool, drop the URL in here — the gallery in the left column
  // renders it in place of the "coming soon" placeholder automatically.
  // Illustrative fictional demo data ("Riverside/Riverfront Residences"),
  // never real client data.
  images?: string[]
}

interface PhaseGroup {
  number: string
  headline: React.ReactNode
  products: Product[]
}

// Description/benefits copy rewritten from Mark's answers in an interview
// (pp-ama) round — outcome-first, not the feature-list phrasing pulled from
// the live sites in the previous round. Checklists stay closer to literal
// feature/spec detail (that's their job), corrected where Mark's answers
// revealed the source copy undersold or mis-scoped a product (Content
// Proof isn't social-only; Conversion Pages is the whole site lifecycle,
// not just landing pages; Campaign Report includes drop-off and sales
// attribution, not just scheduled reports). Phase headlines are the
// locked copy from an earlier round.
const PHASE_GROUPS: PhaseGroup[] = [
  {
    number: '01',
    headline: (
      <>
        every deliverable, every supplier, every dollar.
        <br />
        on one schedule.
      </>
    ),
    products: [
      {
        name: 'Launch Planner',
        url: 'https://launchplanner.com.au/',
        tagline: 'Built for property. Not borrowed from somewhere else.',
        icon: CalendarClock,
        description:
          'Property marketing has always run on spreadsheets, email chains and tools built for someone else’s industry. Launch Planner is the first one built for this: take a project from planning to implementation without losing a render, an EDM or a supplier along the way.',
        benefits: [
          'Nothing falls through the cracks between planning and go-live',
          'One place to plan, instead of a patchwork of spreadsheets and inboxes',
          'Built specifically for property marketing, not adapted from something else',
        ],
        checklist: [
          'Full service and deliverable list',
          'Instant schedule generation with dependencies',
          'Itemised costings and budget tracking',
          'Auto-generated project scope documents',
          'Timeline visualisation with Gantt charts',
          'Stakeholder sharing and collaboration',
        ],
        images: [launchPlannerDashboard],
      },
    ],
  },
  {
    number: '02',
    headline: <>get to market without the back and forth.</>,
    products: [
      {
        name: 'Content Proof',
        url: 'https://contentproof.com.au/',
        tagline: 'Content approved. Chaos contained.',
        icon: FileCheck2,
        description:
          'Social posts, blog articles, EDMs, even the project brochure — every piece usually goes through its own approval process. Content Proof handles all of it in one place, so nothing off-brand reaches a client or the public, and nobody’s chasing sign-off over email.',
        benefits: [
          'One approval process for every content type — social, blog, email and brochures',
          'Nothing off-brand reaches a client or the public',
          'No more chasing sign-off across email threads',
        ],
        checklist: [
          'Social posts, blog articles, EDMs and brochures, all in one place',
          'Automatic brand and copy checks before anything goes out',
          'Bulk content import from a spreadsheet',
          'Magic-link approvals, versioned and traceable',
        ],
        images: [contentProofApprovalQueue],
      },
      {
        name: 'Ad Proof',
        url: 'https://adproof.com.au/',
        tagline: 'From ad brief to live campaign, in one flow.',
        icon: Megaphone,
        description:
          'Build ads for every platform and placement, get them approved without the back-and-forth, and publish straight to the ad account — without leaving the tool.',
        benefits: [
          'One flow from ad creation to a live campaign',
          'Approvals without the back-and-forth',
          'Publish straight to Meta and Google — no re-uploading, no re-checking',
        ],
        checklist: [
          'Multi-platform previews — Facebook, Instagram, LinkedIn, Google',
          'Every ad format — images, carousels, video, stories, reels',
          'Campaign organisation across clients and projects',
          'Branded PDF exports',
          'Push approved Performance Max proofs straight to Google Ads',
        ],
        images: [adProofReview, adProofBulkQueue],
      },
      {
        name: 'Conversion Pages',
        url: 'https://www.conversionpages.com.au/',
        tagline: 'From coming soon to sold out, one page.',
        icon: LayoutTemplate,
        description:
          'A project’s web presence isn’t one page — it’s several, over the life of the campaign: a coming-soon teaser, a register-your-interest page, then the full site. Conversion Pages carries a project through all of them, wired straight into your CRM, with the page automatically improving as it runs.',
        benefits: [
          'One tool follows the project from coming soon to fully sold',
          'Leads flow straight into your CRM, not a disconnected form',
          'The page keeps improving on its own — you don’t have to rebuild it',
        ],
        checklist: [
          'Coming soon, register interest and full project site templates',
          'Integrated with your CRM',
          'Automated updates that improve lead capture over time',
          'Custom domain support',
          'Mobile-optimised by default',
        ],
        images: [conversionPagesBuilder],
      },
    ],
  },
  {
    number: '03',
    headline: <>see what's actually selling.</>,
    products: [
      {
        name: 'Campaign Report',
        url: 'https://www.campaignreport.com.au/',
        tagline: 'Marketing numbers and sales numbers, finally in one report.',
        icon: TrendingUp,
        description:
          'Most reporting stops at the lead — it can’t tell you whether that lead became a sale. Campaign Report connects marketing and sales data, charts exactly where a campaign is dropping off, and traces every sale back to the channel, campaign and dollar that produced it.',
        benefits: [
          'See where the campaign is losing people, not just the final number',
          'Attribution runs through to the sale, not just the lead',
          'Marketing and sales data in one report, not two disconnected ones',
        ],
        checklist: [
          'Connect all major ad platforms',
          'Campaign flow chart — see exactly where drop-off happens',
          'Sales attribution, not just lead attribution',
          'Branded PDF exports',
          'Automated scheduling — weekly, monthly, quarterly',
          'Historical comparison and trends',
        ],
        images: [campaignReportInsights],
      },
    ],
  },
  {
    number: '04',
    headline: <>your next buyer is already in your database.</>,
    products: [
      {
        name: 'Lead Reactivation',
        url: 'https://leadreactivation.com.au/',
        tagline: 'The buyer you already paid to find.',
        icon: RefreshCcw,
        description:
          'You’ve already spent the marketing dollars to find these people once — most of them are still sitting in your database, just not ready yet. Lead Reactivation reopens that conversation at the right time, so you’re not paying to find the same buyer twice.',
        benefits: [
          'Re-engage buyers you already paid to acquire, without paying again',
          "Catches the ones who weren't ready before, but are now",
          'Reclassifies your whole database so sales agents know who’s warm',
        ],
        checklist: [
          'Multi-channel outreach — SMS, phone, email',
          'Define project details and desired outcomes',
          'Connect warm leads with sales agents',
          'Reclassify and clean your database',
          'Automated follow-up sequences',
          'Performance tracking and reporting',
        ],
        images: [leadReactivationOutreach],
      },
    ],
  },
]

function ProductSection({ product }: { product: Product }) {
  const Icon = product.icon
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-16 items-start">
        <div>
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 52, height: 52, background: 'rgba(255,214,0,0.14)' }}
          >
            <Icon size={24} color="#000000" strokeWidth={1.8} />
          </div>
          <h3 className="mt-5 text-2xl font-bold text-foreground">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold" style={{ color: '#B8860B' }}>
            {product.tagline}
          </p>
          <ButtonLink
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            className="mt-5 !px-5 !py-2.5 text-sm"
          >
            More about {product.name} <span aria-hidden className="ml-1">→</span>
          </ButtonLink>

          <div className="mt-8">
            <ImageGallery images={product.images ?? []} alt={product.name} />
          </div>
        </div>

        <div>
          <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 rounded-lg p-5" style={{ background: 'rgba(255,214,0,0.12)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
              Key benefits
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {product.benefits.map((b) => (
                <li key={b} className="text-sm font-medium text-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {product.checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check size={16} className="mt-0.5 shrink-0" color="#000000" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Phases() {
  return (
    <section id="suite" className="bg-background">
      {PHASE_GROUPS.map((phase, i) => (
        <div key={phase.number} className={i % 2 === 1 ? 'bg-muted' : 'bg-background'}>
          <div className="container py-16 sm:py-20">
            <Reveal>
              {i === 0 && (
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground/60 mb-2">
                  Six tools. Four phases.
                </p>
              )}
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Phase {phase.number}
              </p>
              <h3 className="display mt-3 text-3xl sm:text-4xl max-w-3xl">{phase.headline}</h3>
            </Reveal>

            <div className="mt-4 divide-y divide-border">
              {phase.products.map((product) => (
                <Reveal key={product.name}>
                  <ProductSection product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
