import { Reveal } from '@/components/Reveal'

const PHASES = [
  {
    number: '01',
    tool: 'Launch Planner',
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
        and track them to spec, on time, on budget.
        <br />
        <br />
        The output: a live schedule of what goes on sale and when, and a running cost list
        for every dollar spent.
      </>
    ),
  },
  {
    number: '02',
    tool: 'Content Proof · Ad Proof · Conversion Pages',
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
    headline: <>your next buyer is already in your database.</>,
    body: (
      <>
        Turn the leads already sitting cold in your database into buyers, without spending
        another dollar to find them.
      </>
    ),
  },
] as const

export function Phases() {
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Six tools. Four phases.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20 sm:gap-28">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.number} delay={i % 2 === 0 ? 0 : 60}>
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 lg:gap-16 items-start">
                <div
                  className="select-none leading-none font-extrabold"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 7rem)',
                    color: 'hsl(var(--muted-foreground) / 0.18)',
                  }}
                  aria-hidden
                >
                  {phase.number}
                </div>

                <div>
                  <h3 className="display text-3xl sm:text-4xl lg:text-5xl">{phase.headline}</h3>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    {phase.tool}
                  </p>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {phase.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
