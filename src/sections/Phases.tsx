import { CalendarClock, CheckCircle2, TrendingUp, RefreshCcw, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const PHASES: {
  number: string
  tool: string
  icon: LucideIcon
  headline: React.ReactNode
  body: React.ReactNode
}[] = [
  {
    number: '01',
    tool: 'Launch Planner',
    icon: CalendarClock,
    headline: (
      <>
        every deliverable, every supplier, every dollar.
        <br />
        on one schedule.
      </>
    ),
    body: (
      <>
        Enter the project once. Select the deliverables, add contractors against each one,
        and track them to spec, on time, on budget. The output: a live schedule of what goes
        on sale and when, and a running cost list for every dollar spent.
      </>
    ),
  },
  {
    number: '02',
    tool: 'Content Proof · Ad Proof · Conversion Pages',
    icon: CheckCircle2,
    headline: <>get to market without the back and forth.</>,
    body: (
      <>
        Approvals and landing pages, in one flow. Send creative for sign-off, publish the
        page it points to, and launch — without a single email thread.
      </>
    ),
  },
  {
    number: '03',
    tool: 'Campaign Report',
    icon: TrendingUp,
    headline: <>see what's actually selling.</>,
    body: (
      <>
        Attribution through to sale, not just to lead. Know which channel, which campaign,
        and which dollar put a buyer under contract.
      </>
    ),
  },
  {
    number: '04',
    tool: 'Lead Reactivation',
    icon: RefreshCcw,
    headline: <>your next buyer is already in your database.</>,
    body: (
      <>
        Turn the leads already sitting cold in your database into buyers, without spending
        another dollar to find them.
      </>
    ),
  },
]

export function Phases() {
  return (
    <section id="suite" className="bg-background py-24 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Six tools. Four phases.
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              everything from launch to sale, in one suite.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            return (
              <Reveal key={phase.number} delay={(i % 2) * 60}>
                <div className="h-full rounded-card border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center justify-center rounded-xl"
                      style={{ width: 48, height: 48, background: 'rgba(255,214,0,0.14)' }}
                    >
                      <Icon size={22} color="#000000" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground/50">{phase.number}</span>
                  </div>

                  <h3 className="display mt-6 text-2xl sm:text-[1.75rem] leading-[1.08]">{phase.headline}</h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    {phase.tool}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{phase.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
