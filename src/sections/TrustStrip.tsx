import { Reveal } from '@/components/Reveal'

// TODO: swap for real project names or logos once confirmed — see CLAUDE.md.
// These are the three client names Mark gave directly; shown as plain text
// rather than fabricated logo marks or project names we don't have.
const CLIENTS = ['Consolidated Properties', 'Stockwell', 'RV Lifestyle']

export function TrustStrip() {
  return (
    <section className="bg-background py-10 border-b border-border">
      <Reveal>
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground shrink-0">
            Used by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {CLIENTS.map((name) => (
              <span key={name} className="text-base font-bold text-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
