import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-24 sm:py-32">
      <div className="container max-w-3xl">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            one project. one price. everything included.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 text-xl leading-snug text-muted-foreground max-w-xl">
            Per project, not per seat. Everything in the suite, included. One project live at
            a time.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="font-extrabold leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 6rem)' }}>
              $XXX
            </span>
            <span className="text-lg text-muted-foreground">per project</span>
          </div>
        </Reveal>

        <Reveal delay={240}>
          {/* TODO: point at the real contact flow — form, Calendly, or email — once Mark confirms it. */}
          <ButtonLink id="contact" href="#" className="mt-10">
            Start a project
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
