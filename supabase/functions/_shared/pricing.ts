// Pure pricing logic. No Deno or browser APIs, so it runs in the browser, in
// Edge Functions and under Vitest. Config lives in ./pricing.config.ts.
import { pricingConfig } from './pricing.config.ts'

export type TierId = 'self_serve' | 'platform' | 'done_for_you'
export type StageId = 'pre_launch' | 'launch' | 'selling' | 'final_stock'
export type ServiceId =
  | 'launch_planner'
  | 'content_proof'
  | 'ad_proof'
  | 'conversion_pages'
  | 'campaign_report'
  | 'lead_reactivation'
export type BillingOption = 'monthly' | 'upfront_block'

export interface UpfrontBlockConfig {
  months: number
  discountPct: number
}

export interface TierConfig {
  label: string
  summary: string
  baseMonthlyCents: number
  setupFeeCents: number
  minTermMonths: number
  upfrontBlock: UpfrontBlockConfig | null
  deliverables: string[]
}

export interface PricingConfig {
  version: string
  currency: string
  gstRate: number
  maxSelfServeProjects: number
  tiers: Record<TierId, TierConfig>
  stages: Record<StageId, { label: string; summary: string; setupMultiplier: number }>
  services: Record<ServiceId, { label: string; monthlyCents: number }>
  suiteBundle: { label: string; services: ServiceId[]; monthlyCents: number }
  volumeDiscounts: { minProjects: number; pct: number }[]
}

export interface Selections {
  tier: TierId
  projectCount: number
  stage: StageId
  services: ServiceId[]
  billing: BillingOption
}

export interface Quote {
  configVersion: string
  currency: string
  gstRate: number
  tier: TierId
  projectCount: number
  stage: StageId
  services: ServiceId[]
  billing: BillingOption
  bundleApplied: boolean
  perProjectMonthlyCents: number
  volumeDiscountPct: number
  /** Recurring amount per month, after volume discount, excluding GST. */
  monthlyCents: number
  /** One-off setup fee for all projects, excluding GST. */
  setupFeeCents: number
  minTermMonths: number
  upfront: { months: number; discountPct: number; blockCents: number } | null
  /** Charged at checkout, excluding GST. */
  dueTodayCents: number
}

export class QuoteError extends Error {}

const isInt = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n)

export function computeQuote(input: Selections, config: PricingConfig = pricingConfig): Quote {
  const tier = config.tiers[input.tier]
  if (!tier) throw new QuoteError('Unknown plan.')
  const stage = config.stages[input.stage]
  if (!stage) throw new QuoteError('Unknown project stage.')
  if (!isInt(input.projectCount) || input.projectCount < 1 || input.projectCount > config.maxSelfServeProjects) {
    throw new QuoteError(`Choose between 1 and ${config.maxSelfServeProjects} projects.`)
  }
  if (!Array.isArray(input.services) || input.services.length === 0) {
    throw new QuoteError('Select at least one service.')
  }
  const services = [...new Set(input.services)]
  for (const id of services) {
    if (!config.services[id]) throw new QuoteError('Unknown service.')
  }
  if (input.billing !== 'monthly' && input.billing !== 'upfront_block') {
    throw new QuoteError('Unknown billing option.')
  }
  if (input.billing === 'upfront_block' && !tier.upfrontBlock) {
    throw new QuoteError('This plan does not offer an upfront block.')
  }

  const bundle = config.suiteBundle
  const bundleApplied = bundle.services.every((id) => services.includes(id))
  const serviceCents = services.reduce((sum, id) => {
    if (bundleApplied && bundle.services.includes(id)) return sum
    return sum + config.services[id].monthlyCents
  }, bundleApplied ? bundle.monthlyCents : 0)

  const perProjectMonthlyCents = tier.baseMonthlyCents + serviceCents
  const volumeDiscountPct = config.volumeDiscounts
    .filter((d) => input.projectCount >= d.minProjects)
    .reduce((best, d) => Math.max(best, d.pct), 0)
  const monthlyCents = Math.round(perProjectMonthlyCents * input.projectCount * (1 - volumeDiscountPct / 100))
  const setupFeeCents = Math.round(tier.setupFeeCents * stage.setupMultiplier) * input.projectCount

  let upfront: Quote['upfront'] = null
  if (input.billing === 'upfront_block' && tier.upfrontBlock) {
    const { months, discountPct } = tier.upfrontBlock
    upfront = { months, discountPct, blockCents: Math.round(monthlyCents * months * (1 - discountPct / 100)) }
  }
  const recurringDueCents = upfront ? upfront.blockCents : monthlyCents

  return {
    configVersion: config.version,
    currency: config.currency,
    gstRate: config.gstRate,
    tier: input.tier,
    projectCount: input.projectCount,
    stage: input.stage,
    services,
    billing: input.billing,
    bundleApplied,
    perProjectMonthlyCents,
    volumeDiscountPct,
    monthlyCents,
    setupFeeCents,
    minTermMonths: tier.minTermMonths,
    upfront,
    dueTodayCents: setupFeeCents + recurringDueCents,
  }
}

export function formatMoney(cents: number, currency = 'aud'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100)
}
