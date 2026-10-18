import { describe, expect, it } from 'vitest'
import { esc, renderAgreementHtml, sha256Hex } from '@shared/agreement'
import { buildCheckoutParams } from '@shared/checkout'
import { computeQuote } from '@shared/pricing'
import { parseCheckoutRequest } from '@shared/validate'

const quote = computeQuote({ tier: 'platform', projectCount: 2, stage: 'launch', services: ['content_proof', 'ad_proof'], billing: 'monthly' })
const upfront = computeQuote({ tier: 'platform', projectCount: 2, stage: 'launch', services: ['content_proof', 'ad_proof'], billing: 'upfront_block' })
const party = { companyName: 'Acme <script>alert(1)</script>', contactName: 'Jo "J" Smith', contactEmail: 'jo@acme.com', firstProjectName: "O'Hara Tower" }

describe('agreement', () => {
  it('escapes every party field', () => {
    const html = renderAgreementHtml(quote, party, '18 October 2026')
    expect(html).not.toContain('<script>')
    expect(html).toContain('Acme &lt;script&gt;')
    expect(html).toContain('O&#39;Hara Tower')
  })

  it('states the fees and minimum term from the quote', () => {
    const html = renderAgreementHtml(quote, party, '18 October 2026')
    expect(html).toContain(`${quote.minTermMonths} months`)
    expect(html).toContain('Content Proof')
    expect(html).toContain('Setup Fee')
  })

  it('describes the upfront block only when chosen', () => {
    expect(renderAgreementHtml(upfront, party, 'd')).toContain('upfront block')
    expect(renderAgreementHtml(quote, party, 'd')).not.toContain('upfront block')
  })

  it('hashes deterministically', async () => {
    expect(await sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  })

  it('esc handles all five characters', () => {
    expect(esc(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;')
  })
})

describe('buildCheckoutParams', () => {
  const args = { orderId: 'o1', customerEmail: 'jo@acme.com', siteUrl: 'https://x.test/', automaticTax: false }

  it('creates a setup line and a monthly recurring line', () => {
    const p = buildCheckoutParams({ ...args, quote })
    const [setup, recurring] = p.line_items as any[]
    expect(setup.price_data.unit_amount).toBe(quote.setupFeeCents)
    expect(setup.price_data.recurring).toBeUndefined()
    expect(recurring.price_data.unit_amount).toBe(quote.monthlyCents)
    expect(recurring.price_data.recurring).toEqual({ interval: 'month', interval_count: 1 })
    expect(p.success_url).toBe('https://x.test/get-started/success?order=o1')
    expect(p.subscription_data.metadata).toMatchObject({ order_id: 'o1', tier: 'platform', project_limit: '2' })
  })

  it('bills the upfront block as one 6-month interval', () => {
    const recurring = (buildCheckoutParams({ ...args, quote: upfront }).line_items as any[]).at(-1)
    expect(recurring.price_data.unit_amount).toBe(upfront.upfront!.blockCents)
    expect(recurring.price_data.recurring).toEqual({ interval: 'month', interval_count: 6 })
  })

  it('turns on automatic tax only when asked', () => {
    expect(buildCheckoutParams({ ...args, quote }).automatic_tax).toBeUndefined()
    expect(buildCheckoutParams({ ...args, quote, automaticTax: true }).automatic_tax).toEqual({ enabled: true })
  })
})

describe('parseCheckoutRequest', () => {
  const ok = {
    selections: { tier: 'platform', projectCount: 1, stage: 'launch', services: ['ad_proof'], billing: 'monthly' },
    companyName: 'Acme', contactName: 'Jo Smith', contactEmail: ' Jo@Acme.com ', firstProjectName: 'Tower', signedName: 'jo smith', agreed: true,
  }
  it('normalises a valid body', () => {
    expect(parseCheckoutRequest(ok).contactEmail).toBe('jo@acme.com')
  })
  it('rejects a signature that does not match, a missing agreement and a bad email', () => {
    expect(() => parseCheckoutRequest({ ...ok, signedName: 'Someone Else' })).toThrow(/exactly/)
    expect(() => parseCheckoutRequest({ ...ok, agreed: false })).toThrow(/Accept/)
    expect(() => parseCheckoutRequest({ ...ok, contactEmail: 'nope' })).toThrow(/email/)
    expect(() => parseCheckoutRequest(null)).toThrow()
  })
})
