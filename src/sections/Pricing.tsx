import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28" style={{ background: '#FFD600' }}>
      <div className="container max-w-2xl text-center mx-auto">
        <Reveal>
          <h2 className="display text-black text-4xl sm:text-5xl">
            one project. one price. everything included.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-5 text-lg sm:text-xl leading-snug text-black/70 max-w-xl mx-auto">
            Per project, not per seat. Everything in the suite, included. One project live at
            a time.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
            <span
              className="text-black font-extrabold leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
            >
              $XXX
            </span>
            <span className="text-lg text-black/70">per project</span>
          </div>
        </Reveal>

        <Reveal delay={240}>
          {/* TODO: point at the real contact flow — form, Calendly, or email — once Mark confirms it. */}
          <ButtonLink id="contact" href="#" variant="onAccent" className="mt-10">
            Start a project
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
