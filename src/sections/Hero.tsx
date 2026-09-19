import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-black">
      {/*
        Placeholder for hero photography — warm dusk-toned architectural gradient
        standing in for a full-bleed exterior/interior shot per brand imagery
        rules (naturalistic, warm, no heavy filters). Swap for a real photo
        before this ships; needs sourcing.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 20%, #2b2620 0%, #171512 45%, #0a0a0a 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="container relative pb-20 pt-40 sm:pb-28">
        <Reveal>
          <h1 className="display text-white text-[2.75rem] leading-[0.98] sm:text-[4rem] lg:text-[5.25rem] max-w-3xl">
            everything under one roof.
            <br />
            including the roof.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-md leading-snug">
            Software for property marketing.
            <br />
            Plan, launch, measure, sell.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <ButtonLink href="#pricing" className="mt-9">
            Start a project
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
