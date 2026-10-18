// Maps a Stripe Subscription onto the `subscriptions` table contract that the
// other workstreams read: plan, project_limit, status.
export interface StripeSubscriptionLike {
  id: string
  customer: string | { id: string }
  status: string
  cancel_at_period_end?: boolean
  current_period_end?: number
  items?: { data: { current_period_end?: number }[] }
  metadata?: Record<string, string>
}

export interface SubscriptionRow {
  stripe_subscription_id: string
  stripe_customer_id: string
  plan: string | null
  project_limit: number | null
  status: string
  billing: string | null
  min_term_months: number | null
  current_period_end: string | null
  cancel_at_period_end: boolean
}

export function subscriptionRowFromStripe(sub: StripeSubscriptionLike): SubscriptionRow {
  const periodEnd = sub.current_period_end ?? sub.items?.data[0]?.current_period_end
  const limit = Number.parseInt(sub.metadata?.project_limit ?? '', 10)
  const term = Number.parseInt(sub.metadata?.min_term_months ?? '', 10)
  return {
    stripe_subscription_id: sub.id,
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    plan: sub.metadata?.tier ?? null,
    project_limit: Number.isFinite(limit) ? limit : null,
    status: sub.status,
    billing: sub.metadata?.billing ?? null,
    min_term_months: Number.isFinite(term) ? term : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: sub.cancel_at_period_end ?? false,
  }
}
