import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

const DISCOVERY_URL = 'https://www.projectprofile.agency/discovery'

const INDIVIDUAL_PRICES = [
  { name: 'Launch Planner', price: '$49/mo' },
  { name: 'Content Proof', price: '$224/mo' },
  { name: 'Ad Proof', price: '$224/mo' },
  { name: 'Conversion Pages', price: '$249/mo' },
  { name: 'Campaign Report', price: 'from $449/mo' },
  { name: 'Lead Reactivation', price: 'own pricing' },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28" style={{ background: '#FFD600' }}>
      <div className="container">
        <Reveal>
          <h2 className="display text-black text-center text-4xl sm:text-5xl max-w-2xl mx-auto">
            two ways to buy.
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
                {INDIVIDUAL_PRICES.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between text-sm border-b border-border pb-2.5">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{item.price}</span>
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
                <span className="font-extrabold leading-none text-3xl sm:text-4xl">$TBA</span>
                <span className="text-sm text-white/60">per month, for all five tools</span>
              </div>
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
