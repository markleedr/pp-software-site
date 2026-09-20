import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
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
            'radial-gradient(120% 90% at 50% 20%, #2b2620 0%, #171512 45%, #0a0a0a 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="container relative py-24 text-center flex flex-col items-center">
        <Reveal>
          <h1 className="display text-white text-[2.5rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4.5rem] max-w-3xl mx-auto">
            everything under one roof.
            <br />
            including the roof.
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-5 h-1 w-24 rounded-full" style={{ background: '#FFD600' }} />
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 text-lg sm:text-xl text-white/80 max-w-md leading-snug">
            Software for property marketing.
            <br />
            Plan, launch, measure, sell.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="#pricing">Start a project</ButtonLink>
            <ButtonLink href="#suite" variant="outlineOnDark">
              See the suite
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
