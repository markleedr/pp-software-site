import { Reveal } from '@/components/Reveal'
import cpgLogo from '@/assets/logos/cpg.png'
import stockwellLogo from '@/assets/logos/stockwell.png'
import rvLifestyleLogo from '@/assets/logos/rv-lifestyle.png'
import rhodesLogo from '@/assets/logos/rhodes-on-melbourne.png'
import noosaCivicLogo from '@/assets/logos/noosa-civic.png'
import monarchResidencesLogo from '@/assets/logos/monarch-residences.png'
import banksideLogo from '@/assets/logos/bankside.png'
import solanaLogo from '@/assets/logos/solana-lifestyle-resorts.png'
import wiraNeutralBayLogo from '@/assets/logos/wira-neutral-bay.png'

// Real projects, in the order Mark supplied them. Logos land here as Mark
// sends them — entries without one yet fall back to plain text so nothing
// disappears from the strip while it's a work in progress. "Bankside West
// End" and "51 Fish Lane" were dropped: the Bankside logo Mark sent reads
// "Bankside — the West End Way", confirming those were the same project
// under two names, not two projects. "Wira Neutral Bay" is corrected to
// "Wirra Neutral Bay" (double R) to match the real logo — the project list
// had it misspelled.
type Project = { name: string; logo?: string }

const PROJECTS: Project[] = [
  { name: 'Monarch Residences', logo: monarchResidencesLogo },
  { name: 'CPG', logo: cpgLogo },
  { name: 'Bankside', logo: banksideLogo },
  { name: 'Solana Lifestyle Resorts', logo: solanaLogo },
  { name: 'Stockwell', logo: stockwellLogo },
  { name: 'Rhodes on Melbourne', logo: rhodesLogo },
  { name: 'Wirra Neutral Bay', logo: wiraNeutralBayLogo },
  { name: 'RV Lifestyle', logo: rvLifestyleLogo },
  { name: 'Noosa Civic Shopping Centre', logo: noosaCivicLogo },
]

export function TrustStrip() {
  return (
    <section className="bg-background py-10 border-b border-border">
      <Reveal>
        <div className="container text-center">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Projects running on the suite
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 max-w-4xl mx-auto">
            {PROJECTS.map((project) =>
              project.logo ? (
                <img
                  key={project.name}
                  src={project.logo}
                  alt={project.name}
                  className="h-9 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
                />
              ) : (
                <span
                  key={project.name}
                  className="text-sm font-semibold text-foreground/60"
                >
                  {project.name}
                </span>
              ),
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
