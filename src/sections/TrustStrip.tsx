import { Reveal } from '@/components/Reveal'
import cpgLogo from '@/assets/logos/cpg.png'
import stockwellLogo from '@/assets/logos/stockwell.png'
import rvLifestyleLogo from '@/assets/logos/rv-lifestyle.png'
import rhodesLogo from '@/assets/logos/rhodes-on-melbourne.png'
import noosaCivicLogo from '@/assets/logos/noosa-civic.png'

// Real projects, in the order Mark supplied them. Logos land here as Mark
// sends them — entries without one yet fall back to plain text so nothing
// disappears from the strip while it's a work in progress. Two more logos
// (Solana Lifestyle Resorts, and a "Colliers" logo that wasn't on the
// original project list — flagged, not yet added) arrived inline in chat
// without a retrievable file path, so they couldn't be saved; re-send as an
// upload/attachment to get them in.
type Project = { name: string; logo?: string }

const PROJECTS: Project[] = [
  { name: 'Monarch Residences' },
  { name: 'CPG', logo: cpgLogo },
  { name: 'Bankside' },
  { name: 'Solana Lifestyle Resorts' },
  { name: 'Stockwell', logo: stockwellLogo },
  { name: 'Rhodes on Melbourne', logo: rhodesLogo },
  { name: 'Wira Neutral Bay' },
  { name: 'Bankside West End' },
  { name: 'RV Lifestyle', logo: rvLifestyleLogo },
  { name: '51 Fish Lane' },
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
