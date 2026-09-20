import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import heroBuilding from '@/assets/hero-building.jpg'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      <img
        src={heroBuilding}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" />

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
