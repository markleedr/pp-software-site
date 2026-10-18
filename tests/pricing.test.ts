import { describe, expect, it } from 'vitest'
import { computeQuote, QuoteError, type PricingConfig, type Selections } from '@shared/pricing'

// Fixed fixture so tests don't break when Mark edits the real placeholder prices.
const config: PricingConfig = {
  version: 'test',
  currency: 'aud',
  gstRate: 0.1,
  maxSelfServeProjects: 10,
  tiers: {
    self_serve: { label: 'S', summary: '', baseMonthlyCents: 0, setupFeeCents: 10000, minTermMonths: 3, upfrontBlock: null, deliverables: [] },
    platform: { label: 'P', summary: '', baseMonthlyCents: 30000, setupFeeCents: 100000, minTermMonths: 6, upfrontBlock: { months: 6, discountPct: 5 }, deliverables: [] },
    done_for_you: { label: 'D', summary: '', baseMonthlyCents: 100000, setupFeeCents: 200000, minTermMonths: 6, upfrontBlock: { months: 6, discountPct: 5 }, deliverables: [] },
  },
  stages: {
    pre_launch: { label: '', summary: '', setupMultiplier: 1 },
    launch: { label: '', summary: '', setupMultiplier: 1 },
    selling: { label: '', summary: '', setupMultiplier: 0.5 },
    final_stock: { label: '', summary: '', setupMultiplier: 0.5 },
  },
  services: {
    launch_planner: { label: '', monthlyCents: 1000 },
    content_proof: { label: '', monthlyCents: 2000 },
    ad_proof: { label: '', monthlyCents: 3000 },
    conversion_pages: { label: '', monthlyCents: 4000 },
    campaign_report: { label: '', monthlyCents: 5000 },
    lead_reactivation: { label: '', monthlyCents: 600 },
  },
  suiteBundle: { label: '', services: ['launch_planner', 'content_proof', 'ad_proof', 'conversion_pages', 'campaign_report'], monthlyCents: 12000 },
  volumeDiscounts: [
    { minProjects: 3, pct: 10 },
    { minProjects: 6, pct: 20 },
  ],
}

const base: Selections = { tier: 'platform', projectCount: 1, stage: 'launch', services: ['content_proof'], billing: 'monthly' }

describe('computeQuote', () => {
  it('adds the tier base to the selected services', () => {
    const q = computeQuote(base, config)
    expect(q.perProjectMonthlyCents).toBe(32000)
    expect(q.monthlyCents).toBe(32000)
    expect(q.setupFeeCents).toBe(100000)
    expect(q.dueTodayCents).toBe(132000)
  })

  it('scales by project count and applies the highest volume discount', () => {
    expect(computeQuote({ ...base, projectCount: 3 }, config).volumeDiscountPct).toBe(10)
    const q = computeQuote({ ...base, projectCount: 6 }, config)
    expect(q.volumeDiscountPct).toBe(20)
    expect(q.monthlyCents).toBe(Math.round(32000 * 6 * 0.8))
    expect(q.setupFeeCents).toBe(600000)
  })

  it('applies the stage multiplier to the setup fee only', () => {
    const q = computeQuote({ ...base, stage: 'selling' }, config)
    expect(q.setupFeeCents).toBe(50000)
    expect(q.monthlyCents).toBe(32000)
  })

  it('uses the suite bundle price when every bundled service is selected', () => {
    const all = ['launch_planner', 'content_proof', 'ad_proof', 'conversion_pages', 'campaign_report'] as const
    const q = computeQuote({ ...base, services: [...all, 'lead_reactivation'] }, config)
    expect(q.bundleApplied).toBe(true)
    expect(q.perProjectMonthlyCents).toBe(30000 + 12000 + 600)
    expect(computeQuote({ ...base, services: [...all].slice(1) }, config).bundleApplied).toBe(false)
  })

  it('builds the upfront block with its discount', () => {
    const q = computeQuote({ ...base, billing: 'upfront_block' }, config)
    expect(q.upfront).toEqual({ months: 6, discountPct: 5, blockCents: Math.round(32000 * 6 * 0.95) })
    expect(q.dueTodayCents).toBe(100000 + Math.round(32000 * 6 * 0.95))
  })

  it('rejects invalid input', () => {
    expect(() => computeQuote({ ...base, billing: 'upfront_block', tier: 'self_serve' }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, projectCount: 0 }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, projectCount: 11 }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, projectCount: 1.5 }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, services: [] }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, services: ['nope' as never] }, config)).toThrow(QuoteError)
    expect(() => computeQuote({ ...base, tier: 'x' as never }, config)).toThrow(QuoteError)
  })

  it('ignores duplicate services', () => {
    expect(computeQuote({ ...base, services: ['content_proof', 'content_proof'] }, config).monthlyCents).toBe(32000)
  })
})
