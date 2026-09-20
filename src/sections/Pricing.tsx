import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

const DISCOVERY_URL = 'https://www.projectprofile.agency/discovery'

const SUITE_TOOLS = [
  'Launch Planner',
  'Content Proof',
  'Ad Proof',
  'Conversion Pages',
  'Campaign Report',
  'Lead Reactivation',
]

// The five bundled tools' own per-tool prices (Launch Planner $49, Content
// Proof $224, Ad Proof $224, Conversion Pages $249, Campaign Report from
// $449 — Lead Reactivation isn't in the bundle) sum to $1,195/mo. Bundle is
// priced below that so "cheaper than buying individually" is actually true.
const BUNDLE_PRICE = 899
const INDIVIDUAL_TOTAL = 1195

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28" style={{ background: '#FFD600' }}>
      <div className="container">
        <Reveal>
          <h2 className="display text-black text-center text-4xl sm:text-5xl max-w-2xl mx-auto">
            start with one tool. grow into the suite.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="h-full rounded-card bg-white p-8 sm:p-10 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Individually
              </p>
              <h3 className="display mt-3 text-2xl sm:text-3xl">pick what you need.</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Pick any tool from the six above — each has its own plan on its own site.
                Start with one, add more as the project needs them.
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {SUITE_TOOLS.map((name) => (
                  <li key={name} className="flex items-center justify-between text-sm border-b border-border pb-2.5">
                    <span className="font-medium text-foreground">{name}</span>
                    <Check size={18} className="shrink-0 text-green-600" strokeWidth={2.5} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-card p-8 sm:p-10 flex flex-col text-white" style={{ background: '#000000' }}>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/60">
                The full suite
              </p>
              <h3 className="display mt-3 text-2xl sm:text-3xl">
                five tools. one subscription.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/70 flex-1">
                Launch Planner, Content Proof, Ad Proof, Conversion Pages and Campaign Report,
                bundled into one monthly subscription — for less than buying each on its own.
                Lead Reactivation isn't part of the bundle; add it separately if you need it.
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-extrabold leading-none text-3xl sm:text-4xl">${BUNDLE_PRICE}</span>
                <span className="text-sm text-white/60">per month, for all five tools</span>
              </div>
              <p className="mt-2 text-sm text-white/50">
                ${INDIVIDUAL_TOTAL - BUNDLE_PRICE} less than buying them separately (from ${INDIVIDUAL_TOTAL.toLocaleString()}/mo)
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {/* TODO: point at the real contact flow once Mark confirms it. */}
                <ButtonLink href="#" variant="primary">
                  Start a project
                </ButtonLink>
                <ButtonLink href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer" variant="outlineOnDark">
                  Book a call
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
