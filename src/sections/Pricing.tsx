import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

const DISCOVERY_URL = 'https://www.projectprofile.agency/discovery'

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
              <p className="mt-4 text-base leading-relaxed text-muted-foreground flex-1">
                Pick any tool from the six above — each has its own plan on its own site.
                Start with one, add more as the project needs them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-card p-8 sm:p-10 flex flex-col text-white" style={{ background: '#000000' }}>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/60">
                The full suite
              </p>
              <h3 className="display mt-3 text-2xl sm:text-3xl">
                everything included, with a project manager.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/70 flex-1">
                Every tool in the suite, run for you by a dedicated project manager, for one
                lump sum.
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-extrabold leading-none text-3xl sm:text-4xl">$TBA</span>
                <span className="text-sm text-white/60">lump sum, per project</span>
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
