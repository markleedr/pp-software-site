import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Button, ButtonLink } from '@/components/Button'
import { cn } from '@/lib/utils'
import { DEMO_URL, startCheckout } from '@/lib/onboarding/api'
import { OnboardingHeader } from '@/pages/OnboardingHeader'
import { pricingConfig } from '@shared/pricing.config'
import {
  computeQuote,
  formatMoney,
  QuoteError,
  type BillingOption,
  type Quote,
  type ServiceId,
  type StageId,
  type TierId,
} from '@shared/pricing'
import { renderAgreementDocument, renderAgreementHtml } from '@shared/agreement'

const STEPS = ['Plan', 'Project', 'Services', 'Review and sign'] as const
const STORAGE_KEY = 'pp-onboarding-v1'

interface State {
  tier: TierId
  projectCount: number
  stage: StageId
  services: ServiceId[]
  billing: BillingOption
  companyName: string
  contactName: string
  contactEmail: string
  firstProjectName: string
}

const initial: State = {
  tier: 'platform',
  projectCount: 1,
  stage: 'launch',
  services: ['launch_planner', 'content_proof', 'ad_proof', 'conversion_pages', 'campaign_report'],
  billing: 'monthly',
  companyName: '',
  contactName: '',
  contactEmail: '',
  firstProjectName: '',
}

// Restores the choices (never the signature) when someone returns from a cancelled checkout.
function load(): State {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? { ...initial, ...JSON.parse(saved) } : initial
  } catch {
    return initial
  }
}

function tryQuote(s: State): Quote | null {
  try {
    return computeQuote(s)
  } catch (err) {
    if (err instanceof QuoteError) return null
    throw err
  }
}

const card = (selected: boolean) =>
  cn(
    'text-left rounded-card border p-5 transition-colors w-full',
    selected ? 'border-black bg-muted ring-1 ring-black' : 'border-border hover:border-black/50',
  )

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [s, setS] = useState<State>(load)
  const [signedName, setSignedName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cancelled = new URLSearchParams(window.location.search).get('cancelled') === '1'

  const patch = (p: Partial<State>) => setS((prev) => ({ ...prev, ...p }))
  const tierCfg = pricingConfig.tiers[s.tier]
  const quote = useMemo(() => tryQuote(s), [s])

  const detailsOk =
    s.companyName.trim() && s.contactName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.contactEmail) && s.firstProjectName.trim()
  const canContinue = [true, s.projectCount >= 1, s.services.length > 0, false][step]

  const agreement = useMemo(() => {
    if (!quote || step !== 3) return ''
    const date = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long' }).format(new Date())
    return renderAgreementHtml(
      quote,
      {
        companyName: s.companyName || '[company name]',
        contactName: s.contactName || '[contact name]',
        contactEmail: s.contactEmail || '[email]',
        firstProjectName: s.firstProjectName || '[project name]',
      },
      date,
    )
  }, [quote, step, s.companyName, s.contactName, s.contactEmail, s.firstProjectName])

  const signedOk = signedName.trim().toLowerCase() === s.contactName.trim().toLowerCase() && signedName.trim() !== ''

  function printAgreement() {
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(renderAgreementDocument(agreement))
    win.document.close()
    win.focus()
    win.print()
  }

  async function pay() {
    if (!quote) return
    setBusy(true)
    setError(null)
    try {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s))
      } catch {
        /* storage blocked: the choices just won't survive a cancelled checkout */
      }
      window.location.href = await startCheckout({
        selections: {
          tier: s.tier,
          projectCount: s.projectCount,
          stage: s.stage,
          services: s.services,
          billing: s.billing,
        },
        companyName: s.companyName,
        contactName: s.contactName,
        contactEmail: s.contactEmail,
        firstProjectName: s.firstProjectName,
        signedName,
        agreed,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setBusy(false)
    }
  }

  const toggleService = (id: ServiceId) =>
    patch({ services: s.services.includes(id) ? s.services.filter((x) => x !== id) : [...s.services, id] })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OnboardingHeader />
      <main className="container py-12 sm:py-16">
        <h1 className="display text-4xl sm:text-5xl max-w-2xl">set up your project.</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Choose a plan, tell us about the project, and see the price as you go. Prices are in AUD and exclude GST.
        </p>
        {cancelled && (
          <p role="status" className="mt-4 rounded-card bg-muted px-4 py-3 text-sm">
            Checkout was cancelled. Nothing was charged, and your choices are still here.
          </p>
        )}

        <ol className="mt-8 flex flex-wrap gap-2 text-sm font-semibold" aria-label="Progress">
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? 'step' : undefined}
              className={cn(
                'rounded-pill px-4 py-1.5 border',
                i === step ? 'bg-black text-white border-black' : i < step ? 'border-black' : 'border-border text-muted-foreground',
              )}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          <section aria-live="polite">
            {step === 0 && (
              <div className="grid gap-4">
                {(Object.keys(pricingConfig.tiers) as TierId[]).map((id) => {
                  const t = pricingConfig.tiers[id]
                  return (
                    <button key={id} type="button" className={card(s.tier === id)} onClick={() => patch({ tier: id, billing: 'monthly' })} aria-pressed={s.tier === id}>
                      <span className="block text-lg font-bold">{t.label}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{t.summary}</span>
                      <ul className="mt-3 space-y-1 text-sm">
                        {t.deliverables.map((d) => (
                          <li key={d} className="flex gap-2">
                            <Check size={16} className="mt-0.5 shrink-0 text-green-600" strokeWidth={2.5} />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-3 block text-xs text-muted-foreground">
                        {t.minTermMonths}-month minimum term
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label htmlFor="count" className="block font-bold">
                    How many projects?
                  </label>
                  <input
                    id="count"
                    type="number"
                    min={1}
                    max={pricingConfig.maxSelfServeProjects}
                    value={s.projectCount}
                    onChange={(e) => patch({ projectCount: Math.max(1, Math.floor(Number(e.target.value) || 1)) })}
                    className="mt-2 w-28 rounded border border-border px-3 py-2"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pricingConfig.volumeDiscounts.map((d) => `${d.pct}% off from ${d.minProjects} projects`).join(', ')}.
                    More than {pricingConfig.maxSelfServeProjects}?{' '}
                    <a className="underline" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                      Book a demo
                    </a>
                    .
                  </p>
                </div>
                <fieldset>
                  <legend className="font-bold">What stage is the first project at?</legend>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {(Object.keys(pricingConfig.stages) as StageId[]).map((id) => (
                      <button key={id} type="button" className={card(s.stage === id)} onClick={() => patch({ stage: id })} aria-pressed={s.stage === id}>
                        <span className="block font-bold">{pricingConfig.stages[id].label}</span>
                        <span className="block text-sm text-muted-foreground">{pricingConfig.stages[id].summary}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-bold">Which services does each project need?</legend>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  {(Object.keys(pricingConfig.services) as ServiceId[]).map((id) => (
                    <button key={id} type="button" className={card(s.services.includes(id))} onClick={() => toggleService(id)} aria-pressed={s.services.includes(id)}>
                      <span className="block font-bold">{pricingConfig.services[id].label}</span>
                      <span className="block text-sm text-muted-foreground">
                        {formatMoney(pricingConfig.services[id].monthlyCents)} per project per month
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Select all of Launch Planner, Content Proof, Ad Proof, Conversion Pages and Campaign Report and the
                  suite price of {formatMoney(pricingConfig.suiteBundle.monthlyCents)} per project per month applies.
                </p>
              </fieldset>
            )}

            {step === 3 && quote && (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {(
                    [
                      ['companyName', 'Company name', 'organization'],
                      ['firstProjectName', 'First project name', 'off'],
                      ['contactName', 'Your full name', 'name'],
                      ['contactEmail', 'Your email (becomes the Owner login)', 'email'],
                    ] as const
                  ).map(([key, label, auto]) => (
                    <label key={key} className="block text-sm font-semibold">
                      {label}
                      <input
                        type={key === 'contactEmail' ? 'email' : 'text'}
                        autoComplete={auto}
                        value={s[key]}
                        onChange={(e) => patch({ [key]: e.target.value })}
                        className="mt-1 w-full rounded border border-border px-3 py-2 font-normal"
                      />
                    </label>
                  ))}
                </div>

                {tierCfg.upfrontBlock && (
                  <fieldset>
                    <legend className="font-bold">How do you want to pay?</legend>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      <button type="button" className={card(s.billing === 'monthly')} onClick={() => patch({ billing: 'monthly' })} aria-pressed={s.billing === 'monthly'}>
                        <span className="block font-bold">Monthly</span>
                        <span className="block text-sm text-muted-foreground">Billed each month.</span>
                      </button>
                      <button type="button" className={card(s.billing === 'upfront_block')} onClick={() => patch({ billing: 'upfront_block' })} aria-pressed={s.billing === 'upfront_block'}>
                        <span className="block font-bold">{tierCfg.upfrontBlock.months} months upfront</span>
                        <span className="block text-sm text-muted-foreground">
                          Save {tierCfg.upfrontBlock.discountPct}% on the subscription.
                        </span>
                      </button>
                    </div>
                  </fieldset>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">Your agreement</h2>
                    <button type="button" onClick={printAgreement} className="text-sm underline">
                      Print or save as PDF
                    </button>
                  </div>
                  <div
                    className="mt-3 max-h-80 overflow-y-auto rounded-card border border-border p-5 text-sm leading-relaxed [&_h1]:display [&_h1]:text-2xl [&_h2]:mt-5 [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_td]:text-right [&_th]:text-left [&_th]:font-normal [&_tr]:border-b [&_tr]:border-border"
                    // Safe: every interpolated value is escaped in renderAgreementHtml.
                    dangerouslySetInnerHTML={{ __html: agreement }}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold">
                    Sign by typing your full name
                    <input
                      value={signedName}
                      onChange={(e) => setSignedName(e.target.value)}
                      autoComplete="off"
                      className="mt-1 w-full rounded border border-border px-3 py-2 font-normal italic"
                      placeholder={s.contactName || 'Your full name'}
                    />
                  </label>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
                    <span>
                      I have read the agreement and I accept it on behalf of {s.companyName || 'the company'}. I understand
                      the minimum term is {quote.minTermMonths} months.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-6 rounded-card bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} disabled={busy}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canContinue}>
                  Continue
                </Button>
              ) : (
                <Button onClick={pay} disabled={busy || !quote || !detailsOk || !signedOk || !agreed}>
                  {busy ? 'Opening checkout' : 'Continue to payment'}
                </Button>
              )}
              <ButtonLink href={DEMO_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
                Book a demo instead
              </ButtonLink>
            </div>
          </section>

          <aside className="rounded-card bg-muted p-6 lg:sticky lg:top-6" aria-label="Price summary">
            <h2 className="font-bold">Your price</h2>
            {quote ? <Summary quote={quote} /> : <p className="mt-3 text-sm">Choose at least one service to see a price.</p>}
          </aside>
        </div>
      </main>
    </div>
  )
}

function Summary({ quote }: { quote: Quote }) {
  const money = (c: number) => formatMoney(c, quote.currency)
  const row = (label: string, value: string, strong = false) => (
    <div className={cn('flex justify-between gap-4 py-2 border-b border-border text-sm', strong && 'font-bold')}>
      <dt>{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  )
  return (
    <dl className="mt-3">
      {row('Plan', pricingConfig.tiers[quote.tier].label)}
      {row('Projects', String(quote.projectCount))}
      {row('Per project each month', money(quote.perProjectMonthlyCents))}
      {quote.volumeDiscountPct > 0 && row('Volume discount', `${quote.volumeDiscountPct}%`)}
      {row('Subscription each month', money(quote.monthlyCents))}
      {row('Setup fee, once', money(quote.setupFeeCents))}
      {quote.upfront && row(`${quote.upfront.months}-month block`, money(quote.upfront.blockCents))}
      {row('Due today', money(quote.dueTodayCents), true)}
      <p className="mt-3 text-xs text-muted-foreground">
        Excludes GST. {quote.minTermMonths}-month minimum term.
      </p>
    </dl>
  )
}
