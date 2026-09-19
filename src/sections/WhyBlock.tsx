import { Reveal } from '@/components/Reveal'

export function WhyBlock() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container max-w-3xl">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            stop renting access to your own data.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 text-xl sm:text-2xl leading-snug text-muted-foreground">
            <p>Your agency holds the leads.</p>
            <p>The reports arrive when they arrive.</p>
            <p>The answers come when someone's free.</p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 text-xl sm:text-2xl font-semibold text-foreground">Not anymore.</p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-4 text-xl sm:text-2xl leading-snug text-foreground">
            Every lead, every dollar, every result — in your account, live.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 text-sm text-muted-foreground max-w-xl">
            This isn't agency versus no agency. It's about who holds the data, and who's in
            control of the project.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
