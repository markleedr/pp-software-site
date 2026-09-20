import { Reveal } from '@/components/Reveal'

export function WhyBlock() {
  return (
    <section id="why" className="bg-muted py-24 sm:py-28">
      <div className="container max-w-2xl text-center mx-auto">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl">stop renting access to your own data.</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 text-lg sm:text-xl leading-snug text-muted-foreground">
            <p>Your agency holds the leads.</p>
            <p>The reports arrive when they arrive.</p>
            <p>The answers come when someone's free.</p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-7 text-lg sm:text-xl font-semibold text-foreground">Not anymore.</p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-3 text-lg sm:text-xl leading-snug text-foreground">
            Every lead, every dollar, every result — in your account, live.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-8 text-sm text-muted-foreground max-w-lg mx-auto">
            This isn't agency versus no agency. It's about who holds the data, and who's in
            control of the project.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
