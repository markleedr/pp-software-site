import { Reveal } from '@/components/Reveal'

// Real project names, supplied directly by Mark. Note: corrected two
// apparent typos against his own spelling elsewhere in the same list
// ("Stockwel" -> "Stockwell", "Banksdie West End" -> "Bankside West End",
// matching "Bankside" spelled correctly two entries earlier). Everything
// else is verbatim — flag if any of these need correcting.
const PROJECTS = [
  'Monarch Residences',
  'CPG',
  'Bankside',
  'Solana Lifestyle Resorts',
  'Stockwell',
  'Rhodes on Melbourne',
  'Wira Neutral Bay',
  'Bankside West End',
  'RV Lifestyle',
  '51 Fish Lane',
  'Noosa Civic Shopping Centre',
]

export function TrustStrip() {
  return (
    <section className="bg-background py-10 border-b border-border">
      <Reveal>
        <div className="container text-center">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Projects running on the suite
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 max-w-3xl mx-auto">
            {PROJECTS.map((name) => (
              <span key={name} className="text-sm font-semibold text-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
