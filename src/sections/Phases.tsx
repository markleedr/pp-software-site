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

interface Product {
  name: string
  url: string
  tagline: string
  icon: LucideIcon
  description: string
  benefits: string[]
  checklist: string[]
}

interface PhaseGroup {
  number: string
  headline: React.ReactNode
  products: Product[]
}

// Product descriptions, benefits and checklists are pulled from Mark's own
// live sites (projectprofile.agency/software, adproof.com.au,
// contentproof.com.au) — real, already-published copy, not invented here.
// Phase headlines are the locked copy from the earlier round.
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
        tagline: 'Scope, quote and plan with precision',
        icon: CalendarClock,
        description:
          'A planning tool for property marketing scopes. Set out every service and deliverable, generate schedules, and produce itemised costings — stakeholders see the full picture from the start.',
        benefits: [
          'Reduces planning time significantly',
          'Eliminates scope creep with clear documentation',
          'Aligns teams with shared project visibility',
        ],
        checklist: [
          'Full service and deliverable list',
          'Instant schedule generation with dependencies',
          'Itemised costings and budget tracking',
          'Auto-generated project scope documents',
          'Timeline visualisation with Gantt charts',
          'Stakeholder sharing and collaboration',
        ],
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
          'Build, proof, and publish property content, with every revision, approval, and sign-off in one place. No more email threads, no more guessing who approved what.',
        benefits: [
          "No more email threads or guessing who approved what",
          'Every proof checked against brand guidelines before it goes out',
          'One-click approval — no login required for clients',
        ],
        checklist: [
          'Bulk content import from a spreadsheet',
          'Automatic brand and copy checks',
          'All formats and placements — Facebook, Instagram, LinkedIn',
          'Magic-link approvals, versioned and traceable',
        ],
      },
      {
        name: 'Ad Proof',
        url: 'https://adproof.com.au/',
        tagline: 'Streamline your client approval workflow',
        icon: Megaphone,
        description:
          'Create beautiful ad previews, collect feedback, and get sign-off, all in one place, across Facebook, Instagram, LinkedIn and Google.',
        benefits: [
          'See exactly how ads look on every platform before they launch',
          'Clients approve through a password-free proof link',
          'Feedback and revisions logged against every ad',
        ],
        checklist: [
          'Multi-platform previews (Facebook, Instagram, LinkedIn, Google)',
          'Every ad format — images, carousels, video, stories, reels',
          'Campaign organisation across clients and projects',
          'Branded PDF exports',
          'Push approved Performance Max proofs straight to Google Ads',
        ],
      },
      {
        name: 'Conversion Pages',
        url: 'https://www.conversionpages.com.au/',
        tagline: 'High-converting landing pages',
        icon: LayoutTemplate,
        description:
          'A landing page tool for property projects, built to be set up without developer involvement. Choose from templates designed for off-the-plan campaigns or build custom designs, add popups and sticky bars, and connect your own domain.',
        benefits: [
          'Launch landing pages in hours, not weeks',
          'Increase conversion rates by up to 40%',
          'Own your lead capture experience',
        ],
        checklist: [
          'Pre-built templates or custom designs',
          'Popups and sticky bars for lead capture',
          'Custom domain support',
          'Lead reporting dashboard',
          'A/B testing',
          'Mobile-optimised by default',
        ],
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
        tagline: 'Performance reporting on a schedule',
        icon: TrendingUp,
        description:
          'Pulls data from your marketing platforms and generates branded reports on a set schedule. Set custom targets and KPIs, and schedule reports to go out weekly, monthly, or quarterly.',
        benefits: [
          'Reduces time spent on manual reporting',
          'Reports formatted for developer and stakeholder review',
          'Tracks performance against targets set at the start of the campaign',
        ],
        checklist: [
          'Connect all major ad platforms',
          'Custom targets and KPI tracking',
          'Lead, content and email reports',
          'Automated scheduling — weekly, monthly, quarterly',
          'Branded PDF exports',
          'Historical comparison and trends',
        ],
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
        tagline: 'Re-engage dormant databases',
        icon: RefreshCcw,
        description:
          'Breathes new life into your dormant leads. Use SMS, phone, and email outreach to re-engage old databases, connect interested leads with sales agents, and reclassify your entire database.',
        benefits: [
          "Re-engages leads that didn't convert the first time",
          'Reduces cost per acquisition',
          'Connects interested leads back to sales agents',
        ],
        checklist: [
          'Multi-channel outreach — SMS, phone, email',
          'Define project details and desired outcomes',
          'Connect warm leads with sales agents',
          'Reclassify and clean your database',
          'Automated follow-up sequences',
          'Performance tracking and reporting',
        ],
      },
    ],
  },
]

function ProductSection({ product }: { product: Product }) {
  const Icon = product.icon
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-16 items-start py-10">
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
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-black/70 transition-colors"
        >
          More about {product.name} <span aria-hidden>→</span>
        </a>
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
  )
}

export function Phases() {
  return (
    <section id="suite" className="bg-background">
      <div className="container py-24 sm:py-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Six tools. Four phases.
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              everything from launch to sale, in one suite.
            </h2>
          </div>
        </Reveal>
      </div>

      {PHASE_GROUPS.map((phase, i) => (
        <div key={phase.number} className={i % 2 === 1 ? 'bg-muted' : 'bg-background'}>
          <div className="container py-16 sm:py-20">
            <Reveal>
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
