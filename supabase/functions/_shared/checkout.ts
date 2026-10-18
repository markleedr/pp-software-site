// Builds the Stripe Checkout Session parameters from a server-side Quote.
// Inline price_data means no Stripe Products or Prices need creating up front,
// so the price book stays in pricing.config.ts.
import { pricingConfig } from './pricing.config.ts'
import type { PricingConfig, Quote } from './pricing.ts'

export interface CheckoutParams {
  mode: 'subscription'
  customer_email: string
  client_reference_id: string
  success_url: string
  cancel_url: string
  allow_promotion_codes: boolean
  automatic_tax?: { enabled: boolean }
  line_items: unknown[]
  metadata: Record<string, string>
  subscription_data: { metadata: Record<string, string> }
}

export function buildCheckoutParams(args: {
  quote: Quote
  orderId: string
  customerEmail: string
  siteUrl: string
  automaticTax: boolean
  config?: PricingConfig
}): CheckoutParams {
  const { quote, orderId, customerEmail, siteUrl, automaticTax } = args
  const config = args.config ?? pricingConfig
  const tier = config.tiers[quote.tier]
  const projects = `${quote.projectCount} ${quote.projectCount === 1 ? 'project' : 'projects'}`
  const behaviour = automaticTax ? 'exclusive' : 'unspecified'

  const lineItems: unknown[] = []
  if (quote.setupFeeCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: quote.currency,
        unit_amount: quote.setupFeeCents,
        tax_behavior: behaviour,
        product_data: { name: `Setup fee: ${tier.label}, ${projects}` },
      },
    })
  }
  const intervalCount = quote.upfront ? quote.upfront.months : 1
  lineItems.push({
    quantity: 1,
    price_data: {
      currency: quote.currency,
      unit_amount: quote.upfront ? quote.upfront.blockCents : quote.monthlyCents,
      tax_behavior: behaviour,
      recurring: { interval: 'month', interval_count: intervalCount },
      product_data: {
        name: `Project Profile ${tier.label}: ${projects}${quote.upfront ? ` (${intervalCount}-month block)` : ''}`,
      },
    },
  })

  const metadata = {
    order_id: orderId,
    tier: quote.tier,
    project_limit: String(quote.projectCount),
    billing: quote.billing,
    min_term_months: String(quote.minTermMonths),
    config_version: quote.configVersion,
  }
  const base = siteUrl.replace(/\/$/, '')
  return {
    mode: 'subscription',
    customer_email: customerEmail,
    client_reference_id: orderId,
    success_url: `${base}/get-started/success?order=${orderId}`,
    cancel_url: `${base}/get-started?cancelled=1`,
    allow_promotion_codes: false,
    ...(automaticTax ? { automatic_tax: { enabled: true } } : {}),
    line_items: lineItems,
    metadata,
    subscription_data: { metadata },
  }
}
